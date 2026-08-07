export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  featured?: boolean;
  imageUrl?: string;
};

import { siteImages } from "@/lib/site-images";

export const newsPosts: NewsPost[] = [
  {
    id: "n1",
    slug: "class-of-2026-farewell",
    imageUrl: siteImages.events.farewell,
    title: "A Farewell to Remember for the Class of 2026",
    category: "Student Life",
    date: "2026-03-14",
    excerpt:
      "Graduating students gathered with teachers and staff for an evening of tributes, laughter, and a few well-earned tears.",
    content:
      "Our graduating students marked the end of their journey at Sapient Hall with a farewell evening dedicated to the teachers and staff who guided them. The event featured tributes from students, performances, and a shared meal — a fitting send-off before they move on to the next chapter.",
    featured: true,
  },
  {
    id: "n2",
    slug: "international-food-festival-2026",
    imageUrl: siteImages.events.foodFestival,
    title: "Six Cuisines, One Campus: Our International Food Festival",
    category: "Events",
    date: "2026-02-20",
    excerpt:
      "Students and families sampled dishes from Morocco, Qatar, Argentina, France, Croatia, and Portugal in a celebration of global culture.",
    content:
      "This term's International Food Festival turned the campus into a world tour of flavour, with student-run stalls representing six countries: Morocco, Qatar, Argentina, France, Croatia, and Portugal. Beyond the food, each stall told a story — of history, tradition, and the cultures our students are learning about in the classroom.",
  },
  {
    id: "n3",
    slug: "annual-bonfire-night-2026",
    imageUrl: siteImages.events.bonfire,
    title: "Annual Bonfire Night Lights Up the Campus",
    category: "Student Life",
    date: "2026-01-18",
    excerpt:
      "Grade 7 and above students took the stage for a talent show under the stars at our annual bonfire night.",
    content:
      "Our annual Bonfire Night brought students, teachers, and families together for an evening of performances, warmth, and community. Students from Grade 7 upward showcased their talents on stage while the crackle of the bonfire set the mood for a memorable night on campus.",
  },
  {
    id: "n4",
    slug: "cambridge-results-announcement",
    title: "Strong Cambridge Results Reaffirm Our Academic Standards",
    category: "Academics",
    date: "2026-01-05",
    excerpt:
      "This session's IGCSE and A Level results continue a multi-year trend of strong outcomes across core subjects.",
    content:
      "We're proud of the results our students achieved in this session's Cambridge examinations. Consistent outcomes across core subjects reflect the work of our faculty and the discipline our students bring to their studies — congratulations to every student and the teachers who supported them.",
  },
  {
    id: "n5",
    slug: "science-exhibition-2026",
    title: "Young Scientists Take Over the Auditorium",
    category: "Academics",
    date: "2025-11-22",
    excerpt:
      "Students from Grades 3–8 presented original science projects to parents and judges at our annual exhibition.",
    content:
      "Our annual Science Exhibition gave students the chance to design, build, and present original projects — from working models to data-driven experiments — to a panel of judges and an audience of proud parents. Activity-based learning like this sits at the heart of our academic approach.",
  },
];
