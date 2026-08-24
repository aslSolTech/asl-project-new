"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CheckCircle2, Info, AlertTriangle, AlertOctagon, Loader2 } from "lucide-react";

function subscribeMobileQuery(callback: () => void) {
  const mql = window.matchMedia("(max-width: 767px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getIsMobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getServerSnapshot() {
  return false;
}

function useIsMobile() {
  return useSyncExternalStore(subscribeMobileQuery, getIsMobileSnapshot, getServerSnapshot);
}

const Toaster = ({ position: positionProp, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const isMobile = useIsMobile();
  const position = positionProp ?? (isMobile ? "top-center" : "bottom-right");

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={position}
      className="toaster group"
      richColors
      closeButton
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />,
        info: <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />,
        error: <AlertOctagon className="h-5 w-5 text-destructive flex-shrink-0" />,
        loading: <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast flex items-center gap-3 w-full max-w-[calc(100vw-2rem)] sm:max-w-sm sm:w-auto rounded-2xl p-4 border shadow-2xl backdrop-blur-xl transition-all duration-300 font-sans text-sm",
          title: "font-semibold text-sm tracking-tight",
          description: "text-xs opacity-90 mt-0.5",
          actionButton:
            "bg-primary text-primary-foreground text-xs font-semibold rounded-xl px-3 py-1.5 transition-colors hover:bg-primary/90",
          cancelButton:
            "bg-muted text-muted-foreground text-xs font-semibold rounded-xl px-3 py-1.5 transition-colors hover:bg-muted/80",
          closeButton:
            "!bg-background/50 !border-border/40 !text-foreground hover:!bg-background/80 transition-all",
          default:
            "bg-card/85 text-card-foreground border-border/80 backdrop-blur-xl shadow-xl",
          error:
            "!bg-destructive/10 !border-destructive/30 !text-destructive dark:!bg-destructive/20 dark:!border-destructive/40 dark:!text-red-400 backdrop-blur-xl shadow-red-500/5",
          success:
            "!bg-emerald-500/10 !border-emerald-500/30 !text-emerald-600 dark:!bg-emerald-500/20 dark:!border-emerald-500/40 dark:!text-emerald-400 backdrop-blur-xl shadow-emerald-500/5",
          warning:
            "!bg-amber-500/10 !border-amber-500/30 !text-amber-600 dark:!bg-amber-500/20 dark:!border-amber-500/40 dark:!text-amber-400 backdrop-blur-xl shadow-amber-500/5",
          info:
            "!bg-blue-500/10 !border-blue-500/30 !text-blue-600 dark:!bg-blue-500/20 dark:!border-blue-500/40 dark:!text-blue-400 backdrop-blur-xl shadow-blue-500/5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
