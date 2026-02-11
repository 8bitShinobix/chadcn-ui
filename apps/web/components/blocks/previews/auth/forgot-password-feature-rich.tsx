"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordFeatureRich() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
    setCooldown(60)
  }

  const handleResend = async () => {
    if (cooldown > 0) return
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsResending(false)
    setCooldown(60)
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-foreground">j***@example.com</span>
        </p>

        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="w-full"
            disabled={cooldown > 0 || isResending}
            onClick={handleResend}
          >
            {isResending
              ? "Resending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend Email"}
          </Button>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false)
              setCooldown(0)
            }}
            className="block w-full text-sm text-muted-foreground hover:text-foreground"
          >
            Try a different email
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <a href="#" className="font-medium text-foreground hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-2">
        <a
          href="#"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to sign in
        </a>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No worries, we&apos;ll send you reset instructions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  )
}
