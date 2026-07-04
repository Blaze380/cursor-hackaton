import type { EmailTemplateService } from './email-template.service';

let emailTemplateService: EmailTemplateService | null = null;

export function setEmailTemplateService(service: EmailTemplateService): void {
  emailTemplateService = service;
}

export function getEmailTemplateService(): EmailTemplateService {
  if (!emailTemplateService) {
    throw new Error('EmailTemplateService is not initialized. Is EmailModule loaded?');
  }

  return emailTemplateService;
}
