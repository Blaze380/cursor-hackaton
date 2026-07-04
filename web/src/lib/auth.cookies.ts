export const LAST_LOGIN_METHOD_COOKIE_NAME =
  process.env.NEXT_PUBLIC_LAST_LOGIN_METHOD_COOKIE_NAME ?? 'last-login-method';

export function toCrossSubDomainCookieDomain(domain: string): string {
  return domain.startsWith('.') ? domain : `.${domain}`;
}

export const lastLoginMethodClientDomain = process.env.NEXT_PUBLIC_API_DOMAIN
  ? toCrossSubDomainCookieDomain(process.env.NEXT_PUBLIC_API_DOMAIN)
  : undefined;

export const lastLoginMethodClientOptions = {
  cookieName: LAST_LOGIN_METHOD_COOKIE_NAME,
  ...(lastLoginMethodClientDomain ? { domain: lastLoginMethodClientDomain } : {}),
};
