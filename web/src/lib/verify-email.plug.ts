import type { BetterAuthOptions } from 'better-auth';
import { getEmailTemplateService } from '@/modules/email/email-service.holder';
import { AUTH_EMAIL_SUBJECTS } from '@/modules/email/auth-email.subjects';

type SendVerificationEmail = NonNullable<
  NonNullable<BetterAuthOptions['emailVerification']>['sendVerificationEmail']
>;

export const sendVerificationEmail: SendVerificationEmail = async ({ user, url }) => {
  await getEmailTemplateService().sendTemplate({
    to: user.email,
    subject: AUTH_EMAIL_SUBJECTS.verifyEmail,
    template: 'auth.verify-email',
    props: {
      url,
      name: user.name ?? undefined,
    },
  });
};
