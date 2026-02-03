import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { usePortfolio } from "@/lib/portfolioStore";

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = usePortfolio();
  const { education } = data;
  const iconMap = {
    graduation: GraduationCap,
    award: Award,
  };

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">{education.sectionLabel}</span> {education.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.items.map((edu, index) => {
            const IconComponent = iconMap[edu.icon as keyof typeof iconMap] ?? GraduationCap;
            return (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="terminal-window group hover:border-primary/50 transition-all duration-300"
              >
                <div className="terminal-header">
                  <div className="terminal-dot bg-destructive" />
                <div className="terminal-dot bg-neon-amber" />
                <div className="terminal-dot bg-primary" />
                <span className="ml-4 text-xs text-muted-foreground">
                  {education.terminalLabel}
                </span>
                </div>

                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={24} className="text-primary" />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {edu.institution}
                  </h3>
                  
                  <p className="text-sm text-primary mb-3">{edu.degree}</p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      <span>{edu.location}</span>
                    </div>
                    {edu.grade && (
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-primary" />
                        <span className="text-primary">{edu.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
