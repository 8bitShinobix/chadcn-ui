"use client"

import { useState } from "react"
import { Plus, Trash2, Code } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Token {
  id: string
  name: string
  value: string
}

const INITIAL_COLORS: Token[] = [
  { id: "c1", name: "--background", value: "#09090b" },
  { id: "c2", name: "--foreground", value: "#fafafa" },
  { id: "c3", name: "--primary", value: "#3b82f6" },
  { id: "c4", name: "--secondary", value: "#1e293b" },
  { id: "c5", name: "--accent", value: "#8b5cf6" },
  { id: "c6", name: "--muted", value: "#27272a" },
  { id: "c7", name: "--border", value: "#27272a" },
  { id: "c8", name: "--destructive", value: "#ef4444" },
]

const INITIAL_SPACING: Token[] = [
  { id: "s1", name: "--spacing-xs", value: "0.25rem" },
  { id: "s2", name: "--spacing-sm", value: "0.5rem" },
  { id: "s3", name: "--spacing-md", value: "1rem" },
  { id: "s4", name: "--spacing-lg", value: "1.5rem" },
  { id: "s5", name: "--spacing-xl", value: "2rem" },
]

const INITIAL_TYPOGRAPHY: Token[] = [
  { id: "t1", name: "--font-family", value: "Inter, sans-serif" },
  { id: "t2", name: "--font-size-xs", value: "0.75rem" },
  { id: "t3", name: "--font-size-sm", value: "0.875rem" },
  { id: "t4", name: "--font-size-base", value: "1rem" },
  { id: "t5", name: "--font-size-lg", value: "1.125rem" },
  { id: "t6", name: "--font-size-xl", value: "1.25rem" },
  { id: "t7", name: "--font-weight-normal", value: "400" },
  { id: "t8", name: "--font-weight-medium", value: "500" },
  { id: "t9", name: "--font-weight-bold", value: "700" },
]

const INITIAL_BORDERS: Token[] = [
  { id: "b1", name: "--radius-sm", value: "0.25rem" },
  { id: "b2", name: "--radius-md", value: "0.5rem" },
  { id: "b3", name: "--radius-lg", value: "0.75rem" },
  { id: "b4", name: "--radius-xl", value: "1rem" },
  { id: "b5", name: "--radius-full", value: "9999px" },
]

function parseRemToPixels(value: string): number {
  const match = value.match(/^([\d.]+)rem$/)
  return match ? parseFloat(match[1]) * 16 : 0
}

let nextId = 100

export function TokenEditor() {
  const [colors, setColors] = useState<Token[]>(INITIAL_COLORS)
  const [spacing, setSpacing] = useState<Token[]>(INITIAL_SPACING)
  const [typography, setTypography] = useState<Token[]>(INITIAL_TYPOGRAPHY)
  const [borders, setBorders] = useState<Token[]>(INITIAL_BORDERS)
  const [showJson, setShowJson] = useState(false)

  function updateToken(
    setter: React.Dispatch<React.SetStateAction<Token[]>>,
    id: string,
    field: "name" | "value",
    newValue: string
  ) {
    setter((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: newValue } : t))
    )
  }

  function addToken(setter: React.Dispatch<React.SetStateAction<Token[]>>, prefix: string) {
    nextId++
    setter((prev) => [...prev, { id: `new-${nextId}`, name: `${prefix}-new`, value: "" }])
  }

  function removeToken(setter: React.Dispatch<React.SetStateAction<Token[]>>, id: string) {
    setter((prev) => prev.filter((t) => t.id !== id))
  }

  function allTokens() {
    return {
      colors: Object.fromEntries(colors.map((t) => [t.name, t.value])),
      spacing: Object.fromEntries(spacing.map((t) => [t.name, t.value])),
      typography: Object.fromEntries(typography.map((t) => [t.name, t.value])),
      borders: Object.fromEntries(borders.map((t) => [t.name, t.value])),
    }
  }

  function renderColorTable(tokens: Token[], setter: React.Dispatch<React.SetStateAction<Token[]>>) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[48px]">Swatch</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setter, token.id, "name", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setter, token.id, "value", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="size-6 rounded-full border shadow-sm"
                      style={{ backgroundColor: token.value }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => removeToken(setter, token.id)}
                    >
                      <Trash2 className="size-3.5 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setter, "--color")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Token
        </Button>
      </div>
    )
  }

  function renderSpacingTable(tokens: Token[], setter: React.Dispatch<React.SetStateAction<Token[]>>) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead className="w-[140px]">Value</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setter, token.id, "name", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setter, token.id, "value", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 rounded bg-primary"
                        style={{ width: `${parseRemToPixels(token.value)}px` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {parseRemToPixels(token.value)}px
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => removeToken(setter, token.id)}
                    >
                      <Trash2 className="size-3.5 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setter, "--spacing")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Token
        </Button>
      </div>
    )
  }

  function renderTypographyTable(tokens: Token[], setter: React.Dispatch<React.SetStateAction<Token[]>>) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setter, token.id, "name", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setter, token.id, "value", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => removeToken(setter, token.id)}
                    >
                      <Trash2 className="size-3.5 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setter, "--font")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Token
        </Button>
      </div>
    )
  }

  function renderBordersTable(tokens: Token[], setter: React.Dispatch<React.SetStateAction<Token[]>>) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead className="w-[140px]">Value</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setter, token.id, "name", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setter, token.id, "value", e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="size-10 border-2 border-primary bg-primary/10"
                      style={{ borderRadius: token.value }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => removeToken(setter, token.id)}
                    >
                      <Trash2 className="size-3.5 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setter, "--radius")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Token
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Design Tokens</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage colors, spacing, typography, and border tokens.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowJson(!showJson)}
        >
          <Code className="mr-1.5 size-3.5" />
          {showJson ? "Hide JSON" : "View JSON"}
        </Button>
      </div>

      <Separator className="my-4" />

      {showJson ? (
        <Card>
          <CardContent className="p-4">
            <pre className="max-h-96 overflow-auto rounded bg-muted p-4 text-xs font-mono">
              {JSON.stringify(allTokens(), null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="colors" className="flex-1">
              Colors
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5">
                {colors.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex-1">
              Spacing
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5">
                {spacing.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex-1">
              Typography
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5">
                {typography.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="borders" className="flex-1">
              Borders
              <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5">
                {borders.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-4">
            {renderColorTable(colors, setColors)}
          </TabsContent>

          <TabsContent value="spacing" className="mt-4">
            {renderSpacingTable(spacing, setSpacing)}
          </TabsContent>

          <TabsContent value="typography" className="mt-4">
            {renderTypographyTable(typography, setTypography)}
          </TabsContent>

          <TabsContent value="borders" className="mt-4">
            {renderBordersTable(borders, setBorders)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
