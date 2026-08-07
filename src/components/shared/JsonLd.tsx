import { siteConfig, campuses, contactInfo } from "@/lib/site-config";

/** Organization + School structured data for search engines. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    name: siteConfig.fullName,
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    email: contactInfo.email,
    telephone: campuses[0]?.phone[0],
    address: campuses.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: c.short,
      addressCountry: "PK",
    })),
    location: campuses.map((c) => ({
      "@type": "Place",
      name: c.name,
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    })),
    sameAs: Object.values(contactInfo.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
