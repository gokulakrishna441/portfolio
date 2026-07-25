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

const siteUrl = () =>
  (process.env.CLIENT_URL || 'https://portfolio-gray-ten-56.vercel.app').split(',')[0].trim();

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
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#2a303c;">${safeMessage}</p>
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

export const buildThankYouEmailHtml = ({ name, subject }) => {
  const safeName = escapeHtml(name || 'there');
  const safeSubject = escapeHtml(subject || 'your message');
  const year = new Date().getFullYear();
  const portfolioUrl = siteUrl();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thanks for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#0b1018;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b1018;padding:36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#121826;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:32px 28px 18px;background:radial-gradient(circle at top right, rgba(196,165,116,0.22), transparent 45%), linear-gradient(160deg,#182033 0%,#0b1018 70%);">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width:42px;height:42px;border-radius:12px;background:#f5efe6;color:#141820;font-family:Georgia,serif;font-size:16px;font-weight:700;text-align:center;vertical-align:middle;">
                    GK
                  </td>
                  <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#c4a574;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;">
                    Gokula Krishna A
                  </td>
                </tr>
              </table>
              <h1 style="margin:22px 0 0;font-size:32px;line-height:1.15;color:#f5efe6;font-weight:600;">
                Thank you for reaching out
              </h1>
              <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:rgba(245,239,230,0.78);">
                Hi ${safeName}, I’ve received your message and I’ll get back to you soon.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 28px 28px;">
              <div style="margin-top:12px;padding:20px 18px;border-radius:14px;background:rgba(196,165,116,0.08);border:1px solid rgba(196,165,116,0.2);">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#c4a574;font-weight:700;">
                  Your request
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#f5efe6;font-weight:600;">
                  ${safeSubject}
                </p>
                <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:rgba(245,239,230,0.72);">
                  I appreciate you taking the time to connect. I usually reply as soon as possible.
                  Meanwhile, feel free to explore more of my work.
                </p>
              </div>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                <tr>
                  <td style="border-radius:999px;background:#c4a574;">
                    <a href="${portfolioUrl}"
                       style="display:inline-block;padding:13px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#141820;text-decoration:none;">
                      Visit my portfolio
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:26px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:rgba(245,239,230,0.7);">
                Warm regards,<br/>
                <span style="color:#f5efe6;font-weight:700;">Gokula Krishna A</span><br/>
                MERN Stack Developer
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 24px;">
              <p style="margin:0;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:rgba(245,239,230,0.45);">
                This is an automated thank-you note from my portfolio contact form.<br/>
                © ${year} Gokula Krishna A
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

const getFromAddress = () =>
  process.env.EMAIL_FROM ||
  (process.env.SMTP_USER
    ? `Portfolio Contact <${process.env.SMTP_USER}>`
    : 'Portfolio Contact <onboarding@resend.dev>');

const sendResendMail = async ({ to, subject, text, html, replyTo }) => {
  const apiKey = process.env.RESEND_API_KEY.trim();
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || `Resend failed (${res.status})`);
  }
  return data;
};

const getSmtpTransporter = async () => {
  const nodemailer = await import('nodemailer');
  const user = process.env.SMTP_USER.trim();
  const pass = process.env.SMTP_PASS.replace(/\s+/g, '');
  return {
    user,
    transporter: nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    }),
  };
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const status = getEmailConfigStatus();
  if (!status.configured) {
    return { skipped: true, reason: 'No email provider configured' };
  }

  const adminTo = process.env.CONTACT_TO || process.env.SMTP_USER;
  if (!adminTo) {
    return { skipped: true, reason: 'CONTACT_TO missing' };
  }

  const useResend = Boolean((process.env.RESEND_API_KEY || '').trim());
  let thankYouSent = false;
  let thankYouError = null;

  if (useResend) {
    await sendResendMail({
      to: adminTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: buildContactEmailHtml({ name, email, subject, message }),
    });

    try {
      await sendResendMail({
        to: email,
        replyTo: adminTo,
        subject: `Thanks for contacting Gokula Krishna A`,
        text: `Hi ${name},\n\nThanks for reaching out. I have received your message and will get back to you soon.\n\n— Gokula Krishna A`,
        html: buildThankYouEmailHtml({ name, subject }),
      });
      thankYouSent = true;
    } catch (err) {
      thankYouError = err.message;
      console.error('[Thank-you email failed]', thankYouError);
    }

    return { skipped: false, thankYouSent, thankYouError };
  }

  const { user, transporter } = await getSmtpTransporter();

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: adminTo,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: buildContactEmailHtml({ name, email, subject, message }),
  });

  try {
    await transporter.sendMail({
      from: `"Gokula Krishna A" <${user}>`,
      to: email,
      replyTo: user,
      subject: `Thanks for contacting Gokula Krishna A`,
      text: `Hi ${name},\n\nThanks for reaching out. I have received your message and will get back to you soon.\n\n— Gokula Krishna A`,
      html: buildThankYouEmailHtml({ name, subject }),
    });
    thankYouSent = true;
  } catch (err) {
    thankYouError = err.message;
    console.error('[Thank-you email failed]', thankYouError);
  }

  return { skipped: false, thankYouSent, thankYouError };
};
