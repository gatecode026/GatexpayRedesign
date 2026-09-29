import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/enquiry.model";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";

const UpdateEnquirySchema = z.object({
  status: z.enum(["new", "in_progress", "contacted", "closed"]).optional(),
  notes: z.string().max(1000).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = UpdateEnquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    await connectDB();

    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry status updated successfully",
      enquiry: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry", details: error instanceof Error ? error.message : "Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? await verifyAdminToken(token) : null;
    if (!session || session.role !== "superadmin") {
      return NextResponse.json({ success: false, error: "Unauthorized. Superadmin only." }, { status: 403 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
