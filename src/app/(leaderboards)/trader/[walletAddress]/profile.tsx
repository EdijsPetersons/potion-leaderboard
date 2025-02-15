import { formatNumber } from '@/lib/format-number';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { formatDistanceStrict } from 'date-fns';
import React from 'react'

interface ProfileProps {
  imageUrl: string;
  traderName: string;
  walletAddress: string;
  lastTrade?: string;
  xUsername: string;
  followers: number;
}

export default function Profile({
	imageUrl,
	traderName,
	walletAddress,
	lastTrade,
	xUsername,
	followers,
}: ProfileProps) {
  const shortenedWallet = `${walletAddress.substring(0,6)}
    ...
    ${walletAddress.substring(walletAddress.length - 6)}`;
	
	const timeSinceLastTrade = lastTrade
		? `${formatDistanceStrict(new Date(lastTrade), new Date())} ago`
		: '-';

	return (
		<div className="flex flex-col justify-between h-full gap-6 lg:gap-0">
			<div className="flex items-center space-x-6">
				<Avatar className="h-20 w-20 rounded-full">
					<AvatarImage src={imageUrl} alt="user avatar" />
					<AvatarFallback className="rounded-lg">PO</AvatarFallback>
				</Avatar>

				<div className="space-y-1">
					<div className="text-2xl font-bold">{traderName}</div>
					<div className="text-gray-500 text-sm">{shortenedWallet}</div>
				</div>
			</div>

			<div className="w-full bg-primary-foreground rounded-xl">
				<div className="grid grid-cols-2 px-6 py-2.5 items-center h-16">
					<p className="font-bold">X Account</p>
					<div className="text-right">
						{xUsername}
						<div className="text-gray-500 text-sm">
							{followers > 0 ? `${formatNumber(followers)} followers` : "-"}
						</div>
					</div>
				</div>

				<Separator className="bg-border/40" />

				<div className="grid grid-cols-2 px-6 py-2.5 items-center h-16">
					<p className="font-bold">Last Trade</p>
					<div className="text-right">{timeSinceLastTrade}</div>
				</div>
			</div>
		</div>
	);
}
