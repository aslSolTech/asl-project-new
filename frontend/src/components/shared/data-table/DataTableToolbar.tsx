"use client";

import { useState } from "react";
import { RowData, Table } from "@tanstack/react-table";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTableFeatures } from "./appTable";
import { DataTableToolbarProps } from "./types";

export function DataTableToolbar<TData extends RowData>({
  table: rawTable,
  searchKey,
  searchPlaceholder = "Search records...",
  searchDebounceMs = 300,
  onSearchChange,
}: Readonly<DataTableToolbarProps<TData>>) {
  const table = rawTable as unknown as Table<AppTableFeatures, TData>;
  // Local input state for instant UI response
  const [searchTerm, setSearchTerm] = useState<string>("");

  // TanStack Pacer debounced callback to stop redundant search triggers (declared before early returns)
  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      if (!table) return;
      if (searchKey) {
        table.getColumn(searchKey)?.setFilterValue(value);
      } else {
        table.setGlobalFilter(value);
      }
      onSearchChange?.(value);
    },
    {
      wait: searchDebounceMs,
    }
  );

  if (!table) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (searchKey) {
      table.getColumn?.(searchKey)?.setFilterValue?.("");
    } else {
      table.setGlobalFilter?.("");
    }
    onSearchChange?.("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableObj = table as any;
  const isFiltered = Boolean(tableObj.state?.globalFilter) || (tableObj.state?.columnFilters?.length || 0) > 0;
  const allColumns = tableObj.getAllColumns?.() || [];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-1">
      <div className="flex flex-1 items-center space-x-2 w-full sm:w-auto">
        <div className="relative w-full sm:w-72 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleInputChange}
            className="pl-9 pr-8 h-9 text-xs sm:text-sm bg-background border-border rounded-lg focus-visible:ring-primary/20"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters?.();
              table.setGlobalFilter?.("");
              setSearchTerm("");
              onSearchChange?.("");
            }}
            className="h-8 px-2 lg:px-3 text-xs"
          >
            Reset
            <X className="ml-2 h-3.5 w-3.5" />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 h-8 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground gap-1.5 cursor-pointer outline-none">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs">Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allColumns
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((column: any) => column.accessorFn !== undefined && column.getCanHide?.())
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((column: any) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-xs"
                      checked={column.getIsVisible?.()}
                      onCheckedChange={(value) => column.toggleVisibility?.(Boolean(value))}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
