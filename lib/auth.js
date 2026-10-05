import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
export const COOKIE_NAME = "gatexpay_admin_session";
function getSecretBytes() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "FATAL SECURITY ERROR: AUTH_SECRET environment variable is not defined in production."
      );
    }
    console.warn(
      "[SECURITY WARN] AUTH_SECRET is not configured in .env.local. Using temporary local dev key."
    );
    return new TextEncoder().encode(
      "gatexpay-local-development-secret-minimum-32-characters-key"
    );
  }
  if (secret.length < 32) {
    throw new Error(
      "SECURITY ERROR: AUTH_SECRET must be at least 32 characters long."
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Sign a secure JWT for the admin session
 */
export async function signAdminToken(payload) {
  const secretBytes = getSecretBytes();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretBytes);
}

/**
 * Verify and decode an admin session JWT
 */
export async function verifyAdminToken(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const secretBytes = getSecretBytes();
    const { payload } = await jwtVerify(token, secretBytes, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

/**
 * Get current admin session from server component or route handler
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

/**
 * Get admin session token from incoming NextRequest
 */
export function getSessionTokenFromRequest(req) {
  return req.cookies.get(COOKIE_NAME)?.value;
}

/**
 * Helper to authenticate and check roles for API route handlers
 */
export async function authenticateAdminRequest(req, allowedRoles = null) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return { authorized: false, session: null, status: 401, error: "Unauthorized" };
  }
  const session = await verifyAdminToken(token);
  if (!session) {
    return { authorized: false, session: null, status: 401, error: "Invalid or expired session" };
  }
  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(session.role)) {
    return {
      authorized: false,
      session,
      status: 403,
      error: `Forbidden: role '${session.role}' is not authorized for this resource`,
    };
  }
  return { authorized: true, session, status: 200, error: null };
}

