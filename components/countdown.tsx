"use client"

import { useEffect, useState } from "react"

interface CountdownTime {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [initialDiff, setInitialDiff] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://lookt.co/api/countdown/")
      .then((res) => res.json())
      .then((data) => {
        const target = new Date(data.target_date).getTime()
        const serverNow = new Date(data.server_now).getTime()
        const clientNow = Date.now()
        const diff = target - serverNow
        setInitialDiff(diff)
        setStartTime(clientNow)
      })
      .catch((err) => {
        console.error("Failed to fetch countdown data", err)
        setError(true)
      })
  }, [])

  useEffect(() => {
    if (initialDiff === null || startTime === null) return

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = initialDiff - elapsed

      if (remaining <= 0) {
        setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
        return
      }

      const now = new Date()
      const future = new Date(now.getTime() + remaining)

      let years = future.getUTCFullYear() - now.getUTCFullYear()
      let months = future.getUTCMonth() - now.getUTCMonth()
      let days = future.getUTCDate() - now.getUTCDate()
      let hours = future.getUTCHours() - now.getUTCHours()
      let minutes = future.getUTCMinutes() - now.getUTCMinutes()
      let seconds = future.getUTCSeconds() - now.getUTCSeconds()

      if (seconds < 0) { seconds += 60; minutes-- }
      if (minutes < 0) { minutes += 60; hours-- }
      if (hours < 0) { hours += 24; days-- }
      if (days < 0) {
        const prevMonthDays = new Date(now.getUTCFullYear(), now.getUTCMonth(), 0).getUTCDate()
        days += prevMonthDays
        months--
      }
      if (months < 0) { months += 12; years-- }

      setTimeLeft({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [initialDiff, startTime])

  const items = [
    { label: "Years", value: timeLeft.years },
    { label: "Months", value: timeLeft.months },
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  if (error) {
    return (
      <div className="text-center text-red-400 text-sm">
        Failed to load countdown. Please refresh the page.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-700 text-3xl font-bold">
            {value.toString().padStart(2, "0")}
          </div>
          <span className="mt-2 text-sm text-slate-400">{label}</span>
        </div>
      ))}
    </div>
  )
}
