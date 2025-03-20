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

    // Simulate API call
         await fetch("http://localhost:8000/register_mail/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ "email": email })
})
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        console.log("Success:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

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

