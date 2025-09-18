"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Camera,
  Sprout,
  CloudRain,
  BarChart3,
  Users,
  MessageCircle,
  Settings,
  Menu,
  Leaf,
  TrendingUp,
  FileText,
  HelpCircle,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Disease Detection", href: "/disease-detection", icon: Camera },
  { name: "Crop Recommendations", href: "/crop-recommendations", icon: Sprout },
  { name: "Weather Analytics", href: "/weather", icon: CloudRain },
  { name: "Farm Management", href: "/farm-management", icon: BarChart3 },
  { name: "Market Prices", href: "/market-prices", icon: TrendingUp },
  { name: "Soil Health", href: "/soil-health", icon: Leaf },
  { name: "Government Schemes", href: "/schemes", icon: FileText },
  { name: "Community", href: "/community", icon: Users },
  { name: "AI Assistant", href: "/chat", icon: MessageCircle },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 py-2">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-primary">Kerala Farm</h2>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </div>
          </div>
        </div>
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2 h-10",
                      pathname === item.href && "bg-secondary text-secondary-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
