"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Upload,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EnvVar {
  id: number;
  key: string;
  value: string;
  environments: string[];
}

const allVariables: EnvVar[] = [
  { id: 1, key: "DATABASE_URL", value: "postgresql://user:pass@db.example.com:5432/mydb", environments: ["production", "preview"] },
  { id: 2, key: "NEXT_PUBLIC_API_URL", value: "https://api.myapp.com/v1", environments: ["production", "preview", "development"] },
  { id: 3, key: "STRIPE_SECRET_KEY", value: "sk_live_51abc123def456ghi789jkl", environments: ["production"] },
  { id: 4, key: "STRIPE_SECRET_KEY", value: "sk_test_51abc123def456ghi789jkl", environments: ["development", "preview"] },
  { id: 5, key: "JWT_SECRET", value: "super-secret-jwt-token-value-2024", environments: ["production", "preview", "development"] },
  { id: 6, key: "REDIS_URL", value: "redis://default:abc123@redis.example.com:6379", environments: ["production"] },
  { id: 7, key: "REDIS_URL", value: "redis://localhost:6379", environments: ["development"] },
  { id: 8, key: "NEXT_PUBLIC_SITE_URL", value: "https://myapp.vercel.app", environments: ["production"] },
  { id: 9, key: "NEXT_PUBLIC_SITE_URL", value: "http://localhost:3000", environments: ["development"] },
  { id: 10, key: "SENTRY_DSN", value: "https://abc123@o456.ingest.sentry.io/789", environments: ["production", "preview"] },
  { id: 11, key: "NODE_ENV", value: "production", environments: ["production"] },
  { id: 12, key: "NODE_ENV", value: "development", environments: ["development"] },
];

const envBadgeVariant = (env: string) => {
  switch (env) {
    case "production":
      return "default" as const;
    case "preview":
      return "secondary" as const;
    case "development":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
};

export default function EnvVariablesStandard() {
  const [variables] = useState<EnvVar[]>(allVariables);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newEnvs, setNewEnvs] = useState<string[]>(["development"]);
  const [activeTab, setActiveTab] = useState("production");

  const toggleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleNewEnv = (env: string) => {
    setNewEnvs((prev) =>
      prev.includes(env) ? prev.filter((e) => e !== env) : [...prev, env]
    );
  };

  const filteredVars = variables.filter(
    (v) =>
      v.environments.includes(activeTab) &&
      (search === "" || v.key.toLowerCase().includes(search.toLowerCase()))
  );

  const resetForm = () => {
    setShowAddForm(false);
    setNewKey("");
    setNewValue("");
    setNewEnvs(["development"]);
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Environment Variables</h2>
          <p className="text-muted-foreground text-sm">
            Manage variables across your environments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload size={14} className="mr-2" />
            Bulk Import
          </Button>
          <Button size="sm" onClick={() => setShowAddForm(true)}>
            <Plus size={14} className="mr-2" />
            Add Variable
          </Button>
        </div>
      </div>
      <Separator className="my-4" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search size={14} className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Filter variables..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>

        {showAddForm && (
          <Card className="mt-4 py-0 shadow-none">
            <CardContent className="p-4">
              <h3 className="mb-3 text-sm font-medium">New Variable</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Key</Label>
                  <Input
                    placeholder="VARIABLE_NAME"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="mt-1 font-mono text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input
                    placeholder="value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="mt-1 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="mt-3">
                <Label className="text-xs">Environments</Label>
                <div className="mt-1 flex gap-2">
                  {["production", "preview", "development"].map((env) => (
                    <Badge
                      key={env}
                      variant={newEnvs.includes(env) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleNewEnv(env)}
                    >
                      {env}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X size={14} className="mr-1" />
                  Cancel
                </Button>
                <Button size="sm">
                  <Save size={14} className="mr-1" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {["production", "preview", "development"].map((env) => (
          <TabsContent key={env} value={env} className="mt-4">
            <div className="space-y-2">
              {filteredVars.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No variables found.
                </p>
              ) : (
                filteredVars.map((envVar) => (
                  <Card key={envVar.id} className="rounded-lg py-0 shadow-none">
                    <CardContent className="flex items-center gap-3 p-3">
                      <div className="min-w-[180px]">
                        <span className="font-mono text-sm font-medium">
                          {envVar.key}
                        </span>
                      </div>
                      <div className="flex flex-1 items-center gap-2">
                        <Input
                          readOnly
                          value={
                            revealed[envVar.id]
                              ? envVar.value
                              : "••••••••••••••••"
                          }
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => toggleReveal(envVar.id)}
                        >
                          {revealed[envVar.id] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </Button>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        {envVar.environments.map((e) => (
                          <Badge
                            key={e}
                            variant={envBadgeVariant(e)}
                            className="text-[10px]"
                          >
                            {e.slice(0, 4)}
                          </Badge>
                        ))}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
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
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-4" />
      <div className="flex justify-end">
        <Button>
          <Save size={14} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
