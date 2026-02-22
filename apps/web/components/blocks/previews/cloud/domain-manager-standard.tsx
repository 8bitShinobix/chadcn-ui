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

interface Domain {
  id: number;
  name: string;
  ssl: "valid" | "pending" | "expired";
  sslExpiry: string;
  dnsConfigured: boolean;
  primary: boolean;
}

interface DnsRecord {
  id: number;
  type: string;
  name: string;
  value: string;
  ttl: string;
}

const initialDomains: Domain[] = [
  {
    id: 1,
    name: "myapp.com",
    ssl: "valid",
    sslExpiry: "Mar 15, 2026",
    dnsConfigured: true,
    primary: true,
  },
  {
    id: 2,
    name: "www.myapp.com",
    ssl: "valid",
    sslExpiry: "Mar 15, 2026",
    dnsConfigured: true,
    primary: false,
  },
  {
    id: 3,
    name: "staging.myapp.com",
    ssl: "valid",
    sslExpiry: "Jun 22, 2026",
    dnsConfigured: true,
    primary: false,
  },
  {
    id: 4,
    name: "api.myapp.com",
    ssl: "pending",
    sslExpiry: "--",
    dnsConfigured: false,
    primary: false,
  },
];

const initialDnsRecords: DnsRecord[] = [
  { id: 1, type: "A", name: "@", value: "76.76.21.21", ttl: "3600" },
  { id: 2, type: "CNAME", name: "www", value: "cname.vercel-dns.com", ttl: "3600" },
  { id: 3, type: "CNAME", name: "staging", value: "cname.vercel-dns.com", ttl: "3600" },
  { id: 4, type: "TXT", name: "@", value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" },
  { id: 5, type: "MX", name: "@", value: "10 mail.myapp.com", ttl: "14400" },
];

const sslBadge = (status: Domain["ssl"]) => {
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

export default function DomainManagerStandard() {
  const [domains] = useState<Domain[]>(initialDomains);
  const [dnsRecords] = useState<DnsRecord[]>(initialDnsRecords);
  const [newDomain, setNewDomain] = useState("");
  const [wwwRedirect, setWwwRedirect] = useState(true);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Domain Manager</h2>
          <p className="text-muted-foreground text-sm">
            Configure custom domains, SSL certificates, and DNS records.
          </p>
        </div>
        <Button size="sm">
          <Plus size={14} className="mr-2" />
          Add Domain
        </Button>
      </div>
      <Separator className="my-4" />

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

      {/* Domain List */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium">Connected Domains</h3>
        {domains.map((domain) => {
          const ssl = sslBadge(domain.ssl);
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
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* DNS Records Table */}
      <div className="mt-8">
        <h3 className="text-sm font-medium">DNS Records</h3>
        <p className="text-muted-foreground mb-3 text-xs">
          Configure DNS records for your domain.
        </p>
        <Card className="shadow-none">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Type</TableHead>
                <TableHead className="w-[120px]">Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[80px]">TTL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dnsRecords.map((record) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Redirect Rules */}
      <div className="mt-8">
        <h3 className="text-sm font-medium">Redirect Rules</h3>
        <p className="text-muted-foreground mb-3 text-xs">
          Configure how traffic is redirected between domain variants.
        </p>
        <Card className="shadow-none">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono">www.myapp.com</span>
                <ArrowRight size={14} className="text-muted-foreground" />
                <span className="font-mono">myapp.com</span>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                301 Redirect
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="www-redirect" className="text-sm">
                www to non-www
              </Label>
              <Switch
                id="www-redirect"
                checked={wwwRedirect}
                onCheckedChange={setWwwRedirect}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
