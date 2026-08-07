"use client";

import * as React from "react";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, limit,
} from "firebase/firestore";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { getDb } from "@/lib/firebase";
import { useAuth } from "@/components/admin/AuthProvider";
import type { CollectionDef, FieldDef } from "@/components/admin/collection-config";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Alert } from "@/components/ui/Alert";
import { Input, Textarea, Select, Label } from "@/components/ui/Input";
import { Table, Thead, Th, Tbody, Tr, Td } from "@/components/ui/Table";

type DocRow = { id: string; [key: string]: unknown };

export function CollectionManager({ def }: { def: CollectionDef }) {
  const { role } = useAuth();
  const canWrite = role !== null && def.writeRoles.includes(role);

  const [rows, setRows] = React.useState<DocRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState<DocRow | "new" | null>(null);
  const [deleting, setDeleting] = React.useState<DocRow | null>(null);
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(query(collection(getDb(), def.collection), orderBy("createdAt", "desc"), limit(200)));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      // Collection may not exist yet or lacks createdAt ordering — fall back to unordered.
      try {
        const snap = await getDocs(query(collection(getDb(), def.collection), limit(200)));
        setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e2) {
        setError(e2 instanceof Error ? e2.message : "Failed to load");
      }
    } finally {
      setLoading(false);
    }
  }, [def.collection]);

  React.useEffect(() => { void load(); }, [load]);

  async function handleSave(formData: FormData) {
    setSaving(true);
    setError(null);
    const data: Record<string, unknown> = {};
    for (const f of def.fields) {
      const v = formData.get(f.key);
      if (v !== null && v !== "") data[f.key] = String(v);
    }
    try {
      if (editing === "new") {
        await addDoc(collection(getDb(), def.collection), { ...data, createdAt: new Date().toISOString() });
      } else if (editing) {
        await updateDoc(doc(getDb(), def.collection, editing.id), data);
      }
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setSaving(true);
    try {
      await deleteDoc(doc(getDb(), def.collection, deleting.id));
      setDeleting(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  const previewFields = def.fields.slice(0, 3);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-display-md">{def.label}</h1>
          <p className="mt-1 text-body-sm text-navy-500">{def.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="md" onClick={() => void load()} icon={<RefreshCw className="size-4" />} iconPosition="left">
            Refresh
          </Button>
          {canWrite && (
            <Button variant="gold" size="md" onClick={() => setEditing("new")} icon={<Plus className="size-4" />} iconPosition="left">
              New {def.singular}
            </Button>
          )}
        </div>
      </div>

      {error && <Alert variant="error" title="Error" className="mt-6">{error}</Alert>}
      {!canWrite && (
        <Alert variant="info" className="mt-6">Your role can view this collection but not modify it.</Alert>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="space-y-3" aria-busy="true" aria-label="Loading">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-sm bg-surface-muted" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <p className="rounded-sm border border-dashed border-surface-border p-10 text-center text-body-md text-navy-500">
            No {def.label.toLowerCase()} yet.
          </p>
        ) : (
          <Table>
            <Thead>
              <tr>
                {previewFields.map((f) => <Th key={f.key}>{f.label}</Th>)}
                {canWrite && <Th className="text-right">Actions</Th>}
              </tr>
            </Thead>
            <Tbody>
              {rows.map((row) => (
                <Tr key={row.id}>
                  {previewFields.map((f) => (
                    <Td key={f.key} className="max-w-[280px] truncate">{String(row[f.key] ?? "—")}</Td>
                  ))}
                  {canWrite && (
                    <Td className="text-right">
                      <div className="inline-flex gap-1.5">
                        <button
                          aria-label={`Edit ${String(row[def.titleField] ?? row.id)}`}
                          onClick={() => setEditing(row)}
                          className="rounded-xs p-2 text-navy-500 hover:bg-navy-900/5 hover:text-navy-900"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          aria-label={`Delete ${String(row[def.titleField] ?? row.id)}`}
                          onClick={() => setDeleting(row)}
                          className="rounded-xs p-2 text-crimson-500 hover:bg-crimson-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={editing === "new" ? `New ${def.singular}` : `Edit ${def.singular}`}
        className="max-w-2xl"
      >
        <form action={handleSave} className="space-y-4">
          {def.fields.map((f) => (
            <FieldInput key={f.key} field={f} defaultValue={editing !== "new" && editing ? String(editing[f.key] ?? "") : ""} />
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="md" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" variant="gold" size="md" loading={saving}>Save</Button>
          </div>
        </form>
      </Modal>

      <Modal open={deleting !== null} onClose={() => setDeleting(null)} title={`Delete ${def.singular}?`}>
        <p className="text-body-md text-navy-600">
          This permanently deletes “{String(deleting?.[def.titleField] ?? deleting?.id)}”. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" size="md" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button variant="primary" size="md" loading={saving} onClick={() => void handleDelete()} className="!bg-crimson-500 hover:!bg-crimson-600">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function FieldInput({ field, defaultValue }: { field: FieldDef; defaultValue: string }) {
  const id = `fld-${field.key}`;
  return (
    <div>
      <Label htmlFor={id} required={field.required}>{field.label}</Label>
      {field.type === "textarea" ? (
        <Textarea id={id} name={field.key} defaultValue={defaultValue} required={field.required} />
      ) : field.type === "select" ? (
        <Select id={id} name={field.key} defaultValue={defaultValue} required={field.required}>
          <option value="">Select…</option>
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </Select>
      ) : (
        <Input
          id={id}
          name={field.key}
          type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
          defaultValue={defaultValue}
          required={field.required}
        />
      )}
      {field.help && <p className="mt-1 text-caption text-navy-400">{field.help}</p>}
    </div>
  );
}
