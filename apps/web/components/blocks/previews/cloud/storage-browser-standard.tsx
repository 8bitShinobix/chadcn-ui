"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  FolderOpen,
  File,
  Image,
  FileText,
  Upload,
  FolderPlus,
  MoreVertical,
  Download,
  Pencil,
  Trash2,
  Link,
  LayoutGrid,
  List,
  Search,
  HardDrive,
} from "lucide-react"

type FileType = "folder" | "file" | "image" | "document"

interface StorageItem {
  name: string
  type: FileType
  size: string
  modified: string
  extension?: string
}

const items: StorageItem[] = [
  { name: "backups/", type: "folder", size: "--", modified: "Feb 19, 2026" },
  { name: "assets/", type: "folder", size: "--", modified: "Feb 14, 2026" },
  { name: "logs/", type: "folder", size: "--", modified: "Feb 20, 2026" },
  { name: "index.html", type: "document", size: "12.8 KB", modified: "Feb 18, 2026", extension: "HTML" },
  { name: "banner.png", type: "image", size: "3.6 MB", modified: "Feb 12, 2026", extension: "PNG" },
  { name: "schema.json", type: "file", size: "2.1 KB", modified: "Feb 10, 2026", extension: "JSON" },
  { name: "report.csv", type: "file", size: "1.4 MB", modified: "Feb 8, 2026", extension: "CSV" },
  { name: "notes.md", type: "document", size: "6.3 KB", modified: "Feb 5, 2026", extension: "MD" },
  { name: "invoice.pdf", type: "document", size: "420 KB", modified: "Jan 30, 2026", extension: "PDF" },
  { name: "thumbnail.png", type: "image", size: "890 KB", modified: "Jan 25, 2026", extension: "PNG" },
]

function ItemIcon({ type }: { type: FileType }) {
  switch (type) {
    case "folder":
      return <FolderOpen className="h-4 w-4 text-blue-500" />
    case "image":
      return <Image className="h-4 w-4 text-emerald-500" />
    case "document":
      return <FileText className="h-4 w-4 text-orange-500" />
    default:
      return <File className="h-4 w-4 text-muted-foreground" />
  }
}

function extensionVariant(ext: string) {
  switch (ext) {
    case "PNG":
      return "default" as const
    case "JSON":
      return "secondary" as const
    case "CSV":
      return "outline" as const
    case "MD":
      return "secondary" as const
    case "PDF":
      return "destructive" as const
    case "HTML":
      return "default" as const
    default:
      return "outline" as const
  }
}

export default function StorageBrowserStandard() {
  const [view, setView] = useState("list")
  const [sortBy, setSortBy] = useState("name")
  const [search, setSearch] = useState("")

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "size":
        if (a.type === "folder") return -1
        if (b.type === "folder") return 1
        return a.size.localeCompare(b.size)
      case "date":
        return b.modified.localeCompare(a.modified)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Storage Browser</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and manage files in your storage bucket.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <FolderPlus className="mr-2 h-3.5 w-3.5" />
            New Folder
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-3.5 w-3.5" />
            Upload
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">prod-bucket</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">public</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">static</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="size">Size</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)}>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="mt-4">
        {view === "list" ? (
          <div className="space-y-1">
            {sorted.map((item) => (
              <Card key={item.name} className="rounded-lg py-0 shadow-none">
                <CardContent className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ItemIcon type={item.type} />
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.extension && (
                      <Badge variant={extensionVariant(item.extension)} className="text-[10px] px-1.5 py-0">
                        {item.extension}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-right text-xs text-muted-foreground">{item.size}</span>
                    <span className="w-28 text-right text-xs text-muted-foreground">{item.modified}</span>
                    {item.type !== "folder" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {sorted.map((item) => (
              <Card key={item.name} className="rounded-lg py-0 shadow-none cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="flex flex-col items-center gap-2 p-4">
                  <ItemIcon type={item.type} />
                  <span className="text-xs font-medium text-center truncate w-full">{item.name}</span>
                  <span className="text-[10px] text-muted-foreground">{item.size}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {sorted.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No files match your search.
        </div>
      )}

      <Separator className="my-4" />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <HardDrive className="h-3.5 w-3.5" />
        <span>2.1 GB / 5 GB used</span>
        <div className="ml-2 h-1.5 w-32 rounded-full bg-muted">
          <div className="h-1.5 w-[42%] rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )
}
