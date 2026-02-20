"use client"

import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SuccessState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <CheckCircle className="text-muted-foreground" size={48} />
      <h2 className="mt-4 text-xl font-semibold">Success!</h2>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
        Your action has been completed successfully.
      </p>
      <Button className="mt-6">
        Continue
        <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  )
}
