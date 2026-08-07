import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/firebase-admin";
import { COLLECTIONS } from "@/lib/firestore-collections";

const schema = z.object({ email: z.string().email().max(200) });

export async function POST(req: Request) {
  if (!rateLimit(clientKey(req, "newsletter"), 3, 60_000)) {
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
    return NextResponse.json({ error: "Enter a valid email" }, { status: 422 });
  }
  try {
    await saveSubmission(COLLECTIONS.newsletter, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("newsletter route error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
