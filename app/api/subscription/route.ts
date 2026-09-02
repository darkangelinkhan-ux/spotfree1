import { NextResponse } from 'next/server';
import { emailShell, emailRow } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email || body.customerEmail;
    const name = body.name || body.customerName;
    const phone = body.phone || body.customerPhone;
    const { plan, price, frequency, startDate, preferredTime, vehicleCount, vehicleType } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    const bodyHtml = `
      <ul style="margin:0;padding:0;">
        ${emailRow('Email', email)}
        ${name ? emailRow('Name', name) : ''}
        ${phone ? emailRow('Phone', phone) : ''}
        ${plan ? emailRow('Selected Plan', plan) : ''}
        ${price ? emailRow('Price', price) : ''}
        ${frequency ? emailRow('Frequency', frequency) : ''}
        ${startDate ? emailRow('Start Date', startDate) : ''}
        ${preferredTime ? emailRow('Preferred Time', preferredTime) : ''}
        ${vehicleCount ? emailRow('Vehicle Count', vehicleCount) : ''}
        ${vehicleType ? emailRow('Vehicle Type', vehicleType) : ''}
      </ul>
    `;

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
        subject: `New Subscription / Signup${plan ? ` — ${plan}` : ''}`,
        html: emailShell({
          eyebrow: 'New Subscription',
          title: plan || 'Newsletter / Plan Signup',
          intro: 'A user subscribed or registered on SpotFree.',
          bodyHtml,
        }),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend error:', data);
      return NextResponse.json({ success: false, error: data.message || 'Failed to send subscription' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Subscription processed successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process subscription.' }, { status: 500 });
  }
}