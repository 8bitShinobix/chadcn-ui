"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress"

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState("light");

  const steps = [{ title: "Profile" }, { title: "Preferences" }, { title: "Team" }];

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      {/* Numbered step indicator */}
      <div className="mb-8 flex items-center justify-center gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                    ? "border-primary text-primary border-2"
                    : "border-muted text-muted-foreground border-2"
              )}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={cn("h-0.5 w-12", i < step ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <Progress value={((step + 1) / 3) * 100} className="h-1 mb-6" />

      {/* Step content */}
      <div className="min-h-[250px]">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{steps[0].title}</h2>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="mt-1.5" />
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{steps[1].title}</h2>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Theme</Label>
              <div className="mt-1.5 flex gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "cursor-pointer rounded-md border px-4 py-2 text-sm",
                    theme === "light" ? "border-primary bg-primary/10" : "border-input"
                  )}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "cursor-pointer rounded-md border px-4 py-2 text-sm",
                    theme === "dark" ? "border-primary bg-primary/10" : "border-input"
                  )}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{steps[2].title}</h2>
            <div>
              <Label htmlFor="team-name">Team Name</Label>
              <Input id="team-name" placeholder="Enter your team name" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="team-size">Team Size</Label>
              <Select defaultValue="1-5">
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="6-20">6-20</SelectItem>
                  <SelectItem value="21-50">21-50</SelectItem>
                  <SelectItem value="50+">50+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        {step === 0 && <div />}
        <div className="flex gap-2">
          {step < 2 && (
            <Button variant="ghost" className="text-sm">
              Skip
            </Button>
          )}
          <Button onClick={() => (step < 2 ? setStep(step + 1) : null)}>
            {step < 2 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Finish"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
