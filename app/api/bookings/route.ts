import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { NOTIFICATION_EMAIL, FROM_EMAIL, emailShell, emailRow } from '@/lib/email';

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
  recurringFrequency?: string; // e.g. 'Weekly', 'Bi-Weekly', 'Monthly'
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

   const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
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
      return NextResponse.json({ success: false, error: 'Failed to send booking email.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Booking email sent successfully.', data }, { status: 200 });
  } catch (error) {
    console.error('Bookings API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to process booking.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}