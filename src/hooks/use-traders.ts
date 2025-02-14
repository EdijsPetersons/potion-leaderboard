import { Trader } from "@/app/(leaderboards)/columns"
import { useQuery } from "@tanstack/react-query"

export const traderKeys = {
  all: ['traders'] as const,
  filters: ({ timeframe } : { timeframe: string }) => [...traderKeys.all, 'timeframe', timeframe],
}

const getTraders = async ({ queryKey } : { queryKey: string[]}): Promise<Trader[]> => {
  const timeframe = queryKey.slice(-1)[0]
  const res = await fetch(`/api/leaderboards/traders?timeframe=${timeframe}`)
  if (!res.ok) {
      throw new Error('Failed to fetch data for selected timeframe')
  }
  return res.json()
}

export const useTraders = ({ queryKey }: { queryKey: string[] }) =>
	useQuery({
		queryKey,
		queryFn: getTraders,
	});

