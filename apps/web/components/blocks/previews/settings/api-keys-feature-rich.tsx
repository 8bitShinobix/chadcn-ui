"use client";

import { useState } from "react";
import {
  Copy,
  Plus,
  Trash2,
  RotateCw,
  Eye,
  EyeOff,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ApiKeysFeatureRich() {
  const [showKey, setShowKey] = useState<Record<number, boolean>>({});
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const keys = [
    {
      id: 1,
      name: "Production",
      key: "sk_live_abc123def456ghi789",
      created: "Jan 10, 2024",
      lastUsed: "2 hours ago",
      permissions: ["read", "write"],
    },
    {
      id: 2,
      name: "Development",
      key: "sk_test_xyz789uvw456rst123",
      created: "Feb 5, 2024",
      lastUsed: "5 min ago",
      permissions: ["read"],
    },
    {
      id: 3,
      name: "CI/CD Pipeline",
      key: "sk_live_mno345pqr678stu901",
      created: "Mar 1, 2024",
      lastUsed: "Never",
      permissions: ["read", "write", "admin"],
    },
  ];

  const maskKey = (key: string) => {
    const start = key.slice(0, 7);
    return `${start}${"•".repeat(20)}`;
  };

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
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{key.name}</span>
                {key.permissions.map((permission) => (
                  <Badge
                    key={permission}
                    variant="secondary"
                    className="text-[10px] capitalize"
                  >
                    {permission}
                  </Badge>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RotateCw className="mr-2 h-3.5 w-3.5" />
                    Regenerate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Revoke
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-1.5 flex items-center gap-2">
              <code className="text-muted-foreground text-xs">
                {showKey[key.id] ? key.key : maskKey(key.key)}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() =>
                  setShowKey((prev) => ({ ...prev, [key.id]: !prev[key.id] }))
                }
              >
                {showKey[key.id] ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </Button>
            </div>

            <div className="text-muted-foreground mt-2 flex gap-4 text-xs">
              <span>Created {key.created}</span>
              <span>Last used {key.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="text-sm font-medium">Create New Key</h3>
        <div className="mt-3 space-y-3">
          <div>
            <Label htmlFor="key-name" className="text-xs">
              Key Name
            </Label>
            <Input
              id="key-name"
              placeholder="e.g., Production API Key"
              className="mt-1 h-9"
            />
          </div>

          <div>
            <Label className="text-xs">Permissions</Label>
            <ToggleGroup
              type="multiple"
              value={selectedPermissions}
              onValueChange={setSelectedPermissions}
              className="mt-1 justify-start"
            >
              {["read", "write", "admin"].map((permission) => (
                <ToggleGroupItem key={permission} value={permission} size="sm">
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <Button size="sm">
            <Plus className="mr-2 h-3.5 w-3.5" />
            Create API Key
          </Button>
        </div>
      </div>
    </div>
  );
}
