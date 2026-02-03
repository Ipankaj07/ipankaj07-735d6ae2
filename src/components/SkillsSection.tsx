import { usePortfolio } from "@/lib/portfolioStore";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaAws,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJsSquare,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiExpress,
  SiFlutter,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillIcons: Record<string, React.ReactNode> = {
  React: <FaReact className="w-full h-full" />,
  JavaScript: <FaJsSquare className="w-full h-full" />,
  TypeScript: <SiTypescript className="w-full h-full" />,
  HTML5: <FaHtml5 className="w-full h-full" />,
  CSS3: <FaCss3Alt className="w-full h-full" />,
  "Tailwind CSS": <SiTailwindcss className="w-full h-full" />,
  Flutter: <SiFlutter className="w-full h-full" />,
  "Node.js": <FaNodeJs className="w-full h-full" />,
  "Express.js": <SiExpress className="w-full h-full" />,
  MongoDB: <SiMongodb className="w-full h-full" />,
  MySQL: <SiMysql className="w-full h-full" />,
  Java: <FaJava className="w-full h-full" />,
  SpringBoot: <SiSpringboot className="w-full h-full" />,
  Git: <FaGitAlt className="w-full h-full" />,
  GitHub: <FaGithub className="w-full h-full" />,
  AWS: <FaAws className="w-full h-full" />,
  Docker: <FaDocker className="w-full h-full" />,
  "VS Code": <VscVscode className="w-full h-full" />,
  Postman: <SiPostman className="w-full h-full" />,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = usePortfolio();
  const { skills } = data;
  const renderSkillIcon = (skill: string) => {
    if (skillIcons[skill]) return skillIcons[skill];
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 text-xs text-primary">
        {skill.slice(0, 2).toUpperCase()}
      </span>
    );
  };

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">{skills.sectionLabel}</span> {skills.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
              className="card-cyber p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-primary rounded-full pulse-glow" />
                <h3 className="text-sm tracking-wider text-primary font-semibold">
                  {category.title}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="group flex flex-col items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative w-14 h-14 flex items-center justify-center text-muted-foreground/60 group-hover:text-primary transition-all duration-300">
                      {/* Icon with theme color */}
                      <motion.div 
                        className="w-10 h-10"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderSkillIcon(skill)}
                      </motion.div>
                      {/* Glow ring on hover */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center font-medium">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Width Tech Marquee - Outside container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 overflow-hidden border-y border-border py-6 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        style={{ overflowX: 'hidden' }}
      >
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {skills.marquee.map((tech, index) => (
                <span
                  key={`${i}-${index}`}
                  className="mx-12 text-3xl md:text-4xl font-bold text-muted-foreground/20 hover:text-primary/50 transition-colors duration-300 tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
