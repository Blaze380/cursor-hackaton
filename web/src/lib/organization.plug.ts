import type { OrganizationOptions } from 'better-auth/plugins';
import { getEmailTemplateService } from '@/modules/email/email-service.holder';
import { AUTH_EMAIL_SUBJECTS } from '@/modules/email/auth-email.subjects';
import { prisma } from '@/lib/prisma';

export const allowUserToCreateOrganization: OrganizationOptions['allowUserToCreateOrganization'] =
  async () => {
    const subscription = 'pro';
    return subscription === 'pro';
  };

const sentInvitationIds = new Set<string>();

function getInviteLink(invitationId: string) {
  const baseUrl = process.env.WEB_URL ?? process.env.API_URL ?? '';
  return `${baseUrl}/accept-invitation/${invitationId}`;
}

async function getInviterEmail(inviterId: string) {
  return prisma.user.findUnique({
    where: { id: inviterId },
    select: { email: true, name: true },
  });
}

export const sendInvitationEmail: OrganizationOptions['sendInvitationEmail'] = async (data) => {
  const isResend = sentInvitationIds.has(data.id);
  sentInvitationIds.add(data.id);

  await getEmailTemplateService().sendTemplate({
    to: data.email,
    subject: isResend
      ? AUTH_EMAIL_SUBJECTS.organizationInviteResend
      : AUTH_EMAIL_SUBJECTS.organizationInvite,
    template: 'auth.organization-invite',
    props: {
      inviteLink: getInviteLink(data.id),
      organizationName: data.organization?.name,
      inviterName: data.inviter?.user?.name ?? data.inviter?.user?.email,
      isResend,
    },
  });
};

export const organizationHooks: OrganizationOptions['organizationHooks'] = {
  afterCancelInvitation: async ({ invitation, cancelledBy, organization }) => {
    void getEmailTemplateService().sendTemplate({
      to: invitation.email,
      subject: AUTH_EMAIL_SUBJECTS.organizationInviteCancelled,
      template: 'auth.organization-invite-cancelled',
      props: {
        organizationName: organization.name,
        cancelledByName: cancelledBy.name ?? cancelledBy.email,
      },
    });
  },

  afterRejectInvitation: async ({ invitation, user, organization }) => {
    const inviter = await getInviterEmail(invitation.inviterId);
    if (!inviter?.email) {
      return;
    }

    void getEmailTemplateService().sendTemplate({
      to: inviter.email,
      subject: AUTH_EMAIL_SUBJECTS.organizationInviteRejected,
      template: 'auth.organization-invite-rejected',
      props: {
        organizationName: organization.name,
        inviteeEmail: invitation.email,
        rejectorName: user.name ?? user.email,
      },
    });
  },

  afterAcceptInvitation: async ({ invitation, user, organization }) => {
    const inviter = await getInviterEmail(invitation.inviterId);
    if (!inviter?.email) {
      return;
    }

    void getEmailTemplateService().sendTemplate({
      to: inviter.email,
      subject: AUTH_EMAIL_SUBJECTS.organizationInviteAccepted,
      template: 'auth.organization-invite-accepted',
      props: {
        organizationName: organization.name,
        memberName: user.name ?? undefined,
        memberEmail: user.email,
      },
    });
  },
};
