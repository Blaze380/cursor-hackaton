import { Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface TwoFactorEmailProps {
  otp: string;
  name?: string;
}

export function TwoFactorEmail({ otp, name }: TwoFactorEmailProps) {
  const greeting = name ? `Olá ${name}` : 'Olá';

  return (
    <BaseLayout preview="Código de autenticação de dois fatores">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">{greeting}</Heading>
      <Text className="mb-4 text-base text-gray-700">
        Use o código abaixo para concluir a autenticação de dois fatores:
      </Text>
      <Text className="mb-4 text-3xl font-bold tracking-widest text-gray-900">{otp}</Text>
      <Text className="text-sm text-gray-500">Este código expira em breve.</Text>
    </BaseLayout>
  );
}

export default TwoFactorEmail;
