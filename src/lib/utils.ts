import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormaterShort = (
	value: number,
	currency = "USD",
) => {
	return new Intl.NumberFormat("en", {
		style: "currency",
		notation: "compact",
		currency,
		maximumFractionDigits: 1,
		minimumFractionDigits: 1,
	}).format(value);
};

export const durationFormater = (valueInmilliseconds: number) => {
	const hours = Math.floor(valueInmilliseconds / (1000 * 60 * 60));
	const minutes = Math.floor((valueInmilliseconds % (1000 * 60 * 60)) / (1000 * 60));

	if (hours === 0) {
		return `${minutes}m`;
	}

	return `${hours}h ${minutes}m`;
};