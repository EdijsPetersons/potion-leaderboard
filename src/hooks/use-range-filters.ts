import {
	useQueryStates,
	parseAsString,
	parseAsArrayOf,
	ParserBuilder,
} from "nuqs";

export const useRangeFilters = ({ filters }: { filters: string[] }) => {
	const filterConfig = filters.reduce((acc, filter) => {
		acc[filter] = parseAsArrayOf(parseAsString).withDefault(['', '']);
		return acc;
	}, {} as Record<string, ParserBuilder<string[]>>);

	const [filterStates, setFilterStates] = useQueryStates(filterConfig, {
		history: "push",
	});

	return { filterStates, setFilterStates };
};
