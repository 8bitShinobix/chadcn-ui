"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

// --- Zod Schemas ---

const cardSchema = z.object({
  cardholder: z.string().min(2, "Cardholder name must be at least 2 characters"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine(
      (val) => {
        const digits = val.replace(/\s/g, "");
        return /^\d{13,19}$/.test(digits);
      },
      { message: "Card number must be 13-19 digits" },
    ),
  expiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Must be in MM/YY format")
    .refine(
      (val) => {
        const [monthStr, yearStr] = val.split("/");
        if (!monthStr || !yearStr) return false;
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10) + 2000;
        const now = new Date();
        const expiry = new Date(year, month);
        return expiry > now;
      },
      { message: "Card has expired" },
    ),
  cvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^\d{3,4}$/, "CVC must be 3-4 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

const bankSchema = z.object({
  routing: z
    .string()
    .min(1, "Routing number is required")
    .regex(/^\d{9}$/, "Routing number must be exactly 9 digits"),
  accountNumber: z.string().min(4, "Account number must be at least 4 characters"),
  accountHolder: z.string().min(2, "Account holder name must be at least 2 characters"),
});

type CardFormData = z.infer<typeof cardSchema>;
type BankFormData = z.infer<typeof bankSchema>;

// --- Formatting helpers ---

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

// --- Component ---

export function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"card" | "bank">("card");

  const cardForm = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardholder: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    },
  });

  const bankForm = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      routing: "",
      accountNumber: "",
      accountHolder: "",
    },
  });

  const onCardSubmit = async (data: CardFormData) => {
    setIsLoading(true);
    console.log("Card payment submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const onBankSubmit = async (data: BankFormData) => {
    setIsLoading(true);
    console.log("Bank payment submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left column - Payment form */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold">Payment Method</h2>

          <Tabs
            defaultValue="card"
            className="mt-4"
            onValueChange={(value) => setActiveTab(value as "card" | "bank")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="card" className="flex-1">
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex-1">
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            {/* Credit Card Tab */}
            <TabsContent value="card" className="mt-4">
              <form onSubmit={cardForm.handleSubmit(onCardSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input
                    id="cardholder"
                    placeholder="John Doe"
                    type="text"
                    {...cardForm.register("cardholder")}
                  />
                  {cardForm.formState.errors.cardholder && (
                    <p className="text-destructive text-sm">
                      {cardForm.formState.errors.cardholder.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      type="text"
                      inputMode="numeric"
                      maxLength={23}
                      {...cardForm.register("cardNumber")}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        cardForm.setValue("cardNumber", formatted, { shouldValidate: false });
                      }}
                    />
                    <CreditCard
                      className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      size={16}
                    />
                  </div>
                  {cardForm.formState.errors.cardNumber && (
                    <p className="text-destructive text-sm">
                      {cardForm.formState.errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      {...cardForm.register("expiry")}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value);
                        cardForm.setValue("expiry", formatted, { shouldValidate: false });
                      }}
                    />
                    {cardForm.formState.errors.expiry && (
                      <p className="text-destructive text-sm">
                        {cardForm.formState.errors.expiry.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      {...cardForm.register("cvc")}
                    />
                    {cardForm.formState.errors.cvc && (
                      <p className="text-destructive text-sm">
                        {cardForm.formState.errors.cvc.message}
                      </p>
                    )}
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
                      type="text"
                      {...cardForm.register("address")}
                    />
                    {cardForm.formState.errors.address && (
                      <p className="text-destructive text-sm">
                        {cardForm.formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" type="text" {...cardForm.register("city")} />
                      {cardForm.formState.errors.city && (
                        <p className="text-destructive text-sm">
                          {cardForm.formState.errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" type="text" {...cardForm.register("state")} />
                      {cardForm.formState.errors.state && (
                        <p className="text-destructive text-sm">
                          {cardForm.formState.errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        placeholder="10001"
                        type="text"
                        {...cardForm.register("zip")}
                      />
                      {cardForm.formState.errors.zip && (
                        <p className="text-destructive text-sm">
                          {cardForm.formState.errors.zip.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        defaultValue="US"
                        onValueChange={(value) =>
                          cardForm.setValue("country", value, { shouldValidate: true })
                        }
                      >
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
                      {cardForm.formState.errors.country && (
                        <p className="text-destructive text-sm">
                          {cardForm.formState.errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Input placeholder="Coupon code" type="text" />
                  <Button variant="outline" type="button">
                    Apply
                  </Button>
                </div>

                <Button className="mt-4 w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
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
            </TabsContent>

            {/* Bank Transfer Tab */}
            <TabsContent value="bank" className="mt-4">
              <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="routing">Routing Number</Label>
                  <Input
                    id="routing"
                    placeholder="021000021"
                    type="text"
                    inputMode="numeric"
                    maxLength={9}
                    {...bankForm.register("routing")}
                  />
                  {bankForm.formState.errors.routing && (
                    <p className="text-destructive text-sm">
                      {bankForm.formState.errors.routing.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">Account Number</Label>
                  <Input
                    id="account"
                    placeholder="1234567890"
                    type="text"
                    inputMode="numeric"
                    {...bankForm.register("accountNumber")}
                  />
                  {bankForm.formState.errors.accountNumber && (
                    <p className="text-destructive text-sm">
                      {bankForm.formState.errors.accountNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-holder">Account Holder Name</Label>
                  <Input
                    id="account-holder"
                    type="text"
                    {...bankForm.register("accountHolder")}
                  />
                  {bankForm.formState.errors.accountHolder && (
                    <p className="text-destructive text-sm">
                      {bankForm.formState.errors.accountHolder.message}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Input placeholder="Coupon code" type="text" />
                  <Button variant="outline" type="button">
                    Apply
                  </Button>
                </div>

                <Button className="mt-4 w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
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
            </TabsContent>
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
