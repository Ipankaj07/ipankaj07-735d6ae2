import { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
}

const ScrambleText = ({ text, delay = 0, className = "", as: Tag = "span" }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let iteration = 0;
      const totalIterations = text.length * 3;
      
      const interval = setInterval(() => {
        const progress = Math.min(iteration / 3, text.length);
        const revealed = Math.floor(progress);
        
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) {
            result += text[i];
          } else if (i === revealed && text[i] !== " ") {
            result += chars[Math.floor(Math.random() * chars.length)];
          } else if (text[i] === " ") {
            result += " ";
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(result);
        iteration++;
        
        if (iteration >= totalIterations) {
          setDisplayText(text);
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 30);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return <Tag className={className}>{displayText || text.replace(/./g, " ")}</Tag>;
};

export default ScrambleText;
