import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <main id="main-content">
      <Section as="div" className="flex min-h-svh items-center">
        <Container>
          <p className="text-muted text-sm font-medium tracking-[0.2em] uppercase">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
            {siteConfig.description}
          </p>
        </Container>
      </Section>
    </main>
  );
}
