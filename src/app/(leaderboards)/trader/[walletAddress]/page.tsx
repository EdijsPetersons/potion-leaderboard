import { fetchTokenStatsForWallet, fetchWalletDetails } from "@/server/leaderboards/wallet/select";
import Profile from "./profile";
import WalletStats from "./stats";
import TradesDataTables from "./trades-data-tables";

export default async function Page({
	params,
}: {
	params: Promise<{ walletAddress: string }>;
}) {
	const { walletAddress } = await params;

	if (!walletAddress) {
		return <div>My Post: No wallet address</div>;
	}

	const traderData = await fetchWalletDetails({
		walletAddress,
	});

	const tokenStatsData = await fetchTokenStatsForWallet({
		walletAddress,
	});

	return (
		<div className="p-4 lg:p-8 h-full font-[family-name:var(--font-geist-sans)] space-y-8">
			<div className="grid grid-cols-6 gap-8 lg:gap-16">
				{/** general user info */}
				<div className="col-span-6 lg:col-span-2">
					<Profile
						imageUrl={traderData?.imageUrl}
						traderName={traderData?.traderName}
						walletAddress={traderData?.walletAddress}
						lastTrade={new Date().toLocaleDateString()}
						xUsername={traderData?.xUsername}
						followers={traderData?.followers}
					/>
				</div>
				{/** trader stats */}
				<div className="col-span-6 lg:col-span-4">
					<WalletStats walletAddress={walletAddress} />
				</div>
			</div>

			{/** trades, tokens & groups */}
			<TradesDataTables data={tokenStatsData} />
		</div>
	);
}
