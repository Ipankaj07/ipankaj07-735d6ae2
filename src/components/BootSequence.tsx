import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  { text: "PANKAJ_OS v1.0", delay: 0 },
  { text: "BIOS DATE 12/25/24 00:00:00 VER 1.0.0", delay: 200 },
  { text: "RAM: 32GB SYSTEM MEMORY OK", delay: 400 },
  { text: "INITIALIZING KERNEL...", delay: 600 },
  { text: "LOADING MODULES: [REACT] [TYPESCRIPT] [NODE.JS]", delay: 800 },
  { text: "ESTABLISHING SECURE CONNECTION...", delay: 1000 },
  { text: "LOADING PORTFOLIO DATA...", delay: 1200 },
  { text: "SYSTEM INTEGRITY CHECK: PASSED", delay: 1400 },
  { text: "MOUNTING FILE SYSTEM...", delay: 1600 },
  { text: "BOOT SEQUENCE COMPLETE.", delay: 1800 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
        setProgress(((index + 1) / bootMessages.length) * 100);
      }, msg.delay);
    });

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(completeTimeout);
  }, [onComplete]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit" 
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      >
        <div className="w-full max-w-2xl px-6">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-destructive" />
              <div className="terminal-dot bg-neon-amber" />
              <div className="terminal-dot bg-primary" />
              <span className="ml-4 text-xs text-muted-foreground">
                pankaj_boot.sh
              </span>
            </div>
            
            <div className="p-4 min-h-[300px]">
              <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>PANKAJ_OS v1.0</span>
                <span>MEM: 32768K OK</span>
              </div>
              
              <div className="space-y-1">
                {bootMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      visibleMessages.includes(index)
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-muted-foreground shrink-0">
                      [{getTimestamp()}]
                    </span>
                    <span className={index === bootMessages.length - 1 ? "text-primary text-glow-subtle" : "text-foreground"}>
                      {msg.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">System Load</span>
                  <span className="text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full bg-primary"
                    style={{
                      boxShadow: "0 0 10px hsl(var(--primary) / 0.8)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootSequence;
