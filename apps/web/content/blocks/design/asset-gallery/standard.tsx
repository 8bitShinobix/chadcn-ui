"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Upload,
  Grid3X3,
  List,
  Image,
  FileCode,
  FileImage,
  Check,
} from "lucide-react";

const assets = [
  { name: "hero-banner.png", type: "PNG", size: "2.4 MB", gradient: "from-violet-500 to-purple-600", icon: FileImage },
  { name: "logo.svg", type: "SVG", size: "12 KB", gradient: "from-emerald-400 to-teal-500", icon: FileCode },
  { name: "icon-set.svg", type: "SVG", size: "48 KB", gradient: "from-amber-400 to-orange-500", icon: FileCode },
  { name: "team-photo.jpg", type: "JPG", size: "3.1 MB", gradient: "from-sky-400 to-blue-500", icon: Image },
  { name: "pattern.png", type: "PNG", size: "890 KB", gradient: "from-rose-400 to-pink-500", icon: FileImage },
  { name: "gradient-bg.png", type: "PNG", size: "1.2 MB", gradient: "from-indigo-400 to-violet-500", icon: FileImage },
  { name: "avatar-1.jpg", type: "JPG", size: "245 KB", gradient: "from-cyan-400 to-sky-500", icon: Image },
  { name: "mockup.png", type: "PNG", size: "4.8 MB", gradient: "from-fuchsia-400 to-pink-500", icon: FileImage },
  { name: "illustration.svg", type: "SVG", size: "67 KB", gradient: "from-lime-400 to-green-500", icon: FileCode },
];

const badgeVariant = (type: string) => {
  switch (type) {
    case "SVG":
      return "default" as const;
    case "PNG":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};

export function AssetGallery() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const sorted = [...assets]
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "size") return a.size.localeCompare(b.size);
      return 0;
    });

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <h2 className="text-lg font-semibold">Asset Gallery</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Manage and organize your project assets.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="size">Size</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid3X3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      {selected.length > 0 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{selected.length} selected</span>
          <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
            Clear
          </Button>
        </div>
      )}

      <Separator className="my-4" />

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-3">
          {sorted.map((asset) => (
            <Card
              key={asset.name}
              className={`cursor-pointer overflow-hidden transition-shadow hover:shadow-md ${
                selected.includes(asset.name) ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => toggleSelect(asset.name)}
            >
              <CardContent className="p-0">
                <div
                  className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${asset.gradient}`}
                >
                  <asset.icon className="h-8 w-8 text-white/80" />
                  {selected.includes(asset.name) && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{asset.name}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{asset.size}</span>
                    <Badge variant={badgeVariant(asset.type)} className="text-[10px]">
                      {asset.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((asset) => (
            <Card
              key={asset.name}
              className={`cursor-pointer transition-shadow hover:shadow-md ${
                selected.includes(asset.name) ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => toggleSelect(asset.name)}
            >
              <CardContent className="flex items-center gap-4 p-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br ${asset.gradient}`}
                >
                  <asset.icon className="h-5 w-5 text-white/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.size}</p>
                </div>
                <Badge variant={badgeVariant(asset.type)} className="text-[10px]">
                  {asset.type}
                </Badge>
                {selected.includes(asset.name) && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {sorted.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">No assets found.</p>
      )}
    </div>
  );
}
