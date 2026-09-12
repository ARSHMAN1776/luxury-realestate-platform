import { Legacy } from "@/components/sections/Legacy";
import { Services } from "@/components/sections/Services";
import { Agents } from "@/components/sections/Agents";
import { Testimonials } from "@/components/sections/Testimonials";
import { CaseStudies } from "@/components/sections/CaseStudies";

export default function AboutPage() {
  return (
    <main>
      <Legacy />
      <Services />
      <Agents />
      <Testimonials />
      <CaseStudies />
    </main>
  );
}
