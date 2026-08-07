export type Faq = { id: string; question: string; answer: string; category?: string };

export const homeFaqs: Faq[] = [
  {
    id: "f1",
    question: "What curriculum does Sapient Hall follow?",
    answer:
      "We follow the Cambridge International curriculum throughout — Cambridge Primary, Cambridge Lower Secondary, IGCSE, and AS & A Levels — alongside the national curriculum requirements.",
  },
  {
    id: "f2",
    question: "What age can my child start?",
    answer:
      "Pre-School accepts children from age 3. From there, students progress through Primary, Middle, Secondary, and Cambridge Advanced without needing to change schools.",
  },
  {
    id: "f3",
    question: "Do both campuses offer the same grade levels?",
    answer:
      "The Flagship Campus on Adyala Road offers Pre-School through A Levels. The Bahria Campus currently offers Pre-School through Middle Years.",
  },
  {
    id: "f4",
    question: "How do I apply?",
    answer:
      "Start on our Admissions page — you can submit an inquiry online, and our admissions team will guide you through document submission, assessment, and enrolment.",
  },
  {
    id: "f5",
    question: "What safety measures are in place on campus?",
    answer:
      "Both campuses are purpose-built with CCTV monitoring throughout, controlled entry points, and dedicated transport and medical facilities.",
  },
];
