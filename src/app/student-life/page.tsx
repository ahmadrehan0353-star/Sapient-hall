import type { Metadata } from "next";
import {
  Flame, Globe2, Sparkles, Shield, Feather, Scale, Compass, Palette, Drama,
  Mountain, BrainCircuit, PartyPopper, Trophy, GraduationCap, Moon,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "School Life",
  description:
    "Houses, clubs, co-curricular activities, and the traditions that shape the year at Sapient Hall — from Sports Week to Career Day, elections to hiking trips.",
};

const houses = [
  { icon: Shield, name: "Griffin", text: "Stands for courage, comradeship, and foresightedness." },
  { icon: Feather, name: "Phoenix", text: "Portrays a rare quality of character eminence." },
  { icon: Scale, name: "Equinox", text: "Represents a balanced approach, staying power, and steadfastness." },
  { icon: Compass, name: "Maverick", text: "Endowed with uniqueness and independence — exhibiting individualistic qualities." },
];

const clubs = [
  { icon: Palette, name: "Art Club" },
  { icon: Drama, name: "Drama Club" },
  { icon: Mountain, name: "Adventure Club" },
  { icon: BrainCircuit, name: "Brainiac Club" },
];

const activities = [
  {
    title: "Sports Week", image: siteImages.schoolLife.sportsWeek1,
    text: "The most anticipated fortnight of the year — basketball, football, cricket, table tennis, badminton, races, tug of war, martial arts, and athletics, as the four houses compete to be champions. It all culminates in the annual sports ceremony, a spectacle of synchronised performances by every grade, ending with the winners' trophy.",
  },
  {
    title: "Career Day", image: siteImages.schoolLife.careerDay,
    text: "For students of Grade 7 onwards, guest professionals speak from the heart about the traits and qualifications success actually requires — a personalised effort to acclimatise students to practical life.",
  },
  {
    title: "Competitions", image: siteImages.schoolLife.competitions,
    text: "Debates, extempore speeches, recitation and translation of Quranic verses, famous-quote retention, and science projects — participation is for everyone, building mental toughness and intrinsic motivation.",
  },
  {
    title: "Elections", image: siteImages.schoolLife.elections,
    text: "Held twice a session from Grade 6 onwards, with students from Grade 4 up casting votes alongside staff. Candidates campaign energetically — and learn to compete with dignity and fairness, the essence of democracy.",
  },
  {
    title: "Research & Science Projects", image: siteImages.schoolLife.researchProject,
    text: "Reading, data collection, analysis, and logical thinking as scientific methodology — students present their work before a panel of judges, keeping pace with rapidly growing science and technology.",
  },
  {
    title: "Exhibitions", image: siteImages.schoolLife.exhibitions,
    text: "Term exhibitions put student work on display for the whole community — a public celebration of what activity-based learning produces.",
  },
  {
    title: "Eco Projects", image: siteImages.schoolLife.ecoProjects,
    text: "Discouraging plastic bags, saying no to littering, tree plantation, and conserving water — fostering positive reasoning and everyday environmental awareness.",
  },
  {
    title: "Art & Design", image: siteImages.schoolLife.artAndDesign,
    text: "Creativity and imagination as a natural source of expression — children build skill in handling materials, tools, and techniques.",
  },
  {
    title: "Martial Arts", image: siteImages.schoolLife.martialArts,
    text: "Building confidence and self-esteem through goal setting and achievement, strengthening mind and body through focused, disciplined training.",
  },
  {
    title: "Swimming Sessions", image: siteImages.schoolLife.swimmingSession,
    text: "Held twice a session — in August/September and May — in a safe, supervised pool with trained guards. A brilliant way to burn off energy and learn social skills outside the classroom.",
  },
  {
    title: "Field & Hiking Trips", image: siteImages.schoolLife.hikingTrips,
    text: "Field trips chosen for educational value, with security arrangements given special emphasis — plus a hiking trip once a session for Grade 7 onwards, accompanied by vigilant staff.",
  },
  {
    title: "Music & Drama", image: siteImages.schoolLife.musicDrama,
    text: "Musical literacy, instruments, and singing alongside performing stories and themes on stage — complementing confidence and creative skill.",
  },
  {
    title: "Fun Days", image: siteImages.schoolLife.funDays,
    text: "At the end of each session before summer vacation — swimming, games, and a movie to mark the close of a hectic academic year and acknowledge students' efforts.",
  },
  {
    title: "Fire Drills", image: siteImages.schoolLife.fireDrill,
    text: "Planned evacuation practice as part of fire-safety procedures — because training is the key factor in handling any emergency.",
  },
  {
    title: "Special Days", image: siteImages.schoolLife.specialDays,
    text: "Courtesy Day, Discipline Day, Hygiene Day, Pakistan Resolution Day, Defence Day, National Dress Day, Fruit Day, Colour Day, Teachers' Day, Quaid-e-Azam Day, and Iqbal Day — 'Show, don't tell', rooted in activity-based learning.",
  },
  {
    title: "Physical Education", image: siteImages.schoolLife.physicalEducation,
    text: "Structured PE throughout the year keeps fitness a habit, not an afterthought — running, games, and skill-building for every grade.",
  },
];

