import type { PhoneNumberOptions } from 'better-auth/plugins';

export const sendPhoneOTP: PhoneNumberOptions['sendOTP'] = async ({ phoneNumber, code }) => {
  // TODO: integrate real SMS service
  console.log(`Phone OTP for ${phoneNumber}: ${code}`);
};
