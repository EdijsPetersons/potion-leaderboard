'use client'

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";
import { FlaskConical } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { columns, mobileHiddenColumns } from "./columns";
import { traderKeys, useTraders } from "@/hooks/use-traders";
import { useResponsive } from "@/hooks/use-responsive";
import { parseAsString, useQueryState } from "nuqs";

import { TableSearch } from "@/components/table-search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { allTraderFilters, leaderboardfilterLabels } from "@/constants/filters";
import { availableTimeframes } from "@/constants/timeframes";
import { TableFilters } from "@/components/table-filters";
import { TimeframeSelector } from "@/components/timeframe-selector";
import { Trader } from "@/types";

function LeaderboardsPageContent() {
  const router = useRouter();
	const { isMobile } = useResponsive();
	const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);
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

	React.useEffect(() => {
		if (isMobile) {
			setHiddenColumns(mobileHiddenColumns);
		} else {
			setHiddenColumns([]);
		}
	}, [isMobile]);

	return (
		<div className="p-4 md:p-8 h-full pt-24 font-[family-name:var(--font-geist-sans)]">
			<div className="md:pt-20 h-full">
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
							<TimeframeSelector
								value={activeTimeframe}
								onValueChange={setActiveTimeframe}
							/>
						</div>
						{activeTab === "traders" && (
							<div className="w-full flex items-center gap-4 md:w-96">
								<TableSearch
									searchKey={searchKey}
									placeholderText="Search by name or wallet"
								/>
								<TableFilters
									filters={allTraderFilters}
									labels={leaderboardfilterLabels}
								/>
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
							hiddenColumns={hiddenColumns}
							onRowClick={onRowClick}
						/>
					</TabsContent>
					<TabsContent value="groups" className="py-4 space-y-4 h-full">
						<div className="h-full w-full flex justify-center items-center">
							<div className="flex flex-col items-center gap-2">
								<FlaskConical className="w-24 h-24 rotate-12" />
								<p className="text-2xl">Coming Soon!</p>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default function LeaderboardsPage() {
  return (
		<Suspense
			fallback={
				<div className="h-screen w-full flex items-center justify-center">
					<SyncLoader color="white" />
				</div>
			}
		>
			<LeaderboardsPageContent />
		</Suspense>
	);
}
