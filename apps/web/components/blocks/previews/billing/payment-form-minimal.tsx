"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export default function PaymentFormMinimal() {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (card.replace(/\s/g, "").length < 16) newErrors.card = "Enter a valid card number";
    if (expiry.length < 5) newErrors.expiry = "Enter a valid expiry date";
    if (cvv.length < 3) newErrors.cvv = "Enter a valid CVC";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCard("");
      setExpiry("");
      setCvv("");
      setErrors({});
      toast.success("Payment successful!");
    }, 2000);
  };

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <h2 className="text-lg font-semibold">Payment Details</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input
            id="card-number"
            placeholder="1234 5678 9012 3456"
            value={card}
            onChange={(e) => setCard(formatCardNumber(e.target.value))}
            maxLength={19}
            inputMode="numeric"
            disabled={isProcessing}
          />
          {errors.card && <p className="text-destructive text-xs">{errors.card}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              inputMode="numeric"
              disabled={isProcessing}
            />
            {errors.expiry && <p className="text-destructive text-xs">{errors.expiry}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength={4}
              inputMode="numeric"
              disabled={isProcessing}
            />
            {errors.cvv && <p className="text-destructive text-xs">{errors.cvv}</p>}
          </div>
        </div>

        <Button className="w-full" type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pay $29.00
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
