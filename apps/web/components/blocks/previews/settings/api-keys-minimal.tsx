"use client";

import { useState } from "react";
import { Key, Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

      <div className="mt-6 space-y-3">
        {keys.map((key) => (
          <Card key={key.id} className="rounded-lg py-0 shadow-none">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Key size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{key.name}</div>
                  <div className="text-muted-foreground font-mono text-xs">{key.key}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Copy size={14} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="mt-4">
        <Plus size={16} className="mr-2" />
        Create New Key
      </Button>
    </div>
  );
}
