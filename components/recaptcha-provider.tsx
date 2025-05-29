import { WaitlistForm } from "./waitlist-form"

export function RecaptchaProvider() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!

  return (
    <>
      <script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} async defer />
      <WaitlistForm recaptchaSiteKey={recaptchaSiteKey} />
    </>
  )
}
