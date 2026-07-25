/**
 * Email delivery for contact form.
 * Prefer RESEND_API_KEY on Render (HTTPS, reliable).
 * Falls back to Gmail SMTP when Resend is not configured.
 */

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

  // Resend free accounts can only send FROM a verified domain,
  // or use onboarding@resend.dev for testing.
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
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
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
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6">
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      </div>
    `,
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
