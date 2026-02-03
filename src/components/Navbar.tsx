import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";

const navItems = [
  { label: "About", href: "#about", number: "01" },
  { label: "Experience", href: "#experience", number: "02" },
  { label: "Projects", href: "#projects", number: "03" },
  { label: "Skills", href: "#skills", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 border border-primary rounded-sm flex items-center justify-center box-glow">
                <span className="text-primary font-bold text-lg">P</span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-link text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 + index * 0.1 }}
                >
                  <span className="text-primary mr-1">{item.number}.</span>
                  {item.label}
                </motion.button>
              ))}
              
              <motion.a
                href="https://drive.google.com/file/d/1E1B43a768jfePZAQqVvCior3yXvTssYi/view"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-primary text-primary text-sm rounded-sm hover:bg-primary/10 transition-all duration-300 box-glow-hover"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.1 }}
              >
                Resume
              </motion.a>

              <div className="hidden">
                <ThemeSelector />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-30 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-card border-l border-border p-8 pt-24">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-lg nav-link"
              >
                <span className="text-primary mr-2">{item.number}.</span>
                {item.label}
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1E1B43a768jfePZAQqVvCior3yXvTssYi/view"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 border border-primary text-primary text-center rounded-sm hover:bg-primary/10 transition-all duration-300"
            >
              Resume
            </a>
          <div className="hidden">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
