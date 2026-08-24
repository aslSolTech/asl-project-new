import { ColumnDef, RowData } from "@tanstack/react-table";
import { AppTableFeatures, AppTableInstance } from "./appTable";

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<AppTableFeatures, TData, unknown>[];
  data: TData[];
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Column key to apply search filter on */
  searchKey?: string;
  /** Custom debounce delay in milliseconds for search (uses TanStack Pacer) */
  searchDebounceMs?: number;
  /** Enable virtualization for large datasets (defaults to true) */
  enableVirtualization?: boolean;
  /** Estimated row height for virtualization calculation */
  estimateRowHeight?: number;
  /** Custom container height (e.g. "600px" or "calc(100vh - 250px)") */
  containerHeight?: string;
  /** Loading state flag */
  loading?: boolean;
  /** Total count for server-side pagination */
  totalCount?: number;
  /** Callback triggered when debounced search term changes */
  onSearchChange?: (searchValue: string) => void;
}

export interface DataTableToolbarProps<TData extends RowData> {
  table: AppTableInstance<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  searchDebounceMs?: number;
  onSearchChange?: (searchValue: string) => void;
}

export interface DataTablePaginationProps<TData extends RowData> {
  table: AppTableInstance<TData>;
}

