"use client"

import React, { useState } from 'react';
import { Rocket, CheckCircle, AlertCircle } from "lucide-react"
import Link from 'next/link';
import { RecaptchaProvider } from "../../components/recaptcha-provider"
import { submitSponsorForm } from "../actions"

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function SponsorPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setStatus("idle")

    try {
      // Get reCAPTCHA token
      const token = await new Promise<string>((resolve, reject) => {
        if (typeof window !== "undefined" && window.grecaptcha) {
          window.grecaptcha.execute(recaptchaSiteKey, { action: "sponsor_form" }).then(resolve).catch(reject)
        } else {
          reject(new Error("reCAPTCHA not loaded"))
        }
      })

      const result = await submitSponsorForm({ email, captchaToken: token })

      if (result.success) {
        setStatus("success")
        setMessage("Thank you for your interest! We'll be in touch soon.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) { // Renamed 'error' to '_error' to mark as unused
      console.error(error)
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white flex flex-col items-center">
      <nav className="w-full max-w-5xl mx-auto py-6 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
          <div className="relative">
            <Rocket className="h-8 w-8 text-blue-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
          </div>
          <span>AppsemblyLine</span>
        </Link>
        <div className="space-x-2">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link href="/sponsor" className="text-gray-300 hover:text-white transition-colors">Sponsor</Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center flex-grow py-16 px-4 sm:px-6 w-full max-w-5xl">
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-2xl text-center border border-blue-700/50">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Partner with Us!</h1>
          <p className="text-base md:text-lg text-gray-300 mb-6">
            <strong>Interested in reaching Salesforce ISV founders and entrepreneurs?</strong>
            <br />
            <br />
            <span>Advertise on AppsemblyLine to elevate your brand and connect with a passionate community of leaders!</span>
          </p>
          <RecaptchaProvider>
            {status === "success" ? (
              <div className="bg-green-500/10 border-green-500/20 backdrop-blur-sm p-6 rounded-md text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Success!</h3>
                <p className="text-green-200">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="p-3 border border-blue-700/50 bg-gray-900/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {status === "error" && (
                  <div className="flex items-center text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  {isSubmitting ? "Connecting..." : "Connect with Us to Learn More"}
                </button>
              </form>
            )}
          </RecaptchaProvider>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 text-sm mt-16">
        © {new Date().getFullYear()} AppsemblyLine
      </footer>
    </div>
  );
}
