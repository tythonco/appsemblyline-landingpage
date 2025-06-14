"use server"

interface SponsorFormData {
  email: string
  captchaToken: string
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

async function submitLead(email: string) {
    try {
        const leadData = {
            oid: '00Df4000003BLEJ',
            first_name: 'AppsemblyLine',
            last_name: 'Sponsor Inquiry',
            company: 'Unknown',
            email: email,
            lead_source: 'AppsemblyLine Website - Sponsor Inquiry'
        }

        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(leadData)) {
            params.set(key, value);
        }

        const response = await fetch("https://login.salesforce.com/servlet/servlet.WebToLead", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `${params.toString()}`,
        })
        return {success: response.status === 200}
    } catch (error) {
        console.error("Lead submission error:", error)
        return {
            success: false,
            error: "Something went wrong with the sponsor form submission. Please try again.",
        }
    }
};

export async function submitSponsorForm(data: SponsorFormData) {
  try {
    // Verify reCAPTCHA first
    const captchaValid = await verifyCaptcha(data.captchaToken)
    if (!captchaValid) {
      return {
        success: false,
        error: "Please complete the reCAPTCHA verification.",
      }
    }

    return submitLead(data.email);
  } catch (error) {
    console.error("Sponsor form server error:", error)
    return {
      success: false,
      error: "Something went wrong with the sponsor form submission. Please try again.",
    }
  }
}
