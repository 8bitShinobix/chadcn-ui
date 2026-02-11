"use client"

import { Button } from "@/components/ui/button"

export default function VerifyEmailMinimal() {
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
        We&apos;ve sent a verification link to your email address.
      </p>

      <Button className="mt-6 w-full" variant="outline">
        Open Email App
      </Button>

      <p className="mt-4 text-sm text-muted-foreground">
        <a href="#" className="font-medium text-foreground hover:underline">
          Back to sign in
        </a>
      </p>
    </div>
  )
}
