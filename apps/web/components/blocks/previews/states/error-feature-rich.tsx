"use client";

import { AlertTriangle, RefreshCw, ArrowLeft, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function ErrorFeatureRich() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6">
      <div className="bg-muted/50 relative flex h-20 w-20 items-center justify-center rounded-full">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-full">
          <AlertTriangle className="text-muted-foreground h-7 w-7" />
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
        We encountered an unexpected error while processing your request. Please try again or
        contact support if the problem persists.
      </p>
      <Badge variant="secondary" className="mt-3 font-mono">
        Error code: ERR_500_INTERNAL
      </Badge>
      <div className="mt-6 flex gap-3">
        <Button>
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </Button>
        <Button variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </Button>
      </div>
      <Button variant="link" className="mt-2 text-sm">
        Contact Support
      </Button>
      <Collapsible className="mt-6 w-full max-w-md rounded-lg border">
        <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 text-sm font-medium">
          Error Details
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Timestamp</TableCell>
                <TableCell className="text-right font-mono text-xs">2024-01-15T10:23:45Z</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Request ID</TableCell>
                <TableCell className="text-right font-mono text-xs">req_a1b2c3d4e5f6</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Path</TableCell>
                <TableCell className="text-right font-mono text-xs">/api/v1/items</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
