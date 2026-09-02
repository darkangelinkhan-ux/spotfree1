import { NextResponse } from 'next/server';
import { emailShell, emailRow } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields.' }, { status: 400 });
    }

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

    // Direct fetch use kiya hai taaki koi library error na aaye
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer re_Gipd5GwR_9z37YGWBGcKZnt4HxqtjVDEc`,
      },
      body: JSON.stringify({
        from: 'SpotFree <onboarding@resend.dev>',
        to: ['developerm789@gmail.com'],
        reply_to: email,
        subject: `Contact Message: ${subject || 'New Inquiry'}`,
        html: emailShell({
          eyebrow: 'New Contact Message',
          title: name,
          intro: 'You received a new message from the SpotFree contact form.',
          bodyHtml,
        }),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend error:', data);
      return NextResponse.json({ success: false, error: data.message || 'Failed to send' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process message.' }, { status: 500 });
  }
}