// Central place for the destination inbox that receives all business notifications
// (new bookings, contact form messages). Change this in one place only.
export const NOTIFICATION_EMAIL = 'developerm789@gmail.com'; // ✅ Yahan single quote laga diya hai

// Resend requires a verified sender. Update once you verify your own domain in Resend;
// until then, `onboarding@resend.dev` works for testing.
export const FROM_EMAIL = 'SpotFree <onboarding@resend.dev>';

/**
 * Wraps inner HTML in a consistent dark, lime-accented email shell matching the
 * SpotFree brand (#0d0d0d background, #D4FF00 accent).
 */
export function emailShell(opts: {
  eyebrow: string;
  title: string;
  intro?: string;
  bodyHtml: string;
  footerNote?: string;
}) {
  const { eyebrow, title, intro, bodyHtml, footerNote } = opts;

  return `
  <div style="background:#0d0d0d;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#121212;border:1px solid #262626;border-radius:20px;overflow:hidden;">
      <div style="padding:28px 32px 0 32px;">
        <p style="color:#D4FF00;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px 0;">
          ${eyebrow}
        </p>
        <h1 style="color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;margin:0 0 12px 0;text-transform:uppercase;">
          ${title}
        </h1>
        ${intro ? `<p style="color:#a3a3a3;font-size:13px;line-height:1.6;margin:0 0 20px 0;">${intro}</p>` : ''}
      </div>
      <div style="padding:0 32px 28px 32px;">
        ${bodyHtml}
      </div>
      <div style="background:#0a0a0a;padding:18px 32px;border-top:1px solid #262626;">
        <p style="color:#525252;font-size:11px;margin:0;">
          ${footerNote || 'SpotFree &mdash; Premium mobile car wash and hospitality cleaning services.'}
        </p>
      </div>
    </div>
  </div>`;
}

export function emailRow(label: string, value: string) {
  return `
    <li style="list-style:none;display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid #262626;">
      <span style="color:#a3a3a3;font-size:12px;font-weight:600;">${label}</span>
      <span style="color:#ffffff;font-size:12px;font-weight:700;text-align:right;">${value}</span>
    </li>`;
}