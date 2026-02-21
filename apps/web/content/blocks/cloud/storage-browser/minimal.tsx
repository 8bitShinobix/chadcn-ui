"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FolderOpen, File, Image, Upload } from "lucide-react"

const items = [
  { name: "documents/", type: "folder" as const, size: "--", modified: "Jan 12, 2026" },
  { name: "images/", type: "folder" as const, size: "--", modified: "Feb 3, 2026" },
  { name: "readme.md", type: "file" as const, size: "4.2 KB", modified: "Feb 18, 2026" },
  { name: "config.json", type: "file" as const, size: "1.1 KB", modified: "Feb 10, 2026" },
  { name: "logo.png", type: "image" as const, size: "2.4 MB", modified: "Jan 28, 2026" },
  { name: "data.csv", type: "file" as const, size: "890 KB", modified: "Feb 15, 2026" },
]

function ItemIcon({ type }: { type: "folder" | "file" | "image" }) {
  switch (type) {
    case "folder":
      return <FolderOpen className="h-4 w-4 text-blue-500" />
    case "image":
      return <Image className="h-4 w-4 text-emerald-500" />
    default:
      return <File className="h-4 w-4 text-muted-foreground" />
  }
}

export function StorageBrowser() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">my-bucket</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">uploads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">images</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button size="sm" variant="outline">
          <Upload className="mr-2 h-3.5 w-3.5" />
          Upload
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ItemIcon type={item.type} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="w-20 text-right text-xs text-muted-foreground">{item.size}</span>
              <span className="w-28 text-right text-xs text-muted-foreground">{item.modified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
