import About from "@/components/About";
import Contact from "@/components/Contact";
import Domain from "@/components/Domain";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Intro from "@/components/Intro";
import Journey from "@/components/Journey";
import OffDuty from "@/components/OffDuty";
import SiteHeader from "@/components/SiteHeader";
import Work from "@/components/Work";
import { site, siteUrl } from "@/content/site";

// Public information only: no email or phone in structured data.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: site.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Dwarkadas J. Sanghvi College of Engineering" },
  address: { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "IN" },
  knowsAbout: ["Product analytics", "SQL", "Tableau", "Power BI", "Python", "AdTech", "Lead generation", "Automation"],
  sameAs: [site.contact.linkedin],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Intro />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Impact />
        <Work />
        <Domain />
        <OffDuty />
        <Contact />
      </main>
    </>
  );
}
