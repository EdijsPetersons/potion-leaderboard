import { Trader } from "@/types"
import { fetchWalletStats } from "@/server/leaderboards/wallet/select"
import { useQuery } from "@tanstack/react-query"

type WalletStatsParams = {
  walletAddress: string;
  timeframe: string;
};

export const traderKeys = {
	all: ["traders"] as const,
	filters: ({ timeframe }: { timeframe: string }) => [
		...traderKeys.all,
		"timeframe",
		timeframe,
	],
	stats: ({
		walletAddress,
		timeframe,
	}: {
		walletAddress: string;
		timeframe: string;
	}) => [...traderKeys.all, "stats", { walletAddress, timeframe }] as const,
};

const getTraders = async ({ queryKey } : { queryKey: string[]}): Promise<Trader[]> => {
  const timeframe = queryKey.slice(-1)[0]
  const res = await fetch(`/api/leaderboards/traders?timeframe=${timeframe}`)
  if (!res.ok) {
      throw new Error('Failed to fetch data for selected timeframe')
  }
  return res.json()
}

const getWalletStats = async ({
	walletAddress,
	timeframe,
}: WalletStatsParams): Promise<Trader> => {
	return await fetchWalletStats({ walletAddress, timeframe });
};

export const useTraders = ({ queryKey }: { queryKey: string[] }) =>
	useQuery({
		queryKey,
		queryFn: getTraders,
	});

export const useWalletStats = (params: WalletStatsParams) =>
  useQuery({
    queryKey: traderKeys.stats(params),
    queryFn: () => getWalletStats(params),
  });