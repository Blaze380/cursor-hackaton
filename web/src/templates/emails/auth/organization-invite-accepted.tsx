import { Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface OrganizationInviteAcceptedEmailProps {
  organizationName?: string;
  memberName?: string;
  memberEmail: string;
}

export function OrganizationInviteAcceptedEmail({
  organizationName,
  memberName,
  memberEmail,
}: OrganizationInviteAcceptedEmailProps) {
  const orgLabel = organizationName ?? 'a sua organização';
  const memberLabel = memberName ?? memberEmail;

  return (
    <BaseLayout preview={`Novo membro em ${orgLabel}`}>
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">Convite aceite</Heading>
      <Text className="mb-4 text-base text-gray-700">
        {memberLabel} aceitou o convite e juntou-se a {orgLabel}.
      </Text>
    </BaseLayout>
  );
}

export default OrganizationInviteAcceptedEmail;
