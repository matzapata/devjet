import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export function sendEmail(mailOptions: Mail.Options) {
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    ...mailOptions,
  });
}
