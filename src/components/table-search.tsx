import { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BaseData {
	id: string;
}

export const TableSearch = <TData extends BaseData>({
	column,
	placeholderText,
}: {
	column: Column<TData, unknown> | undefined;
	placeholderText?: string;
}) => {
	const columnFilterValue = column?.getFilterValue();

	return (
		<div className="relative w-full">
			<Input
				className="peer ps-9"
				value={(columnFilterValue ?? "") as string}
				onChange={(e) => column?.setFilterValue(e.target.value)}
				placeholder={placeholderText}
				type="text"
			/>
			<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
				<Search size={16} strokeWidth={2} />
			</div>
		</div>
	);
};
