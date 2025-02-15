import { currencyFormaterShort } from '@/lib/utils';
import Image from 'next/image';

interface SolStatProps {
  solValue?: number | string;
  usdValue?: number;
  isFetching?: boolean;
}

export function SolStat({ solValue, usdValue, isFetching }: SolStatProps) {
  if (isFetching) {
    return (
      <div className="space-y-1">
        <div className="h-4 w-20 bg-muted animate-pulse rounded ml-auto" />
        <div className="h-3 w-16 bg-muted animate-pulse rounded ml-auto" />
      </div>
    );
  }

  return (
    <div className="text-right">
      <div className="tabular-num font-bold flex justify-end gap-1">
        <p>{solValue}</p>
        <Image src="/solana-small.svg" width={12} height={12} alt="solana" />
      </div>
      <p className="text-muted-foreground">
        {currencyFormaterShort(usdValue ?? 0)}
      </p>
    </div>
  );
}