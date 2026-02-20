"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const steps = ["Your Name", "Your Role", "All Done"];

  return (
    <div className="mx-auto w-full max-w-md p-6">
      {/* Step dots */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              i === step ? "bg-primary" : i < step ? "bg-primary/50" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex min-h-[200px] flex-col items-center justify-center">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-semibold">What&apos;s your name?</h2>
            <Input placeholder="Enter your name" className="mt-4 max-w-xs" />
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold">What&apos;s your role?</h2>
            <Input placeholder="e.g., Developer, Designer" className="mt-4 max-w-xs" />
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold">You&apos;re all set!</h2>
            <p className="text-muted-foreground mt-2 text-sm">Your account is ready to go.</p>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => (step < 2 ? setStep(step + 1) : null)}>
          {step < 2 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}
