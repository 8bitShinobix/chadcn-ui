"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia@example.com",
    role: "Admin",
    status: "Active",
    avatar: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson@example.com",
    role: "Editor",
    status: "Active",
    avatar: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "william@example.com",
    role: "Editor",
    status: "Active",
    avatar: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia@example.com",
    role: "Admin",
    status: "Active",
    avatar: "SD",
  },
  {
    id: 6,
    name: "Lucas Johnson",
    email: "lucas@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "LJ",
  },
];

export function DataTable() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((user) => user.id));
    }
  };

  const toggleRow = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox checked={selected.length === users.length} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(user.id)}
                  onCheckedChange={() => toggleRow(user.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>
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
      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="text-muted-foreground text-sm">
          {selected.length > 0 ? `${selected.length} of 6 selected` : "Showing 1-6 of 6"}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
