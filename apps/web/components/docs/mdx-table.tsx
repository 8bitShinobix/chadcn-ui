import { cn } from "@/lib/utils"

interface TableProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: TableProps): React.ReactElement {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn(
          "w-full border-collapse text-sm",
          className
        )}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({
  children,
  className,
}: TableProps): React.ReactElement {
  return <thead className={cn("border-b border-border", className)}>{children}</thead>
}

export function TableBody({
  children,
  className,
}: TableProps): React.ReactElement {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>
}

export function TableRow({
  children,
  className,
}: TableProps): React.ReactElement {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-background-subtle",
        className
      )}
    >
      {children}
    </tr>
  )
}

interface TableCellProps extends TableProps {
  isHeader?: boolean
}

export function TableHead({
  children,
  className,
}: TableProps): React.ReactElement {
  return (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle font-semibold text-foreground-muted [&:has([role=checkbox])]:pr-0",
        className
      )}
    >
      {children}
    </th>
  )
}

export function TableCell({
  children,
  className,
}: TableCellProps): React.ReactElement {
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
    >
      {children}
    </td>
  )
}
