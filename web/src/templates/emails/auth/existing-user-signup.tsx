import { Button, Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface ExistingUserSignupEmailProps {
  signInUrl: string;
  name?: string;
}

export function ExistingUserSignupEmail({ signInUrl, name }: ExistingUserSignupEmailProps) {
  const greeting = name ? `Olá ${name}` : 'Olá';

  return (
    <BaseLayout preview="Tentativa de registo com o seu e-mail">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">{greeting}</Heading>
      <Text className="mb-4 text-base text-gray-700">
        Alguém tentou criar uma conta com o seu endereço de e-mail. Se foi você, inicie sessão em
        vez de se registar novamente.
      </Text>
      <Button
        href={signInUrl}
        className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white"
      >
        Iniciar sessão
      </Button>
      <Text className="mt-4 text-sm text-gray-500">
        Se não reconhece esta tentativa, pode ignorar este e-mail em segurança.
      </Text>
    </BaseLayout>
  );
}

export default ExistingUserSignupEmail;
