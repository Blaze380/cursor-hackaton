import type { TwoFactorOptions } from 'better-auth/plugins';
import { getEmailTemplateService } from '@/modules/email/email-service.holder';
import { AUTH_EMAIL_SUBJECTS } from '@/modules/email/auth-email.subjects';

type SendTwoFactorOTP = NonNullable<
  NonNullable<TwoFactorOptions['otpOptions']>['sendOTP']
>;

export const sendTwoFactorOTP: SendTwoFactorOTP = async ({ user, otp }) => {
  await getEmailTemplateService().sendTemplate({
    to: user.email,
    subject: AUTH_EMAIL_SUBJECTS.twoFactor,
    template: 'auth.two-factor',
    props: {
      otp,
      name: user.name ?? undefined,
    },
  });
};
