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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Eye,
  LayoutTemplate,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  TrendingUp,
  Clock,
  SortAsc,
  Check,
  Sparkles,
  Smartphone,
  Moon,
  Zap,
  Lock,
} from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  gradient: string
  tags: string[]
  premium: boolean
  creator: {
    name: string
    avatar: string
    initials: string
  }
  features: string[]
}

const allTemplates: Template[] = [
  {
    id: "1",
    name: "SaaS Landing",
    description: "Modern landing page with hero, features, and pricing sections.",
    category: "landing",
    gradient: "from-violet-500 to-purple-600",
    tags: ["Responsive", "Dark Mode"],
    premium: false,
    creator: { name: "Sarah Chen", avatar: "", initials: "SC" },
    features: [
      "Responsive hero section with CTA",
      "Feature grid with icons",
      "Pricing table with toggle",
      "Testimonial carousel",
      "Footer with newsletter signup",
    ],
  },
  {
    id: "2",
    name: "Startup Hero",
    description: "Bold startup homepage with gradient hero and animated elements.",
    category: "landing",
    gradient: "from-pink-500 to-rose-600",
    tags: ["Animated", "Responsive"],
    premium: true,
    creator: { name: "Alex Rivera", avatar: "", initials: "AR" },
    features: [
      "Animated gradient background",
      "Floating UI element previews",
      "Social proof section",
      "Integration logos grid",
      "FAQ accordion section",
    ],
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Data-rich dashboard with charts, tables, and real-time metrics.",
    category: "dashboard",
    gradient: "from-sky-500 to-blue-600",
    tags: ["Charts", "Data Table"],
    premium: false,
    creator: { name: "Jordan Lee", avatar: "", initials: "JL" },
    features: [
      "KPI metric cards with trends",
      "Area and bar chart components",
      "Sortable data table",
      "Date range picker",
      "Export to CSV functionality",
    ],
  },
  {
    id: "4",
    name: "Admin Panel",
    description: "Comprehensive admin interface with role management and logs.",
    category: "dashboard",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["Sidebar", "Dark Mode"],
    premium: true,
    creator: { name: "Maya Patel", avatar: "", initials: "MP" },
    features: [
      "Collapsible sidebar navigation",
      "User management table",
      "Role-based access display",
      "Activity log timeline",
      "System settings panel",
    ],
  },
  {
    id: "5",
    name: "Newsletter",
    description: "Clean email template with modular content blocks.",
    category: "email",
    gradient: "from-amber-500 to-orange-600",
    tags: ["Responsive", "Accessible"],
    premium: false,
    creator: { name: "Chris Walker", avatar: "", initials: "CW" },
    features: [
      "Branded email header",
      "Rich text content blocks",
      "Image with caption module",
      "CTA button component",
      "Unsubscribe footer",
    ],
  },
  {
    id: "6",
    name: "Social Card",
    description: "Eye-catching social media post template with branding.",
    category: "social",
    gradient: "from-cyan-500 to-blue-500",
    tags: ["1080x1080", "Branded"],
    premium: false,
    creator: { name: "Taylor Kim", avatar: "", initials: "TK" },
    features: [
      "Customizable background",
      "Logo placement area",
      "Typography presets",
      "Brand color integration",
      "Multiple aspect ratios",
    ],
  },
  {
    id: "7",
    name: "Product Launch",
    description: "High-converting product launch page with countdown timer.",
    category: "landing",
    gradient: "from-fuchsia-500 to-pink-600",
    tags: ["Countdown", "Animated"],
    premium: true,
    creator: { name: "Sarah Chen", avatar: "", initials: "SC" },
    features: [
      "Countdown timer component",
      "Product showcase gallery",
      "Early access signup form",
      "Social sharing buttons",
      "Animated scroll reveals",
    ],
  },
  {
    id: "8",
    name: "Project Tracker",
    description: "Kanban-style project management board with drag and drop.",
    category: "dashboard",
    gradient: "from-indigo-500 to-violet-600",
    tags: ["Kanban", "Drag & Drop"],
    premium: false,
    creator: { name: "Alex Rivera", avatar: "", initials: "AR" },
    features: [
      "Drag and drop columns",
      "Task cards with labels",
      "Team member assignment",
      "Due date tracking",
      "Progress indicators",
    ],
  },
  {
    id: "9",
    name: "Story Carousel",
    description: "Instagram-style story carousel for social media campaigns.",
    category: "social",
    gradient: "from-orange-500 to-red-600",
    tags: ["Stories", "Mobile-First"],
    premium: true,
    creator: { name: "Jordan Lee", avatar: "", initials: "JL" },
    features: [
      "Swipeable story cards",
      "Text overlay editor",
      "Filter and effect presets",
      "Progress bar indicator",
      "Call-to-action slides",
    ],
  },
]

const ITEMS_PER_PAGE = 6

