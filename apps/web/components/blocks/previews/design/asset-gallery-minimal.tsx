"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Image, FileCode, FileImage, Search } from "lucide-react";

const assets = [
  { name: "hero-banner.png", type: "PNG", gradient: "from-violet-500 to-purple-600", icon: FileImage },
  { name: "logo.svg", type: "SVG", gradient: "from-emerald-400 to-teal-500", icon: FileCode },
  { name: "icon-set.svg", type: "SVG", gradient: "from-amber-400 to-orange-500", icon: FileCode },
  { name: "team-photo.jpg", type: "JPG", gradient: "from-sky-400 to-blue-500", icon: Image },
  { name: "pattern.png", type: "PNG", gradient: "from-rose-400 to-pink-500", icon: FileImage },
  { name: "gradient-bg.png", type: "PNG", gradient: "from-indigo-400 to-violet-500", icon: FileImage },
  { name: "avatar-1.jpg", type: "JPG", gradient: "from-cyan-400 to-sky-500", icon: Image },
  { name: "mockup.png", type: "PNG", gradient: "from-fuchsia-400 to-pink-500", icon: FileImage },
  { name: "illustration.svg", type: "SVG", gradient: "from-lime-400 to-green-500", icon: FileCode },
];

export default function AssetGalleryMinimal() {
  const [search, setSearch] = useState("");

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <h2 className="text-lg font-semibold">Assets</h2>
      <p className="text-sm text-muted-foreground mt-1">Browse your project assets.</p>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {filtered.map((asset) => (
          <Card key={asset.name} className="overflow-hidden">
            <CardContent className="p-0">
              <div
                className={`flex h-24 items-center justify-center bg-gradient-to-br ${asset.gradient}`}
              >
                <asset.icon className="h-8 w-8 text-white/80" />
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-medium">{asset.name}</p>
                <p className="text-[10px] text-muted-foreground">{asset.type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">No assets found.</p>
      )}
    </div>
  );
}
