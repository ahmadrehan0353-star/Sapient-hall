import { siteImages } from "@/lib/site-images";

export type SchoolEvent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  category: string;
  description: string;
  imageUrl?: string;
  registrationOpen?: boolean;
};

export const upcomingEvents: SchoolEvent[] = [
  {
    id: "e1",
    slug: "spring-sports-week",
    title: "Spring Sports Week",
    imageUrl: siteImages.schoolLife.sportsWeek1,
    date: "2026-09-14",
    endDate: "2026-09-18",
    time: "8:00 AM – 2:00 PM",
    location: "Flagship Campus — Sports Complex",
    category: "Co-Curricular",
    description:
      "A fortnight of excitement, thrill, energy, and endless fun — basketball, football, cricket, table tennis, badminton, races, tug of war, martial arts, and athletics — culminating in the annual sports ceremony where the champion house lifts the trophy.",
    registrationOpen: true,
  },
  {
    id: "e2",
    slug: "open-house-admissions-2027",
    title: "Open House — Admissions 2027",
    date: "2026-09-26",
    time: "9:00 AM – 12:00 PM",
    location: "Both Campuses",
    category: "Admissions",
    description:
      "Tour the campus, meet faculty, and get your admissions questions answered ahead of the 2027 intake.",
    registrationOpen: true,
  },
  {
    id: "e3",
    slug: "parent-teacher-conference-t1",
    title: "Parent–Teacher Conference — Term 1",
    date: "2026-10-08",
    time: "1:00 PM – 5:00 PM",
    location: "Both Campuses",
    category: "Academics",
    description: "One-on-one meetings with subject teachers to review first-term progress.",
    registrationOpen: true,
  },
  {
    id: "e4",
    slug: "winter-exhibitions",
    title: "Activity-Based Learning Exhibition",
    imageUrl: siteImages.schoolLife.exhibitions,
    date: "2026-11-19",
    time: "10:00 AM – 1:00 PM",
    location: "Flagship Campus — Auditorium",
    category: "Academics",
    description: "Students from Grades 3–8 present term projects to parents and visiting judges.",
  },
];

export const pastEvents: SchoolEvent[] = [
  {
    id: "pe1",
    slug: "class-of-2026-farewell",
    title: "Class of 2026 Farewell",
    imageUrl: siteImages.events.farewellDinner,
    date: "2026-03-14",
    time: "5:00 PM",
    location: "Flagship Campus",
    category: "Student Life",
    description: "An evening of tributes and performances honouring our graduating students.",
  },
  {
    id: "pe2",
    slug: "international-food-festival",
    title: "International Food Festival",
    imageUrl: siteImages.events.foodFestival,
    date: "2026-02-20",
    time: "11:00 AM – 3:00 PM",
    location: "Flagship Campus",
    category: "Events",
    description: "Student-run stalls representing six countries across food, music, and culture.",
  },
  {
    id: "pe3",
    slug: "bonfire-night",
    title: "Annual Bonfire Night",
    date: "2026-01-18",
    time: "6:00 PM",
    location: "Flagship Campus",
    category: "Student Life",
    description: "A talent show and bonfire evening for Grade 7 and above.",
  },
];
