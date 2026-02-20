"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Download, Trash2, X } from "lucide-react"

const users = [
  { id: 1, name: "Olivia Martin", email: "olivia@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jackson Lee", email: "jackson@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Isabella Nguyen", email: "isabella@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "William Kim", email: "william@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Sofia Davis", email: "sofia@example.com", role: "Admin", status: "Pending" },
  { id: 6, name: "Lucas Johnson", email: "lucas@example.com", role: "Viewer", status: "Inactive" },
]

function getStatusVariant(status: string) {
  switch (status) {
    case "Active":
      return "default" as const
    case "Inactive":
      return "secondary" as const
    case "Pending":
      return "outline" as const
    default:
      return "secondary" as const
  }
}

export default function DataTableActionsStandard() {
  const [selected, setSelected] = useState<number[]>([])

  const toggleAll = () => {
    if (selected.length === users.length) {
      setSelected([])
    } else {
      setSelected(users.map((user) => user.id))
    }
  }

  const toggleRow = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const clearSelection = () => {
    setSelected([])
  }

  const handleDelete = () => {
    setSelected([])
  }

  const handleExport = () => {
    // Export CSV logic
  }

  return (
    <div className="p-6">
      <div
        className={cn(
          "mb-4 flex items-center gap-3 overflow-hidden rounded-lg border px-4 transition-all duration-200",
          selected.length > 0
            ? "bg-muted/50 max-h-14 py-2 opacity-100"
            : "max-h-0 border-transparent py-0 opacity-0"
        )}
      >
        <span className="text-sm font-medium">
          {selected.length} selected
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button variant="ghost" size="sm" onClick={clearSelection}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selected.length === users.length}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className={cn(selected.includes(user.id) && "bg-muted/50")}
            >
              <TableCell>
                <Checkbox
                  checked={selected.includes(user.id)}
                  onCheckedChange={() => toggleRow(user.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-muted-foreground border-t px-4 py-3 text-sm">
        {selected.length > 0
          ? `${selected.length} of ${users.length} row(s) selected`
          : `${users.length} row(s) total`}
      </div>
    </div>
  )
}
