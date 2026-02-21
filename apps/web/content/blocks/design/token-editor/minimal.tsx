"use client"

import { useState } from "react"
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

interface Token {
  name: string
  value: string
  isColor: boolean
}

const INITIAL_TOKENS: Token[] = [
  { name: "--background", value: "#09090b", isColor: true },
  { name: "--foreground", value: "#fafafa", isColor: true },
  { name: "--primary", value: "#3b82f6", isColor: true },
  { name: "--secondary", value: "#1e293b", isColor: true },
  { name: "--accent", value: "#8b5cf6", isColor: true },
  { name: "--muted", value: "#27272a", isColor: true },
  { name: "--border", value: "#27272a", isColor: true },
  { name: "--radius", value: "0.5rem", isColor: false },
]

export function TokenEditor() {
  const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS)

  function handleValueChange(index: number, newValue: string) {
    setTokens((prev) =>
      prev.map((token, i) => (i === index ? { ...token, value: newValue } : token))
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl p-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Design Tokens</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your design system token values.
        </p>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <Label>Tokens</Label>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[48px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token, index) => (
                <TableRow key={token.name}>
                  <TableCell className="font-mono text-sm">{token.name}</TableCell>
                  <TableCell>
                    <Input
                      value={token.value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell>
                    {token.isColor && (
                      <div
                        className="size-6 rounded-full border shadow-sm"
                        style={{ backgroundColor: token.value }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
