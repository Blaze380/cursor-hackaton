import type { EmailProvider } from './email.types';
import { EmailService } from './email.service';
import { setEmailTemplateService } from './email-service.holder';
import { EmailTemplateService } from './email-template.service';

let bootstrapped = false;

export function ensureEmailService(provider: EmailProvider): void {
  if (bootstrapped) {
    return;
  }

  const emailService = new EmailService(provider);
  setEmailTemplateService(new EmailTemplateService(emailService));
  bootstrapped = true;
}
