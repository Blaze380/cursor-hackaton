import type { MagicLinkOptions } from 'better-auth/plugins';
import { getEmailTemplateService } from '@/modules/email/email-service.holder';
import { AUTH_EMAIL_SUBJECTS } from '@/modules/email/auth-email.subjects';

export const sendMagicLink: MagicLinkOptions['sendMagicLink'] = async ({ email, url }) => {
  await getEmailTemplateService().sendTemplate({
    to: email,
    subject: AUTH_EMAIL_SUBJECTS.magicLink,
    template: 'auth.magic-link',
    props: { url },
  });
};
