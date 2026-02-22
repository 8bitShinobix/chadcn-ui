"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Search,
  Globe,
  MapPin,
  Zap,
  ArrowDown,
  GripVertical,
  Server,
  Database,
  Radio,
} from "lucide-react"

interface Region {
  id: string
  flag: string
  name: string
  city: string
  code: string
  provider: string
  latency: number
  pricePerHour: number
  status: "available" | "limited" | "unavailable"
  features: string[]
  edgeFunctions: boolean
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
    pricePerHour: 0.023,
    status: "available",
    features: ["GPU", "HPC", "Spot"],
    edgeFunctions: true,
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
    pricePerHour: 0.023,
    status: "available",
    features: ["GPU", "Spot"],
    edgeFunctions: true,
  },
  {
    id: "eu-west-1",
    flag: "\u{1F1EA}\u{1F1FA}",
    name: "EU West",
    city: "Ireland",
    code: "eu-west-1",
    provider: "AWS",
    latency: 89,
    pricePerHour: 0.025,
    status: "available",
    features: ["GPU", "HPC"],
    edgeFunctions: true,
  },
  {
    id: "eu-central-1",
    flag: "\u{1F1EA}\u{1F1FA}",
    name: "EU Central",
    city: "Frankfurt",
    code: "eu-central-1",
    provider: "AWS",
    latency: 95,
    pricePerHour: 0.027,
    status: "available",
    features: ["GPU", "HPC", "Spot"],
    edgeFunctions: true,
  },
  {
    id: "uk-south-1",
    flag: "\u{1F1EC}\u{1F1E7}",
    name: "UK South",
    city: "London",
    code: "uk-south-1",
    provider: "GCP",
    latency: 82,
    pricePerHour: 0.026,
    status: "limited",
    features: ["Spot"],
    edgeFunctions: false,
  },
  {
    id: "ap-northeast-1",
    flag: "\u{1F1EF}\u{1F1F5}",
    name: "AP Northeast",
    city: "Tokyo",
    code: "ap-northeast-1",
    provider: "AWS",
    latency: 163,
    pricePerHour: 0.028,
    status: "available",
    features: ["GPU", "HPC"],
    edgeFunctions: true,
  },
  {
    id: "ap-southeast-1",
    flag: "\u{1F1F8}\u{1F1EC}",
    name: "AP Southeast",
    city: "Singapore",
    code: "ap-southeast-1",
    provider: "AWS",
    latency: 178,
    pricePerHour: 0.025,
    status: "available",
    features: ["GPU"],
    edgeFunctions: true,
  },
  {
    id: "ap-south-1",
    flag: "\u{1F1E6}\u{1F1FA}",
    name: "AP South",
    city: "Sydney",
    code: "ap-south-1",
    provider: "GCP",
    latency: 195,
    pricePerHour: 0.029,
    status: "limited",
    features: ["Spot"],
    edgeFunctions: false,
  },
]

function latencyColor(ms: number): string {
  if (ms < 50) return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
  if (ms <= 150) return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
  return "bg-red-500/15 text-red-700 dark:text-red-400"
}

function statusDot(status: "available" | "limited" | "unavailable"): string {
  switch (status) {
    case "available":
      return "bg-emerald-500"
    case "limited":
      return "bg-yellow-500"
    case "unavailable":
      return "bg-red-500"
  }
}

