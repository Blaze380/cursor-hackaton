export const LAST_LOGIN_METHOD_COOKIE_NAME =
  process.env.LAST_LOGIN_METHOD_COOKIE_NAME ??
  process.env.NEXT_PUBLIC_LAST_LOGIN_METHOD_COOKIE_NAME ??
  'last-login-method';

export function toCrossSubDomainCookieDomain(domain: string): string {
  return domain.startsWith('.') ? domain : `.${domain}`;
}

export const crossSubDomainCookieDomain = process.env.API_DOMAIN
  ? toCrossSubDomainCookieDomain(process.env.API_DOMAIN)
  : process.env.NEXT_PUBLIC_API_DOMAIN
    ? toCrossSubDomainCookieDomain(process.env.NEXT_PUBLIC_API_DOMAIN)
    : undefined;

export const lastLoginMethodOptions = {
  cookieName: LAST_LOGIN_METHOD_COOKIE_NAME,
};

export const lastLoginMethodClientDomain = process.env.NEXT_PUBLIC_API_DOMAIN
  ? toCrossSubDomainCookieDomain(process.env.NEXT_PUBLIC_API_DOMAIN)
  : crossSubDomainCookieDomain;

export const lastLoginMethodClientOptions = {
  cookieName: LAST_LOGIN_METHOD_COOKIE_NAME,
  ...(lastLoginMethodClientDomain ? { domain: lastLoginMethodClientDomain } : {}),
};
