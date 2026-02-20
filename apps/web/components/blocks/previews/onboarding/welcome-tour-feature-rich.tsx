"use client";

import { useState } from "react";
import { LayoutDashboard, BarChart3, Users, Settings, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "Get a bird's-eye view of your projects, metrics, and team activity all in one place.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track performance with real-time charts, custom reports, and exportable data.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Invite team members, assign roles, and work together seamlessly.",
  },
  {
    icon: Settings,
    title: "Customization",
    description: "Configure your workspace with themes, integrations, and personalized workflows.",
  },
];

export default function WelcomeTourFeatureRich() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dontShow, setDontShow] = useState(false);

  const currentFeature = features[currentSlide];
  const Icon = currentFeature.icon;
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === features.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <Card className="gap-0 overflow-hidden rounded-lg py-0 shadow-lg">
        <div className="from-primary/20 via-primary/10 to-background flex h-40 items-center justify-center bg-gradient-to-br">
          <Icon className="text-primary" size={48} />
        </div>
        <div className="p-6">
          <p className="text-muted-foreground text-xs">
            Step {currentSlide + 1} of {features.length}
          </p>
          <h2 className="mt-2 text-lg font-semibold">{currentFeature.title}</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {currentFeature.description}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full",
                  index === currentSlide ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Checkbox
              id="dont-show"
              checked={dontShow}
              onCheckedChange={(checked) => setDontShow(checked === true)}
            />
            <span className="text-muted-foreground text-xs">Don&apos;t show this again</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <Button variant="ghost" className="text-sm">
              Skip tour
            </Button>
            <div className="flex gap-2">
              {!isFirst && (
                <Button variant="outline" size="sm" onClick={handleBack}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button size="sm" onClick={handleNext}>
                {isLast ? (
                  "Finish"
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
