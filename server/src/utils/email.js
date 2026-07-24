import nodemailer from 'nodemailer';

export const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Email skipped — configure SMTP_USER/SMTP_PASS]');
    console.log({ name, email, subject, message });
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
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
