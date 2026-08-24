"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center space-y-6">
        {/* Glow effect in background */}
        <div className="absolute w-48 h-48 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse" />

        {/* Dynamic Spinning Rings */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <motion.div
            className="absolute w-16 h-16 rounded-full border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/30"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full border-4 border-b-secondary border-l-secondary/30 border-t-secondary/10 border-r-secondary/30"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          />
          {/* Central Pulsing Dot */}
          <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <motion.h3
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg font-bold tracking-wider text-foreground uppercase"
          >
            Loading Resources
          </motion.h3>
          <p className="text-xs text-muted-foreground font-medium max-w-[200px] mx-auto animate-pulse">
            Setting up your secure workspace...
          </p>
        </div>
      </div>
    </div>
  );
}
