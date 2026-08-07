import { siteImages } from "@/lib/site-images";

export type GalleryAlbum = { id: string; name: string };
export type GalleryImage = {
  id: string;
  album: string;
  caption: string;
  aspect: "square" | "tall" | "wide";
  url?: string;
};

export const galleryAlbums: GalleryAlbum[] = [
  { id: "campus", name: "Campus" },
  { id: "art", name: "Art & Design" },
  { id: "events", name: "Events" },
  { id: "activities", name: "Activities" },
  { id: "labs", name: "Science & Labs" },
];

const g = siteImages.gallery;
const f = siteImages.facilities;
const e = siteImages.events;
const c = siteImages.campuses;

export const galleryImages: GalleryImage[] = [
  // Campus
  { id: "campus-0", album: "campus", caption: "Flagship Campus, Adyala Road", aspect: "wide", url: c.flagship },
  { id: "campus-1", album: "campus", caption: "Bahria Campus, Phase 7", aspect: "wide", url: c.bahria },
  { id: "campus-2", album: "campus", caption: "Purpose-built campus", aspect: "square", url: f.campus },
  { id: "campus-3", album: "campus", caption: "Multiple playgrounds", aspect: "tall", url: f.playgrounds },
  { id: "campus-4", album: "campus", caption: "Comprehensive library", aspect: "square", url: f.library },
  { id: "campus-5", album: "campus", caption: "Swimming pool & gym", aspect: "wide", url: f.pool },
  { id: "campus-6", album: "campus", caption: "CCTV monitoring & security", aspect: "square", url: f.cctv },
  { id: "campus-7", album: "campus", caption: "Latest computer labs", aspect: "tall", url: f.computerLabs },
  // Art & Design
  { id: "art-0", album: "art", caption: "Art club at work", aspect: "square", url: g.artClub1 },
  { id: "art-1", album: "art", caption: "Creative studio session", aspect: "tall", url: g.artClub2 },
  { id: "art-2", album: "art", caption: "Art & design showcase", aspect: "wide", url: g.artDesign1 },
  { id: "art-3", album: "art", caption: "Student artwork on display", aspect: "square", url: g.artDesign2 },
  { id: "art-4", album: "art", caption: "Annual art exhibition", aspect: "wide", url: g.artExhibition1 },
  { id: "art-5", album: "art", caption: "Exhibition walkthrough", aspect: "tall", url: g.artExhibition2 },
  { id: "art-6", album: "art", caption: "Gallery wall", aspect: "square", url: g.artExhibition3 },
  // Events
  { id: "events-0", album: "events", caption: "Annual bonfire night", aspect: "wide", url: e.bonfire },
  { id: "events-1", album: "events", caption: "International Food Festival", aspect: "wide", url: e.foodFestival },
  { id: "events-2", album: "events", caption: "Farewell for the graduating class", aspect: "square", url: e.farewell },
  // Activities
  { id: "activities-0", album: "activities", caption: "Career day", aspect: "square", url: g.careerDay1 },
  { id: "activities-1", album: "activities", caption: "Career day presentations", aspect: "wide", url: g.careerDay2 },
  { id: "activities-2", album: "activities", caption: "Guest speaker session", aspect: "tall", url: g.careerDay3 },
  { id: "activities-3", album: "activities", caption: "Inter-house competitions", aspect: "square", url: g.competitions1 },
  { id: "activities-4", album: "activities", caption: "Competition day", aspect: "wide", url: g.competitions2 },
  // Science & Labs
  { id: "labs-0", album: "labs", caption: "Science exhibition projects", aspect: "square", url: g.scienceExpo1 },
  { id: "labs-1", album: "labs", caption: "Young scientists presenting", aspect: "wide", url: g.scienceExpo2 },
  { id: "labs-2", album: "labs", caption: "Computer lab session", aspect: "tall", url: f.computerLabs },
  // School life
  { id: "life-0", album: "activities", caption: "Sports Week — march past", aspect: "wide", url: siteImages.schoolLife.sportsWeek2 },
  { id: "life-1", album: "activities", caption: "Sports Week — the houses compete", aspect: "square", url: siteImages.schoolLife.sportsWeek3 },
  { id: "life-2", album: "activities", caption: "Martial arts training", aspect: "tall", url: siteImages.schoolLife.martialArts },
  { id: "life-3", album: "activities", caption: "School elections", aspect: "square", url: siteImages.schoolLife.elections },
  { id: "life-4", album: "activities", caption: "Hiking trip, Grade 7 onwards", aspect: "wide", url: siteImages.schoolLife.hikingTrips },
  { id: "life-5", album: "activities", caption: "Swimming session", aspect: "square", url: siteImages.schoolLife.swimmingSession },
  { id: "life-6", album: "activities", caption: "Music & drama class", aspect: "tall", url: siteImages.schoolLife.musicDrama },
  { id: "life-7", album: "events", caption: "Annual funfair", aspect: "wide", url: siteImages.events.funfair },
  { id: "life-8", album: "events", caption: "Eid Milan", aspect: "square", url: siteImages.events.eidMilan },
  { id: "life-9", album: "events", caption: "Graduation ceremony", aspect: "wide", url: siteImages.events.graduation },
  { id: "life-10", album: "events", caption: "Annual sports ceremony", aspect: "square", url: siteImages.events.sportsCeremony },
  { id: "life-11", album: "labs", caption: "Research project presentations", aspect: "wide", url: siteImages.schoolLife.researchProject },
  { id: "life-12", album: "labs", caption: "Eco projects", aspect: "square", url: siteImages.schoolLife.ecoProjects },
];
