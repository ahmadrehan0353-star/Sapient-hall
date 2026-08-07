/**
 * Server-side Firestore writes via REST — avoids adding firebase-admin's heavy
 * dependency tree. Uses a service account only if provided; otherwise API
 * routes log to console so the site still works before Firebase is set up.
 */
type FirestoreValue = { stringValue?: string; integerValue?: string; timestampValue?: string };

function toFields(data: Record<string, unknown>): Record<string, FirestoreValue> {
  const fields: Record<string, FirestoreValue> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "number") fields[k] = { integerValue: String(Math.trunc(v)) };
    else fields[k] = { stringValue: String(v) };
  }
  fields["createdAt"] = { timestampValue: new Date().toISOString() };
  return fields;
}

/**
 * Writes a document using the Firestore REST API with an API key.
 * Requires Firestore rules that allow create on these collections (see
 * firestore.rules) — reads remain locked down.
 */
export async function saveSubmission(collection: string, data: Record<string, unknown>): Promise<void> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!projectId || !apiKey) {
    // Firebase not configured yet — log so submissions aren't silently lost in dev.
    console.info(`[submission:${collection}]`, JSON.stringify(data));
    return;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFields(data) }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore write failed (${res.status}): ${text}`);
  }
}
