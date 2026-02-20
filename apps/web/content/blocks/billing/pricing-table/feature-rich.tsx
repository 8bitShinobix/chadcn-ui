"use client";

import { useState } from "react";
import { Check, X, Zap, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    icon: null,
    current: true,
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
    icon: Zap,
    current: false,
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
    icon: Crown,
    current: false,
  },
];

const featureComparison = [
  { name: "Projects", free: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "API Calls", free: "100/day", pro: "10,000/day", enterprise: "Unlimited" },
  { name: "Support", free: "Community", pro: "Priority", enterprise: "24/7 Phone" },
  { name: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom" },
  { name: "Integrations", free: false, pro: true, enterprise: true },
  { name: "Team Members", free: "1", pro: "10", enterprise: "Unlimited" },
  { name: "SSO & SAML", free: false, pro: false, enterprise: true },
  { name: "SLA Guarantee", free: false, pro: false, enterprise: true },
];

export function PricingTable() {
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
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card key={plan.name} className={cn("rounded-lg py-0 shadow-none", plan.popular && "ring-primary relative ring-2")}>
              <CardContent className="flex flex-col p-6">
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {Icon && <Icon size={18} className="text-primary" />}
                </div>
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
                {plan.current ? (
                  <Button className="mt-6" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="mt-6" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12">
        <h3 className="text-center text-xl font-bold">Compare all features</h3>
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Feature</TableHead>
              <TableHead className="text-center font-semibold">Free</TableHead>
              <TableHead className="text-center font-semibold">Pro</TableHead>
              <TableHead className="text-center font-semibold">Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureComparison.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check size={16} className="inline text-foreground" />
                    ) : (
                      <X size={16} className="text-muted-foreground inline" />
                    )
                  ) : (
                    <span className="text-muted-foreground">{feature.free}</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check size={16} className="inline text-foreground" />
                    ) : (
                      <X size={16} className="text-muted-foreground inline" />
                    )
                  ) : (
                    <span className="text-muted-foreground">{feature.pro}</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <Check size={16} className="inline text-foreground" />
                    ) : (
                      <X size={16} className="text-muted-foreground inline" />
                    )
                  ) : (
                    <span className="text-muted-foreground">{feature.enterprise}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
