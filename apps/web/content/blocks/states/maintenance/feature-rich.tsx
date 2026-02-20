"use client"

import { useState, useEffect } from "react"
import { Wrench, Clock, Mail, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const services = [
  { name: "API", status: "operational" as const },
  { name: "Dashboard", status: "down" as const },
  { name: "Auth", status: "operational" as const },
  { name: "Storage", status: "degraded" as const },
]

const statusConfig = {
  operational: { color: "bg-foreground", label: "Operational" },
  degraded: { color: "bg-muted-foreground", label: "Degraded" },
  down: { color: "bg-muted-foreground/50", label: "Down" },
}

function getTimeRemaining(targetDate: Date) {
  const total = targetDate.getTime() - Date.now()
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 }
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor(total / (1000 * 60 * 60))
  return { hours, minutes, seconds }
}

export function MaintenancePage() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 })

  useEffect(() => {
    const target = new Date(Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000)
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function validateAndSubmit() {
    setEmailError("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      setEmailError("Email is required.")
      return
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.")
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubscribed(true)
    }, 1500)
  }

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary" style={{ animationDuration: "3s" }} />
        <Wrench className="h-10 w-10 text-primary" />
      </div>

      <h1 className="mt-8 text-2xl font-semibold">Scheduled Maintenance</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        We&apos;re performing planned upgrades to improve reliability and
        performance. Some services may be temporarily unavailable.
      </p>

      {/* Countdown Timer */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground text-center mb-3">
          <Clock className="mr-1.5 inline h-4 w-4" />
          Expected completion in
        </p>
        <div className="flex gap-3">
          {[
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-lg border bg-muted/50 px-4 py-3 min-w-[72px]"
            >
              <span className="text-2xl font-bold tabular-nums">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-sm font-medium mb-3">System Status</h2>
        <div className="space-y-2">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between rounded border px-3 py-2 text-sm"
            >
              <span>{service.name}</span>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${statusConfig[service.status].color}`}
                />
                <span className="text-muted-foreground">
                  {statusConfig[service.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe for Updates */}
      <div className="mt-6 w-full max-w-md">
        <p className="text-sm font-medium mb-2">Subscribe for updates</p>
        {subscribed ? (
          <div className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
            You&apos;ll be notified at <strong>{email}</strong> when we&apos;re
            back online.
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError("")
                }}
                aria-invalid={!!emailError}
              />
              <Button onClick={validateAndSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Notify Me
              </Button>
            </div>
            {emailError && (
              <p className="mt-1.5 text-sm text-destructive">{emailError}</p>
            )}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-6 flex gap-3">
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          Twitter / X
        </Button>
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          Status Page
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Need urgent help? Contact{" "}
        <a
          href="mailto:support@example.com"
          className="text-primary underline underline-offset-2 hover:no-underline"
        >
          support@example.com
        </a>
      </p>
    </div>
  )
}
