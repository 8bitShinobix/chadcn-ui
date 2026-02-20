"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const employees = [
  {
    id: 1,
    name: "Alice Thompson",
    email: "alice@company.com",
    department: "Engineering",
    role: "Senior Developer",
    status: "Active",
    startDate: "2022-03-15",
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob@company.com",
    department: "Design",
    role: "Lead Designer",
    status: "Active",
    startDate: "2021-08-22",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@company.com",
    department: "Engineering",
    role: "Junior Developer",
    status: "On Leave",
    startDate: "2023-01-10",
  },
  {
    id: 4,
    name: "David Chen",
    email: "david@company.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "Active",
    startDate: "2020-11-05",
  },
  {
    id: 5,
    name: "Eva Patel",
    email: "eva@company.com",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Active",
    startDate: "2022-07-18",
  },
  {
    id: 6,
    name: "Frank Wilson",
    email: "frank@company.com",
    department: "Design",
    role: "UX Researcher",
    status: "Inactive",
    startDate: "2021-04-30",
  },
  {
    id: 7,
    name: "Grace Kim",
    email: "grace@company.com",
    department: "Marketing",
    role: "Content Writer",
    status: "Active",
    startDate: "2023-06-12",
  },
];

export function FilterableTable() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return employees;
    const searchLower = search.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower) ||
        emp.role.toLowerCase().includes(searchLower)
    );
  }, [search]);

  return (
    <div className="space-y-4 p-6">
      <div className="relative">
        <Search
          className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          size={16}
        />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-muted-foreground text-center">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
