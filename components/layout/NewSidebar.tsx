"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Users, FileText, LifeBuoy, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/team", label: "Team Structure", icon: Users },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

export function NewSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-primary-dark text-primary-light">
      {/* Logo Area */}
      <div className="h-[80px] flex items-center px-lg">
        <Link href="/" className="flex items-center gap-2">
          <LifeBuoy className="h-8 w-8 text-accent-green" />
          <h1 className="text-xl font-bold">AeuxGlobal</h1>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-md py-lg space-y-sm">
        <p className="px-sm text-text-muted text-xs uppercase tracking-wider">Navigation</p>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-sm py-2 text-nav transition-colors ${
              pathname === item.href
                ? "bg-accent-green text-primary-light"
                : "text-text-muted hover:bg-background-hover/10 hover:text-primary-light"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Account Section */}
      <div className="p-lg border-t border-border-light/10">
        <p className="px-sm text-text-muted text-xs uppercase tracking-wider mb-sm">User Account</p>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="Alex Williamson" />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-body">Alex Williamson</p>
            <p className="text-xs text-text-muted">Admin-3D1A</p>
          </div>
          <button className="ml-auto p-2 rounded-full hover:bg-background-hover/10">
            <Settings className="h-5 w-5 text-text-muted" />
          </button>
        </div>
      </div>
    </div>
  );
}
