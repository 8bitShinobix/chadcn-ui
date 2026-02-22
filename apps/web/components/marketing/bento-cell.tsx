"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BentoCellProps {
  children: React.ReactNode;
  className?: string;
  label: string;
  category: string;
  href: string;
  scale?: number;
}

export function BentoCell({
  children,
  className,
  label,
  category,
  href,
  scale = 0.55,
}: BentoCellProps): React.ReactElement {
  const router = useRouter();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(href);
        }
      }}
      className={cn(
        "group bg-background relative cursor-pointer overflow-hidden",
        "transition-colors duration-200",
        "hover:bg-accent/50",
        className
      )}
    >
      {/* Scaled block preview — centered in cell */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center",
          width: `${Math.round(100 / scale)}%`,
          height: `${Math.round(100 / scale)}%`,
        }}
      >
        {children}
      </div>

      {/* Clean bottom label */}
      {/*<div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-20% to-transparent px-4 pt-8 pb-2.5">
        <span className="text-foreground text-sm font-medium">{label}</span>
        <span className="text-muted-foreground text-xs">{category}</span>
      </div>*/}
    </div>
  );
}