const traditions = [
  { icon: Flame, image: siteImages.events.bonfireNight, title: "Bonfire & BBQ Night", text: "Dazzling flames against the night sky as Grade 7 and beyond showcase their talents — the campus alive with celebration and unity." },
  { icon: Globe2, image: siteImages.events.foodFestival, title: "International Food Festival", text: "Celebrated every session to build awareness of world cuisines — recent editions featured Morocco, Qatar, Argentina, France, Croatia, and Portugal." },
  { icon: PartyPopper, image: siteImages.events.funfair, title: "Annual Funfair", text: "Game stalls run by teachers, local food stalls, live music — students, teachers, and parents together for an enriching community evening." },
  { icon: Moon, image: siteImages.events.eidMilan, title: "Eid Milan", text: "Faces gleaming with joy, the school decorated with colourful buntings — games, shared food, and bonds between students and teachers." },
  { icon: GraduationCap, image: siteImages.events.graduation, title: "Graduation Ceremony", text: "For freshly graduated Grade 10 and O Level students — a march past, the Managing Director's address, and speeches by two high achievers." },
  { icon: Sparkles, image: siteImages.events.farewellDinner, title: "Farewell", text: "A bittersweet evening of tears, good wishes, a dinner to remember, and the lady and lord of the evening — because school will always be their second home." },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow="School Life"
        title="Education must not simply teach work — it must teach life."
        description="W.E.B. Du Bois said it; we build the school year around it. Out of a tight academic schedule, we dedicate significant time to what students genuinely enjoy."
        crumbs={[{ label: "School Life" }]}
      />

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">The four houses</p>
          <h2 className="mt-3 text-display-md">Every Sapien belongs to a house.</h2>
          <p className="mt-3 max-w-2xl text-body-md text-navy-600">
            Each house stands for a fine blend of unique traits — together they represent the
            overall character of Sapiens, and all year they compete to be the champions.
          </p>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {houses.map((h) => (
            <Reveal key={h.name} className="rounded-lg border border-surface-border bg-surface-card p-6 text-center shadow-card transition-shadow hover:shadow-lifted">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy-900 text-gold-400"><h.icon className="size-6" /></span>
              <h3 className="mt-4 font-display text-xl font-bold text-navy-900">{h.name}</h3>
              <p className="mt-2 text-body-sm text-navy-500">{h.text}</p>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 rounded-lg bg-navy-900 p-8 text-white sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-gold-400">Club activities · held twice a year</p>
              <h3 className="mt-2 text-display-sm text-white">Four clubs, four ways to find your people.</h3>
              <p className="mt-2 max-w-xl text-body-sm text-navy-300">
                Small communities of students who share the same interests — building unity,
                teamwork, and sometimes the first spark of an unconventional career.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {clubs.map((c) => (
                <span key={c.name} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                  <c.icon className="size-4 text-gold-400" /> {c.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface-muted/60">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow">Co-curricular &amp; beyond</p>
            <h2 className="mt-3 text-display-md">A year packed with real activities.</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a, i) => (
              <Reveal key={a.title} className="overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card transition-shadow hover:shadow-lifted">
                <ImagePlaceholder icon={Trophy} src={a.image} alt={a.title} index={i} aspect="aspect-[16/10]" className="rounded-none" />
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{a.title}</h3>
                  <p className="mt-2 text-body-sm text-navy-500">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow text-gold-400">Traditions</p>
            <h2 className="mt-3 max-w-xl text-display-md">The moments that make the year.</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {traditions.map((t, i) => (
              <Reveal key={t.title} className="overflow-hidden rounded-lg bg-navy-800/60">
                <ImagePlaceholder icon={t.icon} src={t.image} alt={t.title} index={i} aspect="aspect-[16/10]" className="rounded-none" />
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-body-sm text-navy-300">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Testimonials />
      <GalleryPreview />
    </>
  );
}
