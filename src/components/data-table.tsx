"use client";

import * as React from "react";
import { parseAsString, useQueryState } from "nuqs";
import {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getFacetedMinMaxValues,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/table-pagination";
import { DataTableHeader } from "@/components/table-header";
import { useRangeFilters } from "@/hooks/use-range-filters";
import { TableLoadingState } from "@/components/table-loading-state";
import { TableEmptyState } from "@/components/table-empty-state";

interface BaseData {
	id: string;
}

export interface Filter {
	id: string;
	value: string[];
}

interface DataTableProps<TData extends BaseData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	searchKey: string;
	data: TData[] | undefined;
	isLoading: boolean;
	filters: string[];
	hiddenColumns: string[];
	onRowClick?: (row: TData) => void;
}

export const DataTable = <TData extends BaseData, TValue>({
	columns,
	searchKey,
	data,
	isLoading,
	filters,
	hiddenColumns,
	onRowClick,
}: DataTableProps<TData, TValue>) => {
	const { filterStates } = useRangeFilters({ filters });
	const [searchQuery] = useQueryState(searchKey, parseAsString.withDefault(""));
	const [sorting, setSorting] = React.useState<SortingState>([{
		id: "realizedPnlUsd",
		desc: true,
	}]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);	

	const initialColumnVisibility = React.useMemo(() => 
		hiddenColumns.reduce((acc, columnId) => {
			acc[columnId] = false;
			return acc;
		}, {} as VisibilityState),
		[hiddenColumns]
	);
	
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialColumnVisibility);

	const tableData = React.useMemo(() => {
		if (!data) return [];
		return data;
	}, [data]);

	const table = useReactTable({
		data: tableData,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
	});

	React.useEffect(() => {
		const column = table.getColumn(searchKey);
		if (column) {
			column.setFilterValue(searchQuery);
		}
	}, [searchQuery, table, searchKey]);

	React.useEffect(() => {
		setColumnVisibility(
			hiddenColumns.reduce((acc, columnId) => {
				acc[columnId] = false;
				return acc;
			}, {} as VisibilityState)
		);
	}, [hiddenColumns]);

	React.useEffect(() => {
		const appliedFilters = Object.entries(filterStates);

		if (appliedFilters.length > 0) {
			const mapedFilters = appliedFilters.map(([filterId, filterValue]) => {
				return {
					id: filterId,
					value: filterValue,
				};
			});
			setColumnFilters(mapedFilters);
		}
	}, [filterStates, table]);

	return (
		<>
			<Table>
				<DataTableHeader table={table} />
				<TableBody>
					{isLoading ? (
						<TableLoadingState colSpan={columns.length} />
					) : table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								onClick={() => typeof onRowClick === 'function' && onRowClick(row.original)}
								className="h-20"
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{ width: `${cell.column.getSize()}px` }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableEmptyState colSpan={columns.length} />
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</>
	);
};