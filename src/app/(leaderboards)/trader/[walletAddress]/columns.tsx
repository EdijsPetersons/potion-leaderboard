import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { DataTableColumnHeader } from "@/components/table-header";
import { TokenStat } from "@/types";
import { formatDistanceStrict } from "date-fns";
import { formatNumber } from "@/lib/format-number";
import { cn, currencyFormaterShort, durationFormater } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<TokenStat>[] = [
	{
		accessorKey: "tokenName",
		enableSorting: false,
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Token" className="w-48" />
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
					<Avatar className="w-11 h-11 rounded-full">
						<AvatarImage src={tokenImageUrl} alt="Trader avatar" />
						<AvatarFallback className="rounded-full">PO</AvatarFallback>
					</Avatar>
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
				className="hidden lg:flex justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const lastTradeTakenAt = row.getValue("lastTradeTakenAt") as string;

			return (
				<div className="hidden lg:flex justify-end font-bold">
					{formatDistanceStrict(new Date(lastTradeTakenAt), new Date(), {
						addSuffix: true,
					})}
				</div>
			);
		},
		meta: {
			mobileHidden: true,
		},
	},
	{
		accessorKey: "mcap",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="MC"
				className="hidden lg:flex justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const mcap = row.getValue("mcap") as number;
			return (
				<div className="hidden lg:flex justify-end font-bold">
					{formatNumber(mcap)}
				</div>
			);
		},
		meta: {
			filterVariant: "range",
			mobileHidden: true,
		},
	},
	{
		accessorKey: "investedUsd",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Invested"
				className="hidden lg:flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const avgBuyUsd = row.getValue("investedUsd") as number;
			const avgBuySol = row.original.investedSol as number;

			const avgBuyFormated = currencyFormaterShort(avgBuyUsd);

			return (
				<div className="hidden lg:block text-right">
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
			mobileHidden: true,
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
				className="hidden lg:flex justify-end"
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
				<div className="hidden lg:block text-right">
					<div className="tabular-num font-bold flex justify-end gap-1">
						<p className={cn(color)}>
							{prefix}
							{roi}%
						</p>
					</div>
				</div>
			);
		},
		meta: {
			filterVariant: "range",
			mobileHidden: true,
		},
	},
	{
		accessorKey: "tradesBuy",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Trades"
				className="hidden lg:flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const tradesBuy = row.original.tradesBuy as number;
			const tradesSell = row.original.tradesSell as number;

			return (
				<div className="font-bold hidden lg:flex justify-end gap-1">
					<p className="tabular-nums text-green-500">{tradesBuy}</p>
					<span className="text-muted-foreground">{"/"}</span>
					<p className="text-muted-foreground text-red-500">{tradesSell}</p>
				</div>
			);
		},
		size: 48,
		meta: {
			filterVariant: "range",
			mobileHidden: true,
		},
	},
	{
		accessorKey: "holdingsInUsd",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Holding"
				className="hidden lg:flex justify-end"
			/>
		),
		cell: ({ row }) => {
			const holdingsInUsd = row.getValue("holdingsInUsd") as number;
			const holdingsInSol = row.original.holdingsInSol as number;

			const holdingsInUsdFormated = currencyFormaterShort(holdingsInUsd);

			return (
				<div className="hidden lg:block text-right">
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
			mobileHidden: true,
		},
	},
	{
		accessorKey: "avgBuyMcap",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Buy"
				className="hidden lg:flex justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const avgBuyMcap = row.getValue("avgBuyMcap") as number;
			return (
				<div className="hidden lg:flex justify-end font-bold">
					{formatNumber(avgBuyMcap)}
				</div>
			);
		},
		meta: {
			filterVariant: "range",
			mobileHidden: true,
		},
	},
	{
		accessorKey: "avgSellMcap",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Sell"
				className="hidden lg:flex justify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const avgSellMcap = row.getValue("avgSellMcap") as number;
			return (
				<div className="hidden lg:flex justify-end font-bold">
					{formatNumber(avgSellMcap)}
				</div>
			);
		},
		meta: {
			filterVariant: "range",
			mobileHidden: true,
		},
	},
	{
		accessorKey: "holdDuration",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Held"
				className="jhidden lg:flex ustify-end"
			/>
		),
		size: 48,
		cell: ({ row }) => {
			const holdDuration = row.getValue("holdDuration") as number;

			return (
				<div className="hidden lg:flex justify-end font-bold">
					{durationFormater(holdDuration)}
				</div>
			);
		},
		meta: {
			mobileHidden: true,
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
				className="hidden lg:flex justify-center"
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
					className="hidden lg:flex justify-center"
				>
					<ExternalLink className="h-4 w-4 text-fuchsia-600" />
				</a>
			);
		},
		meta: {
			mobileHidden: true,
		},
	},
];