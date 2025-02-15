'use client'

import Image from 'next/image';
import React from 'react'
import { RotateCw } from 'lucide-react';
import { formatDistanceStrict } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { availableTimeframes } from '@/constants';
import { useQueryState, parseAsString } from 'nuqs';
import { useWalletStats } from '@/hooks/use-traders';
import { cn, currencyFormaterShort, durationFormater } from '@/lib/utils';

export default function WalletStats({ walletAddress }: { walletAddress: string}) {
  const [timeframe, setTimeframe] = useQueryState(
		"stats",
		parseAsString.withDefault(availableTimeframes[0].value),
	);

  const { data: walletStats, dataUpdatedAt, refetch } = useWalletStats({
		walletAddress,
		timeframe,
	});
  
  return (
		<div className="space-y-6">
			{/** header section */}
			<div className="flex justify-between">
				<div className="flex md:gap-16 justify-between md:justify-normal w-full md:w-fit items-center">
					<ToggleGroup
						type="single"
						value={timeframe}
						onValueChange={setTimeframe}
						className="flex justify-between w-full"
					>
						{availableTimeframes.map((timeframe) => (
							<ToggleGroupItem
								value={timeframe.value}
								aria-label={`Toggle ${timeframe.label}`}
								key={timeframe.value}
								className="rounded-full md:w-28"
							>
								{timeframe.label}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
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
						onClick={() => refetch()}
					>
						<RotateCw className="w-4 h-4" />
					</Button>
				</p>
			</div>
			{/** stats section */}
			<div className="grid grid-cols-3 bg-primary-foreground rounded-xl">
				<div className="col-span-3 lg:col-span-1 border-r border-border/30">
					<div className="flex justify-between text-sm px-6 items-center border-b border-border/30 h-16">
						<p className="font-semibold">Tokens</p>
						<p className="">{walletStats?.tokensTotal}</p>
					</div>
					<div className="flex justify-between text-sm px-6 items-center border-b border-border/30 h-16">
						<p className="font-semibold">Win Rate</p>
						<p className={cn("text-green-500", walletStats?.winRate ?? 0 > 30)}>
							{walletStats?.winRate}%
						</p>
					</div>
					<div className="flex justify-between text-sm px-6 items-center h-16">
						<p className="font-semibold">Trades</p>
						<p className="flex">
							<span className="text-green-500">{walletStats?.tradesBuy}</span>
							<span className="text-muted-foreground">{"/"}</span>
							<span className="text-red-500">{walletStats?.tradesSell}</span>
						</p>
					</div>
				</div>
				<div className="col-span-3 lg:col-span-1 border-r border-border/30">
					<div className="flex justify-between text-sm px-6 items-center border-b border-border/30 h-16">
						<p className="font-semibold">Avg Buy</p>
						<div className="text-right">
							<div className="tabular-num font-bold flex justify-end gap-1">
								<p>{walletStats?.avgBuySol}</p>
								<Image
									src="/solana-small.svg"
									width={12}
									height={12}
									alt="solana"
								/>
							</div>
							<p className="text-muted-foreground">
								{currencyFormaterShort(walletStats?.avgBuyUsd ?? 0)}
							</p>
						</div>
					</div>
					<div className="flex justify-between text-sm px-6 items-center border-b border-border/30 h-16">
						<p className="font-semibold">Avg Entry</p>
						{currencyFormaterShort(walletStats?.avgEntryUsd ?? 0)}
					</div>
					<div className="flex justify-between text-sm px-6 items-center h-16">
						<p className="font-semibold">Avg Hold</p>
						{durationFormater(walletStats?.avgHold ?? 0)}
					</div>
				</div>
				<div className="col-span-3 lg:col-span-1">
					<div className="flex justify-between text-sm px-6 items-center border-b border-border/30 h-16">
						<p className="font-semibold">Total Invested</p>
						<div className="text-right">
							<div className="tabular-num font-bold flex justify-end gap-1">
								<p>{walletStats?.totalInvestedSol}</p>
								<Image
									src="/solana-small.svg"
									width={12}
									height={12}
									alt="solana"
								/>
							</div>
							<p className="text-muted-foreground">
								{currencyFormaterShort(walletStats?.totalInvestedUsd ?? 0)}
							</p>
						</div>
					</div>
					<div className="flex justify-between text-sm px-6 items-center border-b border-border/30 h-16">
						<p className="font-semibold">ROI</p>
						{walletStats?.roi}%
					</div>
					<div className="flex justify-between text-sm px-6 items-center h-16">
						<p className="font-semibold">Realized PNL</p>
						<div className="text-right">
							<div className="tabular-num font-bold flex justify-end gap-1">
								<p>{walletStats?.realizedPnlSol}</p>
								<Image
									src="/solana-small.svg"
									width={12}
									height={12}
									alt="solana"
								/>
							</div>
							<p className="text-muted-foreground">
								{currencyFormaterShort(walletStats?.realizedPnlUsd ?? 0)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
