import { Rocket } from "lucide-react"
import Link from 'next/link';

export default function Home() {
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

      <main className="flex flex-col items-center py-16 px-4 w-full max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-black leading-tight text-center">
            <span className="text-blue-300">App</span>semblyLine
            <br/>
            The Salesforce ISV Podcast
          </h1>
          <p className="text-base md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Are you building a business on the Salesforce AppExchange? AppsemblyLine is the essential podcast for entrepreneurs looking to thrive in the Salesforce ecosystem.
          </p>
          <p className="text-base md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            We cover everything from initial build and launch to scaling your go-to-market and growing your team. Our mission is to provide you with the actionable advice and inspiration you need to succeed at every stage of your journey.
          </p>
          <p className="text-base md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            AppsemblyLine is proudly brought to you by Tython.
          </p>
        </header>

        <section className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-blue-700/50">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Episodes</h2>
          <div className="w-full h-[300px] md:h-[600px] mb-5 rounded-lg overflow-hidden">
            <iframe
              src="https://player.captivate.fm/show/0e5d573c-3eb7-4340-a3d3-710077497437"
              className="w-full h-full"
              scrolling="no"
              frameBorder="0"
              allow="clipboard-write"
              seamless
            ></iframe>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 text-sm mt-16">
        © {new Date().getFullYear()} AppsemblyLine
      </footer>
    </div>
  );
}
