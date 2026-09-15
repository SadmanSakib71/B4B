import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyB4B } from "@/components/sections/why-b4b";
import { SelectedWork } from "@/components/sections/selected-work";
import { Process } from "@/components/sections/process";
import { Technology } from "@/components/sections/technology";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <WhyB4B />
      <SelectedWork />
      <Process />
      <Technology />
      <About />
    </main>
  );
}