export default function TemplateBrowserFeatureRich() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["1", "3"]))
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "name">("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filteredTemplates = allTemplates
    .filter((t) => {
      const matchesSearch =
        search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        activeTab === "all" || t.category === activeTab
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "newest") return Number(b.id) - Number(a.id)
      return 0
    })

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedTemplates = filteredTemplates.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  )

  function getFeatureIcon(feature: string) {
    if (feature.toLowerCase().includes("responsive")) return <Smartphone className="size-3" />
    if (feature.toLowerCase().includes("dark")) return <Moon className="size-3" />
    if (feature.toLowerCase().includes("animated")) return <Sparkles className="size-3" />
    if (feature.toLowerCase().includes("fast") || feature.toLowerCase().includes("performance"))
      return <Zap className="size-3" />
    return <Check className="size-3" />
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="size-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Template Browser</h2>
          <Badge variant="secondary" className="ml-1 text-xs">
            {allTemplates.length} templates
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-1 size-3" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("popular")}>
              <TrendingUp className="mr-2 size-4" />
              Popular
              {sortBy === "popular" && <Check className="ml-auto size-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("newest")}>
              <Clock className="mr-2 size-4" />
              Newest
              {sortBy === "newest" && <Check className="ml-auto size-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              <SortAsc className="mr-2 size-4" />
              Name A-Z
              {sortBy === "name" && <Check className="ml-auto size-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-9"
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setCurrentPage(1)
        }}
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="landing">Landing Pages</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
          <TabsTrigger value="email">Emails</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <Separator className="my-4" />

        <TabsContent value={activeTab} className="mt-0">
          {paginatedTemplates.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No templates found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {paginatedTemplates.map((template) => (
                <Card key={template.id} className="group overflow-hidden">
                  <CardContent className="relative p-0">
                    <div
                      className={`flex h-36 items-center justify-center bg-gradient-to-br ${template.gradient}`}
                    >
                      <div className="w-3/4 rounded-md bg-white/20 p-4 backdrop-blur-sm">
                        <div className="mb-2 h-2 w-full rounded bg-white/60" />
                        <div className="mb-2 h-2 w-3/4 rounded bg-white/40" />
                        <div className="h-2 w-1/2 rounded bg-white/30" />
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className="absolute right-2 top-2 rounded-full bg-black/20 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/40"
                    >
                      <Heart
                        className={`size-3.5 ${
                          favorites.has(template.id)
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                    </button>
                    {template.premium && (
                      <Badge className="absolute left-2 top-2 bg-amber-500 text-white hover:bg-amber-600">
                        <Lock className="mr-1 size-2.5" />
                        Premium
                      </Badge>
                    )}
                  </CardContent>
                  <CardHeader className="p-3 pb-1">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <div className="flex items-center gap-2 px-3 pb-2">
                    <Avatar className="size-5">
                      <AvatarImage src={template.creator.avatar} alt={template.creator.name} />
                      <AvatarFallback className="text-[8px]">
                        {template.creator.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] text-muted-foreground">
                      {template.creator.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 px-3 pb-2">
                    {template.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardFooter className="flex gap-2 p-3 pt-0">
                    <Button size="sm" className="flex-1">
                      Use
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTemplate(template)}
                    >
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

      {totalPages > 1 && (
        <>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Page {safeCurrentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="mr-1 size-3" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <ChevronRight className="ml-1 size-3" />
              </Button>
            </div>
          </div>
        </>
      )}

      <Dialog
        open={selectedTemplate !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTemplate(null)
        }}
      >
        {selectedTemplate && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selectedTemplate.name}</DialogTitle>
                {selectedTemplate.premium && (
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                    <Lock className="mr-1 size-2.5" />
                    Premium
                  </Badge>
                )}
              </div>
              <DialogDescription>{selectedTemplate.description}</DialogDescription>
            </DialogHeader>

            <div
              className={`flex h-48 items-center justify-center rounded-lg bg-gradient-to-br ${selectedTemplate.gradient}`}
            >
              <div className="w-3/4 rounded-lg bg-white/20 p-6 backdrop-blur-sm">
                <div className="mb-3 h-3 w-full rounded bg-white/60" />
                <div className="mb-3 h-3 w-5/6 rounded bg-white/40" />
                <div className="mb-3 h-3 w-2/3 rounded bg-white/30" />
                <div className="h-3 w-1/2 rounded bg-white/20" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={selectedTemplate.creator.avatar}
                    alt={selectedTemplate.creator.name}
                  />
                  <AvatarFallback className="text-[9px]">
                    {selectedTemplate.creator.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  by {selectedTemplate.creator.name}
                </span>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 text-sm font-medium">Features</h4>
                <ul className="space-y-1.5">
                  {selectedTemplate.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getFeatureIcon(feature)}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedTemplate.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Close
              </Button>
              <Button>
                <Sparkles className="mr-2 size-4" />
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
