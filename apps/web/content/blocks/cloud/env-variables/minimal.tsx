"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const initialVars = [
  { id: 1, key: "DATABASE_URL", value: "postgresql://user:pass@db.example.com:5432/mydb" },
  { id: 2, key: "API_KEY", value: "sk_live_a1b2c3d4e5f6g7h8i9j0" },
  { id: 3, key: "JWT_SECRET", value: "super-secret-jwt-token-value-2024" },
  { id: 4, key: "NEXT_PUBLIC_URL", value: "https://myapp.vercel.app" },
  { id: 5, key: "REDIS_URL", value: "redis://default:abc123@redis.example.com:6379" },
  { id: 6, key: "STRIPE_KEY", value: "sk_live_51abc123def456ghi789jkl" },
];

export function EnvVariables() {
  const [variables] = useState(initialVars);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div>
        <h2 className="text-lg font-semibold">Environment Variables</h2>
        <p className="text-muted-foreground text-sm">
          Manage your environment variables and secrets.
        </p>
      </div>
      <Separator className="my-4" />

      <div className="mt-4 space-y-3">
        {variables.map((envVar) => (
          <div key={envVar.id} className="space-y-1">
            <Label className="font-mono text-xs">{envVar.key}</Label>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={revealed[envVar.id] ? envVar.value : "••••••••••••••••"}
                className="font-mono text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleReveal(envVar.id)}
              >
                {revealed[envVar.id] ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
              <Button variant="ghost" size="icon">
                <Copy size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-6">
        <Plus size={16} className="mr-2" />
        Add Variable
      </Button>
    </div>
  );
}
