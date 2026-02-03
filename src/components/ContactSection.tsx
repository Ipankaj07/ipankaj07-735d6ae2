import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from "@/lib/portfolioStore";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const { data } = usePortfolio();
  const { contact } = data;
  const iconMap = {
    mail: Mail,
    phone: Phone,
    map: MapPin,
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.toLowerCase().trim();

    const helpCommand = contact.helpCommand.toLowerCase();

    if (cmd === helpCommand) {
      const available = contact.commands
        .flatMap((command) => [command.command, ...(command.aliases ?? [])])
        .join(", ");
      toast({
        title: contact.toastMessages.helpTitle,
        description: available
          ? `${available}, ${contact.helpCommand}`
          : contact.toastMessages.helpFallbackDescription,
      });
      setInputValue("");
      return;
    }

    const match = contact.commands.find((command) => {
      if (command.command.toLowerCase() === cmd) return true;
      return command.aliases?.some((alias) => alias.toLowerCase() === cmd);
    });

    if (match) {
      const { type, value } = match.action;
      if (type === "mailto") {
        const mailto = value.startsWith("mailto:") ? value : `mailto:${value}`;
        window.location.href = mailto;
      } else if (type === "tel") {
        const tel = value.startsWith("tel:") ? value : `tel:${value}`;
        window.location.href = tel;
      } else if (type === "url") {
        window.open(value, "_blank");
      }
    } else {
      toast({
        title: contact.toastMessages.unknownTitle,
        description: contact.toastMessages.unknownDescription,
        variant: "destructive",
      });
    }
    setInputValue("");
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">{contact.sectionLabel}</span> {contact.heading}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
          >
            {contact.introTitle}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mb-10 text-lg"
          >
            {contact.introDescription}
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
                {contact.terminalLabel}
              </span>
            </div>

            <div className="p-6 space-y-3">
              {contact.terminalIntroLines.map((line, index) => (
                <div key={index} className="text-muted-foreground text-sm">
                  <span className="text-primary">&gt;</span> {line}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-primary">$</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={contact.commandPlaceholder}
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
            {contact.quickActions.map((action) => {
              const Icon = iconMap[action.icon as keyof typeof iconMap];
              if (!Icon) return null;
              const isPrimary = action.icon === "mail";
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={`flex items-center gap-2 px-6 py-3 rounded-sm transition-all duration-300 hover:scale-105 ${
                    isPrimary
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 box-glow"
                      : "border border-primary text-primary hover:bg-primary/10 box-glow-hover"
                  }`}
                >
                  <Icon size={18} />
                  {action.label}
                </a>
              );
            })}
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {contact.infoCards.map((card) => {
              const Icon = iconMap[card.icon as keyof typeof iconMap];
              if (!Icon) return null;
              return (
                <div key={card.label} className="card-cyber p-6 flex flex-col items-center gap-3">
                  <Icon className="text-primary" size={24} />
                  <span className="text-xs text-muted-foreground">{card.label}</span>
                  {card.href ? (
                    <a href={card.href} className="text-sm text-foreground hover:text-primary transition-colors">
                      {card.value}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground">{card.value}</span>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
