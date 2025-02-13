"use client";

import * as React from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/table-pagination";
import { TableSearch } from "@/components/table-search";

interface BaseData {
	id: string;
}

export interface Filter {
	id: string;
	value: string[];
}

interface LeaderboardTableProps<TData extends BaseData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onRowClick: (row: TData) => void;
}

export const LeaderboardTable = <TData extends BaseData, TValue>({
	columns,
	data,
	onRowClick,
}: LeaderboardTableProps<TData, TValue>) => {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
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

	return (
		<Tabs defaultValue="traders" className="flex flex-col h-full w-full">
			<div className="flex justify-between">
				<TabsList>
					<TabsTrigger value="traders">Traders</TabsTrigger>
					<TabsTrigger value="groups">Groups</TabsTrigger>
				</TabsList>
				<div className="w-96">
					<TableSearch
						column={table.getColumn("traderName")}
						placeholderText="Search by name or wallet"
					/>
				</div>
			</div>
			<TabsContent value="traders" className="py-4 flex-1 h-full">
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
														header.getContext(),
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
									onClick={() => onRowClick(row.original)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
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
			</TabsContent>
			<TabsContent value="groups">Change your groups here.</TabsContent>
			<DataTablePagination table={table} />
		</Tabs>
	);
};