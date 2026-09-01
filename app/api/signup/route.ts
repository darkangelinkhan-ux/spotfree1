import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase';
import { FROM_EMAIL, emailShell } from '@/lib/email';

export const dynamic = 'force-dynamic';

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body: Partial<SignupPayload> = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are all required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Prefer the admin client (service role) when configured, since it can auto-confirm the
    // user so they can log in immediately without an extra "confirm your email" step.
    const adminClient = getSupabaseAdminClient();

    let newUser: { id: string; email?: string } | null = null;

    if (adminClient) {
      const { data, error } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name },
      });

      if (error) {
        const status = error.status === 422 ? 409 : 500;
        return NextResponse.json({ success: false, error: error.message }, { status });
      }

      newUser = data.user;
    } else {
      // Fallback: sign up with the public anon client. This still creates and saves the
      // user in Supabase Auth, but the project's email-confirmation settings will apply.
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });

      if (error) {
        const status = error.status === 422 ? 409 : 500;
        return NextResponse.json({ success: false, error: error.message }, { status });
      }

      newUser = data.user;
    }

    // Send the "Welcome to SpotFree" email. A failure here should not block account creation,
    // so we log it but still return success for the signup itself.
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: emailError } = await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: 'Welcome to SpotFree 🎉',
          html: emailShell({
            eyebrow: 'Account Created',
            title: `Welcome to SpotFree, ${name}!`,
            intro:
              "We're thrilled to have you on board. Your account has been created successfully and you're all set to start booking premium car wash and cleaning services delivered right to your doorstep.",
            bodyHtml: `
              <div style="background:#161616;border:1px solid #262626;border-radius:12px;padding:20px;text-align:center;">
                <p style="color:#a3a3a3;font-size:12px;line-height:1.7;margin:0 0 16px 0;">
                  Ready to get started? Log in and book your first service in just a few clicks.
                </p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/login"
                   style="display:inline-block;background:#D4FF00;color:#000000;font-weight:800;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:12px 24px;border-radius:10px;text-decoration:none;">
                  Go To Login
                </a>
              </div>
            `,
          }),
        });
        emailSent = !emailError;
        if (emailError) console.error('Resend error (welcome email):', emailError);
      } catch (emailErr) {
        console.error('Welcome email send failed:', emailErr);
      }
    } else {
      console.warn('RESEND_API_KEY is missing — skipping welcome email.');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully.',
        user: newUser ? { id: newUser.id, email: newUser.email } : null,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create account.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
