"use client";

import { useRef, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  ColumnVisibilityState,
  RowData,
  HeaderGroup,
  Header,
  Row,
  Cell,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useAppTable, AppTableFeatures } from "./appTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableProps } from "./types";
import { cn } from "@/lib/utils";

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  searchDebounceMs = 300,
  enableVirtualization = true,
  estimateRowHeight = 48,
  containerHeight = "500px",
  loading = false,
  onSearchChange,
}: Readonly<DataTableProps<TData>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useAppTable({
    data,
    columns: columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;

  // TanStack Virtual setup for rendering large datasets cleanly
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => estimateRowHeight,
    overscan: 10,
    enabled: enableVirtualization,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const renderTableBody = () => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={`skeleton-row-${index + 1}`}>
          {columns.map((_, colIndex: number) => (
            <TableCell key={`skeleton-col-${colIndex + 1}`} className="px-4 py-3">
              <Skeleton className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    if (rows.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-32 text-center text-sm text-muted-foreground"
          >
            No records found.
          </TableCell>
        </TableRow>
      );
    }

    if (enableVirtualization) {
      const firstVirtualRow = virtualRows.at(0);
      const lastVirtualRow = virtualRows.at(-1);
      const topSpacerHeight = firstVirtualRow && firstVirtualRow.start > 0 ? firstVirtualRow.start : 0;
      const bottomSpacerHeight = lastVirtualRow
        ? rowVirtualizer.getTotalSize() - lastVirtualRow.end
        : 0;

      return (
        <>
          {topSpacerHeight > 0 && (
            <tr>
              <td style={{ height: `${topSpacerHeight}px` }} colSpan={columns.length} />
            </tr>
          )}

          {virtualRows.map((virtualRow) => {
            const row: Row<AppTableFeatures, TData> = rows[virtualRow.index] as unknown as Row<AppTableFeatures, TData>;
            return (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected?.() && "selected"}
                className={cn(
                  "transition-colors hover:bg-muted/40 text-xs sm:text-sm border-b border-border/50",
                  row.getIsSelected?.() && "bg-primary/5 font-medium"
                )}
              >
                {row.getVisibleCells().map((cell: Cell<AppTableFeatures, TData, unknown>) => (
                  <TableCell key={cell.id} className="px-4 py-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          {bottomSpacerHeight > 0 && (
            <tr>
              <td style={{ height: `${bottomSpacerHeight}px` }} colSpan={columns.length} />
            </tr>
          )}
        </>
      );
    }

    return rows.map((rowItem) => {
      const row: Row<AppTableFeatures, TData> = rowItem as unknown as Row<AppTableFeatures, TData>;
      return (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected?.() && "selected"}
          className={cn(
            "transition-colors hover:bg-muted/40 text-xs sm:text-sm border-b border-border/50",
            row.getIsSelected?.() && "bg-primary/5 font-medium"
          )}
        >
          {row.getVisibleCells().map((cell: Cell<AppTableFeatures, TData, unknown>) => (
            <TableCell key={cell.id} className="px-4 py-3 align-middle">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <div className="w-full space-y-3">
      {/* Search Toolbar with TanStack Pacer debouncing */}
      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        searchDebounceMs={searchDebounceMs}
        onSearchChange={onSearchChange}
      />

      {/* Table Container */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div
          ref={tableContainerRef}
          className="relative overflow-auto"
          style={{ height: containerHeight }}
        >
          <Table className="relative w-full border-collapse">
            <TableHeader className="sticky top-0 z-10 bg-muted/90 backdrop-blur-md shadow-xs">
              {table.getHeaderGroups().map((headerGroupItem) => {
                const headerGroup: HeaderGroup<AppTableFeatures, TData> = headerGroupItem as unknown as HeaderGroup<AppTableFeatures, TData>;
                return (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                    {headerGroup.headers.map((header: Header<AppTableFeatures, TData, unknown>) => {
                      const headerSize = header.column.getSize();
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width: headerSize || undefined }}
                          className="h-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 py-2"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableHeader>

            <TableBody className="relative">{renderTableBody()}</TableBody>
          </Table>
        </div>

        {/* Accessible Pagination Footer */}
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
