"use client";

import { Column, RowData } from "@tanstack/react-table";
import { AppTableFeatures } from "./appTable";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<AppTableFeatures, TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  const sortedState = column.getIsSorted();

  const renderSortIcon = () => {
    if (sortedState === "desc") {
      return <ArrowDown className="ml-2 h-3.5 w-3.5 text-primary" />;
    }
    if (sortedState === "asc") {
      return <ArrowUp className="ml-2 h-3.5 w-3.5 text-primary" />;
    }
    return <ChevronsUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />;
  };

  if (!column.getCanSort()) {
    return (
      <div className={cn("text-xs font-semibold text-muted-foreground uppercase tracking-wider", className)}>
        {title}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex items-center justify-center rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-muted h-8 px-2 -ml-2 transition-colors cursor-pointer outline-none"
        >
          <span>{title}</span>
          {renderSortIcon()}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Desc
          </DropdownMenuItem>
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                Hide
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
