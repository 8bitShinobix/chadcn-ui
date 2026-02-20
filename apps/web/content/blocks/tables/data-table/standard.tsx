"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia@example.com",
    role: "Admin",
    status: "Active",
    avatar: "OM",
    joined: "Jan 2024",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson@example.com",
    role: "Editor",
    status: "Active",
    avatar: "JL",
    joined: "Feb 2024",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "IN",
    joined: "Mar 2024",
  },
  {
    id: 4,
    name: "William Kim",
    email: "william@example.com",
    role: "Editor",
    status: "Active",
    avatar: "WK",
    joined: "Apr 2024",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia@example.com",
    role: "Admin",
    status: "Active",
    avatar: "SD",
    joined: "May 2024",
  },
  {
    id: 6,
    name: "Lucas Johnson",
    email: "lucas@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "LJ",
    joined: "Jun 2024",
  },
];

export function DataTable() {
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
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
              <TableCell>{user.joined}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>6 results</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
