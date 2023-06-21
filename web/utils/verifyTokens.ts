"use server";
import { type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// It will be used for the backend requests.
export async function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value.toString();
  if (!token) return false;

  jwt.verify(token, process.env.JWT!, (err, user) => {
    if (err) {
      return false;
    }
    // req.user_info = user;
    return true;
  });
}
