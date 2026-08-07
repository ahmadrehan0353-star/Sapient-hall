import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/firebase-admin";
import { COLLECTIONS } from "@/lib/firestore-collections";

const admissionSchema = z.object({
  parentName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(20),
  childName: z.string().min(2).max(120),
  level: z.string().min(1).max(60),
  campus: z.string().min(1).max(60),
  message: z.string().max(2000).optional(),
});

const eventSchema = z.object({
  type: z.literal("event-registration"),
  eventTitle: z.string().min(2).max(200),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(20),
  attendees: z.number().int().min(1).max(10),
});

export async function POST(req: Request) {
  if (!rateLimit(clientKey(req, "inquiry"), 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const isEvent = typeof body === "object" && body !== null && (body as Record<string, unknown>).type === "event-registration";
  const parsed = isEvent ? eventSchema.safeParse(body) : admissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  try {
    await saveSubmission(COLLECTIONS.inquiries, { kind: isEvent ? "event" : "admission", ...parsed.data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("inquiry route error:", err);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
