"use client";

import { RowData, Table } from "@tanstack/react-table";
import { AppTableFeatures } from "./appTable";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePaginationProps } from "./types";

export function DataTablePagination<TData extends RowData>({
  table: rawTable,
}: Readonly<DataTablePaginationProps<TData>>) {
  const table = rawTable as unknown as Table<AppTableFeatures, TData>;

  if (!table) {
    return null;
  }

  const getPaginationState = () => {
    const tbl = table as unknown as Record<string, unknown>;
    if (typeof tbl.getState === "function") {
      return (tbl.getState() as { pagination: { pageIndex: number; pageSize: number } }).pagination;
    }
    if (tbl.state && typeof tbl.state === "object" && "pagination" in tbl.state) {
      return (tbl.state as { pagination: { pageIndex: number; pageSize: number } }).pagination;
    }
    return { pageIndex: 0, pageSize: 10 };
  };

  const pagination = getPaginationState();

  const pageCount = table.getPageCount?.() || 1;
  const filteredRows = table.getFilteredRowModel?.()?.rows || [];
  const selectedRows = table.getFilteredSelectedRowModel?.()?.rows || [];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-3 border-t border-border bg-card/50">
      <div className="text-xs text-muted-foreground">
        {selectedRows.length > 0 ? (
          <span>
            {selectedRows.length} of {filteredRows.length} row(s) selected.
          </span>
        ) : (
          <span>Total {filteredRows.length} record(s)</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center space-x-2">
          <p className="text-xs font-medium text-muted-foreground">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-xs">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50, 100, 250, 500].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-xs font-medium text-muted-foreground">
          Page {pagination.pageIndex + 1} of {pageCount}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex?.(0)}
            disabled={!table.getCanPreviousPage?.()}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage?.()}
            disabled={!table.getCanPreviousPage?.()}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage?.()}
            disabled={!table.getCanNextPage?.()}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex?.(pageCount - 1)}
            disabled={!table.getCanNextPage?.()}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
