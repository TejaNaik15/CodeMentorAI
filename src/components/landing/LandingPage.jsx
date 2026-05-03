import HeroSection from './Index';
import AboutSection from './AboutSection';
import FeaturedVideoSection from './FeaturedVideoSection';
import PhilosophySection from './PhilosophySection';
import ServicesSection from './ServicesSection';

export default function LandingPage() {
  return (
    <div className="bg-black">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  );
}
