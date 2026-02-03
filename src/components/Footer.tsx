import { usePortfolio } from "@/lib/portfolioStore";
import { motion } from "framer-motion";
import { Github, Heart, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const Footer = () => {
  const { data } = usePortfolio();
  const { footer } = data;
  const [taglineBefore, taglineAfter] = footer.tagline.split("love");
  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
    phone: Phone,
    map: MapPin,
  };

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-6">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            {footer.socialLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              if (!Icon) return null;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {taglineAfter !== undefined ? (
                <>
                  <span>{taglineBefore.trimEnd()}</span>
                  <Heart size={14} className="text-primary" />
                  <span>{taglineAfter.trimStart()}</span>
                </>
              ) : (
                footer.tagline
              )}
            </p>
          </motion.div>

          {/* Version and Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span>
              <span className="text-primary">{footer.version}</span> | {footer.year} ✨
            </span>
            <ThemeSelector />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
