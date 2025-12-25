import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Music, Plane, MapPin, Gamepad2 } from "lucide-react";

const interests = [
  { icon: Code, label: "Explore Tech" },
  { icon: Music, label: "Music" },
  { icon: Plane, label: "Travelling" },
  { icon: Gamepad2, label: "Gaming" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">01.</span> About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-destructive" />
                <div className="terminal-dot bg-neon-amber" />
                <div className="terminal-dot bg-primary" />
                <span className="ml-4 text-xs text-muted-foreground">bio.md</span>
              </div>
              <div className="p-6 space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Hello! I'm <span className="text-primary font-semibold">Pankaj</span>, 
                  a Full-Stack Developer with <span className="text-primary">2+ years</span> of 
                  experience building scalable web applications and cross-platform solutions.
                </p>
                <p className="leading-relaxed">
                  Currently at <span className="text-primary">ValuEnable</span>, I architected 
                  the <span className="text-primary">Content Engine</span> from scratch — a 
                  policy retention platform now used by <span className="text-primary">2,000+ places</span> including 
                  top Indian insurers like Axis Max Life, ABSLI, and Bajaj Allianz Life.
                </p>
                <p className="leading-relaxed">
                  I specialize in <span className="text-primary">React</span>, 
                  <span className="text-primary"> Node.js</span>, 
                  <span className="text-primary"> AWS</span> (S3, EC2, Lambda, DynamoDB), and 
                  <span className="text-primary"> Flutter</span>. I've built WhatsApp bots, 
                  optimized 200K+ report downloads, and mentored junior developers.
                </p>
                <p className="leading-relaxed">
                  Graduate of <span className="text-primary">Masai School</span> (Full-Stack Web Dev, Grade A) 
                  and <span className="text-primary">Maharshi Dayanand University</span> (B.Tech CSE, 2024).
                </p>
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
              <span>India (Remote)</span>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-sm text-primary mb-4 tracking-wider">INTERESTED_IN:</h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <div
                    key={interest.label}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-secondary/30 hover:border-primary/50 transition-colors duration-300"
                  >
                    <interest.icon size={16} className="text-primary" />
                    <span className="text-sm text-foreground">{interest.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="relative group">
              {/* Image Container */}
              <div className="relative rounded-sm overflow-hidden border border-primary/30 box-glow">
                <img
                  src="https://pankaj-raj.vercel.app/static/1a54191bfe81380550be08e0025794ca/25f3c/2p88zt9c.jpg"
                  alt="Pankaj Raj - Full Stack Developer"
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-500" />
              </div>
              
              {/* Decorative Border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary rounded-sm -z-10" />
              
              {/* Status Badge */}
              <div className="absolute -top-3 -left-3 px-3 py-1 bg-card border border-primary rounded-sm text-xs">
                <span className="text-primary">DEVELOPER_STATUS: ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
