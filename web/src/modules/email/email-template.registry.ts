import type { ComponentType } from 'react';
import { DemoEmail } from '@/templates/emails/demo-email';
import { EmailOtpEmail } from '@/templates/emails/auth/email-otp';
import { ExistingUserSignupEmail } from '@/templates/emails/auth/existing-user-signup';
import { MagicLinkEmail } from '@/templates/emails/auth/magic-link';
import { OrganizationInviteAcceptedEmail } from '@/templates/emails/auth/organization-invite-accepted';
import { OrganizationInviteCancelledEmail } from '@/templates/emails/auth/organization-invite-cancelled';
import { OrganizationInviteRejectedEmail } from '@/templates/emails/auth/organization-invite-rejected';
import { OrganizationInviteEmail } from '@/templates/emails/auth/organization-invite';
import { ResetPasswordEmail } from '@/templates/emails/auth/reset-password';
import { TwoFactorEmail } from '@/templates/emails/auth/two-factor';
import { VerifyEmail } from '@/templates/emails/auth/verify-email';
import type { EmailTemplateId, EmailTemplateProps } from './email.types';

export const emailTemplateRegistry: {
  [K in EmailTemplateId]: ComponentType<EmailTemplateProps[K]>;
} = {
  demo: DemoEmail,
  'auth.verify-email': VerifyEmail,
  'auth.reset-password': ResetPasswordEmail,
  'auth.magic-link': MagicLinkEmail,
  'auth.email-otp': EmailOtpEmail,
  'auth.two-factor': TwoFactorEmail,
  'auth.existing-user-signup': ExistingUserSignupEmail,
  'auth.organization-invite': OrganizationInviteEmail,
  'auth.organization-invite-cancelled': OrganizationInviteCancelledEmail,
  'auth.organization-invite-rejected': OrganizationInviteRejectedEmail,
  'auth.organization-invite-accepted': OrganizationInviteAcceptedEmail,
};
