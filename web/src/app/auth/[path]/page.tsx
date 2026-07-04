import { viewPaths } from '@better-auth-ui/core';
import { notFound } from 'next/navigation';

import { Auth } from '@/components/auth/auth';

const MAGIC_LINK_PATH = 'magic-link';

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const validPaths = [...Object.values(viewPaths.auth), MAGIC_LINK_PATH];

  if (!validPaths.includes(path)) {
    notFound();
  }

  return (
    <div className="w-full max-w-md">
      <Auth path={path} />
    </div>
  );
}
