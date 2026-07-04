import { Button, Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface VerifyEmailProps {
  url: string;
  name?: string;
}

export function VerifyEmail({ url, name }: VerifyEmailProps) {
  const greeting = name ? `Olá ${name}` : 'Olá';

  return (
    <BaseLayout preview="Verifique o seu e-mail">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">{greeting}</Heading>
      <Text className="mb-4 text-base text-gray-700">
        Confirme o seu endereço de e-mail para concluir o registo.
      </Text>
      <Button
        href={url}
        className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white"
      >
        Verificar e-mail
      </Button>
      <Text className="mt-4 text-sm text-gray-500">
        Se o botão não funcionar, copie e cole este link no browser: {url}
      </Text>
    </BaseLayout>
  );
}

export default VerifyEmail;
