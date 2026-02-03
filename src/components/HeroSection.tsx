import { usePortfolio } from "@/lib/portfolioStore";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

// Get theme colors from CSS variables
const getThemeColor = (varName: string) => {
  if (typeof window === "undefined") return "142, 70%, 60%";
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || "142, 70%, 60%";
};

// Scramble decode effect for text with glitch
const ScrambleText = ({ text, delay, className = "" }: { text: string; delay: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let iteration = 0;
      const totalIterations = text.length * 2; // Faster animation
      
      const interval = setInterval(() => {
        const progress = Math.min(iteration / 2, text.length);
        const revealed = Math.floor(progress);
        
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) {
            result += text[i];
          } else if (text[i] === " ") {
            result += " ";
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(result);
        iteration++;
        
        // Random glitch during animation
        if (Math.random() > 0.85) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 50);
        }
        
        if (iteration >= totalIterations) {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, 15); // Faster speed
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return (
    <span className={`${className} ${isGlitching ? 'glitch-effect' : ''}`} data-text={displayText}>
      {displayText || text.replace(/./g, "█")}
    </span>
  );
};

const TypewriterText = ({
  text,
  delay,
  highlightKeywords,
}: {
  text: string;
  delay: number;
  highlightKeywords: string[];
}) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 20);
    
    return () => clearInterval(interval);
  }, [started, text]);

  const applyHighlights = (str: string) => {
    let result = str;
    highlightKeywords.forEach((keyword) => {
      if (!keyword) return;
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(escaped, "g"), `<span class=\"text-primary\">${keyword}</span>`);
    });
    return result;
  };

  return (
    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
      <span className="text-primary">$ </span>
      <span dangerouslySetInnerHTML={{ __html: applyHighlights(displayText) }} />
      {displayText.length < text.length && <span className="animate-pulse text-primary">▊</span>}
    </p>
  );
};

const HeroSection = () => {
  const { data } = usePortfolio();
  const { hero } = data;
  const [primaryGlow, setPrimaryGlow] = useState("142, 70%, 60%");
  const [primaryDark, setPrimaryDark] = useState("142, 70%, 45%");

  useEffect(() => {
    const updateColors = () => {
      setPrimaryGlow(getThemeColor("--neon-green-glow"));
      setPrimaryDark(getThemeColor("--primary"));
    };

    updateColors();
    
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
    phone: Phone,
    map: MapPin,
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full float opacity-60" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-primary/50 rounded-full float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-primary/70 rounded-full float" style={{ animationDelay: "2s" }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.5 }}
            className="mb-6"
          >
            <span className="status-online text-sm text-primary">
              <ScrambleText text={hero.statusText} delay={2.6} />
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-muted-foreground text-lg font-display">
              <ScrambleText text={hero.greeting} delay={2.7} />
            </span>
          </motion.div>

          {/* Animated Name */}
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 py-2">
            <motion.span 
              className="inline-block hero-name-glow text-primary"
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
            >
              {hero.firstName.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 2.9 + index * 0.08, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    color: `hsl(${primaryGlow})`,
                    textShadow: `0 0 30px hsl(${primaryGlow})`,
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
            <span className="inline-block w-4" />
            <motion.span 
              className="inline-block text-foreground"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.4, duration: 0.6 }}
            >
              {hero.lastName.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 3.5 + index * 0.1, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    color: `hsl(${primaryDark})`,
                    textShadow: `0 0 20px hsl(${primaryDark})`,
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-display mb-8"
          >
            <ScrambleText text={hero.rolePrefix} delay={3.8} />{" "}
            <span className="text-primary">
              <ScrambleText text={hero.roleEmphasis} delay={3.9} />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.9, duration: 0.6 }}
            className="terminal-window max-w-2xl mb-10"
          >
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-neon-amber" />
              <div className="terminal-dot bg-primary" />
              <span className="ml-4 text-xs text-muted-foreground">{hero.terminalLabel}</span>
            </div>
            <div className="p-4">
              <TypewriterText 
                text={hero.description}
                delay={4.0}
                highlightKeywords={hero.highlightKeywords}
              />
            </div>
          </motion.div>

          {/* CTA Buttons - Fixed for mobile in one line */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.6 }}
            className="flex gap-3 md:gap-4 mb-12"
          >
            <a
              href={hero.ctaLinks[0]?.href ?? "#contact"}
              className="flex-1 md:flex-none px-4 md:px-8 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 box-glow hover:scale-105 text-center text-sm md:text-base whitespace-nowrap"
            >
              {hero.ctaLinks[0]?.label ?? "Get In Touch"}
            </a>
            <a
              href={hero.ctaLinks[1]?.href ?? "#projects"}
              className="flex-1 md:flex-none px-4 md:px-8 py-3 border border-primary text-primary font-medium rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover text-center text-sm md:text-base whitespace-nowrap"
            >
              {hero.ctaLinks[1]?.label ?? "View Projects"}
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.1, duration: 0.6 }}
            className="flex items-center gap-6"
          >
            {hero.socialLinks.map((link) => {
              const Icon = socialIcons[link.icon as keyof typeof socialIcons];
              if (!Icon) return null;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
