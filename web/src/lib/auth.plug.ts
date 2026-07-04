import type { BetterAuthOptions } from 'better-auth';
import { getEmailTemplateService } from '@/modules/email/email-service.holder';
import { AUTH_EMAIL_SUBJECTS } from '@/modules/email/auth-email.subjects';
import { crossSubDomainCookieDomain } from './auth.cookies';

type EmailAndPasswordOptions = BetterAuthOptions['emailAndPassword'];
type AdvancedOptions = BetterAuthOptions['advanced'];

export const advancedOptions: AdvancedOptions = {
  cookiePrefix: 'atz',
  crossSubDomainCookies: {
    enabled: true,
    domain: crossSubDomainCookieDomain,
  },
};

export const emailAndPasswordOptions: EmailAndPasswordOptions = {
  enabled: true,
  revokeSessionsOnPasswordReset: true,
  requireEmailVerification: true,
  sendResetPassword: async ({ user, url }) => {
    await getEmailTemplateService().sendTemplate({
      to: user.email,
      subject: AUTH_EMAIL_SUBJECTS.resetPassword,
      template: 'auth.reset-password',
      props: {
        url,
        name: user.name ?? undefined,
      },
    });
  },
  onExistingUserSignUp: async ({ user }) => {
    const baseUrl = process.env.WEB_URL ?? process.env.API_URL ?? '';
    const signInUrl = `${baseUrl}/auth/sign-in`;

    void getEmailTemplateService().sendTemplate({
      to: user.email,
      subject: AUTH_EMAIL_SUBJECTS.existingUserSignUp,
      template: 'auth.existing-user-signup',
      props: {
        signInUrl,
        name: user.name ?? undefined,
      },
    });
  },
};
