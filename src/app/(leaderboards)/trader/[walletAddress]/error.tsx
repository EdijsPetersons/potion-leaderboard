"use client"; // Error boundaries must be Client Components

import { FlaskConical } from "lucide-react";
import { useEffect } from "react";

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="relative flex h-svh flex-1 flex-col bg-background justify-center items-center">
			<FlaskConical className="w-24 h-24 rotate-12 mb-2" />
			<h2 className="text-2xl">Something went wrong!</h2>
			<button
				onClick={() => {
					window.location.reload();
				}}
			>
				Try again
			</button>
		</div>
	);
}
