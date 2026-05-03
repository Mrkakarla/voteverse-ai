"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bot, BookOpen, MapPin, Search, Trophy, Vote } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Learn Fast", desc: "Bite-sized civic modules in plain language." },
  { icon: Bot, title: "Ask Vira", desc: "24x7 AI mentor for election doubts." },
  { icon: Search, title: "Verify Claims", desc: "Detect misinformation before sharing." },
  { icon: Vote, title: "Practice Voting", desc: "Experience a realistic election simulation." },
  { icon: MapPin, title: "Find Booth", desc: "Locate your nearest polling station quickly." },
  { icon: Trophy, title: "Earn Badges", desc: "Track your civic progress with rewards." },
];

export default function LandingPage() {
  const [typed, setTyped] = useState("");
  const fullText = "Your Guide to Informed Voting";
  const targetDate = useMemo(() => new Date("2026-11-20T07:00:00Z"), []);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const i = setInterval(() => {
      setTyped((prev) => {
        if (prev.length >= fullText.length) return prev;
        return fullText.slice(0, prev.length + 1);
      });
    }, 60);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const delta = Math.max(0, targetDate.getTime() - now);
      const d = Math.floor(delta / 86400000);
      const h = Math.floor((delta % 86400000) / 3600000);
      const m = Math.floor((delta % 3600000) / 60000);
      const s = Math.floor((delta % 60000) / 1000);
      setCountdown({ d, h, m, s });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-indigo-300/50"
            style={{ left: `${(i * 29) % 100}%`, top: `${(i * 17) % 100}%` }}
            animate={{ y: [0, -8, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between p-6">
        <h1 className="text-2xl font-extrabold text-indigo-700">VoteVerse AI</h1>
        <div className="flex items-center gap-3">
          <Link className="rounded-lg border border-indigo-200 px-4 py-2 text-sm" href="/login">Login</Link>
          <Link className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" href="/signup">Sign Up</Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-10 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black leading-tight text-slate-900"
          >
            {typed}
            <span className="animate-pulse text-amber-500">|</span>
          </motion.h2>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            VoteVerse helps citizens understand elections, fight misinformation, and move confidently from registration to election day.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/signup" className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-900">Start Learning Free</Link>
            <Link href="/login" className="rounded-xl border border-slate-300 px-6 py-3 font-semibold">Explore Dashboard</Link>
          </div>
          <div className="mt-8 grid grid-cols-4 gap-3 max-w-md">
            {Object.entries(countdown).map(([k, v]) => (
              <div key={k} className="card p-3 text-center">
                <div className="text-2xl font-bold text-indigo-700">{v}</div>
                <div className="text-xs uppercase text-slate-500">{k}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 p-1 shadow-2xl"
        >
          <div className="h-full w-full rounded-full bg-white/90 p-8">
            <div className="h-full w-full rounded-full border-4 border-dashed border-indigo-300 animate-spin" style={{ animationDuration: "16s" }} />
            <div className="-mt-40 text-center text-6xl">🌍</div>
            <p className="mt-4 text-center font-semibold text-slate-700">2.4M voters educated</p>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="card p-6"
            >
              <f.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-slate-600">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="border-t bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>VoteVerse AI © 2026</p>
          <div className="flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
