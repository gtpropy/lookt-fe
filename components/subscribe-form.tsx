"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      // Step 1: Check if already verified
      const verifyRes = await fetch("https://lookt.co/api/verified/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const verifyData = await verifyRes.json()

      if (verifyData.verified) {
        setStatus("success")
        setMessage("You're already subscribed 🎉")
        return
      }

      // Step 2: Register email if not verified
      const registerRes = await fetch("https://lookt.co/api/register_mail/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const registerData = await registerRes.json()

      if (registerRes.ok) {
        setStatus("success")
        setMessage(registerData.message || "Check your inbox to confirm your email ✉️")
      } else {
        throw new Error(registerData.error || "Something went wrong.")
      }
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message || "Something went wrong.")
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-700/50 text-white placeholder:text-slate-400"
            disabled={status === "loading" || status === "success"}
          />
          <Button type="submit" className="px-8" disabled={status === "loading" || status === "success"}>
            {status === "loading" ? "Subscribing..." : "Notify Me"}
          </Button>
        </div>

        {status === "error" && (
          <div className="flex items-center text-red-400">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center text-green-400">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  )
}
