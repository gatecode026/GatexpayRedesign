import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry.model";
import { authenticateAdminRequest } from "@/lib/auth";

const BulkUpdateSchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID is required"),
  status: z.enum(["new", "in_progress", "contacted", "closed"]).optional(),
});

const BulkDeleteSchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID is required"),
});

export async function PATCH(req) {
  try {
    const auth = await authenticateAdminRequest(req, ["superadmin", "admin"]);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = BulkUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid update payload",
        },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { ids, status } = parsed.data;
    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid enquiry IDs provided" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();
    const updatePayload = {};
    if (status) updatePayload.status = status;

    const result = await Enquiry.updateMany(
      { _id: { $in: validIds } },
      { $set: updatePayload }
    );

    return NextResponse.json({
      success: true,
      message: `${result.modifiedCount} enquiries updated successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("[Bulk Update Enquiries Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update enquiries",
      },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req) {
  try {
    const auth = await authenticateAdminRequest(req, ["superadmin", "admin"]);
    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = BulkDeleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid delete payload",
        },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { ids } = parsed.data;
    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid enquiry IDs provided" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();
    const result = await Enquiry.deleteMany({ _id: { $in: validIds } });

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} enquiries deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("[Bulk Delete Enquiries Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete enquiries",
      },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
