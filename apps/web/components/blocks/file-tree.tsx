"use client"

import { useState } from "react"
import { ChevronRight, FileCode2, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileTreeNode {
  name: string
  path: string
  type: "file" | "folder"
  children?: FileTreeNode[]
}

interface FileTreeProps {
  files: { path: string }[]
  selectedPath: string
  onSelect: (path: string) => void
}

function buildTree(paths: string[]): FileTreeNode[] {
  const root: FileTreeNode[] = []

  for (const filePath of paths) {
    const parts = filePath.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const currentPath = parts.slice(0, i + 1).join("/")

      const existing = currentLevel.find((n) => n.name === part)
      if (existing) {
        if (existing.children) {
          currentLevel = existing.children
        }
      } else {
        const node: FileTreeNode = {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          ...(isFile ? {} : { children: [] }),
        }
        currentLevel.push(node)
        if (node.children) {
          currentLevel = node.children
        }
      }
    }
  }

  return root
}

function TreeNode({
  node,
  depth,
  selectedPath,
  onSelect,
}: {
  node: FileTreeNode
  depth: number
  selectedPath: string
  onSelect: (path: string) => void
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(true)
  const isFolder = node.type === "folder"
  const isSelected = node.path === selectedPath

  if (isFolder) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-muted"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-foreground-muted transition-transform",
              isOpen && "rotate-90"
            )}
          />
          {isOpen ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-foreground-muted" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-foreground-muted" />
          )}
          <span className="truncate text-foreground-muted">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                selectedPath={selectedPath}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => onSelect(node.path)}
      className={cn(
        "flex w-full items-center gap-1 rounded-sm px-2 py-1 text-sm",
        isSelected
          ? "bg-muted font-medium text-foreground"
          : "text-foreground-muted hover:bg-muted"
      )}
      style={{ paddingLeft: `${depth * 16 + 8 + 18}px` }}
    >
      <FileCode2 className="h-4 w-4 shrink-0" />
      <span className="truncate">{node.name}</span>
    </button>
  )
}

export function FileTree({
  files,
  selectedPath,
  onSelect,
}: FileTreeProps): React.ReactElement {
  const tree = buildTree(files.map((f) => f.path))

  return (
    <div className="py-2">
      <div className="px-4 pb-2 text-xs font-medium uppercase tracking-wider text-foreground-muted">
        Files
      </div>
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          depth={0}
          selectedPath={selectedPath}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
