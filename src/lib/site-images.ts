/**
 * Real assets served from the school's own domain (www.sapienthall.edu.pk).
 * The school owns these images; hotlinking its own media library keeps a
 * single source of truth. When photography moves to Cloudinary, only the
 * URLs in this file need to change.
 */
const CDN = "https://www.sapienthall.edu.pk/wp-content/uploads";

export const siteImages = {
  logo: "/images/logo-web-01-2.png",

  campuses: {
    flagship: "/images/dsc0913222-scaled-e1749632267458.jpg",
    bahria: "/images/dji-0056-scaled-e1749632195223.jpg",
  },

  facilities: {
    campus: "/images/home1.jpg",
    computerLabs: "/images/home3.jpg",
    teaching: "/images/home4.jpg",
    pool: "/images/home5.jpg",
    cctv: "/images/home6.jpg",
    library: "/images/home7.jpg",
    playgrounds: "/images/home8.jpg",
  },

  events: {
    farewell: "/images/whatsapp-image-2024-03-13-at-11.40.17-2b4a583e.jpg",
    farewellDinner: "/images/278754097-7380312258676850-5747109444039201257-n-copy.jpg",
    foodFestival: "/images/dji-0053-scaled.jpg",
    foodFestivalStalls: "/images/pg-31-scaled.jpg",
    bonfire: "/images/whatsapp-image-2024-03-13-at-11.41.08-fdb29abb.jpg",
    bonfireNight: "/images/dsc02685-scaled.jpg",
    funfair: "/images/dsc02114-scaled.jpg",
    sportsCeremony: "/images/dsc05661-scaled.jpg",
    eidMilan: "/images/pg-30-scaled.jpg",
    graduation: "/images/pg-32-scaled.jpg",
  },

  schoolLife: {
    careerDay: "/images/career-day-copy.jpg",
    competitions: "/images/dsc02151-scaled.jpg",
    exhibitions: "/images/dsc06181-scaled.jpg",
    ecoProjects: "/images/img-20220425-wa0003.jpg",
    researchProject: "/images/dsc1139-scaled.jpg",
    artAndDesign: "/images/dsc02896-scaled.jpg",
    clubs: "/images/pg-28-club-scaled.jpg",
    specialDays: "/images/20220121-120638-scaled.jpg",
    sportsWeek1: "/images/dsc00772-2-scaled.jpg",
    sportsWeek2: "/images/dsc05709-scaled.jpg",
    sportsWeek3: "/images/dsc05241-scaled.jpg",
    martialArts: "/images/dsc05944-scaled.jpg",
    elections: "/images/pg-28-scaled.jpg",
    fieldTrips: "/images/pg-28-field-trip.jpeg",
    hikingTrips: "/images/277175557-7315309685177108-4978253362333854191-n.jpg",
    funDays: "/images/pg-292-copy-scaled.jpg",
    physicalEducation: "/images/pg-26-scaled.jpg",
    swimmingSession: "/images/dsc0533-scaled.jpg",
    musicDrama: "/images/dsc06955-scaled.jpg",
    fireDrill: "/images/dsc08235-scaled.jpg",
  },

  gallery: {
    artClub1: "/images/art-club-1-scaled.jpg",
    artClub2: "/images/art-club-scaled.jpg",
    artDesign1: "/images/2019-10-16-01-45-img-5590-scaled.jpg",
    artDesign2: "/images/2019-10-16-01-53-img-5624-scaled.jpg",
    artExhibition1: "/images/dsc02873-scaled.jpg",
    artExhibition2: "/images/dsc02885-scaled.jpg",
    artExhibition3: "/images/dsc02898-scaled.jpg",
    careerDay1: "/images/career-day.jpg",
    careerDay2: "/images/dsc00843-scaled.jpg",
    careerDay3: "/images/dsc00859-scaled.jpg",
    competitions1: "/images/dsc02151-scaled.jpg",
    competitions2: "/images/dsc06291-scaled.jpg",
    scienceExpo1: "/images/img-20171030-wa0034.jpg",
    scienceExpo2: "/images/img-20171030-wa0152.jpg",
  },
} as const;
