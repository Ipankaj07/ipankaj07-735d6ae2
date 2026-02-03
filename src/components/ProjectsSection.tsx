import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, ExternalLink, Folder } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePortfolio } from "@/lib/portfolioStore";
import type { PortfolioData } from "@/lib/portfolioConfig";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skeletonMode, setSkeletonMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioData["projects"]["items"][number] | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const { data } = usePortfolio();
  const { projects } = data;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        setSkeletonMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setSkeletonMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">{projects.sectionLabel}</span> {projects.heading}
          </h2>
          <p className="hidden md:block text-sm text-muted-foreground mt-2">
            {projects.hint.split(" ").map((word, index) =>
              word.toLowerCase() === "space" ? (
                <kbd
                  key={`${word}-${index}`}
                  className={`px-2 py-1 bg-primary/20 border border-primary/30 rounded text-primary text-xs${
                    index === 0 ? "" : " ml-1"
                  }`}
                >
                  {word}
                </kbd>
              ) : (
                <span key={`${word}-${index}`} className={index === 0 ? "" : "ml-1"}>
                  {word}
                </span>
              )
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.items.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className={`terminal-window group hover:border-primary/50 transition-all duration-300 card-hover relative cursor-pointer ${
                skeletonMode ? "skeleton-mode" : ""
              }`}
            >
              {/* Skeleton overlay */}
              {skeletonMode && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Corner markers - now using primary green */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary animate-pulse" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary animate-pulse" />
                  
                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-px bg-primary animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-primary animate-pulse" />
                  </div>
                  
                  {/* Dimension labels */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-primary font-mono">
                    {`<div.project-${index + 1}>`}
                  </div>
                </div>
              )}

              <div className="terminal-header">
                <div className="terminal-dot bg-destructive" />
                <div className="terminal-dot bg-neon-amber" />
                <div className="terminal-dot bg-primary" />
                <div className="ml-auto flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={projects.viewSourceAriaLabel}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={projects.viewLiveAriaLabel}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4 md:p-5">
                <Folder size={32} className="text-primary mb-3 md:mb-4 md:w-10 md:h-10" />
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <li
                      key={tech}
                      className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 border border-primary/30 text-primary rounded-sm bg-primary/5"
                    >
                      {tech}
                    </li>
                  ))}
                  {project.tech.length > 3 && (
                    <li className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 text-muted-foreground">
                      +{project.tech.length - 3}
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href={projects.viewMore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover"
          >
            <Github size={18} />
            {projects.viewMore.label}
          </a>
        </motion.div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="terminal-window border-primary/30 max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <Folder size={24} className="text-primary" />
                <DialogTitle className="text-xl text-primary">{selectedProject?.title}</DialogTitle>
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Project Preview Image */}
              {selectedProject?.image && !imageError[selectedProject.title] && (
                <div className="rounded-md overflow-hidden border border-primary/20">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    className="w-full h-auto object-cover"
                    onError={() => setImageError(prev => ({ ...prev, [selectedProject.title]: true }))}
                  />
                </div>
              )}
              
              <p className="text-muted-foreground leading-relaxed">
                {selectedProject?.description}
              </p>
              
              <div>
                <h4 className="text-sm text-primary mb-2 font-mono">{projects.modalTechLabel}</h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedProject?.tech.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs px-2 py-1 border border-primary/30 text-primary rounded-sm bg-primary/5"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-border">
                {selectedProject?.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-sm hover:bg-primary/10 transition-colors"
                  >
                    <Github size={16} />
                    {projects.viewCodeLabel}
                  </a>
                )}
                {selectedProject?.external && (
                  <a
                    href={selectedProject.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink size={16} />
                    {projects.liveDemoLabel}
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
