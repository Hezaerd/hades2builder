import { Footer } from "@/components/nav/footer";
import {
  CtaSection,
  DemoSection,
  FeaturesSection,
  HeroSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
