"use client";

import { useState } from "react";
import { Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function InvoiceHistoryStandard() {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const paginatedInvoices = invoices.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(invoices.length / pageSize);
  const startItem = page * pageSize + 1;
  const endItem = Math.min((page + 1) * pageSize, invoices.length);

  return (
    <div className="space-y-4 p-6">
      <div>
        <h2 className="text-lg font-semibold">Invoice History</h2>
        <p className="text-muted-foreground text-sm">View and download your past invoices</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Download</TableHead>
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
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status] ?? "outline"}>{invoice.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Download size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <span className="text-muted-foreground text-sm">
          Showing {startItem}-{endItem} of {invoices.length}
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
