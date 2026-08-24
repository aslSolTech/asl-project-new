"use client";

import {
  createTableHook,
  tableFeatures,
  rowPaginationFeature,
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  columnSizingFeature,
  createPaginatedRowModel,
  createSortedRowModel,
  createFilteredRowModel,
  createCoreRowModel,
  RowData,
} from "@tanstack/react-table";

const features = tableFeatures({
  rowPaginationFeature,
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  columnSizingFeature,
  coreRowModel: createCoreRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
});

export const {
  useAppTable,
  createAppColumnHelper,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHook({
  features,
});

export type AppTableFeatures = typeof features;
export type AppTableInstance<TData extends RowData> = ReturnType<typeof useAppTable<TData>>;
