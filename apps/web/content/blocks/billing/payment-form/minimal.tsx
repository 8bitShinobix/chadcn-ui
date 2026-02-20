"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaymentForm() {
  return (
    <div className="mx-auto w-full max-w-md p-6">
      <h2 className="text-lg font-semibold">Payment Details</h2>

      <form className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input
            id="card-number"
            placeholder="1234 5678 9012 3456"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              placeholder="123"
              type="text"
            />
          </div>
        </div>

        <Button className="w-full">
          <Lock size={16} className="mr-2" />
          Pay $29.00
        </Button>
      </form>
    </div>
  )
}
