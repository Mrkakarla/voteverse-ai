"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookOpen, Home, User, Vote } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/simulator", label: "Sim", icon: Vote },
  { href: "/chatbot", label: "Chat", icon: Bot },
  { href: "/profile", label: "Profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-2 lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className={`flex flex-col items-center rounded-lg p-2 text-xs ${pathname === i.href ? "bg-indigo-600 text-white" : "text-slate-600"}`}>
            <i.icon className="h-4 w-4" />
            {i.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
