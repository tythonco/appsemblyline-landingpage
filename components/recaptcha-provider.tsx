"use client"

import React from 'react';

interface RecaptchaProviderProps {
  children: React.ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  return (
    <>
      <script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} async defer />
      {children}
    </>
  );
}
