"use client";

import { ArrowRight, CircleCheck, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SuccessFeatureRich() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <CircleCheck className="text-muted-foreground" size={32} />
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold">Order Confirmed!</h2>
      <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
        Thank you for your purchase. Your order has been confirmed and will be shipped within 2-3
        business days.
      </p>
      <Card className="mt-6 w-full max-w-md gap-0 divide-y rounded-lg py-0 shadow-none">
        <CardHeader className="px-4 py-3"><CardTitle className="text-sm">Order Summary</CardTitle></CardHeader>
        <CardContent className="divide-y p-0">
        <div className="flex justify-between px-4 py-2.5 text-sm">
          <span>Order Number</span>
          <span className="font-mono">#ORD-2024-1547</span>
        </div>
        <div className="flex justify-between px-4 py-2.5 text-sm">
          <span>Items</span>
          <span>3 items</span>
        </div>
        <div className="flex justify-between px-4 py-2.5 text-sm">
          <span>Subtotal</span>
          <span>$127.00</span>
        </div>
        <div className="flex justify-between px-4 py-2.5 text-sm">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between px-4 py-2.5 text-sm font-medium">
          <span>Total</span>
          <span>$127.00</span>
        </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
        <span>Share:</span>
        <Button variant="ghost" size="sm">
          <Share2 size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <Download size={16} />
        </Button>
      </div>
      <div className="mt-6 flex gap-3">
        <Button>
          Track Order
          <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button variant="outline">Continue Shopping</Button>
      </div>
    </div>
  );
}
