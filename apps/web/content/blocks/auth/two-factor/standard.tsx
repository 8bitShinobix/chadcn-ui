"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TwoFactorForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [useBackupCode, setUseBackupCode] = useState(false)
  const [backupCode, setBackupCode] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = useBackupCode ? backupCode : otp.join("")

    if (!useBackupCode && code.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    if (useBackupCode && !backupCode.trim()) {
      setError("Please enter your backup code")
      return
    }

    setIsLoading(true)
    console.log("2FA verification:", { code, isBackup: useBackupCode })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setError("Invalid code. Please try again.")
  }

  const toggleBackupCode = () => {
    setUseBackupCode(!useBackupCode)
    setError("")
    setOtp(Array(6).fill(""))
    setBackupCode("")
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {useBackupCode
            ? "Enter backup code"
            : "Two-factor authentication"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {useBackupCode
            ? "Enter one of your backup recovery codes"
            : "Enter the 6-digit code from your authenticator app"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {useBackupCode ? (
          <div className="space-y-2">
            <Label htmlFor="backupCode">Backup Code</Label>
            <Input
              id="backupCode"
              type="text"
              value={backupCode}
              onChange={(e) => {
                setBackupCode(e.target.value)
                setError("")
              }}
              placeholder="xxxx-xxxx-xxxx"
              className="font-mono"
            />
          </div>
        ) : (
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
              />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <div className="mt-4 text-center space-y-2">
        <button
          type="button"
          onClick={toggleBackupCode}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {useBackupCode
            ? "Use authenticator code instead"
            : "Use a backup code instead"}
        </button>
        <p className="text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
