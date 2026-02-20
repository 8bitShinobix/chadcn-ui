"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For individuals getting started",
    features: ["1 project", "100 API calls/day", "Community support", "Basic analytics"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "For growing teams",
    features: [
      "Unlimited projects",
      "10,000 API calls/day",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "24/7 phone support",
      "Custom analytics",
      "SSO & SAML",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingTableStandard() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Simple, transparent pricing</h2>
        <div className="mt-4 inline-flex items-center gap-3 text-sm">
          <span className={cn(!annual && "font-medium")}>Monthly</span>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <span className={cn(annual && "font-medium")}>Yearly</span>
          {annual && (
            <Badge
              variant="secondary"
              className="ml-2"
            >
              Save 20%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn("rounded-lg py-0 shadow-none", plan.popular && "ring-primary relative ring-2")}>
            <CardContent className="flex flex-col p-6">
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground text-sm font-normal">
                  /{annual ? "year" : "month"}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-foreground" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
