"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

const regions = [
  { id: "us-east-1", flag: "\u{1F1FA}\u{1F1F8}", name: "US East", city: "N. Virginia" },
  { id: "us-west-2", flag: "\u{1F1FA}\u{1F1F8}", name: "US West", city: "Oregon" },
  { id: "eu-west-1", flag: "\u{1F1EA}\u{1F1FA}", name: "EU West", city: "Ireland" },
  { id: "eu-central-1", flag: "\u{1F1EA}\u{1F1FA}", name: "EU Central", city: "Frankfurt" },
  { id: "uk-south-1", flag: "\u{1F1EC}\u{1F1E7}", name: "UK South", city: "London" },
  { id: "ap-northeast-1", flag: "\u{1F1EF}\u{1F1F5}", name: "AP Northeast", city: "Tokyo" },
  { id: "ap-southeast-1", flag: "\u{1F1F8}\u{1F1EC}", name: "AP Southeast", city: "Singapore" },
  { id: "ap-south-1", flag: "\u{1F1E6}\u{1F1FA}", name: "AP South", city: "Sydney" },
]

export function RegionSelector() {
  const [selected, setSelected] = useState("us-east-1")

  return (
    <div className="mx-auto w-full max-w-md p-6">
      <div>
        <h2 className="text-2xl font-bold">Select Region</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a server region for your deployment.
        </p>
      </div>
      <Separator className="my-6" />
      <RadioGroup value={selected} onValueChange={setSelected} className="space-y-2">
        {regions.map((region) => (
          <Label
            key={region.id}
            htmlFor={region.id}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 ${
              selected === region.id
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <RadioGroupItem value={region.id} id={region.id} />
            <span className="text-lg">{region.flag}</span>
            <div className="flex-1">
              <span className="text-sm font-medium">
                {region.name}{" "}
                <span className="text-muted-foreground">({region.city})</span>
              </span>
            </div>
            <code className="text-xs text-muted-foreground">{region.id}</code>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}
