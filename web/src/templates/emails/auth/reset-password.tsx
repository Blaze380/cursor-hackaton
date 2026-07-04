import { Button, Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface ResetPasswordEmailProps {
  url: string;
  name?: string;
}

export function ResetPasswordEmail({ url, name }: ResetPasswordEmailProps) {
  const greeting = name ? `Olá ${name}` : 'Olá';

  return (
    <BaseLayout preview="Redefinir a sua palavra-passe">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">{greeting}</Heading>
      <Text className="mb-4 text-base text-gray-700">
        Recebemos um pedido para redefinir a sua palavra-passe.
      </Text>
      <Button
        href={url}
        className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white"
      >
        Redefinir palavra-passe
      </Button>
      <Text className="mt-4 text-sm text-gray-500">
        Se não fez este pedido, ignore este e-mail. Link alternativo: {url}
      </Text>
    </BaseLayout>
  );
}

export default ResetPasswordEmail;
