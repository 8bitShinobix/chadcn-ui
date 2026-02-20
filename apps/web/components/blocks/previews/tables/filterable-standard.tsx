"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const statusOptions = ["All", "Active", "On Leave", "Inactive"];
const departmentOptions = ["All", "Engineering", "Design", "Marketing"];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Active: "default",
  "On Leave": "secondary",
  Inactive: "destructive",
};

export default function FilterableStandard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = employees;

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower) ||
          emp.department.toLowerCase().includes(searchLower) ||
          emp.role.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((emp) => emp.status === statusFilter);
    }

    if (departmentFilter !== "All") {
      result = result.filter((emp) => emp.department === departmentFilter);
    }

    return result;
  }, [search, statusFilter, departmentFilter]);

  const activeFilterCount = [statusFilter !== "All", departmentFilter !== "All"].filter(
    Boolean
  ).length;

  const clearFilters = () => {
    setStatusFilter("All");
    setDepartmentFilter("All");
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setStatusFilter(option)}
                className={statusFilter === option ? "bg-accent" : ""}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Department
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {departmentOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setDepartmentFilter(option)}
                className={departmentFilter === option ? "bg-accent" : ""}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge>{activeFilterCount}</Badge>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground text-center">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[employee.status] ?? "outline"}>
                    {employee.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="text-muted-foreground text-sm">
        {filtered.length} of {employees.length} employees
      </div>
    </div>
  );
}
