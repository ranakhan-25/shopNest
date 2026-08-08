
"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center justify-center px-4 text-center">

        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20"
        >
          {/* Rotating Border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-5px] rounded-2xl border-2 border-transparent border-t-blue-400 border-r-blue-300"
          />

          <ShoppingBag className="h-9 w-9 text-white" />
        </motion.div>

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 text-2xl font-bold text-gray-900 dark:text-white"
        >
          Shop<span className="text-blue-600">Nest</span>
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Loading your shopping experience
        </motion.p>

        {/* Progress Bar */}
        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 rounded-full bg-blue-600"
          />
        </div>

        {/* Loading Dots */}
        <div className="mt-5 flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
              className="h-2 w-2 rounded-full bg-blue-600"
            />
          ))}
        </div>
      </div>
    </main>
  );
}