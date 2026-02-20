"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SuccessState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <CheckCircle className="text-muted-foreground" size={48} />
      <h2 className="mt-4 text-xl font-semibold">Payment Successful</h2>
      <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
        Your payment has been processed. A confirmation email has been sent to your inbox.
      </p>
      <Card className="mt-6 w-full max-w-sm rounded-lg py-0 shadow-none">
        <CardContent className="space-y-2 p-4">
          <div className="flex justify-between text-sm">
            <span>Amount</span>
            <span className="font-medium">$49.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Transaction ID</span>
            <span className="font-mono text-xs">TXN-2024-0847</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Date</span>
            <span>Jan 15, 2024</span>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex gap-3">
        <Button>
          Go to Dashboard
          <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button variant="outline">Download Receipt</Button>
      </div>
    </div>
  );
}
