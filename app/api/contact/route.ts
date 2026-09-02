import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { FROM_EMAIL, emailShell, emailRow } from '@/lib/email';
// Not using NOTIFICATION_EMAIL directly if it's unconfigured, or use a safe fallback below

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, email, message).' },
        { status: 400 }
      );
    }

    const resend = new Resend("re_L9UqnHH1_4Dy4wjA5fHmss6QbgbrJNbxo");

    const bodyHtml = `
      <ul style="margin:0;padding:0;">
        ${emailRow('Sender Name', name)}
        ${emailRow('Sender Email', email)}
        ${subject ? emailRow('Subject', subject) : ''}
      </ul>
      <div style="margin-top:20px;padding:16px;background:#1a1a1a;border:1px solid #262626;border-radius:12px;">
        <p style="color:#a3a3a3;font-size:11px;font-weight:600;margin:0 0 8px 0;text-transform:uppercase;">Message:</p>
        <p style="color:#ffffff;font-size:13px;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'SpotFree <onboarding@resend.dev>',
      to: 'developerm789@gmail.com', // Safe hardcoded destination to prevent undefined errors
      replyTo: email,
      subject: `Contact Message: ${subject || 'New Inquiry'}`,
      html: emailShell({
        eyebrow: 'New Contact Message',
        title: name,
        intro: 'You received a new message from the SpotFree contact form.',
        bodyHtml,
      }),
    });

    if (error) {
      console.error('Resend error (contact):', error);
      return NextResponse.json({ success: false, error: error.message || 'Failed to send message.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process message.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}