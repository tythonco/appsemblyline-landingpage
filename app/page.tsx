import { Rocket } from "lucide-react"
import Link from "next/link"
import { RecaptchaProvider } from "@/components/recaptcha-provider"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-sm bg-white/5">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <Rocket className="h-8 w-8 text-blue-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold text-white">AppsemblyLine</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Simple Hero Section */}
        <div className="max-w-md w-full text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Accelerate Your
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              AppExchange{" "}
            </span>
            Success
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            Tools, strategies, and support for Salesforce ISV partners to build, launch, and grow their business.
          </p>
        </div>

        {/* Waitlist Form with reCAPTCHA */}
        <RecaptchaProvider />
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-white/10 bg-black/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Tython Co.</p>
        </div>
      </footer>
    </div>
  )
}
