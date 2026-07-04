import type { EmailMessage, EmailProvider } from './email.types';

export class EmailService {
  constructor(private readonly provider: EmailProvider) {}

  async send(message: EmailMessage): Promise<void> {
    const from = message.from ?? process.env.EMAIL_FROM;

    if (!from) {
      throw new Error('EMAIL_FROM is not configured');
    }

    await this.provider.send({
      ...message,
      from,
    });
  }
}
