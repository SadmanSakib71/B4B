import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyB4B } from "@/components/sections/why-b4b";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <WhyB4B />
    </main>
  );
}
