import { mockTokenStatsData, mockTraderData } from "@/mockdata";
import { TokenStat, Trader } from "@/types";

export const fetchWalletDetails = async ({
	walletAddress,
}: {
	walletAddress: string;
}): Promise<Trader> => {

	// add random failure
	const failure = Math.random() < 0.05;
	if (failure) {
		throw new Error("Failed to fetch wallet details");
	}

	return mockTraderData.find(
		(trader) => trader.walletAddress === walletAddress,
	) as Trader;
};

export const fetchWalletStats = async ({
	walletAddress,
}: {
	walletAddress: string;
	timeframe: string;
}): Promise<Trader> => {
	const trader = mockTraderData.find(
		(trader) => trader.walletAddress === walletAddress,
	) as Trader;

	return trader;
};

export const fetchTokenStatsForWallet = async ({
	walletAddress,
}: {
	walletAddress: string;
}): Promise<TokenStat[]> => {
	// add random failure
	const failure = Math.random() < 0.05;

	if (failure) {
		throw new Error("Failed to fetch token stats");
	}

	return mockTokenStatsData.filter(
		(tokenStat) => tokenStat.traderWallet === walletAddress,
	);
};