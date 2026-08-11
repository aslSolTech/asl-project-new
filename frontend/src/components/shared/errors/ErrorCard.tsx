'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { RotateCcw, ChevronLeft, Home } from 'lucide-react';
import { ErrorCardProps } from '@/components/shared/errors/errors';

export function ErrorCard({
  statusCode,
  title,
  description,
  imageSrc,
  emoji,
  icon,
  onRetry,
  showHomeBtn = true,
  showBackBtn = true,
}: ErrorCardProps) {
  const router = useRouter();

  const displayStatusCode = statusCode ?? 404;

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-screen bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
      {/* Main Fullscreen Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full h-full max-w-7xl flex items-center"
      >
        <div className="w-full h-full backdrop-blur-2xl bg-card border border-border/80 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-center group">
          
          {/* Full Card Background Image Layer - Responsive Positioning */}
          {imageSrc && (
            <div className="absolute inset-y-0 right-0 w-full md:w-[60%] lg:w-[50%] z-0 overflow-hidden pointer-events-none p-4 md:p-8 flex items-center justify-center md:justify-end">
              <Image
                src={imageSrc}
                alt={`${displayStatusCode} Error Background`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center md:object-right w-full h-full opacity-20 sm:opacity-30 md:opacity-90 dark:opacity-25 transition-transform duration-1000 ease-out group-hover:scale-101"
              />
              {/* Soft gradient fade so text is 100% crisp on all screens */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent md:from-card md:via-card/40 md:to-transparent pointer-events-none" /> */}
            </div>
          )}

          {/* Card Content (Floating cleanly on top) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center h-full relative z-10">
            
            {/* Main Info: Code, Title, Description, Buttons */}
            <div className="md:col-span-8 lg:col-span-7 flex flex-col text-left space-y-6 md:space-y-8">
              
              {/* Status Code Header */}
              <div className="flex items-center">
                <span className="font-museo font-extrabold text-6xl sm:text-7xl lg:text-9xl tracking-tight bg-gradient-to-b from-foreground to-secondary/90 bg-clip-text text-transparent">
                  {displayStatusCode}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-b from-foreground to-secondary/90 bg-clip-text text-transparent tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                  {description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {onRetry && (
                  <motion.button
                    onClick={onRetry}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-7 py-4 rounded-2xl font-semibold text-base text-primary-foreground bg-orange-700 hover:bg-orange-700/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Try Again</span>
                  </motion.button>
                )}

                {showHomeBtn && (
                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-7 py-4 rounded-2xl font-semibold text-base text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Home className="w-5 h-5" />
                      <span>Go Home</span>
                    </motion.button>
                  </Link>
                )}

                {showBackBtn && (
                  <motion.button
                    onClick={() => router.back()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 rounded-2xl font-semibold text-base text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Go Back</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Optional Right Accent: Emoji / Icon (When imageSrc is not present) */}
            {!imageSrc && (emoji || icon) && (
              <div className="md:col-span-4 lg:col-span-5 flex items-center justify-center h-full">
                {emoji && (
                  <motion.div
                    className="text-8xl md:text-9xl lg:text-[10rem] select-none"
                    animate={{ rotate: [0, 8, -8, 0], y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {emoji}
                  </motion.div>
                )}
                {!emoji && icon && (
                  <motion.div className="text-8xl md:text-9xl lg:text-[10rem] text-primary select-none">
                    {icon}
                  </motion.div>
                )}
              </div>
            )}

          </div>

          {/* Decorative bottom bar */}
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-64 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur-sm opacity-60 pointer-events-none"
            animate={{ scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
