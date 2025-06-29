import { CTASection } from "./CTASection";
import { FeaturesSection } from "./FeaturesSection";
import { FloatingBubbles } from "./FloatingBubbles";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { MouseGradient } from "./MouseGradient";
import { TechStack } from "./TechStack";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
      
      {/* Animated background elements */}
      <MouseGradient />
      <FloatingBubbles />
      
      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TechStack />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default Landing;