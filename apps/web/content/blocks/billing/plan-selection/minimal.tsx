"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Basic features for personal use",
    features: ["1 project", "100 API calls/day", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "Advanced features for growing teams",
    features: [
      "Unlimited projects",
      "10,000 API calls/day",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "Full power for large organizations",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "24/7 support",
      "Custom integrations",
      "SSO",
    ],
  },
];

export function PlanSelection() {
  const [selected, setSelected] = useState("pro");

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <RadioGroup value={selected} onValueChange={setSelected} className="space-y-3">
        {plans.map((plan) => (
          <label
            key={plan.id}
            htmlFor={plan.id}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
              selected === plan.id
                ? "ring-primary border-primary ring-2"
                : "hover:border-foreground/20"
            )}
          >
            <div>
              <div className="font-medium">{plan.name}</div>
              <div className="text-muted-foreground text-sm">${plan.monthlyPrice}/month</div>
            </div>
            <RadioGroupItem value={plan.id} id={plan.id} />
          </label>
        ))}
      </RadioGroup>
      <Button className="mt-6 w-full">
        <Check className="mr-2 h-4 w-4" />
        Confirm Selection
      </Button>
    </div>
  );
}
