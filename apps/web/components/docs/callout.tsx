import { AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "tip" | "warning" | "error" | "note";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  { icon: React.ElementType; styles: string; iconColor: string }
> = {
  tip: {
    icon: Lightbulb,
    styles: "border-emerald-500/30 bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    styles: "border-amber-500/30 bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  error: {
    icon: AlertCircle,
    styles: "border-red-500/30 bg-red-500/10",
    iconColor: "text-red-500",
  },
  note: {
    icon: Info,
    styles: "border-blue-500/30 bg-blue-500/10",
    iconColor: "text-blue-500",
  },
};

const defaultTitles: Record<CalloutVariant, string> = {
  tip: "Tip",
  warning: "Warning",
  error: "Error",
  note: "Note",
};

export function Callout({
  variant = "note",
  title,
  children,
  className,
}: CalloutProps): React.ReactElement {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const displayTitle = title || defaultTitles[variant];

  return (
    <div
      className={cn("my-6 flex gap-3 rounded-lg border p-4", config.styles, className)}
      role="alert"
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconColor)} />
      <div className="flex-1">
        {displayTitle && <p className="text-foreground mb-1 font-semibold">{displayTitle}</p>}
        <div className="text-foreground-muted text-sm [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
