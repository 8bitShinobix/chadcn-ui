"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Search, Globe } from "lucide-react"

interface Region {
  id: string
  flag: string
  name: string
  city: string
  code: string
  provider: string
  latency: number
  status: "available" | "limited"
  recommended?: boolean
}

const regions: Region[] = [
  {
    id: "us-east-1",
    flag: "\u{1F1FA}\u{1F1F8}",
    name: "US East",
    city: "N. Virginia",
    code: "us-east-1",
    provider: "AWS",
    latency: 12,
    status: "available",
    recommended: true,
  },
  {
    id: "us-west-2",
    flag: "\u{1F1FA}\u{1F1F8}",
    name: "US West",
    city: "Oregon",
    code: "us-west-2",
    provider: "AWS",
    latency: 45,
    status: "available",
  },
  {
    id: "eu-west-1",
    flag: "\u{1F1EA}\u{1F1FA}",
    name: "EU West",
    city: "Ireland",
    code: "eu-west-1",
    provider: "AWS",
    latency: 89,
    status: "available",
  },
  {
    id: "eu-central-1",
    flag: "\u{1F1EA}\u{1F1FA}",
    name: "EU Central",
    city: "Frankfurt",
    code: "eu-central-1",
    provider: "AWS",
    latency: 95,
    status: "available",
  },
  {
    id: "uk-south-1",
    flag: "\u{1F1EC}\u{1F1E7}",
    name: "UK South",
    city: "London",
    code: "uk-south-1",
    provider: "GCP",
    latency: 82,
    status: "limited",
  },
  {
    id: "ap-northeast-1",
    flag: "\u{1F1EF}\u{1F1F5}",
    name: "AP Northeast",
    city: "Tokyo",
    code: "ap-northeast-1",
    provider: "AWS",
    latency: 163,
    status: "available",
  },
  {
    id: "ap-southeast-1",
    flag: "\u{1F1F8}\u{1F1EC}",
    name: "AP Southeast",
    city: "Singapore",
    code: "ap-southeast-1",
    provider: "AWS",
    latency: 178,
    status: "available",
  },
  {
    id: "ap-south-1",
    flag: "\u{1F1E6}\u{1F1FA}",
    name: "AP South",
    city: "Sydney",
    code: "ap-south-1",
    provider: "GCP",
    latency: 195,
    status: "limited",
  },
]

function latencyColor(ms: number): string {
  if (ms < 50) return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  if (ms <= 150) return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
  return "bg-red-500/15 text-red-700 dark:text-red-400"
}

function statusDot(status: "available" | "limited"): string {
  return status === "available" ? "bg-emerald-500" : "bg-yellow-500"
}

export default function RegionSelectorStandard() {
  const [selected, setSelected] = useState("us-east-1")
  const [search, setSearch] = useState("")

  const filtered = regions.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.provider.toLowerCase().includes(search.toLowerCase())
  )

  const selectedRegion = regions.find((r) => r.id === selected)

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Select Region</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a server region for your deployment.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Globe className="h-3.5 w-3.5" />
          <span>{regions.length} regions available</span>
        </div>
      </div>
      <Separator className="my-6" />

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search regions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="grid gap-3 sm:grid-cols-2"
      >
        {filtered.map((region) => (
          <Label key={region.id} htmlFor={`region-${region.id}`} className="cursor-pointer">
            <Card
              className={`relative py-0 transition-colors hover:bg-muted/50 ${
                selected === region.id
                  ? "border-primary ring-1 ring-primary"
                  : "border-border"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value={region.id}
                    id={`region-${region.id}`}
                    className="mt-0.5"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{region.flag}</span>
                        <span className="text-sm font-medium">{region.city}</span>
                      </div>
                      {region.recommended && (
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <code>{region.code}</code>
                        <span className="text-muted-foreground/60">|</span>
                        <span>{region.provider}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`border-0 text-xs font-mono ${latencyColor(region.latency)}`}
                      >
                        {region.latency}ms
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot(region.status)}`}
                      />
                      <span className="capitalize">{region.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No regions match your search.
        </div>
      )}

      <Separator className="my-6" />

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">Selected: </span>
          {selectedRegion && (
            <span className="font-medium">
              {selectedRegion.flag} {selectedRegion.city}{" "}
              <code className="ml-1 text-xs text-muted-foreground">
                {selectedRegion.code}
              </code>
            </span>
          )}
        </div>
        <Button>Deploy to Region</Button>
      </div>
    </div>
  )
}
