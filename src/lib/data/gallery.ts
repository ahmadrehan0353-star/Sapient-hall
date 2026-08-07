export type GalleryAlbum = { id: string; name: string };
export type GalleryImage = {
  id: string;
  album: string;
  caption: string;
  aspect: "square" | "tall" | "wide";
};

export const galleryAlbums: GalleryAlbum[] = [
  { id: "campus", name: "Campus" },
  { id: "classrooms", name: "Classrooms" },
  { id: "sports", name: "Sports" },
  { id: "events", name: "Events" },
  { id: "labs", name: "Laboratories" },
];

const aspects: GalleryImage["aspect"][] = ["square", "tall", "wide", "square", "tall", "wide"];
const captions: Record<string, string[]> = {
  campus: ["Main building, Flagship Campus", "Bahria Campus entrance", "Morning assembly grounds", "Campus gardens", "Library exterior", "Playground at break time"],
  classrooms: ["Primary classroom in session", "Early-years learning corner", "Group project work", "Reading period", "Middle-years lesson", "Art class"],
  sports: ["Inter-house cricket final", "Swimming session", "Football practice", "Sports week march-past", "Badminton court", "Athletics day"],
  events: ["International Food Festival stalls", "Bonfire night performances", "Science exhibition", "Farewell evening", "Prize distribution", "Cultural day"],
  labs: ["Chemistry practical", "Computer lab session", "Physics apparatus", "Biology dissection demo", "Robotics club", "Lab safety briefing"],
};

export const galleryImages: GalleryImage[] = Object.entries(captions).flatMap(([album, caps]) =>
  caps.map((caption, i) => ({
    id: `${album}-${i}`,
    album,
    caption,
    aspect: aspects[i % aspects.length]!,
  }))
);
