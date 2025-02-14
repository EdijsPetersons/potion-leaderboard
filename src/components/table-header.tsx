import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn("text-foreground w-full font-semibold", className)}>{title}</div>;
	}

	return (
		<div
			className={cn(
				"flex items-center w-full text-foreground font-semibold",
				className,
			)}
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
			<span className="mr-1">{title}</span>
			{column.getIsSorted() === "desc" ? (
				<ChevronDown className="size-3 text-fuchsia-600" strokeWidth={4} />
			) : column.getIsSorted() === "asc" ? (
				<ChevronUp className="size-3 text-fuchsia-600" strokeWidth={4} />
			) : (
				<ChevronsUpDown className="size-3" strokeWidth={4} />
			)}
		</div>
	);
}
