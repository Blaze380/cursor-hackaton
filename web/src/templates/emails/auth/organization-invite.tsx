import { Button, Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface OrganizationInviteEmailProps {
  inviteLink: string;
  organizationName?: string;
  inviterName?: string;
  isResend?: boolean;
}

export function OrganizationInviteEmail({
  inviteLink,
  organizationName,
  inviterName,
  isResend,
}: OrganizationInviteEmailProps) {
  const orgLabel = organizationName ?? 'uma organização';
  const inviterLabel = inviterName ? `${inviterName} convidou-o` : 'Foi convidado';
  const heading = isResend ? 'Lembrete: convite para organização' : 'Convite para organização';

  return (
    <BaseLayout preview={`Convite para ${orgLabel}`}>
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">{heading}</Heading>
      {isResend ? (
        <Text className="mb-4 text-base text-gray-700">
          Reenviamos o convite para se juntar a {orgLabel}.
        </Text>
      ) : null}
      <Text className="mb-4 text-base text-gray-700">
        {inviterLabel} para se juntar a {orgLabel}.
      </Text>
      <Button
        href={inviteLink}
        className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white"
      >
        Aceitar convite
      </Button>
      <Text className="mt-4 text-sm text-gray-500">Link alternativo: {inviteLink}</Text>
    </BaseLayout>
  );
}

export default OrganizationInviteEmail;
