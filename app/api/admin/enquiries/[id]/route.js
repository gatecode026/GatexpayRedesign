import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry.model";
import { authenticateAdminRequest } from "@/lib/auth";

const UpdateEnquirySchema = z.object({
  status: z.enum(["new", "in_progress", "contacted", "closed"]).optional(),
  notes: z.string().max(1000).optional(),
});

export async function PATCH(req, { params }) {
  try {
    const auth = await authenticateAdminRequest(req, ["superadmin", "admin"]);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status }
      );
    }

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry ID format" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = UpdateEnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid update payload",
        },
        { status: 400 }
      );
    }

    await connectDB();
    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry: updated,
    });
  } catch (error) {
    console.error("[Update Enquiry Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update enquiry",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await authenticateAdminRequest(req, ["superadmin", "admin"]);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry ID format" },
        { status: 400 }
      );
    }

    await connectDB();
    const deleted = await Enquiry.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("[Delete Enquiry Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}

