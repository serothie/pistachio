import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "인가 코드 없음" }, { status: 400 });
  }

  return NextResponse.json({ payload: { code } }, { status: 400 });
}
