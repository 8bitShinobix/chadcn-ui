"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessMinimal() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <CircleCheck className="text-muted-foreground" size={48} />
      <h2 className="mt-4 text-xl font-semibold">Success!</h2>
      <p className="text-muted-foreground mt-2 max-w-sm text-center text-sm">
        Your action has been completed successfully.
      </p>
      <Button className="mt-6">
        Continue
        <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
}
