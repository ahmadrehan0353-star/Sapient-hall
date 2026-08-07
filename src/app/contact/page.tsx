import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { campuses, contactInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sapient Hall — campus addresses, phone numbers, visiting hours, and directions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us — we answer."
        description={`Visiting hours: ${contactInfo.visitingHours}. Or reach us any time using the form below.`}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-page section-y grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <RevealGroup className="space-y-6">
            {campuses.map((c) => (
              <Reveal key={c.id} className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
                <h2 className="text-display-sm">{c.name}</h2>
                <p className="mt-1 text-body-sm font-medium text-royal-600">{c.grades}</p>
                <div className="mt-4 space-y-2.5 text-body-sm text-navy-600">
                  <p className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-navy-400" /> {c.address}</p>
                  {c.phone.map((p) => (
                    <p key={p} className="flex gap-2.5">
                      <Phone className="mt-0.5 size-4 shrink-0 text-navy-400" />
                      <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-royal-600">{p}</a>
                    </p>
                  ))}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-sm font-semibold text-navy-900 underline-offset-4 hover:text-royal-600 hover:underline"
                >
                  Open in Google Maps →
                </a>
                <div className="mt-5 overflow-hidden rounded-sm border border-surface-border">
                  <iframe
                    title={`Map — ${c.name}`}
                    src={`https://maps.google.com/maps?q=${c.lat},${c.lng}&z=15&output=embed`}
                    className="h-52 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
            <h2 className="text-display-sm">General</h2>
            <div className="mt-4 space-y-2.5 text-body-sm text-navy-600">
              <p className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy-400" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-royal-600">{contactInfo.email}</a>
              </p>
              <p className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy-400" />
                <a href={`mailto:${contactInfo.generalEmail}`} className="hover:text-royal-600">{contactInfo.generalEmail}</a>
              </p>
              <p className="flex gap-2.5"><Clock className="mt-0.5 size-4 shrink-0 text-navy-400" /> {contactInfo.visitingHours}</p>
            </div>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Facebook, href: contactInfo.social.facebook, label: "Facebook" },
                { icon: Instagram, href: contactInfo.social.instagram, label: "Instagram" },
                { icon: Twitter, href: contactInfo.social.x, label: "X" },
                { icon: Youtube, href: contactInfo.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border border-surface-border text-navy-500 transition-colors hover:border-gold-500 hover:text-gold-600">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="h-fit rounded-lg border border-surface-border bg-surface-card p-7 shadow-card sm:p-9">
          <h2 className="text-display-sm">Send us a message</h2>
          <p className="mt-2 text-body-sm text-navy-500">Route it to the right department and we&apos;ll reply within two working days.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
