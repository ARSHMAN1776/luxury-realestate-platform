import { Hero } from "@/components/sections/Hero";
import { Discovery } from "@/components/sections/Discovery";
import { Featured } from "@/components/sections/Featured";
import { Categories } from "@/components/sections/Categories";
import { Showcase } from "@/components/sections/Showcase";
import { Lifestyle } from "@/components/sections/Lifestyle";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Discovery />
      <Featured />
      <Categories />
      <Showcase />
      <Lifestyle />
    </main>
  );
}
