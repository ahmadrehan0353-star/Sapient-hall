"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { campuses } from "@/lib/site-config";
import { academicLevels } from "@/lib/data/academics";

const schema = z.object({
  parentName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  childName: z.string().min(2, "Please enter the child's name"),
  level: z.string().min(1, "Select a level"),
  campus: z.string().min(1, "Select a campus"),
  message: z.string().max(2000).optional(),
});
export type InquiryValues = z.infer<typeof schema>;

export function InquiryForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: InquiryValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "success" && (
        <Alert variant="success" title="Inquiry received">
          Our admissions team will contact you within two working days.
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="error" title="Something went wrong">
          Please try again, or call the campus directly.
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="parentName" required>Parent / guardian name</Label>
          <Input id="parentName" autoComplete="name" error={errors.parentName?.message} {...register("parentName")} />
          <FieldError>{errors.parentName?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="childName" required>Child&apos;s name</Label>
          <Input id="childName" error={errors.childName?.message} {...register("childName")} />
          <FieldError>{errors.childName?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="phone" required>Phone</Label>
          <Input id="phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="level" required>Applying for</Label>
          <Select id="level" error={errors.level?.message} defaultValue="" {...register("level")}>
            <option value="" disabled>Select level…</option>
            {academicLevels.map((l) => (
              <option key={l.slug} value={l.slug}>{l.name}</option>
            ))}
          </Select>
          <FieldError>{errors.level?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="campus" required>Preferred campus</Label>
          <Select id="campus" error={errors.campus?.message} defaultValue="" {...register("campus")}>
            <option value="" disabled>Select campus…</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.id}>{c.short}</option>
            ))}
          </Select>
          <FieldError>{errors.campus?.message}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Anything we should know? (optional)</Label>
        <Textarea id="message" {...register("message")} />
      </div>

      <Button type="submit" variant="gold" size="lg" loading={isSubmitting}>
        Submit Inquiry
      </Button>
    </form>
  );
}
