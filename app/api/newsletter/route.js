import { NextResponse } from "next/server";
import { z } from "zod";

const NewsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = NewsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid email address",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully! Watch your inbox for our next issue.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Server error occurred while subscribing. Please try again.",
      },
      { status: 500 }
    );
  }
}
