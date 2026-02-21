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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
  Copy,
  Move,
  Clock,
  Shield,
  Globe,
  Lock,
  CloudUpload,
} from "lucide-react"

type FileType = "folder" | "file" | "image" | "document"

interface StorageItem {
  id: string
  name: string
  type: FileType
  size: string
  sizeBytes: number
  modified: string
  created: string
  extension?: string
  contentType?: string
  etag?: string
  access: "public" | "private"
  storageClass: string
  url?: string
  versions?: { version: string; modified: string; size: string }[]
}

const items: StorageItem[] = [
  {
    id: "obj_1",
    name: "backups/",
    type: "folder",
    size: "--",
    sizeBytes: 0,
    modified: "Feb 19, 2026",
    created: "Dec 1, 2025",
    access: "private",
    storageClass: "Standard",
  },
  {
    id: "obj_2",
    name: "assets/",
    type: "folder",
    size: "--",
    sizeBytes: 0,
    modified: "Feb 14, 2026",
    created: "Nov 15, 2025",
    access: "public",
    storageClass: "Standard",
  },
  {
    id: "obj_3",
    name: "logs/",
    type: "folder",
    size: "--",
    sizeBytes: 0,
    modified: "Feb 20, 2026",
    created: "Oct 5, 2025",
    access: "private",
    storageClass: "Standard",
  },
  {
    id: "obj_4",
    name: "index.html",
    type: "document",
    size: "12.8 KB",
    sizeBytes: 13107,
    modified: "Feb 18, 2026",
    created: "Jan 10, 2026",
    extension: "HTML",
    contentType: "text/html",
    etag: '"a3f8c2e1d4b5"',
    access: "public",
    storageClass: "Standard",
    url: "https://cdn.example.com/static/index.html",
    versions: [
      { version: "v3", modified: "Feb 18, 2026", size: "12.8 KB" },
      { version: "v2", modified: "Feb 10, 2026", size: "11.2 KB" },
      { version: "v1", modified: "Jan 10, 2026", size: "9.4 KB" },
    ],
  },
  {
    id: "obj_5",
    name: "banner.png",
    type: "image",
    size: "3.6 MB",
    sizeBytes: 3774873,
    modified: "Feb 12, 2026",
    created: "Feb 1, 2026",
    extension: "PNG",
    contentType: "image/png",
    etag: '"b7d4e8f2a1c6"',
    access: "public",
    storageClass: "Standard",
    url: "https://cdn.example.com/static/banner.png",
    versions: [
      { version: "v2", modified: "Feb 12, 2026", size: "3.6 MB" },
      { version: "v1", modified: "Feb 1, 2026", size: "4.1 MB" },
    ],
  },
  {
    id: "obj_6",
    name: "schema.json",
    type: "file",
    size: "2.1 KB",
    sizeBytes: 2150,
    modified: "Feb 10, 2026",
    created: "Jan 20, 2026",
    extension: "JSON",
    contentType: "application/json",
    etag: '"c9a1b3d5e7f2"',
    access: "private",
    storageClass: "Standard",
    url: "https://cdn.example.com/static/schema.json",
  },
  {
    id: "obj_7",
    name: "report.csv",
    type: "file",
    size: "1.4 MB",
    sizeBytes: 1468006,
    modified: "Feb 8, 2026",
    created: "Feb 8, 2026",
    extension: "CSV",
    contentType: "text/csv",
    etag: '"d2e4f6a8b0c1"',
    access: "private",
    storageClass: "Infrequent Access",
    url: "https://cdn.example.com/static/report.csv",
  },
  {
    id: "obj_8",
    name: "notes.md",
    type: "document",
    size: "6.3 KB",
    sizeBytes: 6451,
    modified: "Feb 5, 2026",
    created: "Jan 15, 2026",
    extension: "MD",
    contentType: "text/markdown",
    etag: '"e5f7a9b1c3d4"',
    access: "private",
    storageClass: "Standard",
    url: "https://cdn.example.com/static/notes.md",
  },
  {
    id: "obj_9",
    name: "invoice.pdf",
    type: "document",
    size: "420 KB",
    sizeBytes: 430080,
    modified: "Jan 30, 2026",
    created: "Jan 30, 2026",
    extension: "PDF",
    contentType: "application/pdf",
    etag: '"f8a0b2c4d6e7"',
    access: "private",
    storageClass: "Archive",
    url: "https://cdn.example.com/static/invoice.pdf",
  },
  {
    id: "obj_10",
    name: "thumbnail.png",
    type: "image",
    size: "890 KB",
    sizeBytes: 911360,
    modified: "Jan 25, 2026",
    created: "Jan 20, 2026",
    extension: "PNG",
    contentType: "image/png",
    etag: '"a1b3c5d7e9f0"',
    access: "public",
    storageClass: "Standard",
    url: "https://cdn.example.com/static/thumbnail.png",
  },
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

export function StorageBrowser() {
  const [view, setView] = useState("list")
  const [sortBy, setSortBy] = useState("name")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [detailItem, setDetailItem] = useState<StorageItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [versioningEnabled, setVersioningEnabled] = useState(true)
  const [signedUrlExpiry, setSignedUrlExpiry] = useState("24h")
  const [signedUrl, setSignedUrl] = useState("")
  const [activeTab, setActiveTab] = useState("files")

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "size":
        return a.sizeBytes - b.sizeBytes
      case "date":
        return b.modified.localeCompare(a.modified)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === sorted.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(sorted.map((i) => i.id)))
    }
  }

  const openDetail = (item: StorageItem) => {
    setDetailItem(item)
    setSheetOpen(true)
    setSignedUrl("")
  }

  const generateSignedUrl = () => {
    if (detailItem) {
      setSignedUrl(
        `https://cdn.example.com/static/${detailItem.name}?token=sk_live_abc123&expires=${signedUrlExpiry}`
      )
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Storage Browser</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage objects, access policies, and storage settings.
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <Separator className="my-4" />

        <TabsContent value="files" className="mt-0">
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
                placeholder="Search files and folders..."
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

          <div className="mt-3 flex items-center gap-2">
            <Button size="sm" variant="outline">
              <FolderPlus className="mr-2 h-3.5 w-3.5" />
              New Folder
            </Button>
            <Button size="sm">
              <Upload className="mr-2 h-3.5 w-3.5" />
              Upload
            </Button>
            {selected.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <span className="text-xs text-muted-foreground">{selected.size} selected</span>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Move className="mr-2 h-3.5 w-3.5" />
                  Move
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete
                </Button>
              </>
            )}
          </div>

          {/* Drag-and-drop upload zone */}
          <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-muted-foreground/50">
            <div className="flex flex-col items-center gap-2 text-center">
              <CloudUpload className="h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or click Upload above
              </p>
              <p className="text-xs text-muted-foreground/70">
                Max file size: 100 MB
              </p>
            </div>
          </div>

          <div className="mt-4">
            {view === "list" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        checked={selected.size === sorted.length && sorted.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-20">Size</TableHead>
                    <TableHead className="w-28">Modified</TableHead>
                    <TableHead className="w-20">Access</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => item.type !== "folder" && openDetail(item)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selected.has(item.id)}
                          onCheckedChange={() => toggleSelect(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ItemIcon type={item.type} />
                          <span className="text-sm font-medium">{item.name}</span>
                          {item.extension && (
                            <Badge variant={extensionVariant(item.extension)} className="text-[10px] px-1.5 py-0">
                              {item.extension}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.size}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.modified}</TableCell>
                      <TableCell>
                        {item.type !== "folder" && (
                          <Badge variant={item.access === "public" ? "default" : "secondary"} className="text-[10px]">
                            {item.access === "public" ? (
                              <Globe className="mr-1 h-3 w-3" />
                            ) : (
                              <Lock className="mr-1 h-3 w-3" />
                            )}
                            {item.access}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
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
                              <DropdownMenuItem>
                                <Move className="mr-2 h-4 w-4" />
                                Move
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {sorted.map((item) => (
                  <Card
                    key={item.id}
                    className="relative rounded-lg py-0 shadow-none cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => item.type !== "folder" && openDetail(item)}
                  >
                    <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.has(item.id)}
                        onCheckedChange={() => toggleSelect(item.id)}
                      />
                    </div>
                    <CardContent className="flex flex-col items-center gap-2 p-4 pt-8">
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
            <span className="ml-auto">{items.filter((i) => i.type !== "folder").length} objects</span>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="space-y-6">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-base">Bucket Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Versioning</p>
                    <p className="text-xs text-muted-foreground">
                      Keep multiple versions of objects in this bucket.
                    </p>
                  </div>
                  <Switch checked={versioningEnabled} onCheckedChange={setVersioningEnabled} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Default Access</p>
                    <p className="text-xs text-muted-foreground">
                      Default access policy for new uploads.
                    </p>
                  </div>
                  <Select defaultValue="private">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Default Storage Class</p>
                    <p className="text-xs text-muted-foreground">
                      Storage tier for new objects.
                    </p>
                  </div>
                  <Select defaultValue="standard">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="ia">Infrequent Access</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="text-base">CORS Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-3">
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
{`[
  {
    "origin": ["https://example.com"],
    "method": ["GET", "PUT"],
    "maxAge": 3600
  }
]`}
                  </pre>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  Edit Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* File Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {detailItem && <ItemIcon type={detailItem.type} />}
              {detailItem?.name}
            </SheetTitle>
            <SheetDescription>File details and access management</SheetDescription>
          </SheetHeader>

          {detailItem && (
            <div className="mt-6 space-y-6">
              {/* Metadata */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Metadata</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span>{detailItem.size}</span>
                  <span className="text-muted-foreground">Content Type</span>
                  <span className="font-mono text-xs">{detailItem.contentType}</span>
                  <span className="text-muted-foreground">Created</span>
                  <span>{detailItem.created}</span>
                  <span className="text-muted-foreground">Modified</span>
                  <span>{detailItem.modified}</span>
                  <span className="text-muted-foreground">ETag</span>
                  <span className="font-mono text-xs">{detailItem.etag}</span>
                  <span className="text-muted-foreground">Storage Class</span>
                  <span>{detailItem.storageClass}</span>
                </div>
              </div>

              <Separator />

              {/* Public URL */}
              {detailItem.url && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Public URL</h4>
                  <div className="flex items-center gap-2">
                    <Input value={detailItem.url} readOnly className="text-xs font-mono" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              <Separator />

              {/* Access Policy */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Access Policy
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={detailItem.access === "public" ? "default" : "secondary"}>
                      {detailItem.access === "public" ? (
                        <Globe className="mr-1 h-3 w-3" />
                      ) : (
                        <Lock className="mr-1 h-3 w-3" />
                      )}
                      {detailItem.access}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Public</span>
                    <Switch checked={detailItem.access === "public"} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Signed URL Generator */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Signed URL
                </h4>
                <div className="flex items-center gap-2">
                  <Select value={signedUrlExpiry} onValueChange={setSignedUrlExpiry}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={generateSignedUrl}>
                    Generate
                  </Button>
                </div>
                {signedUrl && (
                  <div className="flex items-center gap-2">
                    <Input value={signedUrl} readOnly className="text-xs font-mono" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Version History */}
              {versioningEnabled && detailItem.versions && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Version History
                  </h4>
                  <div className="space-y-2">
                    {detailItem.versions.map((v, i) => (
                      <div
                        key={v.version}
                        className="flex items-center justify-between rounded-md border px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant={i === 0 ? "default" : "outline"} className="text-[10px]">
                            {v.version}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{v.modified}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{v.size}</span>
                          {i !== 0 && (
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              Restore
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Storage Class */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Storage Class</h4>
                <Select defaultValue={detailItem.storageClass.toLowerCase().replace(" ", "-")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="infrequent-access">Infrequent Access</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
