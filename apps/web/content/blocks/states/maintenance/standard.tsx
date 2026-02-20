"use client"

import { useState } from "react"
import { Wrench, Clock, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export function MaintenancePage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <Wrench className="h-12 w-12 text-muted-foreground" />
      <h1 className="mt-4 text-xl font-semibold">Scheduled Maintenance</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        We&apos;re upgrading our systems to serve you better. This maintenance
        window is expected to be brief.
      </p>

      <div className="mt-6 w-full max-w-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Maintenance progress</span>
          <span className="font-medium">65%</span>
        </div>
        <Progress value={65} />
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Estimated time remaining: ~20 minutes</span>
      </div>

      <div className="mt-6 w-full max-w-sm">
        <p className="text-sm font-medium mb-2">Subscribe for updates</p>
        {subscribed ? (
          <p className="text-sm text-muted-foreground">
            We&apos;ll notify you when we&apos;re back online.
          </p>
        ) : (
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={() => setSubscribed(true)}>
              <Mail className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        )}
      </div>

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
    </div>
  )
}
