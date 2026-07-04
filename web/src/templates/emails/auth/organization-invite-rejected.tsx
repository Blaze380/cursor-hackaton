import { Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface OrganizationInviteRejectedEmailProps {
  organizationName?: string;
  inviteeEmail: string;
  rejectorName?: string;
}

export function OrganizationInviteRejectedEmail({
  organizationName,
  inviteeEmail,
  rejectorName,
}: OrganizationInviteRejectedEmailProps) {
  const orgLabel = organizationName ?? 'a sua organização';
  const rejectorLabel = rejectorName ?? inviteeEmail;

  return (
    <BaseLayout preview={`Convite recusado — ${orgLabel}`}>
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">Convite recusado</Heading>
      <Text className="mb-4 text-base text-gray-700">
        {rejectorLabel} recusou o convite para se juntar a {orgLabel}.
      </Text>
      <Text className="text-sm text-gray-500">
        Pode enviar um novo convite a {inviteeEmail} se quiser tentar novamente.
      </Text>
    </BaseLayout>
  );
}

export default OrganizationInviteRejectedEmail;
