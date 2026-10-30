import { work, workIntro } from "@/content/work";
import { isVisible } from "@/lib/flags";
import SectionHeading from "./SectionHeading";
import WorkAccordion from "./WorkAccordion";

export default function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading id="work-title" {...workIntro} />
        <WorkAccordion items={work.filter(isVisible)} />
      </div>
    </section>
  );
}
