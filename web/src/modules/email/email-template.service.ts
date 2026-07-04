import { render } from '@react-email/render';
import { createElement } from 'react';
import { emailTemplateRegistry } from './email-template.registry';
import { EmailService } from './email.service';
import type { EmailTemplateId, EmailTemplateProps } from './email.types';

export class EmailTemplateService {
  constructor(private readonly emailService: EmailService) {}

  async sendTemplate<T extends EmailTemplateId>(options: {
    to: string;
    subject: string;
    template: T;
    props: EmailTemplateProps[T];
  }): Promise<void> {
    const Component = emailTemplateRegistry[options.template];
    const html = await render(createElement(Component, options.props));

    await this.emailService.send({
      to: options.to,
      subject: options.subject,
      html,
    });
  }
}
