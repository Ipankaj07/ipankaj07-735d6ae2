import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Pankaj Raj | Full-Stack Web Developer</title>
      <meta 
        name="description" 
        content="Pankaj Raj - Full-Stack Web Developer specializing in React, Node.js, and MongoDB. Building exceptional digital experiences with clean, maintainable code." 
      />

      {/* Boot Sequence */}
      <AnimatePresence mode="wait">
        {!bootComplete && (
          <BootSequence onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`min-h-screen bg-background ${bootComplete ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        {/* Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none scanlines z-40" />
        
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
