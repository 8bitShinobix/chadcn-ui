"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function VerifyEmailForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [cooldown, setCooldown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return

    const newOtp = [...otp]
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i]
    }
    setOtp(newOtp)

    const focusIndex = Math.min(pasted.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join("")
    if (code.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    if (attempts >= 3) {
      setError("Too many attempts. Please request a new code.")
      return
    }

    setIsLoading(true)
    console.log("Verifying code:", code)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Simulate: code "123456" succeeds, others fail
    if (code === "123456") {
      setIsVerified(true)
    } else {
      setAttempts((prev) => prev + 1)
      setError("Invalid verification code. Please try again.")
      setOtp(Array(6).fill(""))
      inputRefs.current[0]?.focus()
    }
  }

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return
    setIsResending(true)
    console.log("Resending verification code")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsResending(false)
    setCooldown(60)
    setAttempts(0)
    setError("")
    setOtp(Array(6).fill(""))
    inputRefs.current[0]?.focus()
  }, [cooldown])

  if (isVerified) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Email verified!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your email has been successfully verified. You can now access your
          account.
        </p>
        <Button className="mt-6 w-full" asChild>
          <a href="#">Continue to Dashboard</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Verify your email
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a code to{" "}
          <span className="font-medium text-foreground">j***@example.com</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 text-center text-lg"
              aria-label={`Digit ${index + 1}`}
              disabled={attempts >= 3}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {attempts >= 3 ? (
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
          >
            {isResending
              ? "Sending..."
              : cooldown > 0
                ? `Request new code in ${cooldown}s`
                : "Request New Code"}
          </Button>
        ) : (
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        )}
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        <button
          type="button"
          className="font-medium text-foreground hover:underline"
          disabled={cooldown > 0 || isResending}
          onClick={handleResend}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
        </button>
      </p>
    </div>
  )
}
