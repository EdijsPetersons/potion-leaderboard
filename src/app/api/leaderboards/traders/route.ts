import { NextResponse } from "next/server";
import { mockDataDaily, mockDataMonthly, mockDataWeekly } from "@/mockdata";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
	const timeframe = searchParams.get("timeframe");

  if (timeframe === "weekly") {
    return NextResponse.json(mockDataWeekly);
  } else if (timeframe === "monthly") {
    return NextResponse.json(mockDataMonthly);
  }

  return NextResponse.json(mockDataDaily);
}