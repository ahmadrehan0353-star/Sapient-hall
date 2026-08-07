"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input, Label, FieldError } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number").max(20),
  attendees: z.coerce.number().int().min(1, "At least 1").max(10, "Maximum 10"),
});
type Values = z.infer<typeof schema>;

export function EventRegistrationForm({ eventTitle }: { eventTitle: string }) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { attendees: 1 },
  });

  async function onSubmit(values: Values) {
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "event-registration", eventTitle, ...values }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {status === "success" && <Alert variant="success" title="Registered!">Check your email for confirmation.</Alert>}
      {status === "error" && <Alert variant="error" title="Something went wrong">Please try again.</Alert>}
      <div>
        <Label htmlFor="reg-name" required>Full name</Label>
        <Input id="reg-name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        <FieldError>{errors.name?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="reg-email" required>Email</Label>
        <Input id="reg-email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <FieldError>{errors.email?.message}</FieldError>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="reg-phone" required>Phone</Label>
          <Input id="reg-phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="reg-attendees" required>Attendees</Label>
          <Input id="reg-attendees" type="number" min={1} max={10} error={errors.attendees?.message} {...register("attendees")} />
          <FieldError>{errors.attendees?.message}</FieldError>
        </div>
      </div>
      <Button type="submit" variant="gold" size="lg" loading={isSubmitting} className="w-full">
        Register
      </Button>
    </form>
  );
}
