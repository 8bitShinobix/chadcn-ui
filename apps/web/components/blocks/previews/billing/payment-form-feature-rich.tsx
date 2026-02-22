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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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

export default function PaymentFormFeatureRich() {
  const [tab, setTab] = useState("card");

  // Card fields
  const [cardholder, setCardholder] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");

  // Bank fields
  const [routing, setRouting] = useState("");
  const [account, setAccount] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  // Coupon
  const [coupon, setCoupon] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (tab === "card") {
      if (!cardholder.trim()) newErrors.cardholder = "Cardholder name is required";
      if (card.replace(/\s/g, "").length < 16) newErrors.card = "Enter a valid card number";
      if (expiry.length < 5) newErrors.expiry = "Enter a valid expiry date";
      if (cvv.length < 3) newErrors.cvv = "Enter a valid CVC";
      if (!address.trim()) newErrors.address = "Address is required";
      if (!city.trim()) newErrors.city = "City is required";
      if (!state.trim()) newErrors.state = "State is required";
      if (!zip.trim()) newErrors.zip = "ZIP code is required";
    } else {
      if (!routing.trim() || !/^\d{9}$/.test(routing))
        newErrors.routing = "Enter a valid 9-digit routing number";
      if (!account.trim() || !/^\d+$/.test(account))
        newErrors.account = "Enter a valid account number";
      if (!accountHolder.trim())
        newErrors.accountHolder = "Account holder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = () => {
    if (!coupon.trim() || isApplyingCoupon) return;
    setIsApplyingCoupon(true);
    setTimeout(() => {
      setIsApplyingCoupon(false);
      setCoupon("");
      toast.success("Coupon applied! 10% discount added.");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (tab === "card") {
        setCardholder("");
        setCard("");
        setExpiry("");
        setCvv("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
      } else {
        setRouting("");
        setAccount("");
        setAccountHolder("");
      }
      setErrors({});
      toast.success("Payment successful!");
    }, 2000);
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left column - Payment form */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold">Payment Method</h2>

          <Tabs value={tab} onValueChange={setTab} className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="card" className="flex-1">
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex-1">
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <TabsContent value="card" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input
                    id="cardholder"
                    placeholder="John Doe"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value)}
                    disabled={isProcessing}
                  />
                  {errors.cardholder && (
                    <p className="text-destructive text-xs">{errors.cardholder}</p>
                  )}
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
                    {errors.address && (
                      <p className="text-destructive text-xs">{errors.address}</p>
                    )}
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
              </TabsContent>

              <TabsContent value="bank" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="routing">Routing Number</Label>
                  <Input
                    id="routing"
                    placeholder="021000021"
                    value={routing}
                    onChange={(e) => setRouting(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    maxLength={9}
                    inputMode="numeric"
                    disabled={isProcessing}
                  />
                  {errors.routing && <p className="text-destructive text-xs">{errors.routing}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">Account Number</Label>
                  <Input
                    id="account"
                    placeholder="1234567890"
                    value={account}
                    onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    disabled={isProcessing}
                  />
                  {errors.account && <p className="text-destructive text-xs">{errors.account}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-holder">Account Holder Name</Label>
                  <Input
                    id="account-holder"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    disabled={isProcessing}
                  />
                  {errors.accountHolder && (
                    <p className="text-destructive text-xs">{errors.accountHolder}</p>
                  )}
                </div>
              </TabsContent>

              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  disabled={isProcessing || isApplyingCoupon}
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isProcessing || isApplyingCoupon || !coupon.trim()}
                >
                  {isApplyingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                </Button>
              </div>

              <Button className="mt-4 w-full" type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} className="mr-2" />
                    Complete Payment — $29.00
                  </>
                )}
              </Button>
            </form>
          </Tabs>
        </div>

        {/* Right column - Order summary */}
        <div className="lg:col-span-2">
          <Card className="rounded-lg py-0 shadow-none">
            <CardContent className="p-4">
              <h3 className="font-medium">Order Summary</h3>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Pro Plan (Monthly)</span>
                  <span>$29.00</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Setup Fee</span>
                  <span className="text-muted-foreground line-through">$0.00</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>$29.00</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>$29.00</span>
              </div>

              <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
                <Lock size={12} />
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
