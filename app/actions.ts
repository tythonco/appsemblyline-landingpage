"use server"

import { createClient } from "@supabase/supabase-js"

interface WaitlistData {
  email: string
  captchaToken: string
  companyName?: string
  role?: string
}

async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function joinWaitlist(data: WaitlistData) {
  try {
    // Verify reCAPTCHA first
    const captchaValid = await verifyCaptcha(data.captchaToken)
    if (!captchaValid) {
      return {
        success: false,
        error: "Please complete the reCAPTCHA verification.",
      }
    }

    // Check if environment variables are available
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error("Missing Supabase environment variables")
      return {
        success: false,
        error: "Configuration error. Please try again later.",
      }
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

    console.log("Attempting to insert:", { email: data.email })

    const { data: insertData, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email: data.email
        },
      ])

    if (error) {
      console.error("Supabase error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })

      // Handle duplicate email error
      if (error.code === "23505") {
        return {
          success: false,
          error: "You're already on the waitlist!",
        }
      }

      return {
        success: false,
        error: "Failed to join waitlist. Please try again.",
      }
    }

    console.log("Successfully inserted:", insertData)
    return { success: true }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
