import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { siteConfig, campuses, contactInfo, footerLinks } from "@/lib/site-config";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-900 text-navy-200">
      <div className="container-page section-y !py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-sm bg-gold-500 text-navy-900">
                <GraduationCap className="size-5" />
              </span>
              <span className="font-display text-lg font-semibold text-white">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-body-sm text-navy-300">{siteConfig.description}</p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Facebook, href: contactInfo.social.facebook, label: "Facebook" },
                { icon: Instagram, href: contactInfo.social.instagram, label: "Instagram" },
                { icon: Twitter, href: contactInfo.social.x, label: "X" },
                { icon: Youtube, href: contactInfo.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={footerLinks.explore} />
          <FooterColumn title="Community" links={footerLinks.community} />
          <FooterColumn title="School" links={footerLinks.school} />

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Stay Informed</h3>
            <p className="mt-3 text-body-sm text-navy-300">
              Campus news and admissions updates, a few times a term — no spam.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-navy-800 pt-10 sm:grid-cols-2">
          {campuses.map((c) => (
            <div key={c.id} className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <div>
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-body-sm text-navy-300">{c.address}</p>
                <p className="mt-1 flex items-center gap-1.5 text-body-sm text-navy-300">
                  <Phone className="size-3.5" /> {c.phone[0]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-navy-800 pt-8 text-caption text-navy-400 sm:flex-row sm:items-center">
          <p>© {year} {siteConfig.name} School System. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Mail className="size-3.5" />
            <a href={`mailto:${contactInfo.generalEmail}`} className="hover:text-gold-400">
              {contactInfo.generalEmail}
            </a>
          </div>
          <div className="flex gap-5">
            {footerLinks.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold-400">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-body-sm text-navy-300 transition-colors hover:text-gold-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
