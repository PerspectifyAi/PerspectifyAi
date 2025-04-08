import { seedTransactions } from "actions/seed";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const result = await seedTransactions();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
