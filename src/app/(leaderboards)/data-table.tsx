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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { TableSearch } from "@/components/table-search";
import { FlaskConical } from "lucide-react";
import { availableTimeframes } from "@/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface BaseData {
	id: string;
}

export interface Filter {
	id: string;
	value: string[];
}

interface LeaderboardTableProps<TData extends BaseData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	searchKey: string;
	data: TData[] | undefined;
	activeTimeframe: string;
	isLoading: boolean;
	setActiveTimeframe: (timeframe: string) => void;
	onRowClick: (row: TData) => void;
}

export const LeaderboardTable = <TData extends BaseData, TValue>({
	columns,
	searchKey,
	data,
	activeTimeframe,
	isLoading,
	onRowClick,
	setActiveTimeframe,
}: LeaderboardTableProps<TData, TValue>) => {
	const [activeTab, setActiveTab] = useQueryState("tab", parseAsString.withDefault("traders"));
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
		<Tabs
			defaultValue="traders"
			className="flex flex-col h-full w-full"
			value={activeTab}
			onValueChange={setActiveTab}
		>
			<div className="flex flex-col lg:flex-row lg:justify-between">
				<div className="flex flex-col lg:flex-row lg:gap-16">
					<TabsList>
						<TabsTrigger value="traders">Traders</TabsTrigger>
						<TabsTrigger value="groups">Groups</TabsTrigger>
					</TabsList>
					<ToggleGroup
						type="single"
						value={activeTimeframe}
						onValueChange={setActiveTimeframe}
					>
						{availableTimeframes.map((timeframe) => (
							<ToggleGroupItem
								value={timeframe.value}
								aria-label={`Toggle ${timeframe.label}`}
								key={timeframe.value}
								className="rounded-full w-28"
							>
								{timeframe.label}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
				{activeTab === "traders" && (
					<div className="w-96">
						<TableSearch
							searchKey={searchKey}
							placeholderText="Search by name or wallet"
						/>
					</div>
				)}
			</div>
			<TabsContent value="traders" className="py-4 flex-1 space-y-4 h-full">
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
				<DataTablePagination table={table} />
			</TabsContent>
			<TabsContent value="groups" className="py-4 space-y-4 h-[600px]">
				<div className="h-full bg-muted/50 p-16 flex-1 w-full flex justify-center items-center">
					<div className="flex flex-col items-center gap-2">
						<FlaskConical className="w-24 h-24 rotate-12" />
						<p className="text-2xl">Coming Soon!</p>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
};