import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "OneCode",
    role: "SD Intern",
    period: "May - August 2022",
    location: "Bangalore, India",
    url: "https://www.onecode.in/",
    responsibilities: [
      "Involved in all stages of software development lifecycle: development, debugging, and testing",
      "Architected and implemented the front-end of OneCode Falcon feature — an embeddable web application that lets users log in and add complete details to use company offers and services",
      "Contributed extensively to onecode-backend Project using Java framework SpringBoot",
      "Developed RESTful web-services in Java using SpringBoot",
      "Refactored ReactJS codebase to improve readability and maintainability",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">02.</span> Experience
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent ml-3" />
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center pulse-glow">
                <Building2 size={14} className="text-primary" />
              </div>

              <div className="ml-14 terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dot bg-destructive" />
                  <div className="terminal-dot bg-neon-amber" />
                  <div className="terminal-dot bg-primary" />
                  <span className="ml-4 text-xs text-muted-foreground">
                    work_history.log
                  </span>
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {exp.role}{" "}
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        @ {exp.company}
                        <ExternalLink size={14} />
                      </a>
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-primary" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-primary" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <motion.li
                        key={respIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + respIndex * 0.1,
                        }}
                        className="flex items-start gap-3 text-muted-foreground text-sm"
                      >
                        <span className="text-primary mt-1.5 shrink-0">▹</span>
                        <span>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
