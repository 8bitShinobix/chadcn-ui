"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Key, Copy, Plus, Trash2, RotateCw, Eye, EyeOff, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const createKeySchema = z.object({
  keyName: z.string().min(3, "Key name must be at least 3 characters"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

type CreateKeyFormData = z.infer<typeof createKeySchema>;

export function ApiKeySettings() {
  const [showKey, setShowKey] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateKeyFormData>({
    resolver: zodResolver(createKeySchema),
    defaultValues: {
      keyName: "",
      permissions: [],
    },
  });

  const selectedPermissions = watch("permissions");

  const onSubmit = async (data: CreateKeyFormData) => {
    setIsLoading(true);
    console.log("Creating API key:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    reset();
  };

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
  };

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
    const start = key.slice(0, 12);
    const end = key.slice(-6);
    return `${start}${"•".repeat(12)}${end}`;
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-lg font-semibold">API Keys</h2>
        <p className="text-muted-foreground text-sm">Manage your API keys.</p>
      </div>
      <Separator className="my-4" />

      <div className="mt-6 space-y-4">
        {keys.map((key) => (
          <Card key={key.id} className="rounded-lg py-0 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-muted-foreground" />
                  <span className="font-medium">{key.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCopyKey(key.key)}>
                      <Copy size={14} className="mr-2" />
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCw size={14} className="mr-2" />
                      Regenerate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 size={14} className="mr-2" />
                      Revoke
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="bg-muted flex-1 rounded px-3 py-1.5 font-mono text-sm">
                  {showKey[key.id] ? key.key : maskKey(key.key)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKey((prev) => ({ ...prev, [key.id]: !prev[key.id] }))}
                >
                  {showKey[key.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
              </div>

              <div className="mt-2 flex gap-2">
                {key.permissions.map((permission) => (
                  <Badge key={permission} variant="secondary">
                    {permission}
                  </Badge>
                ))}
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-3">
          <div>
            <Label htmlFor="key-name">Key Name</Label>
            <Input
              id="key-name"
              placeholder="e.g., Production API Key"
              className="mt-1"
              {...register("keyName")}
            />
            {errors.keyName && (
              <p className="text-destructive mt-1 text-sm">{errors.keyName.message}</p>
            )}
          </div>

          <div>
            <Label>Permissions</Label>
            <ToggleGroup
              type="multiple"
              value={selectedPermissions}
              onValueChange={(value) => setValue("permissions", value, { shouldValidate: true })}
              className="mt-1 justify-start"
            >
              {["read", "write", "admin"].map((permission) => (
                <ToggleGroupItem key={permission} value={permission} size="sm">
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {errors.permissions && (
              <p className="text-destructive mt-1 text-sm">{errors.permissions.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Create API Key
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
