import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Programs } from "@/components/sections/Programs";
import { CampusHighlights } from "@/components/sections/CampusHighlights";
import { PrincipalMessage } from "@/components/sections/PrincipalMessage";
import { FacilitiesPreview } from "@/components/sections/FacilitiesPreview";
import { Achievements } from "@/components/sections/Achievements";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Programs />
      <CampusHighlights />
      <PrincipalMessage />
      <FacilitiesPreview />
      <Achievements />
      <Testimonials />
      <NewsPreview />
      <EventsPreview />
      <GalleryPreview />
      <AdmissionsCTA />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
