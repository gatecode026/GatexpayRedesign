import { NextRequest, NextResponse } from "next/server";
import { POST as mainEnquiriesPost } from "@/app/api/enquiries/route";

export async function POST(req: NextRequest) {
  return mainEnquiriesPost(req);
}
