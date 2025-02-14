"use client";

import * as React from "react";
import { parseAsString, useQueryState } from "nuqs";
import {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { SyncLoader } from 'react-spinners'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/table-pagination";

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
	activeTimeframe: string;
	isLoading: boolean;
	setActiveTimeframe: (timeframe: string) => void;
	onRowClick: (row: TData) => void;
}

export const DataTable = <TData extends BaseData, TValue>({
	columns,
	searchKey,
	data,
	isLoading,
	onRowClick,
}: DataTableProps<TData, TValue>) => {
	const [searchQuery] = useQueryState(searchKey, parseAsString.withDefault(""));
	const [sorting, setSorting] = React.useState<SortingState>([{
		id: "realizedPnlUsd",
		desc: true,
	}]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		onSortingChange: setSorting,
	});

	React.useEffect(() => {
		const column = table.getColumn(searchKey);
		if (column) {
			column.setFilterValue(searchQuery);
		}
	}, [searchQuery, table, searchKey]);

	return (
		<>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										style={{ width: `${header.getSize()}px` }}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								align="center"
								className="h-20"
							>
								<SyncLoader color="white" size={6} />
							</TableCell>
						</TableRow>
					) : table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								onClick={() => onRowClick(row.original)}
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
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-full text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</>
	);
};