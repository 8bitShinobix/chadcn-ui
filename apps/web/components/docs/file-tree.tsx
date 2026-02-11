import { Folder, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeNode {
  name: string;
  comment?: string;
  isFile: boolean;
  children: TreeNode[];
}

function parseTree(text: string): TreeNode[] {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);

  const root: TreeNode[] = [];
  const stack: { node: TreeNode; depth: number }[] = [];

  for (const line of lines) {
    const stripped = line.replace(/\t/g, "  ");
    const match = stripped.match(/^(\s*)(.+)$/);
    if (!match) continue;

    const indent = match[1].length;
    const depth = Math.floor(indent / 2);
    let content = match[2].trim();

    // Extract comment
    let comment: string | undefined;
    const commentMatch = content.match(/^(.+?)\s{2,}#\s*(.+)$/);
    if (commentMatch) {
      content = commentMatch[1].trim();
      comment = commentMatch[2].trim();
    }

    // Detect if file (has extension or is "...")
    const isFile = content.includes(".") || content === "...";

    const node: TreeNode = {
      name: content,
      comment,
      isFile,
      children: [],
    };

    // Find parent
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    if (!isFile) {
      stack.push({ node, depth });
    }
  }

  return root;
}

function TreeNodeRow({
  node,
  isLast,
  prefix,
}: {
  node: TreeNode;
  isLast: boolean;
  prefix: string;
}): React.ReactElement {
  const connector = isLast ? "└── " : "├── ";
  const childPrefix = prefix + (isLast ? "    " : "│   ");

  return (
    <>
      <div className="flex items-center py-[3px] font-mono text-[13px] leading-relaxed">
        <span className="text-muted-foreground/50 whitespace-pre select-none">
          {prefix}
          {connector}
        </span>
        {node.isFile ? (
          <FileCode2 className="text-muted-foreground mr-2 h-4 w-4 shrink-0" />
        ) : (
          <Folder className="text-muted-foreground mr-2 h-4 w-4 shrink-0" />
        )}
        <span className={cn(node.isFile ? "text-foreground/70" : "text-foreground font-medium")}>
          {node.name}
        </span>
        {node.comment && <span className="text-muted-foreground ml-4"># {node.comment}</span>}
      </div>
      {node.children.map((child, i) => (
        <TreeNodeRow
          key={`${child.name}-${i}`}
          node={child}
          isLast={i === node.children.length - 1}
          prefix={childPrefix}
        />
      ))}
    </>
  );
}

interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps): React.ReactElement {
  const text = typeof children === "string" ? children : String(children ?? "");
  const nodes = parseTree(text);

  // Render the root nodes — first root node is the project folder
  return (
    <div className="not-prose border-border bg-muted/50 my-6 overflow-x-auto rounded-xl border px-5 py-4">
      {nodes.map((rootNode, i) => (
        <div key={`${rootNode.name}-${i}`}>
          <div className="flex items-center py-[3px] font-mono text-[13px] leading-relaxed">
            <Folder className="text-muted-foreground mr-2 h-4 w-4 shrink-0" />
            <span className="text-foreground font-medium">{rootNode.name}</span>
            {rootNode.comment && (
              <span className="text-muted-foreground ml-4"># {rootNode.comment}</span>
            )}
          </div>
          {rootNode.children.map((child, j) => (
            <TreeNodeRow
              key={`${child.name}-${j}`}
              node={child}
              isLast={j === rootNode.children.length - 1}
              prefix=""
            />
          ))}
        </div>
      ))}
    </div>
  );
}
