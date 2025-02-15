'use client'

import React from 'react'
import { RotateCw } from 'lucide-react';
import { formatDistanceStrict } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { availableTimeframes } from '@/constants/timeframes';
import { useQueryState, parseAsString } from 'nuqs';
import { useWalletStats } from '@/hooks/use-traders';
import { cn, currencyFormaterShort, durationFormater } from '@/lib/utils';
import { StatItem } from '@/components/stats/stat-item';
import { SolStat } from '@/components/stats/sol-stat';

export default function WalletStats({ walletAddress }: { walletAddress: string}) {
  const [timeframe, setTimeframe] = useQueryState(
    "stats",
    parseAsString.withDefault(availableTimeframes[0].value),
  );

  const { data: stats, dataUpdatedAt, isFetching, refetch } = useWalletStats({
    walletAddress,
    timeframe,
  });
  
  return (
		<div className="space-y-6">
			<StatsHeader
				timeframe={timeframe}
				setTimeframe={setTimeframe}
				dataUpdatedAt={dataUpdatedAt}
				refetch={refetch}
			/>

			<div className="grid grid-cols-3 bg-primary-foreground rounded-xl">
				<div className="col-span-3 lg:col-span-1 md:border-r border-border/30">
					<StatItem
						label="Tokens"
						className="border-b border-border/30"
						isLoading={isFetching}
					>
						<p>{stats?.tokensTotal}</p>
					</StatItem>
					<StatItem
						label="Win Rate"
						className="border-b border-border/30"
						isLoading={isFetching}
					>
						<p className={cn("text-green-500", stats?.winRate ?? 0 > 30)}>
							{stats?.winRate}%
						</p>
					</StatItem>
					<StatItem
						label="Trades"
						className="border-b md:border-0 border-border/30"
						isLoading={isFetching}
					>
						<p className="flex">
							<span className="text-green-500">{stats?.tradesBuy}</span>
							<span className="text-muted-foreground">{"/"}</span>
							<span className="text-red-500">{stats?.tradesSell}</span>
						</p>
					</StatItem>
				</div>

				<div className="col-span-3 lg:col-span-1 md:border-r border-border/30">
					<StatItem
						label="Avg Buy"
						className="border-b border-border/30"
						isLoading={isFetching}
					>
						<SolStat solValue={stats?.avgBuySol} usdValue={stats?.avgBuyUsd} />
					</StatItem>
					<StatItem
						label="Avg Entry"
						className="border-b border-border/30"
						isLoading={isFetching}
					>
						{currencyFormaterShort(stats?.avgEntryUsd ?? 0)}
					</StatItem>
					<StatItem
						label="Avg Hold"
						className="border-b md:border-0 border-border/30"
						isLoading={isFetching}
					>
						{durationFormater(stats?.avgHold ?? 0)}
					</StatItem>
				</div>

				<div className="col-span-3 lg:col-span-1">
					<StatItem
						label="Total Invested"
						className="border-b border-border/30"
						isLoading={isFetching}
					>
						<SolStat
							solValue={stats?.totalInvestedSol}
							usdValue={stats?.totalInvestedUsd}
						/>
					</StatItem>
					<StatItem
						label="ROI"
						className="border-b border-border/30"
						isLoading={isFetching}
					>
						{`${stats?.roi}%`}
					</StatItem>
					<StatItem label="Realized PNL" isLoading={isFetching}>
						<SolStat
							solValue={stats?.realizedPnlSol}
							usdValue={stats?.realizedPnlUsd}
						/>
					</StatItem>
				</div>
			</div>
		</div>
	);
}

function StatsHeader({
	timeframe,
	setTimeframe,
	dataUpdatedAt,
	refetch,
}: {
	timeframe: string;
	setTimeframe: (value: string) => void;
	dataUpdatedAt?: number;
	refetch: () => void;
}) {
	return (
		<div className="flex justify-between">
			<div className="flex md:gap-16 justify-between md:justify-normal w-full md:w-fit items-center">
				<ToggleGroup
					type="single"
					value={timeframe}
					onValueChange={setTimeframe}
					className="flex justify-between w-full"
				>
					{availableTimeframes.map((tf) => (
						<ToggleGroupItem
							value={tf.value}
							aria-label={`Toggle ${tf.label}`}
							key={tf.value}
							className="rounded-full md:w-28"
						>
							{tf.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>
			<LastRefreshed dataUpdatedAt={dataUpdatedAt} onRefresh={refetch} />
		</div>
	);
}

function LastRefreshed({
	dataUpdatedAt,
	onRefresh,
}: {
	dataUpdatedAt?: number;
	onRefresh: () => void;
}) {
	return (
		<p className="items-center text-muted-foreground text-xs hidden lg:flex">
			Last refreshed{" "}
			{dataUpdatedAt
				? formatDistanceStrict(new Date(dataUpdatedAt), new Date(), {
						addSuffix: true,
				  })
				: ""}
			<Button
				variant="ghost"
				size="icon"
				className="text-muted-foreground hover:bg-transparent"
				onClick={onRefresh}
			>
				<RotateCw className="w-4 h-4" />
			</Button>
		</p>
	);
}