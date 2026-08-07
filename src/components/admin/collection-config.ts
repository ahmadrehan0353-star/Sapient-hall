/**
 * Config-driven CMS: each entry describes a Firestore collection the admin
 * panel can manage — its fields, labels, and which roles may write to it.
 * Adding a new manageable content type is a config change, not new UI code.
 */
export type FieldType = "text" | "textarea" | "date" | "number" | "select" | "image-url";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
};

export type CollectionDef = {
  slug: string;
  collection: string;
  label: string;
  singular: string;
  description: string;
  titleField: string;
  writeRoles: ("admin" | "editor")[];
  fields: FieldDef[];
};

export const collectionDefs: CollectionDef[] = [
  {
    slug: "news",
    collection: "news",
    label: "News",
    singular: "news post",
    description: "School announcements and stories shown in the newsroom.",
    titleField: "title",
    writeRoles: ["admin", "editor"],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true, help: "lowercase-with-dashes" },
      { key: "category", label: "Category", type: "select", required: true, options: ["Academics", "Student Life", "Events", "Announcements"] },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { key: "content", label: "Full content", type: "textarea", required: true },
      { key: "imageUrl", label: "Cover image (Cloudinary URL)", type: "image-url" },
    ],
  },
  {
    slug: "events",
    collection: "events",
    label: "Events",
    singular: "event",
    description: "Upcoming and past events shown on the calendar.",
    titleField: "title",
    writeRoles: ["admin", "editor"],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "category", label: "Category", type: "select", required: true, options: ["Academics", "Admissions", "Co-Curricular", "Student Life", "Events"] },
      { key: "date", label: "Start date", type: "date", required: true },
      { key: "endDate", label: "End date (optional)", type: "date" },
      { key: "time", label: "Time", type: "text", required: true, help: "e.g. 9:00 AM – 12:00 PM" },
      { key: "location", label: "Location", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "registrationOpen", label: "Registration open?", type: "select", options: ["yes", "no"] },
    ],
  },
  {
    slug: "gallery",
    collection: "gallery",
    label: "Gallery",
    singular: "gallery image",
    description: "Images shown in the public gallery, grouped by album.",
    titleField: "caption",
    writeRoles: ["admin", "editor"],
    fields: [
      { key: "caption", label: "Caption", type: "text", required: true },
      { key: "album", label: "Album", type: "select", required: true, options: ["campus", "classrooms", "sports", "events", "labs"] },
      { key: "imageUrl", label: "Image (Cloudinary URL)", type: "image-url", required: true },
    ],
  },
  {
    slug: "testimonials",
    collection: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    description: "Parent and alumni quotes shown on the homepage and student-life page.",
    titleField: "name",
    writeRoles: ["admin", "editor"],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "relation", label: "Relation", type: "select", required: true, options: ["Parent", "Alumnus", "Student"] },
      { key: "quote", label: "Quote", type: "textarea", required: true },
    ],
  },
  {
    slug: "staff",
    collection: "staff",
    label: "Staff",
    singular: "staff member",
    description: "Leadership and faculty profiles.",
    titleField: "name",
    writeRoles: ["admin"],
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role / title", type: "text", required: true },
      { key: "bio", label: "Short bio", type: "textarea" },
      { key: "photoUrl", label: "Photo (Cloudinary URL)", type: "image-url" },
    ],
  },
  {
    slug: "faqs",
    collection: "faqs",
    label: "FAQs",
    singular: "FAQ",
    description: "Questions and answers shown on the FAQ page.",
    titleField: "question",
    writeRoles: ["admin", "editor"],
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true },
      { key: "category", label: "Category", type: "select", required: true, options: ["Admissions", "Academics", "Campus & Safety", "Fees & Policies"] },
    ],
  },
  {
    slug: "announcements",
    collection: "announcements",
    label: "Announcements",
    singular: "announcement",
    description: "Short banner announcements (e.g. admissions open, holiday notices).",
    titleField: "text",
    writeRoles: ["admin", "editor"],
    fields: [
      { key: "text", label: "Announcement text", type: "text", required: true },
      { key: "link", label: "Link (optional)", type: "text" },
      { key: "active", label: "Active?", type: "select", required: true, options: ["yes", "no"] },
    ],
  },
  {
    slug: "inquiries",
    collection: "inquiries",
    label: "Inquiries",
    singular: "inquiry",
    description: "Admission inquiries and event registrations submitted from the website (read-only workflow: review and delete).",
    titleField: "parentName",
    writeRoles: ["admin"],
    fields: [
      { key: "kind", label: "Kind", type: "text" },
      { key: "parentName", label: "Parent name", type: "text" },
      { key: "childName", label: "Child name", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "level", label: "Level", type: "text" },
      { key: "campus", label: "Campus", type: "text" },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
  {
    slug: "messages",
    collection: "contact_messages",
    label: "Contact Messages",
    singular: "message",
    description: "Messages from the contact form.",
    titleField: "name",
    writeRoles: ["admin"],
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "department", label: "Department", type: "text" },
      { key: "message", label: "Message", type: "textarea" },
    ],
  },
  {
    slug: "settings",
    collection: "settings",
    label: "Site Settings",
    singular: "setting",
    description: "Key–value settings: hero tagline, stats, contact info, social links. The site reads these at build/runtime once wired.",
    titleField: "key",
    writeRoles: ["admin"],
    fields: [
      { key: "key", label: "Setting key", type: "text", required: true, help: "e.g. hero.tagline, stats.students, social.facebook" },
      { key: "value", label: "Value", type: "textarea", required: true },
    ],
  },
];

export function getCollectionDef(slug: string): CollectionDef | undefined {
  return collectionDefs.find((c) => c.slug === slug);
}
