import { NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";
export async function GET(req) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const session = await verifyAdminToken(token);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    admin: {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
    },
  });
}
