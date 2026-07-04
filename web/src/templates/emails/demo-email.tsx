import { Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface DemoEmailProps {
  name: string;
}

export function DemoEmail({ name }: DemoEmailProps) {
  return (
    <BaseLayout preview="Email de demonstração">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">Olá {name}</Heading>
      <Text className="m-0 text-base text-gray-700">Este é um email de demonstração.</Text>
    </BaseLayout>
  );
}

export default DemoEmail;
