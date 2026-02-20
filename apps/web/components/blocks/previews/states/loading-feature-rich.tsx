"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function LoadingFeatureRich() {
  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center gap-4 border-b p-4">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-6 w-32" />
        <div className="ml-auto flex items-center gap-3">
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-56 space-y-3 border-r p-4 sm:block">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-6 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-lg py-0 shadow-none">
                <CardContent className="space-y-2 p-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-7 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart area */}
          <Card className="rounded-lg py-0 shadow-none">
            <CardContent className="space-y-4 p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="gap-0 rounded-lg py-0 shadow-none">
            {/* Header row */}
            <div className="flex gap-4 border-b p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1" />
              ))}
            </div>
            {/* Body rows */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 border-b p-4 last:border-0">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 flex-1" />
                ))}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
