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
  Download,
  Save,
  X,
  Link2,
  Lock,
  Unlock,
  Clock,
  Hash,
  ToggleLeft,
  Globe,
  KeyRound,
  Database,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type VarType = "url" | "secret" | "boolean" | "number" | "string";
type VarGroup = "database" | "api-keys" | "feature-flags" | "general";

interface EnvVar {
  id: number;
  key: string;
  value: string;
  environments: string[];
  type: VarType;
  group: VarGroup;
  encrypted: boolean;
  lastModifiedBy: string;
  lastModifiedAt: string;
  linked: boolean;
}

const allVariables: EnvVar[] = [
  { id: 1, key: "DATABASE_URL", value: "postgresql://user:pass@db.example.com:5432/mydb", environments: ["production", "preview"], type: "url", group: "database", encrypted: true, lastModifiedBy: "John", lastModifiedAt: "2h ago", linked: true },
  { id: 2, key: "DATABASE_POOL_SIZE", value: "20", environments: ["production"], type: "number", group: "database", encrypted: false, lastModifiedBy: "Sarah", lastModifiedAt: "1d ago", linked: false },
  { id: 3, key: "REDIS_URL", value: "redis://default:abc123@redis.example.com:6379", environments: ["production", "preview"], type: "url", group: "database", encrypted: true, lastModifiedBy: "John", lastModifiedAt: "3h ago", linked: true },
  { id: 4, key: "REDIS_URL", value: "redis://localhost:6379", environments: ["development"], type: "url", group: "database", encrypted: false, lastModifiedBy: "John", lastModifiedAt: "3h ago", linked: true },
  { id: 5, key: "STRIPE_SECRET_KEY", value: "sk_live_51abc123def456ghi789jkl", environments: ["production"], type: "secret", group: "api-keys", encrypted: true, lastModifiedBy: "Admin", lastModifiedAt: "5d ago", linked: false },
  { id: 6, key: "STRIPE_SECRET_KEY", value: "sk_test_51abc123def456ghi789jkl", environments: ["development", "preview"], type: "secret", group: "api-keys", encrypted: true, lastModifiedBy: "Admin", lastModifiedAt: "5d ago", linked: false },
  { id: 7, key: "NEXT_PUBLIC_API_URL", value: "https://api.myapp.com/v1", environments: ["production", "preview", "development"], type: "url", group: "api-keys", encrypted: false, lastModifiedBy: "Sarah", lastModifiedAt: "12h ago", linked: true },
  { id: 8, key: "SENTRY_DSN", value: "https://abc123@o456.ingest.sentry.io/789", environments: ["production", "preview"], type: "url", group: "api-keys", encrypted: true, lastModifiedBy: "Mike", lastModifiedAt: "2d ago", linked: true },
  { id: 9, key: "OPENAI_API_KEY", value: "sk-proj-abc123def456ghi789jklmno", environments: ["production", "preview", "development"], type: "secret", group: "api-keys", encrypted: true, lastModifiedBy: "John", lastModifiedAt: "1h ago", linked: true },
  { id: 10, key: "ENABLE_DARK_MODE", value: "true", environments: ["production", "preview", "development"], type: "boolean", group: "feature-flags", encrypted: false, lastModifiedBy: "Sarah", lastModifiedAt: "6h ago", linked: true },
  { id: 11, key: "ENABLE_BETA_FEATURES", value: "false", environments: ["production"], type: "boolean", group: "feature-flags", encrypted: false, lastModifiedBy: "Mike", lastModifiedAt: "1d ago", linked: false },
  { id: 12, key: "ENABLE_BETA_FEATURES", value: "true", environments: ["development", "preview"], type: "boolean", group: "feature-flags", encrypted: false, lastModifiedBy: "Mike", lastModifiedAt: "1d ago", linked: false },
  { id: 13, key: "NEXT_PUBLIC_SITE_URL", value: "https://myapp.vercel.app", environments: ["production"], type: "url", group: "general", encrypted: false, lastModifiedBy: "Admin", lastModifiedAt: "7d ago", linked: false },
  { id: 14, key: "NEXT_PUBLIC_SITE_URL", value: "http://localhost:3000", environments: ["development"], type: "url", group: "general", encrypted: false, lastModifiedBy: "Admin", lastModifiedAt: "7d ago", linked: false },
  { id: 15, key: "NODE_ENV", value: "production", environments: ["production"], type: "string", group: "general", encrypted: false, lastModifiedBy: "System", lastModifiedAt: "30d ago", linked: false },
  { id: 16, key: "LOG_LEVEL", value: "info", environments: ["production", "preview"], type: "string", group: "general", encrypted: false, lastModifiedBy: "John", lastModifiedAt: "4h ago", linked: true },
  { id: 17, key: "MAX_UPLOAD_SIZE", value: "10485760", environments: ["production", "preview", "development"], type: "number", group: "general", encrypted: false, lastModifiedBy: "Sarah", lastModifiedAt: "3d ago", linked: true },
];

