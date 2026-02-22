"use client";

import { useState } from "react";
import { Globe, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const initialDomains = [
  { id: 1, name: "myapp.com", ssl: "valid" as const },
  { id: 2, name: "staging.myapp.com", ssl: "valid" as const },
  { id: 3, name: "dev.myapp.com", ssl: "pending" as const },
];

export default function DomainManagerMinimal() {
  const [domains] = useState(initialDomains);
  const [newDomain, setNewDomain] = useState("");

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-lg font-semibold">Domains</h2>
        <p className="text-muted-foreground text-sm">
          Manage custom domains for your application.
        </p>
      </div>
      <Separator className="my-4" />

      <div className="space-y-3">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="flex items-center justify-between rounded-md border px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">{domain.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={domain.ssl === "valid" ? "default" : "secondary"}
                className={
                  domain.ssl === "valid"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                }
              >
                {domain.ssl === "valid" ? "Valid" : "Pending"}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <Label htmlFor="new-domain">Add Domain</Label>
        <div className="flex gap-2">
          <Input
            id="new-domain"
            placeholder="example.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            className="text-sm"
          />
          <Button size="sm">
            <Plus size={14} className="mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
