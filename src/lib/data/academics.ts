export type AcademicLevel = {
  slug: string;
  name: string;
  ageRange: string;
  intro: string;
  curriculum: string;
  learningMethods: string[];
  subjects: string[];
  assessment: string;
  activities: string[];
  resources: string[];
};

export const academicLevels: AcademicLevel[] = [
  {
    slug: "pre-school",
    name: "Pre-School",
    ageRange: "Ages 3 – 5",
    intro:
      "The first years of school shape how a child feels about learning for the rest of their life. Our Pre-School is deliberately warm, structured, and play-rich.",
    curriculum:
      "An early-years programme built around language, early numeracy, motor skills, and social development, aligned with Cambridge Early Years principles and delivered through guided play.",
    learningMethods: [
      "Play-based learning stations rotated daily",
      "Phonics-first reading foundations",
      "Circle time for speaking confidence",
      "Fine-motor and sensory activities",
    ],
    subjects: ["Early Literacy & Phonics", "Early Numeracy", "Discovery (Science & World Around Us)", "Art & Craft", "Physical Development", "Moral & Social Education"],
    assessment:
      "No formal exams. Teachers maintain continuous observation portfolios shared with parents each term, tracking language, numeracy, motor, and social milestones.",
    activities: ["Story time & puppet theatre", "Splash days & outdoor play", "Show-and-tell", "Seasonal celebrations"],
    resources: ["Dedicated early-years wing", "Age-appropriate playground", "Reading corner libraries in every classroom"],
  },
  {
    slug: "primary",
    name: "Primary",
    ageRange: "Grades 1 – 5",
    intro:
      "Primary school is where habits form. We pair the Cambridge Primary curriculum with activity-based teaching so students learn by doing, not memorising.",
    curriculum:
      "Cambridge Primary across English, Mathematics, and Science, complemented by Urdu, Islamiyat, Social Studies, and Computing in line with national requirements.",
    learningMethods: [
      "Activity-based lessons with hands-on projects",
      "Small-group guided reading and maths",
      "Weekly lab and library periods from Grade 3",
      "Regular presentations to build speaking confidence",
    ],
    subjects: ["English", "Mathematics", "Science", "Urdu", "Islamiyat", "Social Studies", "Computing", "Art", "Physical Education"],
    assessment:
      "Continuous classroom assessment plus term examinations. Cambridge Primary Checkpoint at the end of Grade 5 benchmarks students against international standards.",
    activities: ["Science exhibition projects", "Inter-house sports", "Spelling bee & declamation", "Field trips each term"],
    resources: ["Science & computer labs", "Library lending programme", "Qualified subject-support teachers"],
  },
  {
    slug: "middle",
    name: "Middle Years",
    ageRange: "Grades 6 – 8",
    intro:
      "The middle years widen the map. Students meet subject specialists, take on more independent work, and start discovering what they're genuinely good at.",
    curriculum:
      "Cambridge Lower Secondary in English, Mathematics, and Science, with a broadened programme across humanities, languages, and computing that prepares students for IGCSE choices.",
    learningMethods: [
      "Subject-specialist teaching for every discipline",
      "Project-based learning with term exhibitions",
      "Structured homework and study-skills coaching",
      "Lab practicals every week",
    ],
    subjects: ["English", "Mathematics", "Science (Bio, Chem, Phys strands)", "Urdu", "Islamiyat", "History & Geography", "Computing", "Art", "Physical Education"],
    assessment:
      "Term examinations with detailed report cards, plus Cambridge Lower Secondary Checkpoint at the end of Grade 8 to guide IGCSE subject selection.",
    activities: ["Debating society", "Annual bonfire night talent show", "Sports week", "Community-service projects"],
    resources: ["Dedicated science laboratories", "Computer labs with 1:1 machines in lessons", "Career-awareness sessions"],
  },
  {
    slug: "secondary",
    name: "Secondary",
    ageRange: "Grades 9 – 10 · Matric & O Levels",
    intro:
      "The first board results follow a student for life. Affiliated with the Federal Board for Matriculation and with Cambridge (CAIES) for O Levels, Sapient Hall offers both streams — and our students pass their external examinations with flying colours, session after session.",
    curriculum:
      "Two parallel streams with guided selection: Federal Board Matriculation, and Cambridge O Levels (CAIES). Both share a compulsory core of English, Mathematics, and the Sciences, with electives across humanities, business, and computing.",
    learningMethods: [
      "Past-paper practice built into the teaching cycle",
      "Subject counselling before selection",
      "After-school support clinics for core subjects",
      "Mock examinations under real exam conditions",
    ],
    subjects: ["English Language", "Mathematics", "Biology", "Chemistry", "Physics", "Computer Science", "Business Studies", "Economics", "Pakistan Studies", "Islamiyat", "Urdu"],
    assessment:
      "External examinations through the Federal Board (Matric) and Cambridge (O Levels), preceded by school mocks each term under real exam conditions, with detailed feedback and parent conferences. Our illustrious CIE and Matric results prove our merit session after session.",
    activities: ["Subject societies", "Inter-school competitions", "Leadership roles as prefects", "Graduation ceremony for Grade 10 & O Level completers"],
    resources: ["Registered Cambridge exam centre", "Full past-paper archive", "One-on-one academic counselling"],
  },
  {
    slug: "cambridge-advanced",
    name: "Cambridge Advanced",
    ageRange: "AS & A Levels",
    intro:
      "Our A Level cohorts are kept deliberately small — this is the stage where university doors open, and every student deserves individual attention.",
    curriculum:
      "Cambridge International AS & A Levels across sciences, mathematics, business, and humanities, chosen to match each student's intended university pathway.",
    learningMethods: [
      "Seminar-style, discussion-led classes",
      "Independent research and extended writing",
      "University application counselling from day one",
      "Structured revision programmes before each session",
    ],
    subjects: ["Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Business", "Economics", "Accounting", "English Language"],
    assessment:
      "Cambridge International AS & A Level examinations, with staged mocks, predicted-grade reviews, and per-student progress tracking each term.",
    activities: ["University fairs & alumni talks", "Entrepreneurship challenges", "Peer-mentoring of younger students"],
    resources: ["University counselling office", "Personal statement & application support", "Scholarship guidance"],
  },
];
