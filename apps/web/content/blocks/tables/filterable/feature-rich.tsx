"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, X, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

const statusOptions = ["Active", "On Leave", "Inactive"];
const departmentOptions = ["Engineering", "Design", "Marketing"];

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Active: "default",
  "On Leave": "secondary",
  Inactive: "destructive",
};

export function FilterableTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);

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

    if (statusFilter.length > 0) {
      result = result.filter((emp) => statusFilter.includes(emp.status));
    }

    if (departmentFilter.length > 0) {
      result = result.filter((emp) => departmentFilter.includes(emp.department));
    }

    return result;
  }, [search, statusFilter, departmentFilter]);

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleDepartmentFilter = (department: string) => {
    setDepartmentFilter((prev) =>
      prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department]
    );
  };

  const removeStatusFilter = (status: string) => {
    setStatusFilter((prev) => prev.filter((s) => s !== status));
  };

  const removeDepartmentFilter = (department: string) => {
    setDepartmentFilter((prev) => prev.filter((d) => d !== department));
  };

  const clearAllFilters = () => {
    setStatusFilter([]);
    setDepartmentFilter([]);
  };

  const hasActiveFilters = statusFilter.length > 0 || departmentFilter.length > 0;

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
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
                {statusFilter.length > 0 && <Badge className="ml-2">{statusFilter.length}</Badge>}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={statusFilter.includes(option)}
                  onCheckedChange={() => toggleStatusFilter(option)}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Department
                {departmentFilter.length > 0 && (
                  <Badge className="ml-2">{departmentFilter.length}</Badge>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {departmentOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option}
                  checked={departmentFilter.includes(option)}
                  onCheckedChange={() => toggleDepartmentFilter(option)}
                >
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="outline" size="sm">
          Export
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {statusFilter.map((status) => (
            <Badge key={status} variant="outline" className="gap-1">
              Status: {status}
              <button
                onClick={() => removeStatusFilter(status)}
                className="hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {departmentFilter.map((department) => (
            <Badge key={department} variant="outline" className="gap-1">
              Department: {department}
              <button
                onClick={() => removeDepartmentFilter(department)}
                className="hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
          <span className="text-muted-foreground text-sm">Showing {filtered.length} results</span>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-muted-foreground text-center">
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
                <TableCell>{employee.startDate}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>
          {filtered.length} of {employees.length} employees
        </span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}
