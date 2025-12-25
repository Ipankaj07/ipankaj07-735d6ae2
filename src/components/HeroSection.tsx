import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const HeroSection = () => {
  const firstName = "Pankaj";
  const lastName = "Raj";

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
              STATUS: OPEN TO OPPORTUNITIES
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
              Hello, I'm
            </span>
          </motion.div>

          {/* Animated Name */}
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 overflow-hidden">
            <motion.span 
              className="inline-block hero-name-glow text-primary"
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
            >
              {firstName.split("").map((letter, index) => (
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
                    color: "hsl(142, 70%, 60%)",
                    textShadow: "0 0 30px hsl(142, 70%, 60%)",
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
              {lastName.split("").map((letter, index) => (
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
                    color: "hsl(142, 70%, 45%)",
                    textShadow: "0 0 20px hsl(142, 70%, 45%)",
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
            Full-Stack <span className="text-primary">Developer</span>
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
              <span className="ml-4 text-xs text-muted-foreground">about.sh</span>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                <span className="text-primary">$ </span>
                2+ years of experience building scalable web applications with
                <span className="text-primary"> React</span>,
                <span className="text-primary"> Node.js</span>,
                <span className="text-primary"> AWS</span>, and
                <span className="text-primary"> Flutter</span>. Currently at ValuEnable, 
                architecting insurance solutions used by 2,000+ companies including 
                Axis Max Life & Bajaj Allianz.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contact"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 box-glow hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border border-primary text-primary font-medium rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover"
            >
              View Projects
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.1, duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com/Ipankaj07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ipankaj07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:praj4936@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a
              href="tel:+917644061508"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110"
              aria-label="Phone"
            >
              <Phone size={24} />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest">SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;