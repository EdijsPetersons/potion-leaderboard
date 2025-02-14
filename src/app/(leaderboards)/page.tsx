'use client'

import { LeaderboardTable } from "./data-table";
import { columns } from "./columns";
import { traderKeys, useTraders } from "@/hooks/use-traders";
import { parseAsString, useQueryState } from "nuqs";
import { availableTimeframes } from "@/constants";

export default function Leaderboards() {
	const [activeTimeframe, setActiveTimeframe] = useQueryState(
		"timeframe",
		parseAsString.withDefault(availableTimeframes[0].value),
	);
  const { data: tradersData, isFetching: fetchingTraderData } = useTraders({
		queryKey: traderKeys.filters({ timeframe: activeTimeframe }),
	});	

	return (
		<div className="p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
			<LeaderboardTable
				columns={columns}
				activeTimeframe={activeTimeframe}
				setActiveTimeframe={setActiveTimeframe}
				searchKey="traderName"
				data={tradersData}
				isLoading={fetchingTraderData}
				onRowClick={(row) => {
					console.log(row);
				}}
			/>
		</div>
	);
}
