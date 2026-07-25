/**
 * Email delivery for contact form.
 * Prefer RESEND_API_KEY on Render (HTTPS, reliable).
 * Falls back to Gmail SMTP when Resend is not configured.
 */

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const buildContactEmailHtml = ({ name, email, subject, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New portfolio message</title>
</head>
<body style="margin:0;padding:0;background:#f3efe6;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3efe6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fffdf8;border:1px solid #e4dccf;border-radius:18px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#1f2a24 0%,#0b1018 100%);padding:28px 28px 24px;">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#c4a574;font-weight:700;">
                Gokula Krishna A · Portfolio
              </p>
              <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:600;color:#f5efe6;">
                New message received
              </h1>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:rgba(245,239,230,0.75);">
                Someone reached out through your website contact form.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 12px;">
                <tr>
                  <td style="background:#f7f2e9;border-radius:12px;padding:14px 16px;">
                    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8b5e34;font-weight:700;">Name</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#141820;font-weight:600;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f7f2e9;border-radius:12px;padding:14px 16px;">
                    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8b5e34;font-weight:700;">Email</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;">
                      <a href="mailto:${safeEmail}" style="color:#1f4d4a;text-decoration:none;font-weight:600;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f7f2e9;border-radius:12px;padding:14px 16px;">
                    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8b5e34;font-weight:700;">Subject</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#141820;font-weight:600;">${safeSubject}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top:8px;padding:18px 16px;border:1px solid #e4dccf;border-radius:12px;background:#ffffff;">
                <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8b5e34;font-weight:700;">Message</p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#2a303c;">
                  ${safeMessage}
                </p>
              </div>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                <tr>
                  <td style="border-radius:999px;background:#141820;">
                    <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(subject)}"
                       style="display:inline-block;padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#f5efe6;text-decoration:none;">
                      Reply to ${safeName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 24px;">
              <p style="margin:0;padding-top:16px;border-top:1px solid #ebe4d7;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8a8276;">
                Sent from your portfolio contact form · © ${year} Gokula Krishna A
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
};

export const getEmailConfigStatus = () => {
  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const contactTo = process.env.CONTACT_TO || user || '';

  return {
    configured: Boolean(resendKey || (user && pass)),
    provider: resendKey ? 'resend' : user && pass ? 'gmail-smtp' : 'none',
    smtpUser: user ? `${user.slice(0, 3)}***` : '',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    contactTo,
  };
};

const sendWithResend = async ({ name, email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY.trim();
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  if (!to) {
    return { skipped: true, reason: 'CONTACT_TO missing' };
  }

  const from =
    process.env.EMAIL_FROM ||
    'Portfolio Contact <onboarding@resend.dev>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: buildContactEmailHtml({ name, email, subject, message }),
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || `Resend failed (${res.status})`);
  }

  return { skipped: false, id: data.id };
};

const sendWithGmailSmtp = async ({ name, email, subject, message }) => {
  const nodemailer = await import('nodemailer');
  const user = process.env.SMTP_USER.trim();
  const pass = process.env.SMTP_PASS.replace(/\s+/g, '');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: process.env.CONTACT_TO || user,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: buildContactEmailHtml({ name, email, subject, message }),
  });

  return { skipped: false };
};

export const sendContactEmail = async (payload) => {
  const status = getEmailConfigStatus();
  if (!status.configured) {
    return { skipped: true, reason: 'No email provider configured' };
  }

  if ((process.env.RESEND_API_KEY || '').trim()) {
    return sendWithResend(payload);
  }

  return sendWithGmailSmtp(payload);
};