export default function RegionSelectorFeatureRich() {
  const [primaryRegion, setPrimaryRegion] = useState("us-east-1")
  const [secondaryRegions, setSecondaryRegions] = useState<string[]>(["us-west-2"])
  const [search, setSearch] = useState("")
  const [failoverEnabled, setFailoverEnabled] = useState(true)
  const [autoDetecting, setAutoDetecting] = useState(false)
  const [serviceRegions, setServiceRegions] = useState({
    api: "us-east-1",
    database: "us-east-1",
    cdn: "us-west-2",
  })

  const filtered = regions.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase())
  )

  function toggleSecondary(regionId: string) {
    setSecondaryRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    )
  }

  function handleAutoDetect() {
    setAutoDetecting(true)
    setTimeout(() => {
      setPrimaryRegion("us-east-1")
      setAutoDetecting(false)
    }, 1500)
  }

  const failoverOrder = [
    primaryRegion,
    ...secondaryRegions.filter((id) => id !== primaryRegion),
  ]

  const primary = regions.find((r) => r.id === primaryRegion)

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Region Configuration</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure primary, secondary, and per-service regions for your
            infrastructure.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAutoDetect}
          disabled={autoDetecting}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {autoDetecting ? "Detecting..." : "Auto-detect Nearest"}
        </Button>
      </div>
      <Separator className="my-6" />

      <Tabs defaultValue="select" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="select">Select Region</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        {/* --- SELECT REGION TAB --- */}
        <TabsContent value="select" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search regions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Primary Region</h3>
            <RadioGroup
              value={primaryRegion}
              onValueChange={setPrimaryRegion}
              className="grid gap-3 sm:grid-cols-2"
            >
              {filtered.map((region) => (
                <Label
                  key={region.id}
                  htmlFor={`primary-${region.id}`}
                  className="block cursor-pointer"
                >
                  <Card
                    className={`relative py-0 transition-colors hover:bg-muted/50 ${
                      primaryRegion === region.id
                        ? "border-primary ring-1 ring-primary"
                        : "border-border"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem
                          value={region.id}
                          id={`primary-${region.id}`}
                          className="mt-0.5"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{region.flag}</span>
                              <span className="text-sm font-medium">
                                {region.city}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {region.recommended && (
                                <Badge variant="secondary" className="text-xs">
                                  Recommended
                                </Badge>
                              )}
                              {region.edgeFunctions && (
                                <Badge
                                  variant="outline"
                                  className="gap-1 text-xs"
                                >
                                  <Zap className="h-3 w-3" />
                                  Edge
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <code>{region.code}</code>
                              <span className="text-muted-foreground/60">
                                |
                              </span>
                              <span>{region.provider}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className={`border-0 text-xs font-mono ${latencyColor(region.latency)}`}
                            >
                              {region.latency}ms
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span
                                className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot(region.status)}`}
                              />
                              <span className="capitalize">
                                {region.status}
                              </span>
                            </div>
                            <span className="text-xs font-medium">
                              ${region.pricePerHour.toFixed(3)}/hr
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              ))}
            </RadioGroup>
            {filtered.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No regions match your search.
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 text-sm font-medium">Secondary Regions</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Select additional regions for failover and redundancy.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {regions
                .filter((r) => r.id !== primaryRegion)
                .map((region) => (
                  <Label
                    key={region.id}
                    htmlFor={`secondary-${region.id}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 ${
                      secondaryRegions.includes(region.id)
                        ? "border-primary/50 bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <Checkbox
                      id={`secondary-${region.id}`}
                      checked={secondaryRegions.includes(region.id)}
                      onCheckedChange={() => toggleSecondary(region.id)}
                    />
                    <span className="text-base">{region.flag}</span>
                    <span className="flex-1 text-sm">{region.city}</span>
                    <code className="text-xs text-muted-foreground">
                      {region.code}
                    </code>
                  </Label>
                ))}
            </div>
          </div>
        </TabsContent>

        {/* --- COMPARE TAB --- */}
        <TabsContent value="compare">
          <Card className="py-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4" />
                Region Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                    <TableHead className="text-right">Price/hr</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Edge</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regions.map((region) => (
                    <TableRow
                      key={region.id}
                      className={
                        region.id === primaryRegion ? "bg-primary/5" : ""
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{region.flag}</span>
                          <div>
                            <div className="text-sm font-medium">
                              {region.city}
                            </div>
                            <code className="text-xs text-muted-foreground">
                              {region.code}
                            </code>
                          </div>
                          {region.id === primaryRegion && (
                            <Badge variant="default" className="ml-1 text-xs">
                              Primary
                            </Badge>
                          )}
                          {secondaryRegions.includes(region.id) && (
                            <Badge
                              variant="secondary"
                              className="ml-1 text-xs"
                            >
                              Secondary
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`border-0 font-mono text-xs ${latencyColor(region.latency)}`}
                        >
                          {region.latency}ms
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        ${region.pricePerHour.toFixed(3)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {region.features.map((f) => (
                            <Badge
                              key={f}
                              variant="outline"
                              className="text-xs"
                            >
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {region.edgeFunctions ? (
                          <Badge
                            variant="outline"
                            className="gap-1 border-0 bg-emerald-500/15 text-xs text-emerald-700 dark:text-emerald-400"
                          >
                            <Zap className="h-3 w-3" />
                            Yes
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${statusDot(region.status)}`}
                          />
                          <span className="text-xs capitalize">
                            {region.status}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- CONFIGURATION TAB --- */}
        <TabsContent value="configuration" className="space-y-6">
          {/* Failover configuration */}
          <Card className="py-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Failover Configuration
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="failover-toggle"
                    className="text-sm text-muted-foreground"
                  >
                    Enable failover
                  </Label>
                  <Switch
                    id="failover-toggle"
                    checked={failoverEnabled}
                    onCheckedChange={setFailoverEnabled}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {failoverEnabled ? (
                <div className="space-y-2">
                  <p className="mb-3 text-xs text-muted-foreground">
                    Failover order: traffic routes to the next region if the
                    current one is unavailable.
                  </p>
                  {failoverOrder.map((regionId, index) => {
                    const region = regions.find((r) => r.id === regionId)
                    if (!region) return null
                    return (
                      <div
                        key={region.id}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="text-base">{region.flag}</span>
                        <span className="flex-1 text-sm font-medium">
                          {region.city}
                        </span>
                        <code className="text-xs text-muted-foreground">
                          {region.code}
                        </code>
                        {index === 0 && (
                          <Badge variant="default" className="text-xs">
                            Primary
                          </Badge>
                        )}
                        {index > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Failover
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                  {failoverOrder.length < 2 && (
                    <p className="py-4 text-center text-xs text-muted-foreground">
                      Add secondary regions in the Select Region tab to
                      configure failover.
                    </p>
                  )}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Failover is disabled. Enable it to configure automatic region
                  failover.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Per-service region assignment */}
          <Card className="py-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Per-Service Region Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-xs text-muted-foreground">
                Assign different regions to each service for optimal
                performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm">API Server</Label>
                  </div>
                  <Select
                    value={serviceRegions.api}
                    onValueChange={(val) =>
                      setServiceRegions((prev) => ({ ...prev, api: val }))
                    }
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.flag} {r.city} ({r.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm">Database</Label>
                  </div>
                  <Select
                    value={serviceRegions.database}
                    onValueChange={(val) =>
                      setServiceRegions((prev) => ({
                        ...prev,
                        database: val,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.flag} {r.city} ({r.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm">CDN</Label>
                  </div>
                  <Select
                    value={serviceRegions.cdn}
                    onValueChange={(val) =>
                      setServiceRegions((prev) => ({ ...prev, cdn: val }))
                    }
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.flag} {r.city} ({r.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing summary */}
          <Card className="py-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Pricing Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {primary && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{primary.flag}</span>
                      <span>
                        {primary.city} (Primary)
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      ${primary.pricePerHour.toFixed(3)}/hr
                    </span>
                  </div>
                  {secondaryRegions.map((id) => {
                    const r = regions.find((reg) => reg.id === id)
                    if (!r) return null
                    return (
                      <div
                        key={r.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{r.flag}</span>
                          <span>
                            {r.city} (Secondary)
                          </span>
                        </div>
                        <span className="text-sm">
                          ${r.pricePerHour.toFixed(3)}/hr
                        </span>
                      </div>
                    )
                  })}
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-sm">Estimated Total</span>
                    <span className="text-sm">
                      $
                      {(
                        (primary?.pricePerHour ?? 0) +
                        secondaryRegions.reduce((sum, id) => {
                          const r = regions.find((reg) => reg.id === id)
                          return sum + (r?.pricePerHour ?? 0)
                        }, 0)
                      ).toFixed(3)}
                      /hr
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <ArrowDown className="mr-2 h-4 w-4" />
              Apply Configuration
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
