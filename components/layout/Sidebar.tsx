"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookOpen, LayoutDashboard, MapPin, Search, Settings, Trophy, User, Vote, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/simulator", label: "Simulator", icon: Vote },
  { href: "/chatbot", label: "AI Assistant", icon: Bot },
  { href: "/fake-news", label: "Fake News Check", icon: Search },
  { href: "/booth-locator", label: "Booth Locator", icon: MapPin },
  { href: "/pledge", label: "Pledge Wall", icon: Handshake },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-72 border-r bg-white p-4 lg:block">
      <h2 className="mb-6 px-2 text-2xl font-black text-indigo-700">VoteVerse AI</h2>
      <nav className="space-y-1">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
              pathname === i.href ? "bg-indigo-600 text-white" : "hover:bg-slate-100",
            )}
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
