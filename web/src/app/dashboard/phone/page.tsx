'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

export default function PhoneAuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSendOtp(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await authClient.phoneNumber.sendOtp({ phoneNumber });

    if (result.error) {
      setMessage(result.error.message ?? 'Failed to send OTP.');
      setIsLoading(false);
      return;
    }

    setStep('otp');
    setMessage('OTP sent. Check server logs in development.');
    setIsLoading(false);
  }

  async function handleVerifyOtp(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await authClient.phoneNumber.verify({
      phoneNumber,
      code: otp,
    });

    if (result.error) {
      setMessage(result.error.message ?? 'Failed to verify OTP.');
      setIsLoading(false);
      return;
    }

    setMessage('Phone verified. Redirecting to dashboard...');
    window.location.href = '/dashboard';
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Phone authentication</h1>
        <p className="text-muted-foreground text-sm">
          Minimal demo for the phone number plugin. OTP is logged on the server in dev.
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>{step === 'phone' ? 'Send OTP' : 'Verify OTP'}</CardTitle>
          <CardDescription>
            {step === 'phone'
              ? 'Enter a phone number in E.164 format (e.g. +15551234567).'
              : 'Enter the code received via SMS (or server logs).'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="+15551234567"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Spinner className="size-4" /> : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification code</Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="123456"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Spinner className="size-4" /> : 'Verify & sign in'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep('phone')}
              >
                Use a different number
              </Button>
            </form>
          )}
          {message ? <p className="text-muted-foreground mt-4 text-sm">{message}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
