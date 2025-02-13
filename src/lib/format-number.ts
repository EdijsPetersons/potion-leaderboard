export function formatNumber(value: number): string {
	if (value >= 1_000_000_000) {
		return `${(value / 1_000_000_000).toFixed(1)}B`; // Billions
	} else if (value >= 1_000_000) {
		return `${(value / 1_000_000).toFixed(1)}M`; // Millions
	} else if (value >= 1_000) {
		return `${(value / 1_000).toFixed(1)}K`; // Thousands
	} else {
		return value.toString(); // Less than 1,000, no formatting
	}
}