const typeConfig: Record<VarType, { label: string; color: string }> = {
  url: { label: "URL", color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950" },
  secret: { label: "Secret", color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950" },
  boolean: { label: "Bool", color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950" },
  number: { label: "Num", color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950" },
  string: { label: "Str", color: "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950" },
};

const groupConfig: Record<VarGroup, { label: string; icon: typeof Database }> = {
  "database": { label: "Database", icon: Database },
  "api-keys": { label: "API Keys", icon: KeyRound },
  "feature-flags": { label: "Feature Flags", icon: ToggleLeft },
  "general": { label: "General", icon: Settings2 },
};

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

export default function EnvVariablesFeatureRich() {
  const [variables] = useState<EnvVar[]>(allVariables);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("production");
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newEnvs, setNewEnvs] = useState<string[]>(["development"]);
  const [newEncrypted, setNewEncrypted] = useState(false);
  const [groupFilter, setGroupFilter] = useState<string>("all");

  const toggleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVars = variables.filter(
    (v) =>
      v.environments.includes(activeTab) &&
      (search === "" || v.key.toLowerCase().includes(search.toLowerCase())) &&
      (groupFilter === "all" || v.group === groupFilter)
  );

  const groupedVars = (Object.keys(groupConfig) as VarGroup[]).reduce(
    (acc, group) => {
      const vars = filteredVars.filter((v) => v.group === group);
      if (vars.length > 0) acc[group] = vars;
      return acc;
    },
    {} as Record<VarGroup, EnvVar[]>
  );

  const bulkText = filteredVars
    .map((v) => `${v.key}=${v.value}`)
    .join("\n");

  const totalCount = variables.filter((v) =>
    v.environments.includes(activeTab)
  ).length;

  const handleExport = () => {
    navigator.clipboard.writeText(bulkText);
  };

  const resetForm = () => {
    setShowAddForm(false);
    setNewKey("");
    setNewValue("");
    setNewEnvs(["development"]);
    setNewEncrypted(false);
  };

  const toggleNewEnv = (env: string) => {
    setNewEnvs((prev) =>
      prev.includes(env) ? prev.filter((e) => e !== env) : [...prev, env]
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              Environment Variables
              <Badge variant="secondary" className="font-mono text-xs">
                {totalCount}
              </Badge>
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage variables, secrets, and feature flags across environments.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="bulk-edit" className="text-xs">
              Bulk Edit
            </Label>
            <Switch
              id="bulk-edit"
              checked={bulkEditMode}
              onCheckedChange={setBulkEditMode}
            />
          </div>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowImport(!showImport)}
        >
          <Upload size={14} className="mr-2" />
          Import .env
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download size={14} className="mr-2" />
          Export .env
        </Button>
        <Button size="sm" onClick={() => setShowAddForm(true)}>
          <Plus size={14} className="mr-2" />
          Add Variable
        </Button>
      </div>

      {showImport && (
        <Card className="mt-4 py-0 shadow-none">
          <CardContent className="p-4">
            <Label className="text-xs">
              Paste your .env file contents below
            </Label>
            <Textarea
              placeholder={"DATABASE_URL=postgresql://...\nAPI_KEY=sk_live_..."}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="mt-2 min-h-[100px] font-mono text-sm"
            />
            <div className="mt-3 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowImport(false);
                  setImportText("");
                }}
              >
                Cancel
              </Button>
              <Button size="sm">Import Variables</Button>
            </div>
          </CardContent>
        </Card>
      )}

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
            <div className="mt-3 flex items-center gap-6">
              <div>
                <Label className="text-xs">Environments</Label>
                <div className="mt-1 flex gap-2">
                  {["production", "preview", "development"].map((env) => (
                    <div key={env} className="flex items-center gap-1.5">
                      <Checkbox
                        id={`new-env-${env}`}
                        checked={newEnvs.includes(env)}
                        onCheckedChange={() => toggleNewEnv(env)}
                      />
                      <Label htmlFor={`new-env-${env}`} className="text-xs capitalize">
                        {env}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="new-encrypt"
                  checked={newEncrypted}
                  onCheckedChange={(checked) =>
                    setNewEncrypted(checked as boolean)
                  }
                />
                <Label htmlFor="new-encrypt" className="text-xs">
                  Encrypt value
                </Label>
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

      <Separator className="my-4" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-[140px] text-sm">
                <SelectValue placeholder="All Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="api-keys">API Keys</SelectItem>
                <SelectItem value="feature-flags">Feature Flags</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-56">
              <Search
                size={14}
                className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                placeholder="Filter variables..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>
        </div>

        {["production", "preview", "development"].map((env) => (
          <TabsContent key={env} value={env} className="mt-4">
            {bulkEditMode ? (
              <Card className="py-0 shadow-none">
                <CardContent className="p-4">
                  <Label className="text-xs">
                    Raw .env format ({env})
                  </Label>
                  <Textarea
                    defaultValue={bulkText}
                    className="mt-2 min-h-[300px] font-mono text-sm"
                  />
                  <div className="mt-3 flex justify-end">
                    <Button size="sm">
                      <Save size={14} className="mr-2" />
                      Apply Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.keys(groupedVars).length === 0 ? (
                  <p className="text-muted-foreground py-8 text-center text-sm">
                    No variables found.
                  </p>
                ) : (
                  (Object.entries(groupedVars) as [VarGroup, EnvVar[]][]).map(
                    ([group, vars]) => {
                      const GroupIcon = groupConfig[group].icon;
                      return (
                        <div key={group}>
                          <div className="mb-2 flex items-center gap-2">
                            <GroupIcon
                              size={14}
                              className="text-muted-foreground"
                            />
                            <h3 className="text-sm font-medium">
                              {groupConfig[group].label}
                            </h3>
                            <Badge
                              variant="secondary"
                              className="text-[10px]"
                            >
                              {vars.length}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {vars.map((envVar) => (
                              <Card
                                key={envVar.id}
                                className="rounded-lg py-0 shadow-none"
                              >
                                <CardContent className="p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="min-w-[180px]">
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm font-medium">
                                          {envVar.key}
                                        </span>
                                        {envVar.linked && (
                                          <Link2
                                            size={12}
                                            className="text-muted-foreground"
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-center gap-1.5">
                                      <span
                                        className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${typeConfig[envVar.type].color}`}
                                      >
                                        {typeConfig[envVar.type].label}
                                      </span>
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
                                        onClick={() =>
                                          toggleReveal(envVar.id)
                                        }
                                      >
                                        {revealed[envVar.id] ? (
                                          <EyeOff size={14} />
                                        ) : (
                                          <Eye size={14} />
                                        )}
                                      </Button>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1.5">
                                      {envVar.encrypted ? (
                                        <Badge
                                          variant="default"
                                          className="gap-1 text-[10px]"
                                        >
                                          <Lock size={10} />
                                          Encrypted
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="outline"
                                          className="gap-1 text-[10px]"
                                        >
                                          <Unlock size={10} />
                                          Plain
                                        </Badge>
                                      )}
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
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="shrink-0"
                                        >
                                          <MoreVertical size={14} />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Pencil
                                            size={14}
                                            className="mr-2"
                                          />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Copy
                                            size={14}
                                            className="mr-2"
                                          />
                                          Copy Value
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                          <Trash2
                                            size={14}
                                            className="mr-2"
                                          />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <div className="text-muted-foreground mt-1.5 flex items-center gap-3 pl-[180px] text-[11px]">
                                    <span className="flex items-center gap-1">
                                      <Clock size={10} />
                                      Modified by {envVar.lastModifiedBy}{" "}
                                      {envVar.lastModifiedAt}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          <Separator className="mt-4" />
                        </div>
                      );
                    }
                  )
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 flex justify-end">
        <Button>
          <Save size={14} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
