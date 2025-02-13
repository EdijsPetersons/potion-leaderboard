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
		return <div className={cn("text-foreground w-full font-bold", className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center w-full text-foreground font-bold", className)}>
			<span>{title}</span>
			{column.getIsSorted() === "desc" ? (
				<ChevronDown className="h-4 w-2" />
			) : column.getIsSorted() === "asc" ? (
				<ChevronUp className="h-4 w-2" />
			) : (
				<ChevronsUpDown className="h-4 w-2" />
			)}
		</div>
	);
}
