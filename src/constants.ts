export type Timeframe = {
  value: string,
  label: string
}

export const availableTimeframes: Timeframe[] = [
	{
		value: "daily",
		label: "Daily",
	},
	{
		value: "weekly",
		label: "Weekly",
	},
	{
		value: "monthly",
		label: "Monthly",
	},
	{
		value: "alltime",
		label: "All-Time",
	},
];

export const allTraderFilters = [
	"tokens",
	"winRate",
	"tradesBuy",
	"avgBuySol",
	"avgEntryUsd",
	"avgHold",
	"realizedPnlUsd",
];

export const filterLabels: Record<string, string> = {
	tokens: "Tokens",
	winRate: "Win Rate",
	tradesBuy: "Trades",
	avgBuySol: "Avg Buy (SOL)",
	avgEntryUsd: "Avg Entry (USD)",
	avgHold: "Avg Hold",
	realizedPnlUsd: "Realized PNL (USD)",
} as const