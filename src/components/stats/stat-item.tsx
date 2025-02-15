import { cn } from "@/lib/utils";

interface StatItemProps {
	label: string;
	isLoading?: boolean;
	skeletonWidth?: string;
	children: React.ReactNode;
	className?: string;
}

export function StatItem({ label, isLoading, skeletonWidth = "w-16", className, children }: StatItemProps) {
  return (
		<div className={cn("flex justify-between text-sm px-6 items-center h-16", className)}>
			<p className="font-semibold">{label}</p>
			{isLoading ? (
				<div
					className={`h-4 ${skeletonWidth} bg-muted animate-pulse rounded`}
				/>
			) : (
				children
			)}
		</div>
	);
}