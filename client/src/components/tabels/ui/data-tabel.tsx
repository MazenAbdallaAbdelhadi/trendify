import { useState } from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-tabel-pagination";
import { DataTableToolbar } from "./data-tabel-toolbar";

import usePagination from "@/hooks/use-pagination";
import useSorting from "@/hooks/use-sorting";
import { useFilter } from "@/hooks/use-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
    prev?: number;
    documentCount: number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationResult,
}: DataTableProps<TData, TValue>) {
  const { pagination, setPagination } = usePagination(
    paginationResult.currentPage,
    paginationResult.limit
  );
  const { sorting, setSorting } = useSorting();
  const {filter,setFilter} = useFilter();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnVisibility,
      columnFilters: filter,
    },
    manualPagination: true,
    manualSorting: true,

    pageCount: paginationResult.numberOfPages,
    autoResetPageIndex: false,

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
