export type Program = {
  id: string;
  name: string;
  ageRange: string;
  href: string;
  summary: string;
  highlights: string[];
};

export const programs: Program[] = [
  {
    id: "pre-school",
    name: "Pre-School",
    ageRange: "Ages 3 – 5",
    href: "/academics/pre-school",
    summary:
      "A warm, play-based introduction to school built around curiosity, language, and early motor skills.",
    highlights: ["Play-based learning", "Phonics foundations", "Small class sizes"],
  },
  {
    id: "primary",
    name: "Primary",
    ageRange: "Grades 1 – 5",
    href: "/academics/primary",
    summary:
      "Cambridge Primary builds core literacy, numeracy, and scientific thinking through structured, activity-rich lessons.",
    highlights: ["Cambridge Primary curriculum", "Activity-based learning", "Continuous assessment"],
  },
  {
    id: "middle",
    name: "Middle Years",
    ageRange: "Grades 6 – 8",
    href: "/academics/middle",
    summary:
      "Cambridge Lower Secondary widens the subject range and builds the independent-study habits students need next.",
    highlights: ["Cambridge Lower Secondary", "Subject specialists", "Co-curricular electives"],
  },
  {
    id: "secondary",
    name: "Secondary",
    ageRange: "Grades 9 – 10",
    href: "/academics/secondary",
    summary:
      "Two streams — Federal Board Matriculation and Cambridge O Levels — with subject combinations mapped to each student's strengths and ambitions.",
    highlights: ["Matric & O Levels", "Federal Board + CAIES affiliated", "Subject counselling"],
  },
  {
    id: "cambridge-advanced",
    name: "Cambridge Advanced",
    ageRange: "AS & A Levels",
    href: "/academics/cambridge-advanced",
    summary:
      "Small, discussion-led classes prepare students for university admissions worldwide through AS and A Level study.",
    highlights: ["AS & A Levels", "University counselling", "Small cohort sizes"],
  },
];
