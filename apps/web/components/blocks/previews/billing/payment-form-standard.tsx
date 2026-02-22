"use client";

import { useState } from "react";
import { CreditCard, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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

export default function PaymentFormStandard() {
  const [cardholder, setCardholder] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!cardholder.trim()) newErrors.cardholder = "Cardholder name is required";
    if (card.replace(/\s/g, "").length < 16) newErrors.card = "Enter a valid card number";
    if (expiry.length < 5) newErrors.expiry = "Enter a valid expiry date";
    if (cvv.length < 3) newErrors.cvv = "Enter a valid CVC";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!zip.trim()) newErrors.zip = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCardholder("");
      setCard("");
      setExpiry("");
      setCvv("");
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      setErrors({});
      toast.success("Payment successful!");
    }, 2000);
  };

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Payment Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardholder">Cardholder Name</Label>
          <Input
            id="cardholder"
            placeholder="John Doe"
            value={cardholder}
            onChange={(e) => setCardholder(e.target.value)}
            disabled={isProcessing}
          />
          {errors.cardholder && <p className="text-destructive text-xs">{errors.cardholder}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={card}
              onChange={(e) => setCard(formatCardNumber(e.target.value))}
              maxLength={19}
              inputMode="numeric"
              disabled={isProcessing}
            />
            <CreditCard
              className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
              size={16}
            />
          </div>
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

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Billing Address</h3>

          <div className="space-y-2">
            <Label htmlFor="address">Address Line 1</Label>
            <Input
              id="address"
              placeholder="123 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isProcessing}
            />
            {errors.address && <p className="text-destructive text-xs">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={isProcessing}
              />
              {errors.city && <p className="text-destructive text-xs">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={isProcessing}
              />
              {errors.state && <p className="text-destructive text-xs">{errors.state}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                placeholder="10001"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                disabled={isProcessing}
              />
              {errors.zip && <p className="text-destructive text-xs">{errors.zip}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={setCountry} disabled={isProcessing}>
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <Lock size={16} className="mr-2" />
              Pay $29.00
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
