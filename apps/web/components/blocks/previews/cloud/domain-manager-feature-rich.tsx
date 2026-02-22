"use client";

import { useState } from "react";
import {
  Globe,
  Plus,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ArrowRight,
  Pencil,
  Copy,
  MoreVertical,
  Upload,
  RefreshCw,
  Lock,
  Search,
  ExternalLink,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface Domain {
  id: number;
  name: string;
  ssl: "valid" | "pending" | "expired";
  sslExpiry: string;
  dnsConfigured: boolean;
  primary: boolean;
  verified: boolean;
}

interface DnsRecord {
  id: number;
  type: string;
  name: string;
  value: string;
  ttl: string;
}

interface Nameserver {
  name: string;
  ip: string;
  propagated: boolean;
  responseTime: string;
}

const initialDomains: Domain[] = [
  {
    id: 1,
    name: "myapp.com",
    ssl: "valid",
    sslExpiry: "Mar 15, 2026",
    dnsConfigured: true,
    primary: true,
    verified: true,
  },
  {
    id: 2,
    name: "www.myapp.com",
    ssl: "valid",
    sslExpiry: "Mar 15, 2026",
    dnsConfigured: true,
    primary: false,
    verified: true,
  },
  {
    id: 3,
    name: "staging.myapp.com",
    ssl: "valid",
    sslExpiry: "Jun 22, 2026",
    dnsConfigured: true,
    primary: false,
    verified: true,
  },
  {
    id: 4,
    name: "api.myapp.com",
    ssl: "pending",
    sslExpiry: "--",
    dnsConfigured: false,
    primary: false,
    verified: false,
  },
  {
    id: 5,
    name: "docs.myapp.com",
    ssl: "valid",
    sslExpiry: "Sep 01, 2026",
    dnsConfigured: true,
    primary: false,
    verified: true,
  },
];

const initialDnsRecords: DnsRecord[] = [
  { id: 1, type: "A", name: "@", value: "76.76.21.21", ttl: "3600" },
  { id: 2, type: "AAAA", name: "@", value: "2606:4700:3030::6815:1521", ttl: "3600" },
  { id: 3, type: "CNAME", name: "www", value: "cname.vercel-dns.com", ttl: "3600" },
  { id: 4, type: "CNAME", name: "staging", value: "cname.vercel-dns.com", ttl: "3600" },
  { id: 5, type: "CNAME", name: "api", value: "cname.vercel-dns.com", ttl: "3600" },
  { id: 6, type: "CNAME", name: "docs", value: "cname.vercel-dns.com", ttl: "3600" },
  { id: 7, type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" },
  { id: 8, type: "TXT", name: "_dmarc", value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@myapp.com", ttl: "3600" },
  { id: 9, type: "MX", name: "@", value: "10 mail.myapp.com", ttl: "14400" },
  { id: 10, type: "CAA", name: "@", value: '0 issue "letsencrypt.org"', ttl: "3600" },
];

const nameservers: Nameserver[] = [
  { name: "ns1.vercel-dns.com", ip: "76.76.21.21", propagated: true, responseTime: "12ms" },
  { name: "ns2.vercel-dns.com", ip: "76.76.21.22", propagated: true, responseTime: "18ms" },
  { name: "ns3.cloudflare.com", ip: "172.64.32.1", propagated: true, responseTime: "25ms" },
  { name: "ns4.cloudflare.com", ip: "172.64.33.1", propagated: false, responseTime: "--" },
];

const sslBadgeStyle = (status: Domain["ssl"]) => {
  switch (status) {
    case "valid":
      return {
        label: "Valid",
        className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
        icon: ShieldCheck,
      };
    case "pending":
      return {
        label: "Pending",
        className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        icon: ShieldAlert,
      };
    case "expired":
      return {
        label: "Expired",
        className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
        icon: ShieldAlert,
      };
  }
};

export default function DomainManagerFeatureRich() {
  const [domains] = useState<Domain[]>(initialDomains);
  const [dnsRecords] = useState<DnsRecord[]>(initialDnsRecords);
  const [newDomain, setNewDomain] = useState("");
  const [wwwRedirect, setWwwRedirect] = useState(true);
  const [sslAutoRenew, setSslAutoRenew] = useState(true);
  const [wildcardSubdomain, setWildcardSubdomain] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("domains");

  const propagatedCount = nameservers.filter((ns) => ns.propagated).length;
  const propagationPercent = (propagatedCount / nameservers.length) * 100;

  const filteredDnsRecords = dnsRecords.filter(
    (r) =>
      search === "" ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Domain Manager</h2>
          <p className="text-muted-foreground text-sm">
            Manage domains, DNS records, SSL certificates, and routing rules.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload size={14} className="mr-2" />
            Bulk Import
          </Button>
          <Button size="sm">
            <Plus size={14} className="mr-2" />
            Add Domain
          </Button>
        </div>
      </div>
      <Separator className="my-4" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="dns">DNS Records</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        {/* Domains Tab */}
        <TabsContent value="domains" className="mt-4 space-y-6">
          {/* Add Custom Domain */}
          <Card className="shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Add Custom Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="yourdomain.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="text-sm"
                />
                <Select defaultValue="production">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Add</Button>
              </div>
            </CardContent>
          </Card>

          {/* Domain Verification Steps */}
          <Card className="border-amber-200 bg-amber-50 shadow-none dark:border-amber-900 dark:bg-amber-950/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    Domain Verification Required
                  </h4>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Add the following TXT record to verify ownership of{" "}
                    <span className="font-mono font-medium">api.myapp.com</span>:
                  </p>
                  <div className="mt-2 rounded-md border border-amber-200 bg-white p-3 dark:border-amber-900 dark:bg-amber-950/50">
                    <div className="grid grid-cols-[80px_1fr] gap-2 text-xs">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-mono">TXT</span>
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-mono">_vercel</span>
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-mono break-all">
                        vc-domain-verify=api.myapp.com,6f4a8b2c1d3e
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <RefreshCw size={12} className="mr-2" />
                    Verify Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domain List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Connected Domains</h3>
            {domains.map((domain) => {
              const ssl = sslBadgeStyle(domain.ssl);
              const SslIcon = ssl.icon;
              return (
                <Card key={domain.id} className="py-0 shadow-none">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{domain.name}</span>
                          {domain.primary && (
                            <Badge variant="secondary" className="text-[10px]">
                              Primary
                            </Badge>
                          )}
                          {!domain.verified && (
                            <Badge
                              variant="outline"
                              className="border-amber-300 text-[10px] text-amber-600 dark:border-amber-800 dark:text-amber-400"
                            >
                              Unverified
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground mt-0.5 flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <SslIcon size={12} />
                            SSL {ssl.label}
                            {domain.sslExpiry !== "--" && ` until ${domain.sslExpiry}`}
                          </span>
                          <span className="flex items-center gap-1">
                            {domain.dnsConfigured ? (
                              <>
                                <CheckCircle2 size={12} className="text-emerald-500" />
                                DNS configured
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={12} className="text-amber-500" />
                                DNS not configured
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={ssl.className}>
                        {ssl.label}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink size={14} className="mr-2" />
                            Visit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw size={14} className="mr-2" />
                            Re-verify
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={14} className="mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Settings */}
          <Card className="shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Routing & Subdomains</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-xs">www.myapp.com</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                    <span className="font-mono text-xs">myapp.com</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    301
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="www-redirect" className="text-xs">
                    www to non-www
                  </Label>
                  <Switch
                    id="www-redirect"
                    checked={wwwRedirect}
                    onCheckedChange={setWwwRedirect}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Wildcard Subdomains</p>
                  <p className="text-muted-foreground text-xs">
                    Enable *.myapp.com to match all subdomains
                  </p>
                </div>
                <Switch
                  checked={wildcardSubdomain}
                  onCheckedChange={setWildcardSubdomain}
                />
              </div>
            </CardContent>
          </Card>

          {/* DNS Propagation Checker */}
          <Card className="shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">DNS Propagation</CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw size={12} className="mr-2" />
                  Check Again
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center gap-3">
                <Progress value={propagationPercent} className="h-2 flex-1" />
                <span className="text-muted-foreground text-xs">
                  {propagatedCount}/{nameservers.length} nameservers
                </span>
              </div>
              <div className="space-y-2">
                {nameservers.map((ns) => (
                  <div
                    key={ns.name}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          ns.propagated ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      <div>
                        <p className="font-mono text-xs font-medium">{ns.name}</p>
                        <p className="text-muted-foreground text-[10px]">{ns.ip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-xs">
                        {ns.propagated ? ns.responseTime : "No response"}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          ns.propagated
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                        }
                      >
                        {ns.propagated ? "Propagated" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DNS Records Tab */}
        <TabsContent value="dns" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search
                size={14}
                className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                placeholder="Filter records..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <Button size="sm" onClick={() => setShowAddRecord(!showAddRecord)}>
              <Plus size={14} className="mr-2" />
              Add Record
            </Button>
          </div>

          {/* Inline Add Record Form */}
          {showAddRecord && (
            <Card className="shadow-none">
              <CardContent className="p-4">
                <h4 className="mb-3 text-sm font-medium">New DNS Record</h4>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select defaultValue="A">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="AAAA">AAAA</SelectItem>
                        <SelectItem value="CNAME">CNAME</SelectItem>
                        <SelectItem value="TXT">TXT</SelectItem>
                        <SelectItem value="MX">MX</SelectItem>
                        <SelectItem value="CAA">CAA</SelectItem>
                        <SelectItem value="SRV">SRV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input placeholder="@" className="mt-1 font-mono text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">Value</Label>
                    <Input placeholder="76.76.21.21" className="mt-1 font-mono text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">TTL</Label>
                    <Select defaultValue="3600">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">5 min</SelectItem>
                        <SelectItem value="3600">1 hour</SelectItem>
                        <SelectItem value="14400">4 hours</SelectItem>
                        <SelectItem value="86400">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddRecord(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm">Save Record</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* DNS Records Table */}
          <Card className="shadow-none">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Type</TableHead>
                  <TableHead className="w-[120px]">Name</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="w-[80px]">TTL</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDnsRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {record.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{record.name}</TableCell>
                    <TableCell className="max-w-[300px] truncate font-mono text-sm">
                      {record.value}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {record.ttl}s
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy size={14} className="mr-2" />
                            Copy Value
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="mt-4 space-y-4">
          {/* SSL Settings */}
          <Card className="shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">SSL Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-Renewal</p>
                  <p className="text-muted-foreground text-xs">
                    Automatically renew SSL certificates before expiry
                  </p>
                </div>
                <Switch
                  checked={sslAutoRenew}
                  onCheckedChange={setSslAutoRenew}
                />
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card className="shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Lock size={14} />
                    Certificate for myapp.com
                  </div>
                </CardTitle>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-muted-foreground text-xs">Issuer</p>
                    <p className="text-sm font-medium">Let&apos;s Encrypt Authority X3</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Valid From</p>
                    <p className="text-sm">Dec 15, 2025</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Valid Until</p>
                    <p className="text-sm">Mar 15, 2026</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Domains Covered</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px]">
                        myapp.com
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        www.myapp.com
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-muted-foreground text-xs">Algorithm</p>
                    <p className="font-mono text-sm">ECDSA P-256</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Serial Number</p>
                    <p className="font-mono text-xs break-all">
                      04:A3:B7:2C:8D:1E:9F:4A:6B:3D:7C:5E:8F:2A:1B:0D
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">SHA-256 Fingerprint</p>
                    <p className="font-mono text-xs break-all">
                      A1:B2:C3:D4:E5:F6:07:18:29:3A:4B:5C:6D:7E:8F:90:A1:B2:C3:D4
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Certificates */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">All Certificates</h3>
            {[
              {
                domain: "myapp.com",
                issuer: "Let's Encrypt",
                expiry: "Mar 15, 2026",
                status: "active" as const,
              },
              {
                domain: "staging.myapp.com",
                issuer: "Let's Encrypt",
                expiry: "Jun 22, 2026",
                status: "active" as const,
              },
              {
                domain: "docs.myapp.com",
                issuer: "Let's Encrypt",
                expiry: "Sep 01, 2026",
                status: "active" as const,
              },
              {
                domain: "api.myapp.com",
                issuer: "--",
                expiry: "--",
                status: "pending" as const,
              },
            ].map((cert) => (
              <Card key={cert.domain} className="py-0 shadow-none">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Lock size={14} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{cert.domain}</p>
                      <p className="text-muted-foreground text-xs">
                        {cert.issuer}
                        {cert.expiry !== "--" && ` \u00B7 Expires ${cert.expiry}`}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      cert.status === "active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    }
                  >
                    {cert.status === "active" ? "Active" : "Pending"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
