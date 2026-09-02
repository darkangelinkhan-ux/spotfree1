// app/api/subscription/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { NOTIFICATION_EMAIL, FROM_EMAIL, emailShell, emailRow } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("API Received Body:", body);

    // Frontend se 'email' aaye ya 'customerEmail', dono ko handle karega
    const email = body.email || body.customerEmail;
    const name = body.name || body.customerName;
    const phone = body.phone || body.customerPhone;
    const { plan, price, frequency, startDate, preferredTime, vehicleCount, vehicleType } = body;

    if (!email) {
      console.error("Validation failed: 'email' field is missing or empty in body:", body);
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY || "re_7bLuXxeD_Mt9Ly7oSJYvXvyv5Gn9TLRKa");

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

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New Subscription / Signup${plan ? ` — ${plan}` : ''}`,
      html: emailShell({
        eyebrow: 'New Subscription',
        title: plan || 'Newsletter / Plan Signup',
        intro: 'A user subscribed or registered on SpotFree.',
        bodyHtml,
      }),
    });

    if (error) {
      console.error('Resend error (subscription):', error);
      return NextResponse.json({ success: false, error: error.message || 'Failed to process subscription.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Subscription processed successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('Subscription API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process subscription.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}