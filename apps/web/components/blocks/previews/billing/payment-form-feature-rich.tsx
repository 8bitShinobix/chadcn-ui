"use client";

import { CreditCard, Lock } from "lucide-react";
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

export default function PaymentFormFeatureRich() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left column - Payment form */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold">Payment Method</h2>

          <Tabs defaultValue="card" className="mt-4">
            <TabsList className="w-full">
              <TabsTrigger value="card" className="flex-1">
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex-1">
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <form className="mt-4 space-y-4">
              <TabsContent value="card" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholder">Cardholder Name</Label>
                  <Input id="cardholder" placeholder="John Doe" type="text" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <Input id="card-number" placeholder="1234 5678 9012 3456" type="text" />
                    <CreditCard
                      className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      size={16}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" type="text" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" type="text" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Billing Address</h3>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address Line 1</Label>
                    <Input id="address" placeholder="123 Main St" type="text" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" type="text" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" type="text" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" type="text" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="US">
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
                  <Input id="routing" placeholder="021000021" type="text" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">Account Number</Label>
                  <Input id="account" placeholder="1234567890" type="text" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-holder">Account Holder Name</Label>
                  <Input id="account-holder" type="text" />
                </div>
              </TabsContent>

              <div className="mt-4 flex gap-2">
                <Input placeholder="Coupon code" type="text" />
                <Button variant="outline" type="button">
                  Apply
                </Button>
              </div>

              <Button className="mt-4 w-full">
                <Lock size={16} className="mr-2" />
                Complete Payment — $29.00
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
