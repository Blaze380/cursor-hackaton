import type { RemotePattern } from 'next/dist/shared/lib/image-config';

export function parseRemoteImageHostnames(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((hostname) => hostname.trim())
    .filter(Boolean);
}

export function getRemoteImagePatterns(
  value: string | undefined = process.env.REMOTE_IMAGES,
): RemotePattern[] {
  const hostnames = parseRemoteImageHostnames(value);

  return hostnames.flatMap((hostname) => [
    { protocol: 'https', hostname },
    { protocol: 'http', hostname },
  ]);
}
