"use client";

import { memo } from "react";
import { Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoticeItem {
  id: string | number;
  text: string;
  badge?: string;
  isUrgent?: boolean;
}

interface NoticeBoardProps {
  readonly notices?: NoticeItem[];
  readonly className?: string;
  readonly speedSeconds?: number;
}

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: 1,
    text: "Banking Server Maintenance scheduled tonight from 01:00 AM to 03:00 AM. AEPS & DMT services may experience intermittent delays.",
    badge: "Important",
    isUrgent: true,
  },
  {
    id: 2,
    text: "New Instant Payout 2.0 is now live! Enjoy zero downtime and 100% instant settlement to all major bank accounts.",
    badge: "New Update",
  },
  {
    id: 3,
    text: "Earn extra ₹5 commission on every BBPS Electricity & Fastag recharge this week. Terms & conditions apply.",
    badge: "Offer",
  },
];

export const NoticeBoard = memo(function NoticeBoard({
  notices = DEFAULT_NOTICES,
  className,
  speedSeconds = 30,
}: NoticeBoardProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-orange-50/90 via-amber-50/60 to-blue-50/90 dark:from-orange-950/30 dark:via-slate-900/50 dark:to-blue-950/30 backdrop-blur-md shadow-xs flex items-center h-11 px-3 gap-3",
        className
      )}
    >
      {/* Notice Board Label Tag */}
      <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-xs tracking-wide select-none">
        <Megaphone className="w-3.5 h-3.5 animate-bounce" />
        <span>Notice Board</span>
      </div>

      {/* Marquee Container */}
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <div
          className="flex whitespace-nowrap items-center gap-8 hover:[animation-play-state:paused] cursor-default"
          style={{
            animation: `marqueeTicker ${speedSeconds}s linear infinite`,
            display: "inline-flex",
            width: "max-content",
          }}
        >
          {/* Double map for smooth infinite scrolling loop */}
          {[...notices, ...notices].map((notice, idx) => (
            <div
              key={`${notice.id}-${idx}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/90 font-medium select-none"
            >
              {notice.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    notice.isUrgent
                      ? "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30"
                      : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                  )}
                >
                  {notice.badge}
                </span>
              )}
              <span>{notice.text}</span>
              <span className="text-muted-foreground/40 mx-2">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
