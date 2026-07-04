'use client';

import {
  adminClient,
  anonymousClient,
  emailOTPClient,
  lastLoginMethodClient,
  magicLinkClient,
  multiSessionClient,
  organizationClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { lastLoginMethodClientOptions } from './auth.cookies';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_WEB_URL,
  plugins: [
    usernameClient(),
    anonymousClient(),
    adminClient(),
    organizationClient(),
    lastLoginMethodClient(lastLoginMethodClientOptions),
    multiSessionClient(),
    magicLinkClient(),
    emailOTPClient(),
    phoneNumberClient(),
    twoFactorClient(),
  ],
});
