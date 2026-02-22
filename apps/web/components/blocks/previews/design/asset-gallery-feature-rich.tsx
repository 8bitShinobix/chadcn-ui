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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Search,
  Upload,
  Grid3X3,
  List,
  Image,
  FileCode,
  FileImage,
  Check,
  Trash2,
  FolderOpen,
  Download,
  MoveRight,
  MoreHorizontal,
  Copy,
  CloudUpload,
  Folder,
  Star,
  Film,
  Palette,
  Layers,
} from "lucide-react";

interface Asset {
  name: string;
  type: "PNG" | "SVG" | "JPG" | "MP4";
  size: string;
  gradient: string;
  icon: typeof Image;
  dimensions: string;
  created: string;
  tags: string[];
  usageCount: number;
  category: "image" | "icon" | "video" | "illustration";
}

const assets: Asset[] = [
  { name: "hero-banner.png", type: "PNG", size: "2.4 MB", gradient: "from-violet-500 to-purple-600", icon: FileImage, dimensions: "1920x1080", created: "Jan 12, 2026", tags: ["hero", "marketing"], usageCount: 14, category: "image" },
  { name: "logo.svg", type: "SVG", size: "12 KB", gradient: "from-emerald-400 to-teal-500", icon: FileCode, dimensions: "240x240", created: "Dec 3, 2025", tags: ["branding", "logo"], usageCount: 42, category: "icon" },
  { name: "icon-set.svg", type: "SVG", size: "48 KB", gradient: "from-amber-400 to-orange-500", icon: FileCode, dimensions: "512x512", created: "Jan 8, 2026", tags: ["icons", "ui"], usageCount: 28, category: "icon" },
  { name: "team-photo.jpg", type: "JPG", size: "3.1 MB", gradient: "from-sky-400 to-blue-500", icon: Image, dimensions: "2400x1600", created: "Feb 1, 2026", tags: ["team", "about"], usageCount: 5, category: "image" },
  { name: "pattern.png", type: "PNG", size: "890 KB", gradient: "from-rose-400 to-pink-500", icon: FileImage, dimensions: "800x800", created: "Jan 20, 2026", tags: ["pattern", "background"], usageCount: 9, category: "illustration" },
  { name: "gradient-bg.png", type: "PNG", size: "1.2 MB", gradient: "from-indigo-400 to-violet-500", icon: FileImage, dimensions: "1920x1080", created: "Feb 10, 2026", tags: ["background", "gradient"], usageCount: 17, category: "illustration" },
  { name: "avatar-1.jpg", type: "JPG", size: "245 KB", gradient: "from-cyan-400 to-sky-500", icon: Image, dimensions: "400x400", created: "Dec 15, 2025", tags: ["avatar", "profile"], usageCount: 33, category: "image" },
  { name: "mockup.png", type: "PNG", size: "4.8 MB", gradient: "from-fuchsia-400 to-pink-500", icon: FileImage, dimensions: "2560x1440", created: "Feb 5, 2026", tags: ["mockup", "presentation"], usageCount: 7, category: "image" },
  { name: "illustration.svg", type: "SVG", size: "67 KB", gradient: "from-lime-400 to-green-500", icon: FileCode, dimensions: "800x600", created: "Jan 25, 2026", tags: ["illustration", "feature"], usageCount: 11, category: "illustration" },
  { name: "promo-video.mp4", type: "MP4", size: "18.2 MB", gradient: "from-red-400 to-rose-500", icon: Film, dimensions: "1920x1080", created: "Feb 14, 2026", tags: ["video", "promo"], usageCount: 3, category: "video" },
  { name: "onboarding.svg", type: "SVG", size: "34 KB", gradient: "from-teal-400 to-cyan-500", icon: FileCode, dimensions: "600x400", created: "Feb 8, 2026", tags: ["onboarding", "illustration"], usageCount: 8, category: "illustration" },
  { name: "dashboard-bg.png", type: "PNG", size: "1.8 MB", gradient: "from-slate-400 to-zinc-500", icon: FileImage, dimensions: "1440x900", created: "Jan 30, 2026", tags: ["background", "dashboard"], usageCount: 12, category: "image" },
];

const folders = [
  { name: "All Assets", icon: Layers, count: assets.length },
  { name: "Images", icon: Image, count: assets.filter((a) => a.category === "image").length },
  { name: "Icons", icon: Star, count: assets.filter((a) => a.category === "icon").length },
  { name: "Illustrations", icon: Palette, count: assets.filter((a) => a.category === "illustration").length },
  { name: "Backgrounds", icon: Folder, count: assets.filter((a) => a.tags.includes("background")).length },
];

