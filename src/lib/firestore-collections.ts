/**
 * Central registry of Firestore collections used by the CMS.
 * Keeping names here prevents typos scattering across the codebase
 * and gives the admin panel a single source of truth.
 */
export const COLLECTIONS = {
  news: "news",
  events: "events",
  gallery: "gallery",
  testimonials: "testimonials",
  staff: "staff",
  faqs: "faqs",
  announcements: "announcements",
  inquiries: "inquiries",
  contactMessages: "contact_messages",
  newsletter: "newsletter_subscribers",
  settings: "settings", // single-doc collection: settings/site
  users: "admin_users", // role documents keyed by uid: { role: "admin" | "editor" }
} as const;

export type CollectionKey = keyof typeof COLLECTIONS;
