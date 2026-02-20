"use client";

import { useState } from "react";
import { Download, FileText, ChevronLeft, ChevronRight, Search, Eye } from "lucide-react";
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

const invoices = [
  { id: "INV-001", date: "Jan 15, 2024", amount: "$29.00", plan: "Pro", status: "Paid" },
  { id: "INV-002", date: "Dec 15, 2023", amount: "$29.00", plan: "Pro", status: "Paid" },
  { id: "INV-003", date: "Nov 15, 2023", amount: "$29.00", plan: "Pro", status: "Paid" },
  { id: "INV-004", date: "Oct 15, 2023", amount: "$0.00", plan: "Free", status: "Paid" },
  { id: "INV-005", date: "Sep 15, 2023", amount: "$29.00", plan: "Pro", status: "Refunded" },
  { id: "INV-006", date: "Aug 15, 2023", amount: "$29.00", plan: "Pro", status: "Paid" },
  { id: "INV-007", date: "Jul 15, 2023", amount: "$29.00", plan: "Pro", status: "Paid" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Paid: "default",
  Refunded: "secondary",
  Pending: "outline",
};

export function InvoiceHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.date.toLowerCase().includes(search.toLowerCase()) ||
      invoice.plan.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const paginatedInvoices = filteredInvoices.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(filteredInvoices.length / pageSize);
  const startItem = page * pageSize + 1;
  const endItem = Math.min((page + 1) * pageSize, filteredInvoices.length);

  const totalAmount = filteredInvoices.reduce((sum, invoice) => {
    const amount = parseFloat(invoice.amount.replace("$", ""));
    return sum + amount;
  }, 0);

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Invoice History</h2>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px] pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("paid")}>Paid</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("refunded")}>
                Refunded
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <div className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  {invoice.id}
                </div>
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.plan}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status] ?? "outline"}>{invoice.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="text-muted-foreground flex justify-end px-4 text-sm">
        Total: ${totalAmount.toFixed(2)}
      </div>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <span className="text-muted-foreground text-sm">
          Showing {filteredInvoices.length > 0 ? startItem : 0}-{endItem} of{" "}
          {filteredInvoices.length}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft size={16} />
            Prev
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
