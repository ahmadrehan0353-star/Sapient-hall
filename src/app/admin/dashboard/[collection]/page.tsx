"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { getCollectionDef } from "@/components/admin/collection-config";
import { Alert } from "@/components/ui/Alert";

export default function AdminCollectionPage() {
  const params = useParams<{ collection: string }>();
  const def = getCollectionDef(params.collection);

  return (
    <AdminShell>
      {def ? (
        <CollectionManager def={def} />
      ) : (
        <div className="max-w-lg">
          <Alert variant="error" title="Unknown section">
            No collection named “{params.collection}”.{" "}
            <Link href="/admin/dashboard" className="font-medium underline">Back to dashboard</Link>.
          </Alert>
        </div>
      )}
    </AdminShell>
  );
}
