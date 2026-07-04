import { Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface EmailOtpEmailProps {
  otp: string;
  type?: string;
}

export function EmailOtpEmail({ otp, type }: EmailOtpEmailProps) {
  const context =
    type === 'sign-in'
      ? 'início de sessão'
      : type === 'email-verification'
        ? 'verificação de e-mail'
        : type === 'forget-password'
          ? 'redefinição de palavra-passe'
          : 'verificação';

  return (
    <BaseLayout preview="O seu código de verificação">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">Código de verificação</Heading>
      <Text className="mb-4 text-base text-gray-700">
        Use o código abaixo para {context}:
      </Text>
      <Text className="mb-4 text-3xl font-bold tracking-widest text-gray-900">{otp}</Text>
      <Text className="text-sm text-gray-500">Este código expira em breve. Não partilhe com ninguém.</Text>
    </BaseLayout>
  );
}

export default EmailOtpEmail;
