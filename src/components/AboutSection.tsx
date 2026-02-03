import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Music, Plane, MapPin, Gamepad2 } from "lucide-react";
import { usePortfolio } from "@/lib/portfolioStore";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = usePortfolio();
  const { about } = data;
  const interestIcons = {
    code: Code,
    music: Music,
    plane: Plane,
    gamepad: Gamepad2,
  };

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">{about.sectionLabel}</span> {about.heading}
          </h2>
        </motion.div>

        <div className="grid gap-12 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dot bg-destructive" />
                  <div className="terminal-dot bg-neon-amber" />
                  <div className="terminal-dot bg-primary" />
                  <span className="ml-4 text-xs text-muted-foreground">{about.terminalLabel}</span>
                </div>
                <div className="p-6 flex flex-col sm:flex-row gap-6">
                {/* Agent Style Photo - visible on all screens */}
                <div className="flex-shrink-0 self-center sm:self-start">
                  <div className="relative w-24 h-28">
                    {/* Scanning corners */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
                    {/* Photo */}
                    <img
                      src={about.image.src}
                      alt={about.image.alt}
                      className="w-full h-full object-cover grayscale"
                    />
                    {/* Overlay scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
                    {/* ID text */}
                    <div className="absolute -bottom-4 left-0 right-0 text-center">
                      <span className="text-[8px] text-primary font-mono tracking-widest">
                        {about.image.idLabel}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Bio content */}
                <div className="space-y-4 text-muted-foreground flex-1 mt-4 sm:mt-0">
                  {about.bioParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`leading-relaxed ${index === 0 ? "typewriter-text" : ""}`}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <MapPin size={16} className="text-primary" />
              <span>{about.location}</span>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-sm text-primary mb-4 tracking-wider">{about.interestsLabel}</h3>
              <div className="flex flex-wrap gap-3">
                {about.interests.map((interest) => {
                  const Icon = interestIcons[interest.icon as keyof typeof interestIcons];
                  if (!Icon) return null;
                  return (
                    <div
                      key={interest.label}
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-secondary/30 hover:border-primary/50 transition-colors duration-300"
                    >
                      <Icon size={16} className="text-primary" />
                      <span className="text-sm text-foreground">{interest.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
