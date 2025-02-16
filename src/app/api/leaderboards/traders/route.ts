import { NextResponse } from "next/server";
import { mockTraderData } from "@/mockdata";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
	const timeframe = searchParams.get("timeframe");

  // setTimeout to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (timeframe === "weekly") {
    return NextResponse.json(mockTraderData);
  } else if (timeframe === "monthly") {
    return NextResponse.json(mockTraderData);
  }

  return NextResponse.json(mockTraderData);
}