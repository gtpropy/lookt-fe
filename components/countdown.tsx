"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: string
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-700 text-3xl font-bold">
          {timeLeft.days}
        </div>
        <span className="mt-2 text-sm text-slate-400">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-700 text-3xl font-bold">
          {timeLeft.hours}
        </div>
        <span className="mt-2 text-sm text-slate-400">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-700 text-3xl font-bold">
          {timeLeft.minutes}
        </div>
        <span className="mt-2 text-sm text-slate-400">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-700 text-3xl font-bold">
          {timeLeft.seconds}
        </div>
        <span className="mt-2 text-sm text-slate-400">Seconds</span>
      </div>
    </div>
  )
}

