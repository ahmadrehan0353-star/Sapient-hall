/**
 * Site-wide static configuration — real Sapient Hall content.
 * In Phase 7 this content moves into Firestore and becomes editable from
 * the admin panel — this file remains as the typed fallback / seed data.
 *
 * NOTE: `stats` values are illustrative placeholders — swap in real
 * enrollment/faculty/results figures when you have them.
 */

export const siteConfig = {
  name: "Sapient Hall",
  fullName: "Sapient Hall School System",
  shortName: "Sapient Hall",
  tagline: "Quality Education, Every Child, Every Day",
  description:
    "A two-campus school system in Rawalpindi and Islamabad delivering a Cambridge-aligned education from Pre-School through A Levels, in a purpose-built, closely supervised campus environment.",
  url: "https://www.sapienthall.edu.pk",
  foundingQuote:
    "Education is a social process. Education is growth. Education is not preparation for life — education is life itself.",
  foundingQuoteAttribution: "John Dewey",
  mission:
    "To provide quality education through a caring and stimulating environment.",
  vision:
    "To deliver an educational programme of real excellence that fosters every child's intellectual, social, physical and moral development in an academically rich environment — we believe in success for all.",
  values: ["Respect", "Honesty", "Cooperation", "Empathy", "Transparency", "Hard Work"],
  aim:
    "For our students to become successful, confident individuals who aspire to achieve their full potential.",
  admissionsStatus: "open" as const,
  admissionsNote: "Admissions open — limited seats remaining across both campuses.",
};

export const campuses = [
  {
    id: "flagship-campus",
    name: "Flagship Campus",
    short: "Flagship Campus",
    address: "313 Main Adyala Road, opposite the PSO station, Rawalpindi",
    lat: 33.5788,
    lng: 73.1092,
    grades: "Pre-School – A Levels",
    phone: ["+92 51 5948388", "+92 331 5588060"],
  },
  {
    id: "bahria-campus",
    name: "Bahria Campus",
    short: "Bahria Campus",
    address: "Road B, Bahria Town Phase 7, Islamabad",
    lat: 33.5453,
    lng: 73.2380,
    grades: "Pre-School – Middle Years",
    phone: ["+92 332 5588060", "+92 331 5588060"],
  },
];

export const contactInfo = {
  email: "admissions@sapienthall.edu.pk",
  generalEmail: "info@sapienthall.edu.pk",
  visitingHours: "9:00 AM – 12:00 PM, Monday to Thursday",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    x: "https://x.com",
    youtube: "https://youtube.com",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Pre-School", href: "/academics/pre-school", description: "Ages 3–5, play-based foundations" },
      { label: "Primary", href: "/academics/primary", description: "Grades 1–5, Cambridge Primary" },
      { label: "Middle", href: "/academics/middle", description: "Grades 6–8, Cambridge Lower Secondary" },
      { label: "Secondary", href: "/academics/secondary", description: "Grades 9–10, IGCSE" },
      { label: "Cambridge Advanced", href: "/academics/cambridge-advanced", description: "AS & A Levels" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Facilities", href: "/facilities" },
  { label: "Student Life", href: "/student-life" },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "News", href: "/news", description: "School announcements & stories" },
      { label: "Events", href: "/events", description: "Calendar & registrations" },
      { label: "Gallery", href: "/gallery", description: "Photos from campus life" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Admissions", href: "/admissions" },
    { label: "Facilities", href: "/facilities" },
  ],
  community: [
    { label: "Student Life", href: "/student-life" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
  ],
  school: [
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

// Placeholder — replace with real figures
export const stats = [
  { label: "Years of Excellence", value: 20, suffix: "+" },
  { label: "Students Enrolled", value: 2000, suffix: "+" },
  { label: "Qualified Faculty", value: 150, suffix: "+" },
  { label: "Campuses", value: 2, suffix: "" },
];

export const facilities = [
  "Purpose-Built Campus",
  "Science Laboratories",
  "Computer Laboratories",
  "Library",
  "Swimming Pool & Gym",
  "Multiple Playgrounds",
  "CCTV Monitoring & Security",
  "Transport",
];
