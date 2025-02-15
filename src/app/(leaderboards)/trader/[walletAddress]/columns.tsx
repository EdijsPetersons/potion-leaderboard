/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { DataTableColumnHeader } from "@/components/table-header";
import { TokenStat } from "@/types";
import { formatDistanceStrict } from "date-fns";
import { formatNumber } from "@/lib/format-number";
import { cn, currencyFormaterShort, durationFormater } from "@/lib/utils";
// import { cn, formatNumber, durationFormater } from "@/lib/utils";

export const columns: ColumnDef<TokenStat>[] = [
	{
		accessorKey: "tokenName",
		enableSorting: false,
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Token" />
		),
		cell: ({ row }) => {
			const contractAddress = row.original.contractAddress as string;
			const tokenImageUrl = row.original.tokenImageUrl as string;
			const traderName = row.getValue("tokenName") as string;

			const shortenedWallet = `
        ${contractAddress.substring(0, 6)}
        ...
        ${contractAddress.substring(contractAddress.length - 6)}
      `;

			return (
				<div className="flex items-center gap-x-3">
					<img
						src={tokenImageUrl}
						alt={traderName}
						className="w-11 h-11 rounded-full"
					/>
					<div>
						<div className="font-bold leading-6">{traderName}</div>
						<div className="text-xs leading-5 text-muted-foreground">
							{shortenedWallet}
						</div>
					</div>
				</div>
			);
		},
		size: 220,
		filterFn: (row, columnId, value) => {
			const tokenName = row.getValue(columnId) as string;
			const ca = row.original.contractAddress as string;

			if (
				tokenName.toLowerCase().includes(value.toLowerCase()) ||
				ca.toLowerCase().includes(value.toLowerCase())
			) {
				return true;
			}
			return false;
		},
	},
	{
		accessorKey: "lastTradeTakenAt",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Last Trade"
				className="justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const lastTradeTakenAt = row.getValue("lastTradeTakenAt") as string;

			return (
				<div className="flex justify-end font-bold">
					{formatDistanceStrict(new Date(lastTradeTakenAt), new Date(), {
						addSuffix: true,
					})}
				</div>
			);
		},
	},
	{
		accessorKey: "mcap",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="MC"
				className="justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const mcap = row.getValue("mcap") as number;
			return (
				<div className="flex justify-end font-bold">{formatNumber(mcap)}</div>
			);
		},
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "investedUsd",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Invested"
				className="flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const avgBuyUsd = row.getValue("investedUsd") as number;
			const avgBuySol = row.original.investedSol as number;

			const avgBuyFormated = currencyFormaterShort(avgBuyUsd);

			return (
				<div className="text-right">
					<div className="tabular-num font-bold flex justify-end gap-1">
						<p>{avgBuySol}</p>
						<Image
							src="/solana-small.svg"
							width={12}
							height={12}
							alt="solana"
						/>
					</div>
					<p className="text-muted-foreground">{avgBuyFormated}</p>
				</div>
			);
		},
		size: 32,
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "realizedPnlUsd",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Realized PNL"
				className="flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const realizedPnlUsd = row.getValue("realizedPnlUsd") as number;
			const realizedPnlSol = row.original.realizedPnlSol as number;

			const realizedPnlFormated = currencyFormaterShort(realizedPnlUsd);

			const color =
				realizedPnlUsd > 0
					? "text-green-600"
					: realizedPnlUsd < 0
					? "text-red-600"
					: "text-muted-foreground";

			const prefix = realizedPnlUsd > 0 ? "+" : realizedPnlUsd < 0 ? "-" : "";

			return (
				<div className="text-right">
					<div className="tabular-num font-bold flex justify-end gap-1">
						<p className={cn(color)}>
							{prefix}
							{realizedPnlSol}
						</p>
						<Image
							src="/solana-small.svg"
							width={12}
							height={12}
							alt="solana"
						/>
					</div>
					<p className="text-muted-foreground">{realizedPnlFormated}</p>
				</div>
			);
		},
		size: 32,
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "roi",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="ROI"
				className="flex justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const roi = row.getValue("roi") as number;
			const color =
				roi > 0
					? "text-green-600"
					: roi < 0
					? "text-red-600"
					: "text-muted-foreground";

			const prefix = roi > 0 ? "+" : roi < 0 ? "-" : "";
			return (
				<div className="text-right">
					<div className="tabular-num font-bold flex justify-end gap-1">
						<p className={cn(color)}>
							{prefix}
							{roi}%
						</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "tradesBuy",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Trades"
				className="flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const tradesBuy = row.original.tradesBuy as number;
			const tradesSell = row.original.tradesSell as number;

			return (
				<div className="font-bold flex justify-end gap-1">
					<p className="tabular-nums text-green-500">{tradesBuy}</p>
					<span className="text-muted-foreground">{"/"}</span>
					<p className="text-muted-foreground text-red-500">{tradesSell}</p>
				</div>
			);
		},
		size: 48,
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "holdingsInUsd",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Holding"
				className="flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const holdingsInUsd = row.getValue("holdingsInUsd") as number;
			const holdingsInSol = row.original.holdingsInSol as number;

			const holdingsInUsdFormated = currencyFormaterShort(holdingsInUsd);

			return (
				<div className="text-right">
					<div className="tabular-num font-bold flex justify-end gap-1">
						<p>{holdingsInSol}</p>
						<Image
							src="/solana-small.svg"
							width={12}
							height={12}
							alt="solana"
						/>
					</div>
					<p className="text-muted-foreground">{holdingsInUsdFormated}</p>
				</div>
			);
		},
		size: 32,
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "avgBuyMcap",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Buy"
				className="justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const avgBuyMcap = row.getValue("avgBuyMcap") as number;
			return (
				<div className="flex justify-end font-bold">
					{formatNumber(avgBuyMcap)}
				</div>
			);
		},
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "avgSellMcap",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Sell"
				className="justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const avgSellMcap = row.getValue("avgSellMcap") as number;
			return (
				<div className="flex justify-end font-bold">
					{formatNumber(avgSellMcap)}
				</div>
			);
		},
		meta: {
			filterVariant: "range",
		},
	},
	{
		accessorKey: "holdDuration",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Held"
				className="justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const holdDuration = row.getValue("holdDuration") as number;

			return (
				<div className="flex justify-end font-bold">
					{durationFormater(holdDuration)}
				</div>
			);
		},
	},
	{
		accessorKey: "share",
		enableHiding: false,
		enableSorting: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Share"
				className="flex justify-center"
			/>
		),
		size: 32,
		cell: ({ row }) => {
			const url = row.getValue("share") as string;
			return (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex justify-center"
				>
					<ExternalLink className="h-4 w-4 text-fuchsia-600" />
				</a>
			);
		},
	},
];
