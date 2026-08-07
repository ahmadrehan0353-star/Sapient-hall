export type Testimonial = {
  id: string;
  name: string;
  relation: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ch. Qasir",
    relation: "Parent",
    quote:
      "What sets this school apart is how deliberately they build character alongside academics. Discipline is visible everywhere on campus, and the staff are genuinely invested in every child's development, not just their grades.",
  },
  {
    id: "t2",
    name: "Fareena Fatima",
    relation: "Parent",
    quote:
      "My child gets the same level of attention as every other student — that consistency is rare. The faculty are committed to bringing out the best in each child, and it shows in how confident he's become.",
  },
  {
    id: "t3",
    name: "Nida Atif",
    relation: "Parent",
    quote:
      "From the purpose-built campus and air-conditioned classrooms to the CCTV coverage and the swimming pool, everything felt considered on my first visit. What impressed me most was how openly the school communicates with parents — and it shows in the results, especially in the Cambridge exams.",
  },
  {
    id: "t4",
    name: "Faisal Saeed",
    relation: "Parent",
    quote:
      "One of the strongest schools in the city for genuinely caring about every part of a child's development, not just academics.",
  },
  {
    id: "t5",
    name: "Zuhayr Faisal",
    relation: "Alumnus",
    quote:
      "I studied here years ago and I'm now overseas, but I still think back to how welcoming the environment was and how well the administration ran things.",
  },
  {
    id: "t6",
    name: "Kaleem Afzal",
    relation: "Alumnus",
    quote:
      "This school gave me the foundation I needed for everything that came after. I'd recommend it without hesitation.",
  },
];
