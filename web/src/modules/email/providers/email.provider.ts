import nodemailer from 'nodemailer';
import type { EmailMessage, EmailProvider } from '../email.types';

function buildSmtpAuth() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return undefined;
  }

  return { user, pass };
}

export class EmailProviderImpl implements EmailProvider {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 1025),
    secure: process.env.SMTP_SECURE === 'true',
    auth: buildSmtpAuth(),
  });

  async send(message: EmailMessage & { from: string }): Promise<void> {
    await this.transporter.sendMail({
      from: message.from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
  }
}
