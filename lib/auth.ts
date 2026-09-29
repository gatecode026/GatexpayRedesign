import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const COOKIE_NAME = "gatexpay_admin_session";
const SECRET_STRING =
  process.env.AUTH_SECRET || "gatexpay-enterprise-jwt-secret-key-2026-secure-32chars";
const SECRET_BYTES = new TextEncoder().encode(SECRET_STRING);

export interface AdminSessionPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Sign a secure JWT for the admin session
 */
export async function signAdminToken(payload: {
  id: string;
  email: string;
  name: string;
  role: string;
}): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_BYTES);
}

/**
 * Verify and decode an admin session JWT
 */
export async function verifyAdminToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_BYTES);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get current admin session from server component or route handler
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Get admin session token from incoming NextRequest
 */
export function getSessionTokenFromRequest(req: NextRequest): string | undefined {
  return req.cookies.get(COOKIE_NAME)?.value;
}
