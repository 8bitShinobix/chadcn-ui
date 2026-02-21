"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Plus,
  Trash2,
  Code,
  Search,
  Upload,
  Download,
  Undo2,
  Redo2,
  Moon,
  Sun,
} from "lucide-react"
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface Token {
  id: string
  name: string
  value: string
  darkValue?: string
  group?: string
}

interface HistoryEntry {
  colors: Token[]
  spacing: Token[]
  typography: Token[]
  borders: Token[]
}

const INITIAL_COLORS: Token[] = [
  { id: "c1", name: "--background", value: "#09090b", darkValue: "#fafafa", group: "base" },
  { id: "c2", name: "--foreground", value: "#fafafa", darkValue: "#09090b", group: "base" },
  { id: "c3", name: "--primary-50", value: "#eff6ff", darkValue: "#172554", group: "primary" },
  { id: "c4", name: "--primary-100", value: "#dbeafe", darkValue: "#1e3a5f", group: "primary" },
  { id: "c5", name: "--primary-200", value: "#bfdbfe", darkValue: "#1e40af", group: "primary" },
  { id: "c6", name: "--primary-300", value: "#93c5fd", darkValue: "#1d4ed8", group: "primary" },
  { id: "c7", name: "--primary-400", value: "#60a5fa", darkValue: "#2563eb", group: "primary" },
  { id: "c8", name: "--primary-500", value: "#3b82f6", darkValue: "#3b82f6", group: "primary" },
  { id: "c9", name: "--primary-600", value: "#2563eb", darkValue: "#60a5fa", group: "primary" },
  { id: "c10", name: "--primary-700", value: "#1d4ed8", darkValue: "#93c5fd", group: "primary" },
  { id: "c11", name: "--primary-800", value: "#1e40af", darkValue: "#bfdbfe", group: "primary" },
  { id: "c12", name: "--primary-900", value: "#1e3a5f", darkValue: "#dbeafe", group: "primary" },
  { id: "c13", name: "--secondary", value: "#1e293b", darkValue: "#e2e8f0", group: "base" },
  { id: "c14", name: "--accent", value: "#8b5cf6", darkValue: "#a78bfa", group: "base" },
  { id: "c15", name: "--muted", value: "#27272a", darkValue: "#f4f4f5", group: "base" },
  { id: "c16", name: "--border", value: "#27272a", darkValue: "#e4e4e7", group: "base" },
  { id: "c17", name: "--destructive", value: "#ef4444", darkValue: "#f87171", group: "semantic" },
  { id: "c18", name: "--success", value: "#22c55e", darkValue: "#4ade80", group: "semantic" },
  { id: "c19", name: "--warning", value: "#eab308", darkValue: "#facc15", group: "semantic" },
]

const INITIAL_SPACING: Token[] = [
  { id: "s1", name: "--spacing-xs", value: "0.25rem" },
  { id: "s2", name: "--spacing-sm", value: "0.5rem" },
  { id: "s3", name: "--spacing-md", value: "1rem" },
  { id: "s4", name: "--spacing-lg", value: "1.5rem" },
  { id: "s5", name: "--spacing-xl", value: "2rem" },
  { id: "s6", name: "--spacing-2xl", value: "3rem" },
  { id: "s7", name: "--spacing-3xl", value: "4rem" },
]

const INITIAL_TYPOGRAPHY: Token[] = [
  { id: "t1", name: "--font-family", value: "Inter, sans-serif" },
  { id: "t2", name: "--font-family-mono", value: "JetBrains Mono, monospace" },
  { id: "t3", name: "--font-size-xs", value: "0.75rem" },
  { id: "t4", name: "--font-size-sm", value: "0.875rem" },
  { id: "t5", name: "--font-size-base", value: "1rem" },
  { id: "t6", name: "--font-size-lg", value: "1.125rem" },
  { id: "t7", name: "--font-size-xl", value: "1.25rem" },
  { id: "t8", name: "--font-size-2xl", value: "1.5rem" },
  { id: "t9", name: "--font-weight-normal", value: "400" },
  { id: "t10", name: "--font-weight-medium", value: "500" },
  { id: "t11", name: "--font-weight-semibold", value: "600" },
  { id: "t12", name: "--font-weight-bold", value: "700" },
  { id: "t13", name: "--line-height-tight", value: "1.25" },
  { id: "t14", name: "--line-height-normal", value: "1.5" },
  { id: "t15", name: "--line-height-relaxed", value: "1.75" },
]

