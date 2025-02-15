export type TokenStat = {
	id: string;
	traderWallet: string;
	tokenImageUrl: string;
	tokenName: string;
	contractAddress: string;
	lastTradeTakenAt: string;
	mcap: number;
	investedSol: number;
	investedUsd: number;
	realizedPnlSol: number;
	realizedPnlUsd: number;
	roi: number;
	tradesBuy: number;
	tradesSell: number;
	holdingsInSol: number;
	holdingsInUsd: number;
	avgBuyMcap: number;
	avgSellMcap: number;
	holdDuration: number;
	share: string;
};

export type Trader = {
	id: string;
	rank: number;
	imageUrl: string;
	traderName: string;
	followers: number;
	xUsername: string;
	tokensTotal: number;
	winRate: number;
	tradesBuy: number;
	tradesSell: number;
	avgBuySol: number;
	avgBuyUsd: number;
	avgEntryUsd: number;
	avgHold: number;
	realizedPnlSol: number;
	realizedPnlUsd: number;
	share: string;
	walletAddress: string;
	totalInvestedSol: number;
	totalInvestedUsd: number;
	roi: number;
};

export type Timeframe = {
	value: string;
	label: string;
};