import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailShell, emailRow } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      service,
      package: pkgName,
      price,
      date,
      time,
      fullName,
      phone,
      email,
      address,
      instructions,
      paymentMethod,
      orderId,
      isRecurring,
      recurringFrequency,
    } = body;

    if (!email || !fullName || !service) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking fields.' },
        { status: 400 }
      );
    }

    const paymentLabel = paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Card Payment';
   const resend = new Resend(process.env.RESEND_API_KEY || "re_Gipd5GwR_9z37YGWBGcKZnt4HxqtjVDEc");

    const bodyHtml = `
      <ul style="margin:0;padding:0;">
        ${orderId ? emailRow('Reference ID', orderId) : ''}
        ${emailRow('Customer Name', fullName)}
        ${emailRow('Phone', phone)}
        ${emailRow('Email', email)}
        ${emailRow('Service', service)}
        ${emailRow('Package', pkgName)}
        ${emailRow('Price', `QAR ${price}`)}
        ${emailRow('Date', date)}
        ${emailRow('Time', time)}
        ${emailRow('Address', address)}
        ${instructions ? emailRow('Instructions', instructions) : ''}
        ${emailRow('Payment Method', paymentLabel)}
        ${
          isRecurring
            ? emailRow('Subscription', `Recurring &mdash; ${recurringFrequency || 'Not specified'}`)
            : emailRow('Subscription', 'One-time booking')
        }
      </ul>
    `;

    const { data, error } = await resend.emails.send({
      from: 'SpotFree <onboarding@resend.dev>',
      to: 'developerm789@gmail.com',
      replyTo: email,
      subject: `New Booking: ${service} (${pkgName})${isRecurring ? ' — Recurring' : ''}`,
      html: emailShell({
        eyebrow: 'New Booking Received',
        title: `${service} — ${pkgName}`,
        intro: 'A customer just confirmed a booking on SpotFree. Full details below.',
        bodyHtml,
      }),
    });

    if (error) {
      console.error('Resend error (bookings):', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Booking email sent successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('Bookings API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process booking.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}