"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-02-15",
    budget: 12000,
  },
  {
    id: 2,
    name: "Mobile App",
    status: "Planning",
    priority: "Critical",
    dueDate: "2024-03-01",
    budget: 45000,
  },
  {
    id: 3,
    name: "API Integration",
    status: "Complete",
    priority: "Medium",
    dueDate: "2024-01-20",
    budget: 8500,
  },
  {
    id: 4,
    name: "Database Migration",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-02-28",
    budget: 15000,
  },
  {
    id: 5,
    name: "Security Audit",
    status: "Planning",
    priority: "Critical",
    dueDate: "2024-04-10",
    budget: 22000,
  },
  {
    id: 6,
    name: "UI Component Library",
    status: "Complete",
    priority: "Low",
    dueDate: "2024-01-05",
    budget: 6000,
  },
];

export default function SortableMinimal() {
  const [sortCol, setSortCol] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aVal = a[sortCol as keyof typeof a];
      const bVal = b[sortCol as keyof typeof b];

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortCol, sortDir]);

  const renderSortIcon = (col: string) => {
    if (sortCol !== col) {
      return <ArrowUpDown size={14} />;
    }
    return sortDir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" size="sm" className="-ml-3" onClick={() => handleSort("name")}>
              Name
              {renderSortIcon("name")}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" className="-ml-3" onClick={() => handleSort("status")}>
              Status
              {renderSortIcon("status")}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" className="-ml-3" onClick={() => handleSort("priority")}>
              Priority
              {renderSortIcon("priority")}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" className="-ml-3" onClick={() => handleSort("dueDate")}>
              Due Date
              {renderSortIcon("dueDate")}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedProjects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell>{project.priority}</TableCell>
            <TableCell>{project.dueDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
