import type { NextRequest } from "next/server";

export function verifyAdminRequest(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  const secret = process.env.ADMIN_SECRET_KEY;

  return Boolean(secret && adminKey && adminKey === secret);
}
