export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface EmailProvider {
  send(message: EmailMessage & { from: string }): Promise<void>;
}

export const EMAIL_PROVIDER = Symbol('EMAIL_PROVIDER');

export type EmailTemplateId =
  | 'demo'
  | 'auth.verify-email'
  | 'auth.reset-password'
  | 'auth.magic-link'
  | 'auth.email-otp'
  | 'auth.two-factor'
  | 'auth.existing-user-signup'
  | 'auth.organization-invite'
  | 'auth.organization-invite-cancelled'
  | 'auth.organization-invite-rejected'
  | 'auth.organization-invite-accepted';

export interface EmailTemplateProps {
  demo: {
    name: string;
  };
  'auth.verify-email': {
    url: string;
    name?: string;
  };
  'auth.reset-password': {
    url: string;
    name?: string;
  };
  'auth.magic-link': {
    url: string;
  };
  'auth.email-otp': {
    otp: string;
    type?: string;
  };
  'auth.two-factor': {
    otp: string;
    name?: string;
  };
  'auth.existing-user-signup': {
    signInUrl: string;
    name?: string;
  };
  'auth.organization-invite': {
    inviteLink: string;
    organizationName?: string;
    inviterName?: string;
    isResend?: boolean;
  };
  'auth.organization-invite-cancelled': {
    organizationName?: string;
    cancelledByName?: string;
  };
  'auth.organization-invite-rejected': {
    organizationName?: string;
    inviteeEmail: string;
    rejectorName?: string;
  };
  'auth.organization-invite-accepted': {
    organizationName?: string;
    memberName?: string;
    memberEmail: string;
  };
}
