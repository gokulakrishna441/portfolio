import nodemailer from 'nodemailer';

export const getEmailConfigStatus = () => {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  return {
    configured: Boolean(user && pass),
    smtpUser: user ? `${user.slice(0, 3)}***` : '',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    contactTo: process.env.CONTACT_TO || user || '',
  };
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const status = getEmailConfigStatus();
  if (!status.configured) {
    return { skipped: true, reason: 'SMTP_USER or SMTP_PASS missing on server' };
  }

  const user = process.env.SMTP_USER.trim();
  const pass = process.env.SMTP_PASS.replace(/\s+/g, '');

  // Gmail-friendly transport (more reliable than raw host on some hosts)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 20000,
  });

  await transporter.verify();

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
