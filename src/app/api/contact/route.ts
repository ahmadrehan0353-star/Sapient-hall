import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/firebase-admin";
import { COLLECTIONS } from "@/lib/firestore-collections";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(20),
  department: z.string().min(2).max(60),
  message: z.string().min(10).max(3000),
});

export async function POST(req: Request) {
  if (!rateLimit(clientKey(req, "contact"), 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  try {
    await saveSubmission(COLLECTIONS.contactMessages, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
