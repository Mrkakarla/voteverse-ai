"use client";

import { motion } from "framer-motion";

export function VoteCastAnimation() {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-xl bg-green-100 p-4 text-center text-green-700">
      Vote cast successfully.
    </motion.div>
  );
}
