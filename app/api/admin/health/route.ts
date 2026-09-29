import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();
  try {
    const connState = mongoose.connection.readyState;

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (connState !== 1) {
      await connectDB();
    }

    // Ping the admin database to verify active round-trip
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      status: "online",
      label: "Atlas MongoDB: Online",
      latencyMs,
      readyState: mongoose.connection.readyState,
      database: mongoose.connection.name || "gatexpay",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    const isConnecting = mongoose.connection.readyState === 2;

    return NextResponse.json(
      {
        success: false,
        status: isConnecting ? "connecting" : "offline",
        label: isConnecting ? "Atlas MongoDB: Connecting" : "Atlas MongoDB: Offline",
        latencyMs,
        error: error instanceof Error ? error.message : "Database connection error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
