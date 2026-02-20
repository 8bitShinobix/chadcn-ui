"use client";

import { Inbox, Plus, Upload, FileText, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center p-6">
      <div className="bg-muted/50 relative flex h-20 w-20 items-center justify-center rounded-full">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-full">
          <Inbox className="text-muted-foreground h-7 w-7" />
        </div>
      </div>
      <h3 className="mt-6 text-2xl font-semibold">No items yet</h3>
      <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
        You haven&apos;t created any items. Get started by creating your first item, importing
        existing data, or explore the guides below.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Item
        </Button>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </div>
      <Button variant="link" className="mt-2 text-sm">
        Learn more about items
      </Button>
      <Card className="mt-8 w-full max-w-md gap-0 divide-y rounded-lg py-0 shadow-none">
        <CardHeader className="px-4 py-3"><CardTitle className="text-sm">Quick Start</CardTitle></CardHeader>
        <CardContent className="divide-y p-0">
        <div className="text-muted-foreground hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 text-sm">
          <FileText className="h-4 w-4 shrink-0" />
          <span>Create your first item from scratch</span>
        </div>
        <div className="text-muted-foreground hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 text-sm">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span>Read the getting started guide</span>
        </div>
        <div className="text-muted-foreground hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-3 text-sm">
          <Zap className="h-4 w-4 shrink-0" />
          <span>Import data from a CSV file</span>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
