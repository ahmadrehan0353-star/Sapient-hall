"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

const departments = ["Admissions", "Accounts", "Transport", "Academic Office", "Principal's Office", "Other"] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  department: z.enum(departments, { message: "Select a department" }),
  message: z.string().min(10, "Tell us a bit more (at least 10 characters)").max(3000),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: Values) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "success" && (
        <Alert variant="success" title="Message sent">We&apos;ll get back to you within two working days.</Alert>
      )}
      {status === "error" && (
        <Alert variant="error" title="Something went wrong">Please try again, or call us directly.</Alert>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name" required>Name</Label>
          <Input id="c-name" autoComplete="name" error={errors.name?.message} {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="c-email" required>Email</Label>
          <Input id="c-email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="c-phone" required>Phone</Label>
          <Input id="c-phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="c-dept" required>Department</Label>
          <Select id="c-dept" defaultValue="" error={errors.department?.message} {...register("department")}>
            <option value="" disabled>Select department…</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
          <FieldError>{errors.department?.message}</FieldError>
        </div>
      </div>
      <div>
        <Label htmlFor="c-message" required>Message</Label>
        <Textarea id="c-message" error={errors.message?.message} {...register("message")} />
        <FieldError>{errors.message?.message}</FieldError>
      </div>
      <Button type="submit" variant="gold" size="lg" loading={isSubmitting}>Send Message</Button>
    </form>
  );
}
