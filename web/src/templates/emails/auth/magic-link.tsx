import { Button, Heading, Text } from '@react-email/components';
import { BaseLayout } from '@/templates/emails/_layout/base-layout';

export interface MagicLinkEmailProps {
  url: string;
}

export function MagicLinkEmail({ url }: MagicLinkEmailProps) {
  return (
    <BaseLayout preview="Iniciar sessão com magic link">
      <Heading className="mb-4 text-2xl font-semibold text-gray-900">Iniciar sessão</Heading>
      <Text className="mb-4 text-base text-gray-700">
        Clique no botão abaixo para iniciar sessão. Este link expira em breve.
      </Text>
      <Button
        href={url}
        className="rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white"
      >
        Iniciar sessão
      </Button>
      <Text className="mt-4 text-sm text-gray-500">Link alternativo: {url}</Text>
    </BaseLayout>
  );
}

export default MagicLinkEmail;
