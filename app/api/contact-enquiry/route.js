import { POST as mainEnquiriesPost } from "@/app/api/enquiries/route";
export async function POST(req) {
  return mainEnquiriesPost(req);
}