const INITIAL_BORDERS: Token[] = [
  { id: "b1", name: "--radius-sm", value: "0.25rem" },
  { id: "b2", name: "--radius-md", value: "0.5rem" },
  { id: "b3", name: "--radius-lg", value: "0.75rem" },
  { id: "b4", name: "--radius-xl", value: "1rem" },
  { id: "b5", name: "--radius-2xl", value: "1.5rem" },
  { id: "b6", name: "--radius-full", value: "9999px" },
  { id: "b7", name: "--border-width-thin", value: "1px" },
  { id: "b8", name: "--border-width-thick", value: "2px" },
]

function parseRemToPixels(value: string): number {
  const match = value.match(/^([\d.]+)rem$/)
  return match ? parseFloat(match[1]) * 16 : 0
}

let nextId = 200

export function TokenEditor() {
  const [colors, setColors] = useState<Token[]>(INITIAL_COLORS)
  const [spacing, setSpacing] = useState<Token[]>(INITIAL_SPACING)
  const [typography, setTypography] = useState<Token[]>(INITIAL_TYPOGRAPHY)
  const [borders, setBorders] = useState<Token[]>(INITIAL_BORDERS)
  const [showJson, setShowJson] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importValue, setImportValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [colorGroupFilter, setColorGroupFilter] = useState("all")
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const totalTokens = colors.length + spacing.length + typography.length + borders.length

  const saveHistory = useCallback(() => {
    const entry: HistoryEntry = {
      colors: [...colors],
      spacing: [...spacing],
      typography: [...typography],
      borders: [...borders],
    }
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1)
      return [...trimmed, entry]
    })
    setHistoryIndex((prev) => prev + 1)
  }, [colors, spacing, typography, borders, historyIndex])

  function undo() {
    if (historyIndex <= 0) return
    const prev = history[historyIndex - 1]
    setColors(prev.colors)
    setSpacing(prev.spacing)
    setTypography(prev.typography)
    setBorders(prev.borders)
    setHistoryIndex((i) => i - 1)
  }

  function redo() {
    if (historyIndex >= history.length - 1) return
    const next = history[historyIndex + 1]
    setColors(next.colors)
    setSpacing(next.spacing)
    setTypography(next.typography)
    setBorders(next.borders)
    setHistoryIndex((i) => i + 1)
  }

  function updateToken(
    setter: React.Dispatch<React.SetStateAction<Token[]>>,
    id: string,
    field: "name" | "value" | "darkValue",
    newValue: string
  ) {
    saveHistory()
    setter((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: newValue } : t))
    )
  }

  function addToken(
    setter: React.Dispatch<React.SetStateAction<Token[]>>,
    prefix: string,
    group?: string
  ) {
    saveHistory()
    nextId++
    setter((prev) => [
      ...prev,
      { id: `new-${nextId}`, name: `${prefix}-new`, value: "", darkValue: "", group },
    ])
  }

  function removeToken(setter: React.Dispatch<React.SetStateAction<Token[]>>, id: string) {
    saveHistory()
    setter((prev) => prev.filter((t) => t.id !== id))
  }

  function allTokensJson() {
    return {
      colors: Object.fromEntries(
        colors.map((t) => [t.name, darkMode && t.darkValue ? { light: t.value, dark: t.darkValue } : t.value])
      ),
      spacing: Object.fromEntries(spacing.map((t) => [t.name, t.value])),
      typography: Object.fromEntries(typography.map((t) => [t.name, t.value])),
      borders: Object.fromEntries(borders.map((t) => [t.name, t.value])),
    }
  }

  function handleExport() {
    const json = JSON.stringify(allTokensJson(), null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "design-tokens.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport() {
    try {
      const data = JSON.parse(importValue)
      if (data.colors) {
        const imported = Object.entries(data.colors).map(([name, val], i) => {
          const isObj = typeof val === "object" && val !== null
          return {
            id: `imp-c-${i}`,
            name,
            value: isObj ? (val as { light: string }).light : (val as string),
            darkValue: isObj ? (val as { dark: string }).dark : undefined,
          }
        })
        setColors(imported)
      }
      setShowImport(false)
      setImportValue("")
    } catch {
      // Invalid JSON - do nothing
    }
  }

  const filteredColors = useMemo(() => {
    let filtered = colors
    if (colorGroupFilter !== "all") {
      filtered = filtered.filter((t) => t.group === colorGroupFilter)
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return filtered
  }, [colors, colorGroupFilter, searchQuery])

  const filteredSpacing = useMemo(() => {
    if (!searchQuery) return spacing
    return spacing.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [spacing, searchQuery])

  const filteredTypography = useMemo(() => {
    if (!searchQuery) return typography
    return typography.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [typography, searchQuery])

  const filteredBorders = useMemo(() => {
    if (!searchQuery) return borders
    return borders.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [borders, searchQuery])

  const colorGroups = useMemo(() => {
    const groups = new Set(colors.map((t) => t.group).filter(Boolean))
    return ["all", ...Array.from(groups)] as string[]
  }, [colors])

  function renderColorTable() {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Select value={colorGroupFilter} onValueChange={setColorGroupFilter}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Filter group" />
            </SelectTrigger>
            <SelectContent>
              {colorGroups.map((g) => (
                <SelectItem key={g} value={g}>
                  {g === "all" ? "All Groups" : g.charAt(0).toUpperCase() + g.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 ml-auto">
            <Sun className="size-3.5 text-muted-foreground" />
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            <Moon className="size-3.5 text-muted-foreground" />
          </div>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead>{darkMode ? "Light" : "Value"}</TableHead>
                {darkMode && <TableHead>Dark</TableHead>}
                <TableHead className="w-[48px]">Swatch</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredColors.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {token.group && (
                        <Badge variant="outline" className="text-[9px] px-1 py-0">
                          {token.group}
                        </Badge>
                      )}
                      <Input
                        value={token.name}
                        onChange={(e) => updateToken(setColors, token.id, "name", e.target.value)}
                        className="h-7 font-mono text-xs"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setColors, token.id, "value", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  {darkMode && (
                    <TableCell>
                      <Input
                        value={token.darkValue || ""}
                        onChange={(e) =>
                          updateToken(setColors, token.id, "darkValue", e.target.value)
                        }
                        placeholder="dark override"
                        className="h-7 font-mono text-xs"
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div
                        className="size-5 rounded-full border shadow-sm"
                        style={{
                          backgroundColor: darkMode && token.darkValue ? token.darkValue : token.value,
                        }}
                      />
                      {darkMode && token.darkValue && (
                        <div
                          className="size-5 rounded-full border shadow-sm"
                          style={{ backgroundColor: token.value }}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => removeToken(setColors, token.id)}
                    >
                      <Trash2 className="size-3 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addToken(setColors, "--color", colorGroupFilter === "all" ? "base" : colorGroupFilter)}
        >
          <Plus className="mr-1.5 size-3.5" />
          Add Color Token
        </Button>
      </div>
    )
  }

  function renderSpacingTable() {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead className="w-[120px]">Value</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpacing.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setSpacing, token.id, "name", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setSpacing, token.id, "value", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 rounded bg-primary"
                        style={{ width: `${parseRemToPixels(token.value)}px` }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {parseRemToPixels(token.value)}px
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => removeToken(setSpacing, token.id)}
                    >
                      <Trash2 className="size-3 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setSpacing, "--spacing")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Spacing Token
        </Button>
      </div>
    )
  }

  function renderTypographyTable() {
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
              {filteredTypography.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setTypography, token.id, "name", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setTypography, token.id, "value", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => removeToken(setTypography, token.id)}
                    >
                      <Trash2 className="size-3 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setTypography, "--font")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Typography Token
        </Button>
      </div>
    )
  }

  function renderBordersTable() {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead className="w-[120px]">Value</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBorders.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Input
                      value={token.name}
                      onChange={(e) => updateToken(setBorders, token.id, "name", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => updateToken(setBorders, token.id, "value", e.target.value)}
                      className="h-7 font-mono text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="size-9 border-2 border-primary bg-primary/10"
                      style={{ borderRadius: token.value }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => removeToken(setBorders, token.id)}
                    >
                      <Trash2 className="size-3 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" size="sm" onClick={() => addToken(setBorders, "--radius")}>
          <Plus className="mr-1.5 size-3.5" />
          Add Border Token
        </Button>
      </div>
    )
  }

  function renderLivePreview() {
    const primary = colors.find((c) => c.name === "--primary-500")?.value || "#3b82f6"
    const bg = colors.find((c) => c.name === "--background")?.value || "#09090b"
    const fg = colors.find((c) => c.name === "--foreground")?.value || "#fafafa"
    const radius = borders.find((b) => b.name === "--radius-md")?.value || "0.5rem"
    const accent = colors.find((c) => c.name === "--accent")?.value || "#8b5cf6"

    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="rounded-lg p-4 space-y-3"
            style={{ backgroundColor: bg, color: fg, borderRadius: radius }}
          >
            <div className="text-sm font-medium" style={{ color: fg }}>
              Sample Component
            </div>
            <p className="text-xs" style={{ color: fg, opacity: 0.7 }}>
              This preview uses your current token values.
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: primary, borderRadius: radius }}
              >
                Primary
              </button>
              <button
                className="px-3 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: accent, borderRadius: radius }}
              >
                Accent
              </button>
              <button
                className="px-3 py-1.5 text-xs font-medium border"
                style={{
                  borderRadius: radius,
                  color: fg,
                  borderColor: fg,
                  opacity: 0.5,
                  backgroundColor: "transparent",
                }}
              >
                Outline
              </button>
            </div>
            <div
              className="p-3 border text-xs"
              style={{
                borderRadius: radius,
                borderColor: fg,
                opacity: 0.2,
              }}
            >
              <div className="opacity-100" style={{ color: fg }}>
                Card content using current tokens
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">Design Tokens</h2>
            <Badge variant="secondary">{totalTokens} tokens</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage colors, spacing, typography, and border tokens with dark mode support.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={undo}
            disabled={historyIndex <= 0}
          >
            <Undo2 className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowImport(!showImport)}>
          <Upload className="mr-1.5 size-3.5" />
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-1.5 size-3.5" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowJson(!showJson)}
        >
          <Code className="mr-1.5 size-3.5" />
          {showJson ? "Editor" : "JSON"}
        </Button>
      </div>

      {/* Import Panel */}
      {showImport && (
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <Label>Paste JSON to import</Label>
            <Textarea
              value={importValue}
              onChange={(e) => setImportValue(e.target.value)}
              placeholder='{"colors": {"--primary": "#3b82f6"}, ...}'
              className="font-mono text-xs"
              rows={6}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleImport}>
                Import Tokens
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowImport(false)
                  setImportValue("")
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div>
          {showJson ? (
            <Card>
              <CardContent className="p-4">
                <pre className="max-h-[500px] overflow-auto rounded bg-muted p-4 text-xs font-mono">
                  {JSON.stringify(allTokensJson(), null, 2)}
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
                  Type
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
                {renderColorTable()}
              </TabsContent>

              <TabsContent value="spacing" className="mt-4">
                {renderSpacingTable()}
              </TabsContent>

              <TabsContent value="typography" className="mt-4">
                {renderTypographyTable()}
              </TabsContent>

              <TabsContent value="borders" className="mt-4">
                {renderBordersTable()}
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {renderLivePreview()}
        </div>
      </div>
    </div>
  )
}
