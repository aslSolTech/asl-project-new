"use client";

import { memo } from "react";
import Link from "next/link";
import { LogOut, User, Sparkles, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdminProfileStore } from "@/stores/useAdminProfileStore";
import { formatISODate } from "@/lib/datefns";

export const ProfileMenu = memo(function ProfileMenu() {
  const { profile: user } = useAdminProfileStore();

  const formattedLastLogin = user.lastLogin
    ? formatISODate({ date: user.lastLogin, formatType: "short" })
    : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 group outline-none cursor-pointer">
        {formattedLastLogin && (
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              Last Login
            </p>
            <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {formattedLastLogin}
            </p>
          </div>
        )}
        <div className="relative">
          <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-md group-hover:shadow-lg transition-shadow">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/15 text-primary font-bold">
              {user?.name?.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-slate-800 p-0"
        align="end"
        sideOffset={8}
      >
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <Avatar className="w-14 h-14 border-2 border-white dark:border-slate-800 shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/15 text-primary font-bold text-lg">
                {user?.name?.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">● {user.role}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <DropdownMenuGroup>
            {/* My Profile */}
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-primary/10 focus:text-primary">
              <Link href="/dashboard/profile" className="flex items-center gap-3 w-full">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">My Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />

          <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-destructive/10 focus:text-destructive">
            <Link href="/login" className="flex items-center gap-3 w-full">
              <LogOut className="w-4 h-4 text-destructive/80" />
              <span className="text-sm font-medium text-destructive">Sign Out</span>
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});