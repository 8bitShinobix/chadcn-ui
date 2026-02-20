"use client";

import { useState } from "react";
import { Key, Copy, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

      <div className="mt-6 space-y-3">
        {keys.map((key) => (
          <Card key={key.id} className="rounded-lg py-0 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-muted-foreground" />
                  <span className="font-medium">{key.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Copy size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 size={14} className="text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="text-muted-foreground bg-muted mt-2 rounded px-3 py-1.5 font-mono text-sm">
                {key.key}
              </div>
              <div className="text-muted-foreground mt-2 flex gap-4 text-xs">
                <span>Created: {key.created}</span>
                <span>Last used: {key.lastUsed}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="mt-6">
        <h3 className="text-base font-medium">Create New Key</h3>
        <div className="mt-3 flex gap-3">
          <Input placeholder="Key name..." />
          <Button>
            <Plus size={16} className="mr-2" />
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
