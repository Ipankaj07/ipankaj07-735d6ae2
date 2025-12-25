import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Folder } from "lucide-react";

const projects = [
  {
    title: "Groww Clone",
    description:
      "A clone of Groww web application built with a team of 6 members over 5 days. Features include stock search, detailed stock information, graphs of stock prices, SIP amount setting, and OTP mail verification.",
    tech: ["EJS", "CSS", "JavaScript", "MongoDB", "ExpressJS"],
    github: "https://github.com/taherahmed14/Groww_Full-Stack_Project",
    external: "https://groww-project.herokuapp.com/home",
    featured: true,
  },
  {
    title: "Nike Clone",
    description:
      "A front-end clone of Nike.com where users can browse and purchase dummy Nike products with dummy payment validation functionality.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Ipankaj07/Nike-clone",
    external: "https://ipankaj07.github.io/Nike-clone/",
    featured: true,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">03.</span> Projects
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24">
          {projects.filter((p) => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="relative"
            >
              <div className={`grid md:grid-cols-12 gap-4 items-center ${index % 2 === 1 ? "md:text-right" : ""}`}>
                {/* Project Info */}
                <div className={`md:col-span-7 relative z-10 ${index % 2 === 1 ? "md:col-start-6 md:order-2" : ""}`}>
                  <div className="mb-2">
                    <span className="text-primary text-sm tracking-wider">
                      FEATURED_PROJECT
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {project.title}
                  </h3>

                  <div className="terminal-window mb-4">
                    <div className="terminal-header">
                      <div className="terminal-dot bg-destructive" />
                      <div className="terminal-dot bg-neon-amber" />
                      <div className="terminal-dot bg-primary" />
                      <span className="ml-4 text-xs text-muted-foreground">
                        README.md
                      </span>
                    </div>
                    <p className="p-4 text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <ul className={`flex flex-wrap gap-3 mb-6 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="text-xs px-3 py-1 border border-primary/30 text-primary rounded-sm bg-primary/5"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className={`flex gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label="View source code on GitHub"
                      >
                        <Github size={22} />
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label="View live project"
                      >
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Ipankaj07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover"
          >
            <Folder size={18} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
