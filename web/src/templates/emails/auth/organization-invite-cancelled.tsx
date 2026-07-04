import { Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface OrganizationInviteCancelledEmailProps {
  organizationName?: string;
  cancelledByName?: string;
}

export function OrganizationInviteCancelledEmail({
  organizationName,
  cancelledByName,
}: OrganizationInviteCancelledEmailProps) {
  const orgLabel = organizationName ?? 'uma organização';
  const cancelledByLabel = cancelledByName ?? 'Um administrador';

  return (
    <BaseLayout preview={`Convite cancelado — ${orgLabel}`}>
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">Convite cancelado</Heading>
      <Text className="mb-4 text-base text-gray-700">
        {cancelledByLabel} cancelou o convite para se juntar a {orgLabel}. O link anterior deixou de
        ser válido.
      </Text>
      <Text className="text-sm text-gray-500">
        Se ainda quiser participar, peça um novo convite ao administrador da organização.
      </Text>
    </BaseLayout>
  );
}

export default OrganizationInviteCancelledEmail;
