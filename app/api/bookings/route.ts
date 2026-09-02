import { NextResponse } from 'next/server';
import { emailShell, emailRow } from '@/lib/email';

export const dynamic = 'force-dynamic';

interface BookingPayload {
  service: string;
  package: string;
  price: string | number;
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  instructions?: string;
  paymentMethod: 'cod' | 'card' | string;
  orderId?: string;
  isRecurring?: boolean;
  recurringFrequency?: string;
}

const REQUIRED_FIELDS: (keyof BookingPayload)[] = [
  'service',
  'package',
  'price',
  'date',
  'time',
  'fullName',
  'phone',
  'email',
  'address',
  'paymentMethod',
];

export async function POST(request: Request) {
  try {
    const body: Partial<BookingPayload> = await request.json();

    const missingFields = REQUIRED_FIELDS.filter((field) => {
      const value = body[field];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required field(s): ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

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
    } = body as BookingPayload;

    const paymentLabel = paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Card Payment';

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

    // Direct Resend API fetch call to bypass environment variable errors
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer re_L9UqnHH1_4Dy4wjA5fHmss6QbgbrJNbxo`,
      },
      body: JSON.stringify({
        from: 'SpotFree <onboarding@resend.dev>',
        to: ['developerm789@gmail.com'],
        reply_to: email,
        subject: `New Booking: ${service} (${pkgName})${isRecurring ? ' — Recurring' : ''}`,
        html: emailShell({
          eyebrow: 'New Booking Received',
          title: `${service} — ${pkgName}`,
          intro: 'A customer just confirmed a booking on SpotFree. Full details below.',
          bodyHtml,
        }),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error (bookings):', data);
      return NextResponse.json({ success: false, error: data.message || 'Failed to send booking email.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Booking email sent successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('Bookings API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process booking.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}