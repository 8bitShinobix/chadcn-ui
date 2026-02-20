"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
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
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const currentPlan = "free";

  const selectedPlanData = plans.find((p) => p.id === selected);
  const isUpgrade = selected !== currentPlan;
  const price =
    billingPeriod === "monthly" ? selectedPlanData?.monthlyPrice : selectedPlanData?.yearlyPrice;

  const proratedAmount =
    isUpgrade && selectedPlanData ? (selectedPlanData.monthlyPrice * 0.67).toFixed(2) : "0.00";

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div>
        <h2 className="text-2xl font-semibold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Select the plan that best fits your needs
        </p>
      </div>

      <div className="mt-4 inline-flex items-center gap-3 text-sm">
        <button
          onClick={() => setBillingPeriod("monthly")}
          className={cn(
            "transition-colors",
            billingPeriod === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"
          )}
        >
          Monthly
        </button>
        <Switch
          checked={billingPeriod === "yearly"}
          onCheckedChange={() =>
            setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")
          }
        />
        <button
          onClick={() => setBillingPeriod("yearly")}
          className={cn(
            "transition-colors",
            billingPeriod === "yearly" ? "text-foreground font-medium" : "text-muted-foreground"
          )}
        >
          Yearly
        </button>
        {billingPeriod === "yearly" && (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Save 17%
          </Badge>
        )}
      </div>

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {plans.map((plan) => {
          const displayPrice = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          return (
            <label
              key={plan.id}
              htmlFor={plan.id}
              className={cn(
                "relative cursor-pointer rounded-lg border p-5 transition-colors",
                selected === plan.id
                  ? "ring-primary border-primary ring-2"
                  : "hover:border-foreground/20"
              )}
            >
              {plan.id === currentPlan && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary">Current</Badge>
                </div>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2 text-2xl font-bold">
                ${displayPrice}
                <span className="text-muted-foreground text-sm font-normal">
                  /{billingPeriod === "monthly" ? "mo" : "yr"}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-center">
                <RadioGroupItem value={plan.id} id={plan.id} />
              </div>
            </label>
          );
        })}
      </RadioGroup>

      {isUpgrade && selectedPlanData && selectedPlanData.monthlyPrice > 0 && (
        <Card className="bg-muted/50 mt-6 rounded-lg py-0 shadow-none">
          <CardContent className="p-4">
            <p className="text-sm">
              You&apos;ll be charged a prorated amount of ${proratedAmount} for the remainder of
              your billing period.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm">
          {isUpgrade && selectedPlanData && (
            <div>
              <div className="font-medium">
                {selectedPlanData.name} · {billingPeriod === "monthly" ? "Monthly" : "Yearly"}
              </div>
              <div className="text-muted-foreground">
                ${price}/{billingPeriod === "monthly" ? "month" : "year"}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          {selectedPlanData && (
            <Button>
              Upgrade to {selectedPlanData.name}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
