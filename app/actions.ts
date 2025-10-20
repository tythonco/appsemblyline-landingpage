"use server"

interface SponsorFormData {
  email: string
  captchaToken: string
}

async function verifyCaptcha(token: string, action: string): Promise<boolean> {
  try {
    const PROJECT_ID = process.env.RECAPTCHA_GOOGLE_PROJECT_ID;
    const API_KEY = process.env.RECAPTCHA_GOOGLE_API_KEY;
    const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!PROJECT_ID || !API_KEY || !SITE_KEY) {
      console.error("Missing reCAPTCHA environment variables.");
      return false;
    }

    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: token,
            expectedAction: action,
            siteKey: SITE_KEY,
          },
        }),
      }
    );

    const data = await response.json();
    return data.tokenProperties?.valid === true && data.riskAnalysis?.score > 0.5;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false;
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

export async function submitSponsorForm(data: SponsorFormData, action: string) {
  try {
    // Verify reCAPTCHA first
    const captchaValid = await verifyCaptcha(data.captchaToken, action)
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
