export const allTraderFilters = [
	"tokensTotal",
	"winRate",
	"tradesBuy",
	"avgBuySol",
	"avgEntryUsd",
	"avgHold",
	"realizedPnlUsd",
];

export const allTradeFilters = [
	"mcap",
	"investedUsd",
	"realizedPnlUsd",
	"roi",
	"tradesBuy",
	"holdingsInUsd",
	"avgBuyMcap",
	"avgSellMcap",
	"holdDuration",
];

export const leaderboardfilterLabels: Record<string, string> = {
	tokensTotal: "Tokens",
	winRate: "Win Rate",
	tradesBuy: "Trades",
	avgBuySol: "Avg Buy (SOL)",
	avgEntryUsd: "Avg Entry (USD)",
	avgHold: "Avg Hold",
	realizedPnlUsd: "Realized PNL (USD)",
} as const

export const tradefilterLabels: Record<string, string> = {
	mcap: "Market Cap",
	investedUsd: "Invested (USD)",
	realizedPnlUsd: "Realized PNL (USD)",
	roi: "ROI",
	tradesBuy: "Trades",
	holdingsInUsd: "Holdings (USD)",
	avgBuyMcap: "Avg Buy (MCap)",
	avgSellMcap: "Avg Sell (MCap)",
	holdDuration: "Hold Duration",
} as const