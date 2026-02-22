import { cn } from "@/lib/utils";

export function NewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ml-auto inline-flex h-[18px] items-center self-center rounded-md border border-white/10 bg-white/[0.06] px-1.5 text-[9px] font-medium uppercase leading-none tracking-wider text-blue-400 backdrop-blur-sm",
        className,
      )}
    >
      new
    </span>
  );
}
