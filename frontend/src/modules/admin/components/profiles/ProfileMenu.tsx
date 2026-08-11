"use client";

import { memo } from "react";
import Link from "next/link";
import { LogOut, Settings, Shield, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DEFAULT_USER_PROFILE as user } from "../../constants";

export const ProfileMenu = memo(function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 group outline-none cursor-pointer">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{user.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
        <div className="relative">
          <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-md group-hover:shadow-lg transition-shadow">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
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
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30">
          <div className="flex items-center gap-3">
            <Avatar className="w-14 h-14 border-2 border-white dark:border-slate-800 shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-lg">
                {user?.name?.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">● {user.role}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <DropdownMenuGroup>
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-950/60 focus:text-indigo-700 dark:focus:text-indigo-300">
              <Link href="/dashboard/settings/account/profile" className="flex items-center gap-3 w-full">
                <User className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">My Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-950/60 focus:text-indigo-700 dark:focus:text-indigo-300">
              <Link href="/dashboard/settings" className="flex items-center gap-3 w-full">
                <Settings className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-950/60 focus:text-indigo-700 dark:focus:text-indigo-300">
              <Link href="/dashboard/settings/security/2fa" className="flex items-center gap-3 w-full">
                <Shield className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Security</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />

          <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/50 focus:text-red-600 dark:focus:text-red-400">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Sign Out</span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});