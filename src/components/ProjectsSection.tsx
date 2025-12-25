import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, ExternalLink, Folder } from "lucide-react";

const projects = [
  {
    title: "Groww Clone",
    description:
      "A clone of Groww web application built with a team of 6 members over 5 days. Features include stock search, detailed stock information, graphs of stock prices, SIP amount setting, and OTP mail verification.",
    tech: ["EJS", "CSS", "JavaScript", "MongoDB", "ExpressJS"],
    github: "https://github.com/taherahmed14/Groww_Full-Stack_Project",
    external: "https://groww-project.herokuapp.com/home",
  },
  {
    title: "Nike Clone",
    description:
      "A front-end clone of Nike.com where users can browse and purchase dummy Nike products with dummy payment validation functionality.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Ipankaj07/Nike-clone",
    external: "https://ipankaj07.github.io/Nike-clone/",
  },
  {
    title: "GitHub User Search",
    description:
      "Search any GitHub user by name, location, or company. View detailed profiles, repositories, and contribution stats with a clean interface.",
    tech: ["React", "GitHub API", "CSS"],
    github: "https://github.com/Ipankaj07/github-uzer",
    external: null,
  },
  {
    title: "Imgur Giphy",
    description:
      "GIF search application powered by Giphy API. Search any GIF from the internet with an interface inspired by Imgur.",
    tech: ["React", "Giphy API", "CSS"],
    github: "https://github.com/Ipankaj07/imgur-giphy",
    external: null,
  },
  {
    title: "YouTube Clone",
    description:
      "YouTube clone using Google Console API to fetch real YouTube data. Features homepage similar to YouTube with video search and playback functionality.",
    tech: ["React", "YouTube API", "Google Console", "CSS"],
    github: "https://github.com/Ipankaj07/Youtube",
    external: null,
  },
  {
    title: "Weather App",
    description:
      "Weather application with 7-day forecast. Search for multiple locations and view detailed weather information including temperature, humidity, and conditions.",
    tech: ["React", "Weather API", "CSS"],
    github: "https://github.com/Ipankaj07/weather-app",
    external: null,
  },
  {
    title: "File Uploader",
    description:
      "Upload files and get live URLs to access them anywhere. Supports files up to 100MB with instant shareable links.",
    tech: ["React", "Node.js", "Cloud Storage"],
    github: "https://github.com/Ipankaj07/file-uploader",
    external: null,
  },
  {
    title: "Postman Clone",
    description:
      "A Postman clone that replicates core Postman features. Test APIs, send requests, and view responses with a familiar interface.",
    tech: ["React", "Axios", "JavaScript"],
    github: "https://github.com/Ipankaj07/postman-clone",
    external: null,
  },
  {
    title: "The Platinum Portfolio",
    description:
      "Creative portfolio website for the character 'The Professor' from Money Heist (Netflix). A unique themed portfolio concept.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Ipankaj07/the-platinum",
    external: null,
  },
  {
    title: "Apartment Flats Manager",
    description:
      "View available apartments and hotels at searched locations. Browse details, check availability, and book accommodations.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Ipankaj07/Apartment-Flats-Manager",
    external: null,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skeletonMode, setSkeletonMode] = useState(false);

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
          <p className="text-sm text-muted-foreground mt-2">
            Press <kbd className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-primary text-xs">Space</kbd> for skeleton view
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              className={`terminal-window group hover:border-primary/50 transition-all duration-300 card-hover relative ${
                skeletonMode ? "skeleton-mode" : ""
              }`}
            >
              {/* Skeleton overlay */}
              {skeletonMode && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan animate-pulse" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan animate-pulse" />
                  
                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-px bg-neon-cyan animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-neon-cyan animate-pulse" />
                  </div>
                  
                  {/* Dimension labels */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-neon-cyan font-mono">
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
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View source code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View live project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5">
                <Folder size={40} className="text-primary mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs px-2 py-1 border border-primary/30 text-primary rounded-sm bg-primary/5"
                    >
                      {tech}
                    </li>
                  ))}
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
            href="https://github.com/Ipankaj07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover"
          >
            <Github size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
