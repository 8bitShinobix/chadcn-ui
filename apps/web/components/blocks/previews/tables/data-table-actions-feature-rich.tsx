"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  Copy,
  Download,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react"

const users = [
  { id: 1, name: "Olivia Martin", email: "olivia@example.com", role: "Admin", status: "Active" as const, avatar: "OM" },
  { id: 2, name: "Jackson Lee", email: "jackson@example.com", role: "Editor", status: "Active" as const, avatar: "JL" },
  { id: 3, name: "Isabella Nguyen", email: "isabella@example.com", role: "Viewer", status: "Inactive" as const, avatar: "IN" },
  { id: 4, name: "William Kim", email: "william@example.com", role: "Editor", status: "Active" as const, avatar: "WK" },
  { id: 5, name: "Sofia Davis", email: "sofia@example.com", role: "Admin", status: "Pending" as const, avatar: "SD" },
  { id: 6, name: "Lucas Johnson", email: "lucas@example.com", role: "Viewer", status: "Inactive" as const, avatar: "LJ" },
  { id: 7, name: "Mia Thompson", email: "mia@example.com", role: "Editor", status: "Active" as const, avatar: "MT" },
  { id: 8, name: "Ethan Rodriguez", email: "ethan@example.com", role: "Viewer", status: "Pending" as const, avatar: "ER" },
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

export default function DataTableActionsFeatureRich() {
  const [selected, setSelected] = useState<number[]>([])
  const [search, setSearch] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  )

  const toggleAll = () => {
    if (selected.length === filteredUsers.length) {
      setSelected([])
    } else {
      setSelected(filteredUsers.map((user) => user.id))
    }
  }

  const toggleRow = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const clearSelection = () => {
    setSelected([])
    setConfirmDelete(false)
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setSelected([])
    setConfirmDelete(false)
  }

  const handleExport = () => {
    // Export CSV logic
  }

  const handleChangeStatus = (_status: string) => {
    setSelected([])
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

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
          {confirmDelete ? (
            <>
              <span className="text-destructive text-sm">
                Delete {selected.length} item{selected.length > 1 ? "s" : ""}?
              </span>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Confirm
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change Status
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleChangeStatus("Active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeStatus("Inactive")}>
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeStatus("Pending")}>
                    Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  filteredUsers.length > 0 &&
                  selected.length === filteredUsers.length
                }
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
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
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                    {user.avatar}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-muted-foreground border-t px-4 py-3 text-sm">
        {selected.length > 0
          ? `${selected.length} of ${filteredUsers.length} row(s) selected`
          : `${filteredUsers.length} row(s) total`}
      </div>
    </div>
  )
}
