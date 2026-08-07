import type { LucideIcon } from "lucide-react";
import {
  FlaskConical, Monitor, BookMarked, Trophy, Waves, Bus, UtensilsCrossed,
  Stethoscope, ShieldCheck, TreePine, Theater,
} from "lucide-react";

export type Facility = {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  highlights: string[];
  imageCount: number;
};

export const facilitiesList: Facility[] = [
  {
    id: "science-labs", name: "Science Laboratories", icon: FlaskConical,
    description: "Separate, fully equipped physics, chemistry, and biology labs where practical work is a weekly routine, not an occasional treat.",
    highlights: ["Weekly practicals from middle years", "Full IGCSE & A Level apparatus", "Trained lab assistants"],
    imageCount: 4,
  },
  {
    id: "computer-labs", name: "Computer Laboratories", icon: Monitor,
    description: "Modern computer labs with one machine per student during lessons, supporting computing classes from primary upward.",
    highlights: ["1:1 machines in lessons", "High-speed internet", "Programming from Grade 4"],
    imageCount: 3,
  },
  {
    id: "library", name: "Library", icon: BookMarked,
    description: "A quiet, well-stocked library with fiction, reference, and Cambridge past-paper archives, plus a lending programme for all grades.",
    highlights: ["Lending programme for every grade", "Past-paper archive", "Dedicated reading periods"],
    imageCount: 3,
  },
  {
    id: "sports-complex", name: "Sports Complex", icon: Trophy,
    description: "Purpose-built sports facilities supporting cricket, football, basketball, badminton, and athletics through the school year.",
    highlights: ["Inter-house competitions", "Qualified coaches", "Annual sports week"],
    imageCount: 4,
  },
  {
    id: "swimming-pool", name: "Swimming Pool & Gym", icon: Waves,
    description: "An on-campus swimming pool with certified instructors and supervised sessions, alongside a fitness gym for senior students.",
    highlights: ["Certified instructors", "Supervised sessions by grade", "Separate timings maintained"],
    imageCount: 3,
  },
  {
    id: "transport", name: "Transport", icon: Bus,
    description: "A monitored fleet covering major routes around both campuses, with attendants on every vehicle and live coordination with the front office.",
    highlights: ["Attendants on every route", "Route coverage across the city", "Front-office coordination"],
    imageCount: 2,
  },
  {
    id: "cafeteria", name: "Cafeteria", icon: UtensilsCrossed,
    description: "A hygienic cafeteria serving fresh, sensible food at fair prices — with menus reviewed for nutrition, not just convenience.",
    highlights: ["Hygiene-audited kitchen", "Nutrition-reviewed menu", "Nut-aware policies"],
    imageCount: 2,
  },
  {
    id: "medical-room", name: "Medical Room", icon: Stethoscope,
    description: "A staffed medical room for first aid and routine care, with parent notification protocols for anything beyond minor incidents.",
    highlights: ["Trained first-aid staff", "Parent notification protocol", "Medical records kept per student"],
    imageCount: 2,
  },
  {
    id: "security", name: "Security & CCTV", icon: ShieldCheck,
    description: "Controlled entry points, visitor logging, and CCTV coverage across both campuses — safety here is a system, not a promise.",
    highlights: ["CCTV throughout campus", "Controlled entry & visitor logs", "Trained security staff"],
    imageCount: 2,
  },
  {
    id: "playground", name: "Playgrounds", icon: TreePine,
    description: "Multiple age-separated playgrounds so younger children play safely away from older students' games.",
    highlights: ["Age-separated play areas", "Soft-surface early-years zone", "Supervised break times"],
    imageCount: 3,
  },
  {
    id: "auditorium", name: "Auditorium", icon: Theater,
    description: "A multi-purpose auditorium hosting assemblies, exhibitions, performances, and parent events year-round.",
    highlights: ["Full sound & projection", "Hosts exhibitions & performances", "Seats whole-school assemblies"],
    imageCount: 3,
  },
];
