"use client";

import { motion } from "framer-motion";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Create your VoteVerse account</h1>
        <SignupForm />
      </motion.div>
    </main>
  );
}
