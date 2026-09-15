import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyB4B } from "@/components/sections/why-b4b";
import { SelectedWork } from "@/components/sections/selected-work";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <WhyB4B />
      <SelectedWork />
    </main>
  );
}
