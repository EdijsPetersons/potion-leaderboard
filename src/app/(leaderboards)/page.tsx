'use client'

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { traderKeys, useTraders } from "@/hooks/use-traders";
import { parseAsString, useQueryState } from "nuqs";

import { TableSearch } from "@/components/table-search";
import { Calendar, FlaskConical } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { allTraderFilters, availableTimeframes, leaderboardfilterLabels } from "@/constants";
import { TableFilters } from "@/components/table-filters";
import { Trader } from "@/types";

export default function Leaderboards() {
	const router = useRouter();
	const searchKey = "traderName";
	const [activeTab, setActiveTab] = useQueryState(
		"tab",
		parseAsString.withDefault("traders"),
	);

	const [activeTimeframe, setActiveTimeframe] = useQueryState(
		"timeframe",
		parseAsString.withDefault(availableTimeframes[0].value),
	);
  const { data: tradersData, isFetching: fetchingTraderData } = useTraders({
		queryKey: traderKeys.filters({ timeframe: activeTimeframe }),
	});	

	const onRowClick = (row: Trader) => {
		router.push(`/trader/${row.walletAddress}`);
	};

	return (
		<div className="p-4 md:p-8 h-full font-[family-name:var(--font-geist-sans)]">
			<Tabs
				defaultValue="traders"
				className="flex flex-col h-full w-full"
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<div className="flex flex-col md:flex-row gap-4 lg:gap-0 md:items-center md:justify-between">
					<div className="flex md:gap-16 justify-between md:justify-normal items-center">
						<TabsList className="p-0 md:p-1 justify-start md:justify-center">
							<TabsTrigger value="traders">Traders</TabsTrigger>
							<TabsTrigger value="groups">Groups</TabsTrigger>
						</TabsList>
						<ToggleGroup
							type="single"
							value={activeTimeframe}
							onValueChange={setActiveTimeframe}
							className="hidden lg:flex"
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
						{/* timeframes dropdown on mobile */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="data-[state=open]:bg-accent lg:hidden"
								>
									<Calendar className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-36 bg-background"
								side="bottom"
								align="end"
							>
								<DropdownMenuRadioGroup
									value={activeTimeframe}
									onValueChange={setActiveTimeframe}
								>
									{availableTimeframes.map((timeframe) => (
										<DropdownMenuRadioItem
											key={timeframe.value}
											value={timeframe.value}
											className="rounded-full w-full"
										>
											{timeframe.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					{activeTab === "traders" && (
						<div className="w-full flex items-center gap-4 md:w-96">
							<TableSearch
								searchKey={searchKey}
								placeholderText="Search by name or wallet"
							/>
							<TableFilters filters={allTraderFilters} labels={leaderboardfilterLabels} />
						</div>
					)}
				</div>
				<TabsContent value="traders" className="py-4 flex-1 space-y-4 h-full">
					<DataTable
						columns={columns}
						searchKey={searchKey}
						data={tradersData}
						filters={allTraderFilters}
						isLoading={fetchingTraderData}
						onRowClick={onRowClick}
					/>
				</TabsContent>
				<TabsContent
					value="groups"
					className="py-4 space-y-4 h-[min(640px,75vh)]"
				>
					<div className="h-full bg-primary-foreground rounded-xl p-16 flex-1 w-full flex justify-center items-center">
						<div className="flex flex-col items-center gap-2">
							<FlaskConical className="w-24 h-24 rotate-12" />
							<p className="text-2xl">Coming Soon!</p>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
