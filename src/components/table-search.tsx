import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

export const TableSearch = ({
	searchKey,
	placeholderText,
}: {
	searchKey: string;
	placeholderText?: string;
}) => {
	const [searchQuery, setSearchQuery] = useQueryState(
		searchKey,
		parseAsString.withDefault(""),
	);

	return (
		<div className="relative w-full">
			<Input
				className="peer ps-9"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder={placeholderText}
				type="text"
			/>
			<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
				<Search size={16} strokeWidth={2} />
			</div>
		</div>
	);
};
