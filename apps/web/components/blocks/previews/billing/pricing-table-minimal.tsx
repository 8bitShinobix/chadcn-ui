"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default function PricingTableMinimal() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name} className="rounded-lg py-0 shadow-none">
          <CardContent className="flex flex-col p-6">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
              <span className="text-muted-foreground text-sm font-normal">/month</span>
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
  );
}
