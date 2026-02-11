"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TwoFactorMinimal() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Two-factor authentication
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="code">Authentication Code</Label>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            maxLength={6}
          />
        </div>
        <Button type="submit" className="w-full">
          Verify
        </Button>
      </form>
    </div>
  )
}
