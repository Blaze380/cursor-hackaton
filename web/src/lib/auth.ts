import 'dotenv/config';
import { i18n } from '@better-auth/i18n';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  admin,
  anonymous,
  emailOTP,
  lastLoginMethod,
  magicLink,
  multiSession,
  openAPI,
  organization,
  phoneNumber,
  twoFactor,
  username,
} from 'better-auth/plugins';
import { advancedOptions, emailAndPasswordOptions } from './auth.plug';
import { lastLoginMethodOptions } from './auth.cookies';
import { sendVerificationOTP } from './email-otp.plug';
import { i18nTranslations } from './i18n.plug';
import { sendMagicLink } from './magic-link.plug';
import {
  allowUserToCreateOrganization,
  organizationHooks,
  sendInvitationEmail,
} from './organization.plug';
import { sendPhoneOTP } from './phone.plug';
import { sendTwoFactorOTP } from './two-factor.plug';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from './verify-email.plug';
import { ensureEmailService } from '@/modules/email/email-bootstrap';
import { EmailProviderImpl } from '@/modules/email/providers/email.provider';

ensureEmailService(new EmailProviderImpl());

const origins = process.env.ORIGINS
  ? process.env.ORIGINS.split(',').map((origin) => origin.trim())
  : [];

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  baseURL: process.env.WEB_URL!,
  emailAndPassword: emailAndPasswordOptions
    ? {
        ...emailAndPasswordOptions,
      }
    : undefined,
  advanced: {
    ...advancedOptions,
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail,
  },
  trustedOrigins: origins,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    username(),
    anonymous(),
    admin(),
    organization({
      allowUserToCreateOrganization,
      sendInvitationEmail,
      organizationHooks,
    }),
    i18n({
      detection: ['cookie', 'header'],
      translations: { ...i18nTranslations },
      localeCookie: 'lang',
    }),
    lastLoginMethod(lastLoginMethodOptions),
    openAPI(),
    multiSession(),
    magicLink({
      sendMagicLink,
      expiresIn: 60 * 5,
    }),
    emailOTP({
      sendVerificationOTP,
      otpLength: 6,
      expiresIn: 60 * 5,
    }),
    phoneNumber({
      sendOTP: sendPhoneOTP,
      signUpOnVerification: {
        getTempEmail: (number) => `${number.replace(/\D/g, '')}@phone.local`,
      },
    }),
    twoFactor({
      issuer: process.env.APP_NAME ?? 'Forge App',
      skipVerificationOnEnable: false,
      otpOptions: {
        sendOTP: sendTwoFactorOTP,
      },
    }),
  ],
});
