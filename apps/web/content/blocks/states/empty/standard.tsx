"use client";

import { Inbox, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <Card className="rounded-lg py-0 shadow-none">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
            <Inbox className="text-muted-foreground h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-semibold">No items yet</h3>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            You haven&apos;t created any items. Get started by creating your first item or importing
            existing data.
          </p>
          <div className="mt-6 flex gap-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Item
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
