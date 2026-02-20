"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MagicLinkMinimal() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send Magic Link
        </Button>
      </form>
    </div>
  )
}
