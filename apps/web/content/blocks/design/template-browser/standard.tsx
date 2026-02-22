"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Search, Eye, LayoutTemplate } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  gradient: string
  tags: string[]
}

const templates: Template[] = [
  {
    id: "1",
    name: "SaaS Landing",
    description: "Modern landing page with hero, features, and pricing sections.",
    category: "landing",
    gradient: "from-violet-500 to-purple-600",
    tags: ["Responsive", "Dark Mode"],
  },
  {
    id: "2",
    name: "Startup Hero",
    description: "Bold startup homepage with gradient hero and CTA buttons.",
    category: "landing",
    gradient: "from-pink-500 to-rose-600",
    tags: ["Animated", "Responsive"],
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Data-rich dashboard with charts, tables, and metric cards.",
    category: "dashboard",
    gradient: "from-sky-500 to-blue-600",
    tags: ["Charts", "Data Table"],
  },
  {
    id: "4",
    name: "Admin Panel",
    description: "Comprehensive admin interface with sidebar navigation.",
    category: "dashboard",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["Sidebar", "Dark Mode"],
  },
  {
    id: "5",
    name: "Newsletter",
    description: "Clean email template with header, content, and footer.",
    category: "email",
    gradient: "from-amber-500 to-orange-600",
    tags: ["Responsive", "Accessible"],
  },
  {
    id: "6",
    name: "Social Card",
    description: "Eye-catching social media post template with image area.",
    category: "social",
    gradient: "from-cyan-500 to-blue-500",
    tags: ["1080x1080", "Branded"],
  },
]

export function TemplateBrowser() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeTab === "all" || t.category === activeTab
    return matchesSearch && matchesCategory
  })

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center gap-2">
        <LayoutTemplate className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Template Browser</h2>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="landing">Landing Pages</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
          <TabsTrigger value="email">Emails</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <Separator className="my-4" />

        <TabsContent value={activeTab} className="mt-0">
          {filteredTemplates.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No templates found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className={`flex h-36 items-center justify-center bg-gradient-to-br ${template.gradient}`}
                    >
                      <div className="w-3/4 rounded-md bg-white/20 p-4 backdrop-blur-sm">
                        <div className="mb-2 h-2 w-full rounded bg-white/60" />
                        <div className="mb-2 h-2 w-3/4 rounded bg-white/40" />
                        <div className="h-2 w-1/2 rounded bg-white/30" />
                      </div>
                    </div>
                  </CardContent>
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <div className="flex flex-wrap gap-1 px-3 pb-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardFooter className="flex gap-2 p-3 pt-0">
                    <Button size="sm" className="flex-1">
                      Use
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-1 size-3" />
                      Preview
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
