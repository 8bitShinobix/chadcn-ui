"use client";

import {
  Table,
  TableBody,
  TableCell,
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
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
