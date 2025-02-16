import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";
import { useRangeFilters } from "@/hooks/use-range-filters";
import { ParserBuilder, Values } from "nuqs";

export function TableFilters({
	filters,
	labels,
}: {
	filters: string[];
	labels: Record<string, string>;
}) {
	const [open, setOpen] = React.useState(false);
	const { filterStates, setFilterStates } = useRangeFilters({
		filters: filters,
	});
	const [formState, setFormState] = React.useState(filterStates);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const activeFiltersCount: number = React.useMemo(() => {
		return Object.values(filterStates).filter((value) => {
			if (Array.isArray(value)) {
				return value[0] !== "" || value[1] !== "";
			}
			return false;
		}).length;
	}, [filterStates]);

	const applyFilters = () => {
		setFilterStates(formState);
		setOpen(false);
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon" className="relative">
						<SlidersHorizontal className="h-4 w-4" />
						{activeFiltersCount > 0 && (
							<Badge className="absolute -bottom-1 left-full rounded-full bg-fuchsia-600 hover:bg-fuchsia-600 text-xs text-foreground min-w-5 -translate-x-1/2 px-1.5 py-0.5">
								{activeFiltersCount}
							</Badge>
						)}
					</Button>
				</DialogTrigger>
				<DialogContent className="flex flex-col gap-0 p-6 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
					<div className="overflow-y-auto pb-6 px-2">
						<DialogHeader>
							<DialogTitle className="text-2xl">Filters</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<Filters formState={formState} updateFormState={setFormState} labels={labels} />
					</div>
					<DialogFooter className="border-t border-border/60 pt-6">
						<DialogClose asChild>
							<Button type="button" onClick={applyFilters}>
								Apply Filters
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" size="icon" className="relative">
					<SlidersHorizontal className="h-4 w-4" />
					{activeFiltersCount > 0 && (
						<Badge className="absolute -bottom-1 left-full rounded-full bg-fuchsia-600 hover:bg-fuchsia-600 text-xs text-foreground min-w-5 -translate-x-1/2 px-1.5 py-0.5">
							{activeFiltersCount}
						</Badge>
					)}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="flex flex-col gap-0 p-4 md:p-6 h-full sm:max-w-lg [&>button:last-child]:hidden">
				<DrawerHeader className="text-left">
					<DrawerTitle className="text-2xl">Filters</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className="overflow-y-auto py-6 lg:px-2">
					<Filters
						formState={formState}
						labels={labels}
						updateFormState={setFormState}
						className="px-4"
					/>
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button type="button" onClick={applyFilters}>
							Apply Filters
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

type RangeFilterProps = {
	filterName: string;
	filterLabel: string;
	min?: string;
	max?: string;
	onChange: ({
		name,
		value,
	}: {
		name: string;
		value: string[];
	}) => void;
};

function RangeFilter({ filterName, filterLabel, min, max, onChange }: RangeFilterProps) {
	const [localValues, setLocalValues] = React.useState({
		min: min?.toString(),
		max: max?.toString(),
	});

	const handleChange =
		(type: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			const newValues = { ...localValues, [type]: value };
			setLocalValues(newValues);

			onChange({
				name: filterName,
				value: [
					newValues.min ?? "",
					newValues.max ?? "",
				],
			});
		};

	return (
		<div className="space-y-2">
			<Label className="capitalize font-bold">{filterLabel}</Label>
			<div className="flex">
				<Input
					className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
					value={localValues.min}
					onChange={handleChange("min")}
					placeholder="Min"
					type="number"
					aria-label={`${filterName} min`}
				/>
				<Input
					className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
					value={localValues.max}
					onChange={handleChange("max")}
					placeholder="Max"
					type="number"
					aria-label={`${filterName} max`}
				/>
			</div>
		</div>
	);
}

type FiltersFormProps = {
	formState: Values<Record<string, ParserBuilder<string[]>>>;
	labels: Record<string, string>;
	updateFormState: React.Dispatch<
		React.SetStateAction<
			Values<Record<string, ParserBuilder<string[]>>>
		>
	>;
};

function Filters({
	className,
	formState,
	labels,
	updateFormState,
}: React.ComponentProps<"form"> & FiltersFormProps) {
	const onChangeFilter = ({
		name,
		value,
	}: {
		name: string;
		value: string[];
	}) => {
		updateFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className={cn(className, "space-y-8")}>
			{Object.entries(formState).map(([filterName, values]) => (
				<RangeFilter
					key={filterName}
					filterName={filterName}
					filterLabel={labels[filterName]}
					min={values?.[0]}
					max={values?.[1]}
					onChange={onChangeFilter}
				/>
			))}
		</div>
	);
}
