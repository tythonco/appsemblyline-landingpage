"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, CheckCircle, AlertCircle } from "lucide-react"
import { joinWaitlist } from "@/app/actions"

export function WaitlistForm({ recaptchaSiteKey }: { recaptchaSiteKey: string }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setStatus("idle")

    try {
      // Get reCAPTCHA token
      const token = await new Promise<string>((resolve, reject) => {
        if (typeof window !== "undefined" && (window as any).grecaptcha) {
          ;(window as any).grecaptcha.execute(recaptchaSiteKey, { action: "submit" }).then(resolve).catch(reject)
        } else {
          reject(new Error("reCAPTCHA not loaded"))
        }
      })

      const result = await joinWaitlist({ email, captchaToken: token })

      if (result.success) {
        setStatus("success")
        setMessage("You're on the waitlist! We'll be in touch soon.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "success") {
    return (
      <Card className="bg-green-500/10 border-green-500/20 backdrop-blur-sm max-w-md w-full">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">You're In!</h3>
          <p className="text-green-200">{message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-md w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {message}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            {isSubmitting ? (
              "Joining..."
            ) : (
              <>
                Join the Waitlist
                <Rocket className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
