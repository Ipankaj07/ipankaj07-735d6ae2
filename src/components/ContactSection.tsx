import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.toLowerCase().trim();
    
    if (cmd === "email" || cmd === "mail") {
      window.location.href = "mailto:praj4936@gmail.com";
    } else if (cmd === "call" || cmd === "phone") {
      window.location.href = "tel:+917644061508";
    } else if (cmd === "linkedin") {
      window.open("https://www.linkedin.com/in/ipankaj07/", "_blank");
    } else if (cmd === "github") {
      window.open("https://github.com/Ipankaj07", "_blank");
    } else if (cmd === "help") {
      toast({
        title: "Available Commands",
        description: "email, call, linkedin, github, help",
      });
    } else {
      toast({
        title: "Unknown Command",
        description: "Type 'help' for available commands",
        variant: "destructive",
      });
    }
    setInputValue("");
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">05.</span> Contact
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
          >
            Get In Touch
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 text-lg"
          >
            Although I'm not currently looking for any new opportunities, my inbox is 
            always open. Whether you have a question or just want to say hi, I'll try 
            my best to get back to you!
          </motion.p>

          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="terminal-window text-left mb-10"
          >
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-neon-amber" />
              <div className="terminal-dot bg-primary" />
              <span className="ml-4 text-xs text-muted-foreground">
                pankaj_contact — zsh
              </span>
            </div>

            <div className="p-6 space-y-3">
              <div className="text-muted-foreground text-sm">
                <span className="text-primary">&gt;</span> Pankaj Contact Interface initialized...
              </div>
              <div className="text-muted-foreground text-sm">
                <span className="text-primary">&gt;</span> Ready for inquiries.
              </div>
              <div className="text-muted-foreground text-sm">
                <span className="text-primary">&gt;</span> Type "email" to send a message, "call" for phone, 
                "linkedin" or "github" for profiles.
              </div>
              
              <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-primary">$</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
                  autoComplete="off"
                />
                <span className="cursor-blink text-primary" />
              </form>
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <a
              href="mailto:praj4936@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-all duration-300 box-glow hover:scale-105"
            >
              <Mail size={18} />
              Say Hello
            </a>
            <a
              href="tel:+917644061508"
              className="flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover"
            >
              <Phone size={18} />
              Call Me
            </a>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="card-cyber p-6 flex flex-col items-center gap-3">
              <Mail className="text-primary" size={24} />
              <span className="text-xs text-muted-foreground">EMAIL</span>
              <a href="mailto:praj4936@gmail.com" className="text-sm text-foreground hover:text-primary transition-colors">
                praj4936@gmail.com
              </a>
            </div>
            <div className="card-cyber p-6 flex flex-col items-center gap-3">
              <Phone className="text-primary" size={24} />
              <span className="text-xs text-muted-foreground">PHONE</span>
              <a href="tel:+917644061508" className="text-sm text-foreground hover:text-primary transition-colors">
                +91 764 406 1508
              </a>
            </div>
            <div className="card-cyber p-6 flex flex-col items-center gap-3">
              <MapPin className="text-primary" size={24} />
              <span className="text-xs text-muted-foreground">LOCATION</span>
              <span className="text-sm text-foreground">India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
