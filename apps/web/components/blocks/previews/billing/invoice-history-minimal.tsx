"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
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
import { toast } from "sonner";

const invoices = [
  { id: "INV-001", date: "Jan 15, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "Dec 15, 2023", amount: "$29.00", status: "Paid" },
  { id: "INV-003", date: "Nov 15, 2023", amount: "$29.00", status: "Paid" },
  { id: "INV-004", date: "Oct 15, 2023", amount: "$0.00", status: "Refunded" },
  { id: "INV-005", date: "Sep 15, 2023", amount: "$29.00", status: "Paid" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  Paid: "default",
  Refunded: "secondary",
  Pending: "outline",
};

export default function InvoiceHistoryMinimal() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (invoiceId: string) => {
    setDownloadingId(invoiceId);
    setTimeout(() => {
      setDownloadingId(null);
      toast.success(`Invoice ${invoiceId} downloaded`);
    }, 1500);
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Invoices</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status] ?? "outline"}>{invoice.status}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownload(invoice.id)}
                  disabled={downloadingId !== null}
                >
                  {downloadingId === invoice.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Download size={14} />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
