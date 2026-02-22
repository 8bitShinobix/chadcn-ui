"use client";

import { useState } from "react";
import { Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ApiKeysMinimal() {
  const [keys] = useState([
    { name: "Production", key: "sk_live_abc...xyz", id: 1 },
    { name: "Development", key: "sk_test_def...uvw", id: 2 },
  ]);

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-lg font-semibold">API Keys</h2>
        <p className="text-muted-foreground text-sm">Manage your API keys.</p>
      </div>
      <Separator className="my-4" />

      <div className="divide-y">
        {keys.map((key) => (
          <div key={key.id} className="flex items-center justify-between py-3">
            <div className="min-w-0">
              <div className="text-sm font-medium">{key.name}</div>
              <code className="text-muted-foreground text-xs">{key.key}</code>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      <Button className="mt-4" size="sm">
        <Plus className="mr-2 h-3.5 w-3.5" />
        Create New Key
      </Button>
    </div>
  );
}
