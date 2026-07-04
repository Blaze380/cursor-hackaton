import type { EmailOTPOptions } from 'better-auth/plugins';
import { getEmailTemplateService } from '@/modules/email/email-service.holder';
import { AUTH_EMAIL_SUBJECTS } from '@/modules/email/auth-email.subjects';

export const sendVerificationOTP: EmailOTPOptions['sendVerificationOTP'] = async ({
  email,
  otp,
  type,
}) => {
  await getEmailTemplateService().sendTemplate({
    to: email,
    subject: AUTH_EMAIL_SUBJECTS.emailOtp,
    template: 'auth.email-otp',
    props: { otp, type },
  });
};
