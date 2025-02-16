/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { DataTableColumnHeader } from "@/components/table-header";
import { formatNumber } from "@/lib/format-number";
import { cn, currencyFormaterShort, durationFormater } from "@/lib/utils";
import { Trader } from "@/types";

export const columns: ColumnDef<Trader>[] = [
	{
		accessorKey: "rank",
		enableHiding: false,
		enableSorting: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Rank"
				className="flex justify-center max-w-8"
			/>
		),
		cell: ({ row }) => {
			const rank = row.getValue("rank") as number;
			let bgColor = "";

			if (rank === 1) {
				bgColor = "bg-amber-500";
			} else if (rank === 2) {
				bgColor = "bg-gray-400";
			} else if (rank === 3) {
				bgColor = "bg-orange-600";
			} else {
				bgColor = "bg-transparent";
			}

			return (
				<div
					className={cn(
						"rounded-full w-8 h-8 flex justify-center items-center",
						bgColor,
					)}
				>
					<p className="tabular-nums font-medium">
						{rank === 1 ? '🏆' : rank}
					</p>
				</div>
			);
		},
		size: 8,
	},
	{
		accessorKey: "traderName",
		enableSorting: false,
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Trader"
				className="w-full lg:min-w-64"
			/>
		),
		cell: ({ row }) => {
			const walletAddress = row.original.walletAddress as string;
			const imageUrl = row.original.imageUrl as string;
			const traderName = row.getValue("traderName") as string;

			const shortenedWallet = `${walletAddress.substring(
				0,
				6,
			)}...${walletAddress.substring(walletAddress.length - 6)}`;

			return (
				<div className="flex items-center gap-x-3">
					<img
						src={imageUrl}
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
		size: 456,
		filterFn: (row, columnId, value) => {
			const traderName = row.getValue(columnId) as string;
			const walletAddress = row.original.walletAddress as string;

			if (
				traderName.toLowerCase().includes(value.toLowerCase()) ||
				walletAddress.toLowerCase().includes(value.toLowerCase())
			) {
				return true;
			}
			return false;
		},
	},
	{
		accessorKey: "followers",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Followers"
				className="hidden lg:flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => {
			const followers = row.getValue("followers") as number;
			const xUsername = row.original.xUsername as string;

			return (
				<div className="hidden lg:block text-right">
					<p className="tabular-nums font-bold">
						{followers > 0 ? formatNumber(followers) : "-"}
					</p>
					<p className="text-muted-foreground">{xUsername}</p>
				</div>
			);
		},
		size: 64,
		meta: {
			mobileHidden: true,
		},
	},
	{
		accessorKey: "tokensTotal",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Tokens"
				className="hidden lg:flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => (
			<div className="hidden lg:block tabular-nums text-right font-bold">
				{row.getValue("tokensTotal")}
			</div>
		),
		size: 28,
		meta: {
			filterVariant: "range",
			mobileHidden: true,
		},
	},
	{
		accessorKey: "winRate",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Win %"
				className="hidden lg:flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => {
			const winRate = row.getValue("winRate") as number;

			if (winRate < 30) {
				return (
					<div className="hidden lg:block text-right">
						<p className="tabular-nums font-bold text-red-500">{winRate}%</p>
					</div>
				);
			}

			return (
				<div className="hidden lg:block text-right">
					<p className="tabular-nums font-bold text-green-500">{winRate}%</p>
				</div>
			);
		},
		size: 80,
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
				className="hidden lg:flex justify-end min-w-20"
			/>
		),
		cell: ({ row }) => {
			const tradesBuy = row.original.tradesBuy as number;
			const tradesSell = row.original.tradesSell as number;

			return (
				<div className="hidden lg:flex font-bold justify-end gap-1">
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
		accessorKey: "avgBuySol",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Buy"
				className="hidden lg:flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => {
			const avgBuySol = row.getValue("avgBuySol") as number;
			const avgBuyUsd = row.original.avgBuyUsd as number;

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
		accessorKey: "avgEntryUsd",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Entry"
				className="hidden lg:flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => {
			const avgEntryUsd = row.getValue("avgEntryUsd") as number;
			const avgEntryFormated = currencyFormaterShort(avgEntryUsd);

			return (
				<div className="hidden lg:block tabular-nums text-right font-bold">
					{avgEntryFormated}
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
		accessorKey: "avgHold",
		enableHiding: false,
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Avg Hold"
				className="hidden lg:flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => (
			<div className="hidden lg:block tabular-nums text-right font-bold">
				{durationFormater(row.getValue("avgHold"))}
			</div>
		),
		size: 80,
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
				title="PNL"
				className="flex justify-end min-w-16"
			/>
		),
		cell: ({ row }) => {
			const realizedPnlUsd = row.getValue("realizedPnlUsd") as number;
			const realizedPnlSol = row.original.realizedPnlSol as number;

			const textColor = realizedPnlSol > 0 ? "text-green-500" : "text-red-500";
			const realizedPnlFormated = currencyFormaterShort(realizedPnlUsd);

			return (
				<div className="text-right">
					<div className="tabular-num font-bold flex justify-end gap-1">
						<p className={cn(textColor)}>{realizedPnlSol}</p>
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
		size: 40,
		meta: {
			filterVariant: "range",
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
				className="hidden lg:flex justify-center min-w-8"
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