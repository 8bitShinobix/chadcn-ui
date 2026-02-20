"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Complete: "default",
  "In Progress": "secondary",
  Planning: "outline",
};

const priorityVariant: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
  Critical: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

export default function SortableFeatureRich() {
  const [sortCol, setSortCol] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const pageSize = 4;

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

  const paginatedProjects = useMemo(() => {
    const start = page * pageSize;
    return sortedProjects.slice(start, start + pageSize);
  }, [sortedProjects, page]);

  const totalPages = Math.ceil(projects.length / pageSize);
  const startItem = page * pageSize + 1;
  const endItem = Math.min((page + 1) * pageSize, projects.length);

  const renderSortIcon = (col: string) => {
    if (sortCol !== col) {
      return <ArrowUpDown size={14} />;
    }
    return sortDir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <p className="text-muted-foreground text-sm">
          Sorted by {sortCol} {sortDir === "asc" ? "ascending" : "descending"}
        </p>
      </div>

      <Table>
        <TableHeader className="bg-background sticky top-0 z-10">
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
            <TableHead>
              <Button variant="ghost" size="sm" className="-ml-3" onClick={() => handleSort("budget")}>
                Budget
                {renderSortIcon("budget")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={priorityVariant[project.priority]}>{project.priority}</Badge>
              </TableCell>
              <TableCell>{project.dueDate}</TableCell>
              <TableCell>${project.budget.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <p className="text-muted-foreground text-sm">
          Showing {startItem}-{endItem} of {projects.length} projects
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
