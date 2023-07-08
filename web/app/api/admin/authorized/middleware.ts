import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/utils/verifyTokens";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const verifyToken = await verifyAdminToken(request);
  if (verifyToken === false)
    return NextResponse.json({
      success: false,
      error: "سطح دسترسی برای این درخواست مجاز نمی باشد.",
      data: null,
    });
}
