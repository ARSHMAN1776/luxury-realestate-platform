import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";

export default function ContactPage() {
  return (
    <main>
      <div className="pt-24 sm:pt-28" />
      <Contact />
      <FAQ />
      <Newsletter />
    </main>
  );
}
