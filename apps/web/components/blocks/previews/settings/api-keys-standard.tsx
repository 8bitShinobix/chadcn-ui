"use client";

import { useState } from "react";
import { Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ApiKeysStandard() {
  const [keys] = useState([
    {
      name: "Production",
      key: "sk_live_abc...xyz",
      id: 1,
      created: "Jan 10, 2024",
      lastUsed: "2 hours ago",
    },
    {
      name: "Development",
      key: "sk_test_def...uvw",
      id: 2,
      created: "Jan 10, 2024",
      lastUsed: "2 hours ago",
    },
  ]);

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-lg font-semibold">API Keys</h2>
        <p className="text-muted-foreground text-sm">Manage your API keys.</p>
      </div>
      <Separator className="my-4" />

      <div className="divide-y">
        {keys.map((key) => (
          <div key={key.id} className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{key.name}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="text-muted-foreground h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <code className="text-muted-foreground mt-1 block text-xs">
              {key.key}
            </code>
            <div className="text-muted-foreground mt-2 flex gap-4 text-xs">
              <span>Created: {key.created}</span>
              <span>Last used: {key.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="text-sm font-medium">Create New Key</h3>
        <div className="mt-3 flex gap-3">
          <Input placeholder="Key name..." className="h-9" />
          <Button size="sm">
            <Plus className="mr-2 h-3.5 w-3.5" />
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
