import { Countdown } from "@/components/countdown"
import { SubscribeForm } from "@/components/subscribe-form"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Twitter } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container flex max-w-3xl flex-col items-center px-4 py-16 text-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary-foreground"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">Coming Soon</h1>

        <p className="mb-8 text-xl text-slate-300">
          We're working hard to bring you something amazing. Our website is under construction, but we're almost ready
          to launch.
        </p>

        <Countdown targetDate="2025-04-30T00:00:00" />

        <div className="my-12 w-full max-w-md">
          <SubscribeForm />
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </main>
  )
}

