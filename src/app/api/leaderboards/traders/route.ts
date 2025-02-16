import { NextResponse } from "next/server";
import { mockTraderData } from "@/mockdata";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
	const timeframe = searchParams.get("timeframe");

  const failure = Math.random() < 0.1;

	if (failure) {
		throw new Error("Failed to fetch token stats");
	}

  // setTimeout to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (timeframe === "weekly") {
    return NextResponse.json(mockTraderData);
  } else if (timeframe === "monthly") {
    return NextResponse.json(mockTraderData);
  }

  return NextResponse.json(mockTraderData);
}