const badgeVariant = (type: string) => {
  switch (type) {
    case "SVG":
      return "default" as const;
    case "PNG":
      return "secondary" as const;
    case "MP4":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
};

export default function AssetGalleryFeatureRich() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState<string[]>([]);
  const [activeFolder, setActiveFolder] = useState("All Assets");
  const [activeTab, setActiveTab] = useState("all");
  const [detailAsset, setDetailAsset] = useState<Asset | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const toggleSelect = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const openDetail = (asset: Asset) => {
    setDetailAsset(asset);
  };

  const filtered = assets
    .filter((a) => {
      if (activeFolder === "Images") return a.category === "image";
      if (activeFolder === "Icons") return a.category === "icon";
      if (activeFolder === "Illustrations") return a.category === "illustration";
      if (activeFolder === "Backgrounds") return a.tags.includes("background");
      return true;
    })
    .filter((a) => {
      if (activeTab === "images") return a.category === "image";
      if (activeTab === "icons") return a.category === "icon";
      if (activeTab === "videos") return a.category === "video";
      return true;
    })
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "size") return a.size.localeCompare(b.size);
      if (sort === "date") return a.created.localeCompare(b.created);
      return 0;
    });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden w-48 shrink-0 md:block">
          <h3 className="mb-3 text-sm font-semibold">Folders</h3>
          <nav className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.name}
                onClick={() => setActiveFolder(folder.name)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  activeFolder === folder.name
                    ? "bg-muted font-medium"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <folder.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{folder.name}</span>
                <span className="text-xs text-muted-foreground">{folder.count}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Asset Gallery</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage, organize, and browse your project assets.
              </p>
            </div>
          </div>

          {/* Upload drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
            className={`mt-4 flex items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/40"
            }`}
          >
            <div className="text-center">
              <CloudUpload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Drop files here to upload</p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, SVG, JPG, or MP4 up to 50MB
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[120px]">
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
          </div>

          {/* Bulk actions */}
          {selected.length > 0 && (
            <div className="mt-3 flex items-center gap-2 rounded-md bg-muted px-3 py-2">
              <Checkbox
                checked={selected.length === filtered.length}
                onCheckedChange={(checked) => {
                  setSelected(checked ? filtered.map((a) => a.name) : []);
                }}
              />
              <span className="text-sm font-medium">{selected.length} selected</span>
              <div className="ml-auto flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </Button>
                <Button variant="ghost" size="sm">
                  <MoveRight className="mr-1 h-4 w-4" />
                  Move
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
                  Clear
                </Button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="icons">Icons</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <Separator className="my-4" />

            <TabsContent value={activeTab} className="mt-0">
              {view === "grid" ? (
                <div className="grid grid-cols-3 gap-3">
                  {visible.map((asset) => (
                    <Card
                      key={asset.name}
                      className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
                      onClick={() => openDetail(asset)}
                    >
                      <CardContent className="p-0">
                        <div
                          className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${asset.gradient}`}
                        >
                          <asset.icon className="h-8 w-8 text-white/80" />
                          <div
                            className={`absolute top-2 left-2 transition-opacity ${
                              selected.includes(asset.name) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                            onClick={(e) => toggleSelect(asset.name, e)}
                          >
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                                selected.includes(asset.name)
                                  ? "border-primary bg-primary"
                                  : "border-white/60 bg-black/20"
                              }`}
                            >
                              {selected.includes(asset.name) && (
                                <Check className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40 text-white"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy URL
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MoveRight className="mr-2 h-4 w-4" />
                                  Move to Folder
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
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
                  {visible.map((asset) => (
                    <Card
                      key={asset.name}
                      className="group cursor-pointer transition-shadow hover:shadow-md"
                      onClick={() => openDetail(asset)}
                    >
                      <CardContent className="flex items-center gap-4 p-3">
                        <div
                          onClick={(e) => toggleSelect(asset.name, e)}
                          className="shrink-0"
                        >
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                              selected.includes(asset.name)
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {selected.includes(asset.name) && (
                              <Check className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br ${asset.gradient}`}
                        >
                          <asset.icon className="h-5 w-5 text-white/80" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {asset.size} &middot; {asset.dimensions}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={badgeVariant(asset.type)} className="text-[10px]">
                            {asset.type}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MoveRight className="mr-2 h-4 w-4" />
                                Move to Folder
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {visible.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <FolderOpen className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-sm text-muted-foreground">No assets found.</p>
                </div>
              )}

              {visibleCount < filtered.length && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount((c) => c + 9)}
                  >
                    Load More ({filtered.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!detailAsset} onOpenChange={(open) => !open && setDetailAsset(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{detailAsset?.name}</SheetTitle>
            <SheetDescription>Asset details and metadata</SheetDescription>
          </SheetHeader>
          {detailAsset && (
            <div className="mt-6 space-y-6">
              <div
                className={`flex h-48 items-center justify-center rounded-lg bg-gradient-to-br ${detailAsset.gradient}`}
              >
                <detailAsset.icon className="h-16 w-16 text-white/80" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-medium">{detailAsset.dimensions}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">File Size</span>
                  <span className="font-medium">{detailAsset.size}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <Badge variant={badgeVariant(detailAsset.type)}>{detailAsset.type}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{detailAsset.created}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage Count</span>
                  <span className="font-medium">{detailAsset.usageCount} references</span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {detailAsset.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
