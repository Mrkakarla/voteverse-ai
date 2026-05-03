"use client";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-md p-6">
        <h1 className="mb-4 text-2xl font-bold">Login to VoteVerse</h1>
        <LoginForm />
      </motion.div>
    </main>
  );
}
