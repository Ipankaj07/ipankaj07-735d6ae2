export type IconKey =
  | "github"
  | "linkedin"
  | "mail"
  | "phone"
  | "map"
  | "code"
  | "music"
  | "plane"
  | "gamepad"
  | "graduation"
  | "award";

export type PortfolioData = {
  hero: {
    statusText: string;
    greeting: string;
    firstName: string;
    lastName: string;
    rolePrefix: string;
    roleEmphasis: string;
    terminalLabel: string;
    description: string;
    highlightKeywords: string[];
    ctaLinks: { label: string; href: string }[];
    socialLinks: { label: string; url: string; icon: IconKey }[];
  };
  about: {
    sectionLabel: string;
    heading: string;
    terminalLabel: string;
    interestsLabel: string;
    image: { src: string; alt: string; idLabel: string };
    bioParagraphs: string[];
    location: string;
    interests: { label: string; icon: IconKey }[];
  };
  experience: {
    sectionLabel: string;
    heading: string;
    terminalLabel: string;
    currentBadgeLabel: string;
    items: {
      company: string;
      role: string;
      period: string;
      location: string;
      url: string;
      current: boolean;
      responsibilities: string[];
    }[];
  };
  projects: {
    sectionLabel: string;
    heading: string;
    hint: string;
    modalTechLabel: string;
    viewCodeLabel: string;
    liveDemoLabel: string;
    viewSourceAriaLabel: string;
    viewLiveAriaLabel: string;
    items: {
      title: string;
      description: string;
      tech: string[];
      github: string;
      external: string | null;
      image: string | null;
    }[];
    viewMore: { label: string; url: string };
  };
  skills: {
    sectionLabel: string;
    heading: string;
    categories: { title: string; skills: string[] }[];
    marquee: string[];
  };
  education: {
    sectionLabel: string;
    heading: string;
    terminalLabel: string;
    items: {
      institution: string;
      degree: string;
      period: string;
      location: string;
      grade: string | null;
      icon: IconKey;
    }[];
  };
  contact: {
    sectionLabel: string;
    heading: string;
    introTitle: string;
    introDescription: string;
    terminalLabel: string;
    terminalIntroLines: string[];
    commandPlaceholder: string;
    helpCommand: string;
    toastMessages: {
      helpTitle: string;
      helpFallbackDescription: string;
      unknownTitle: string;
      unknownDescription: string;
    };
    quickActions: { label: string; href: string; icon: IconKey }[];
    infoCards: { label: string; value: string; href?: string; icon: IconKey }[];
    commands: {
      command: string;
      aliases?: string[];
      action: { type: "mailto" | "tel" | "url"; value: string };
    }[];
  };
  footer: {
    socialLinks: { label: string; url: string; icon: IconKey }[];
    tagline: string;
    version: string;
    year: string;
  };
};

export const defaultPortfolioData: PortfolioData = {
  hero: {
    statusText: "STATUS: OPEN TO OPPORTUNITIES",
    greeting: "Hello, I'm",
    firstName: "Pankaj",
    lastName: "Raj",
    rolePrefix: "Full-Stack",
    roleEmphasis: "Developer",
    terminalLabel: "about.sh",
    description:
      "2+ years of experience building scalable web applications with React, Node.js, AWS, and Flutter. Currently at ValuEnable, architecting insurance solutions used by 2,000+ companies including Axis Max Life & Bajaj Allianz.",
    highlightKeywords: [
      "React",
      "Node.js",
      "AWS",
      "Flutter",
      "ValuEnable",
      "2,000+",
      "Axis Max Life",
      "Bajaj Allianz",
    ],
    ctaLinks: [
      { label: "Get In Touch", href: "#contact" },
      { label: "View Projects", href: "#projects" },
    ],
    socialLinks: [
      { label: "GitHub", url: "https://github.com/Ipankaj07", icon: "github" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ipankaj07/",
        icon: "linkedin",
      },
      { label: "Email", url: "mailto:praj4936@gmail.com", icon: "mail" },
      { label: "Phone", url: "tel:+917644061508", icon: "phone" },
    ],
  },
  about: {
    sectionLabel: "01.",
    heading: "About Me",
    terminalLabel: "bio.md",
    interestsLabel: "INTERESTED_IN:",
    image: {
      src: "https://pankaj-raj.vercel.app/static/1a54191bfe81380550be08e0025794ca/25f3c/2p88zt9c.jpg",
      alt: "Agent Pankaj",
      idLabel: "ID: AGENT-07",
    },
    bioParagraphs: [
      "Hello! I'm <span class=\"text-primary font-semibold\">Pankaj</span>, a Full-Stack Developer with <span class=\"text-primary\">2+ years</span> of experience building scalable web applications and cross-platform solutions.",
      "Currently at <span class=\"text-primary\">ValuEnable</span>, I architected the <span class=\"text-primary\">Content Engine</span> from scratch — a policy retention platform now used by <span class=\"text-primary\">2,000+ places</span> including top Indian insurers like Axis Max Life, ABSLI, and Bajaj Allianz Life.",
      "I specialize in <span class=\"text-primary\">React</span>, <span class=\"text-primary\">Node.js</span>, <span class=\"text-primary\">AWS</span> (S3, EC2, Lambda, DynamoDB), and <span class=\"text-primary\">Flutter</span>. I've built WhatsApp bots, optimized 200K+ report downloads, and mentored junior developers.",
      "Graduate of <span class=\"text-primary\">Masai School</span> (Full-Stack Web Dev, Grade A) and <span class=\"text-primary\">Maharshi Dayanand University</span> (B.Tech CSE, 2024).",
    ],
    location: "India (Remote)",
    interests: [
      { icon: "code", label: "Explore Tech" },
      { icon: "music", label: "Music" },
      { icon: "plane", label: "Travelling" },
      { icon: "gamepad", label: "Gaming" },
    ],
  },
  experience: {
    sectionLabel: "02.",
    heading: "Experience",
    terminalLabel: "work_history.log",
    currentBadgeLabel: "CURRENT",
    items: [
      {
        company: "ValuEnable Private Limited",
        role: "Full Stack Developer",
        period: "January 2023 - Present",
        location: "Remote / India",
        url: "https://valuenable.in/",
        current: true,
        responsibilities: [
          "Architected and developed the Content Engine from scratch using React, Express, and MySQL, enabling policy retention and future-projection insights; now adopted by 2,000+ places including top Indian insurance companies such as Axis Max Life, ABSLI, Bajaj Allianz Life, and many more.",
          "Led backend development for the AssureMe insurance application, collaborating closely with UI/UX teams and contributing cross-platform mobile features using Flutter.",
          "Built and deployed a WhatsApp bot using AWS DynamoDB to manage user-specific messaging data and automate policy document generation.",
          "Utilized and modified AWS services including S3, EC2, Lambda, CloudWatch, and SQS for cloud hosting, automation, and monitoring purposes across projects.",
          "Refactored legacy codebases and implemented reusable components to improve performance, scalability, and maintainability across platforms.",
          "Optimized large-scale data operations—supporting 200K+ report downloads—and significantly improved query efficiency for critical modules.",
          "Mentored junior developers during onboarding and project ramp-up, while also proactively contributing solutions to team leads and seniors to accelerate feature implementation.",
        ],
      },
      {
        company: "OneCode",
        role: "Software Development Intern",
        period: "May - August 2022",
        location: "Bangalore, India",
        url: "https://www.onecode.in/",
        current: false,
        responsibilities: [
          "Involved in all stages of software development lifecycle: development, debugging, and testing",
          "Architected and implemented the front-end of OneCode Falcon feature — an embeddable web application that lets users log in and add complete details to use company offers and services",
          "Contributed extensively to onecode-backend Project using Java framework SpringBoot",
          "Developed RESTful web-services in Java using SpringBoot",
          "Refactored ReactJS codebase to improve readability and maintainability",
        ],
      },
    ],
  },
  projects: {
    sectionLabel: "03.",
    heading: "Projects",
    hint: "Press Space for skeleton view",
    modalTechLabel: "TECHNOLOGIES:",
    viewCodeLabel: "View Code",
    liveDemoLabel: "Live Demo",
    viewSourceAriaLabel: "View source code",
    viewLiveAriaLabel: "View live project",
    items: [
      {
        title: "Groww Clone",
        description:
          "A clone of Groww web application built with a team of 6 members over 5 days. Features include stock search, detailed stock information, graphs of stock prices, SIP amount setting, and OTP mail verification.",
        tech: ["EJS", "CSS", "JavaScript", "MongoDB", "ExpressJS"],
        github: "https://github.com/taherahmed14/Groww_Full-Stack_Project",
        external: "https://groww-project.herokuapp.com/home",
        image:
          "https://raw.githubusercontent.com/taherahmed14/Groww_Full-Stack_Project/master/screenshots/home.png",
      },
      {
        title: "Nike Clone",
        description:
          "A front-end clone of Nike.com where users can browse and purchase dummy Nike products with dummy payment validation functionality.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Ipankaj07/Nike-clone",
        external: "https://ipankaj07.github.io/Nike-clone/",
        image: "https://raw.githubusercontent.com/Ipankaj07/Nike-clone/main/screenshot.png",
      },
      {
        title: "GitHub User Search",
        description:
          "Search any GitHub user by name, location, or company. View detailed profiles, repositories, and contribution stats with a clean interface.",
        tech: ["React", "GitHub API", "CSS"],
        github: "https://github.com/Ipankaj07/github-uzer",
        external: null,
        image: null,
      },
      {
        title: "Imgur Giphy",
        description:
          "GIF search application powered by Giphy API. Search any GIF from the internet with an interface inspired by Imgur.",
        tech: ["React", "Giphy API", "CSS"],
        github: "https://github.com/Ipankaj07/imgur-giphy",
        external: null,
        image: null,
      },
      {
        title: "YouTube Clone",
        description:
          "YouTube clone using Google Console API to fetch real YouTube data. Features homepage similar to YouTube with video search and playback functionality.",
        tech: ["React", "YouTube API", "Google Console", "CSS"],
        github: "https://github.com/Ipankaj07/Youtube",
        external: null,
        image: null,
      },
      {
        title: "Weather App",
        description:
          "Weather application with 7-day forecast. Search for multiple locations and view detailed weather information including temperature, humidity, and conditions.",
        tech: ["React", "Weather API", "CSS"],
        github: "https://github.com/Ipankaj07/weather-app",
        external: null,
        image: null,
      },
      {
        title: "File Uploader",
        description:
          "Upload files and get live URLs to access them anywhere. Supports files up to 100MB with instant shareable links.",
        tech: ["React", "Node.js", "Cloud Storage"],
        github: "https://github.com/Ipankaj07/file-uploader",
        external: null,
        image: null,
      },
      {
        title: "Postman Clone",
        description:
          "A Postman clone that replicates core Postman features. Test APIs, send requests, and view responses with a familiar interface.",
        tech: ["React", "Axios", "JavaScript"],
        github: "https://github.com/Ipankaj07/postman-clone",
        external: null,
        image: null,
      },
      {
        title: "The Platinum Portfolio",
        description:
          "Creative portfolio website for the character 'The Professor' from Money Heist (Netflix). A unique themed portfolio concept.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Ipankaj07/the-platinum",
        external: null,
        image: null,
      },
      {
        title: "Apartment Flats Manager",
        description:
          "View available apartments and hotels at searched locations. Browse details, check availability, and book accommodations.",
        tech: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/Ipankaj07/Apartment-Flats-Manager",
        external: null,
        image: null,
      },
    ],
    viewMore: { label: "View All on GitHub", url: "https://github.com/Ipankaj07" },
  },
  skills: {
    sectionLabel: "04.",
    heading: "Skills",
    categories: [
      {
        title: "FRONTEND",
        skills: [
          "React",
          "JavaScript",
          "TypeScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
          "Flutter",
        ],
      },
      {
        title: "BACKEND",
        skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "Java", "SpringBoot"],
      },
      {
        title: "TOOLS & CLOUD",
        skills: ["Git", "GitHub", "AWS", "Docker", "VS Code", "Postman"],
      },
    ],
    marquee: [
      "REACT",
      "JAVASCRIPT",
      "TYPESCRIPT",
      "NODE.JS",
      "MONGODB",
      "EXPRESS",
      "GIT",
      "TAILWIND",
      "JAVA",
      "SPRINGBOOT",
      "AWS",
      "FLUTTER",
    ],
  },
  education: {
    sectionLabel: "05.",
    heading: "Education",
    terminalLabel: "education.log",
    items: [
      {
        institution: "Maharshi Dayanand University",
        degree: "B.Tech in Computer Science Engineering",
        period: "2020 - 2024",
        location: "Rohtak, India",
        grade: null,
        icon: "graduation",
      },
      {
        institution: "Masai School",
        degree: "Full-Stack Web Development (Full-time)",
        period: "April 2021 - April 2022",
        location: "Bangalore, India",
        grade: "Grade: A",
        icon: "award",
      },
      {
        institution: "Snatak College",
        degree: "Higher Secondary Education",
        period: "May 2018 - March 2020",
        location: "Islampur, India",
        grade: "Percentage: 70.6%",
        icon: "graduation",
      },
    ],
  },
  contact: {
    sectionLabel: "05.",
    heading: "Contact",
    introTitle: "Get In Touch",
    introDescription:
      "Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    terminalLabel: "pankaj_contact — zsh",
    terminalIntroLines: [
      "Pankaj Contact Interface initialized...",
      "Ready for inquiries.",
      'Type "email" to send a message, "call" for phone, "linkedin" or "github" for profiles.',
    ],
    commandPlaceholder: "Type a command...",
    helpCommand: "help",
    toastMessages: {
      helpTitle: "Available Commands",
      helpFallbackDescription: "help",
      unknownTitle: "Unknown Command",
      unknownDescription: "Type 'help' for available commands",
    },
    quickActions: [
      { label: "Say Hello", href: "mailto:praj4936@gmail.com", icon: "mail" },
      { label: "Call Me", href: "tel:+917644061508", icon: "phone" },
    ],
    infoCards: [
      { label: "EMAIL", value: "praj4936@gmail.com", href: "mailto:praj4936@gmail.com", icon: "mail" },
      { label: "PHONE", value: "+91 764 406 1508", href: "tel:+917644061508", icon: "phone" },
      { label: "LOCATION", value: "India", icon: "map" },
    ],
    commands: [
      {
        command: "email",
        aliases: ["mail"],
        action: { type: "mailto", value: "praj4936@gmail.com" },
      },
      {
        command: "call",
        aliases: ["phone"],
        action: { type: "tel", value: "+917644061508" },
      },
      {
        command: "linkedin",
        action: { type: "url", value: "https://www.linkedin.com/in/ipankaj07/" },
      },
      { command: "github", action: { type: "url", value: "https://github.com/Ipankaj07" } },
    ],
  },
  footer: {
    socialLinks: [
      { label: "GitHub", url: "https://github.com/Ipankaj07", icon: "github" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ipankaj07/",
        icon: "linkedin",
      },
      { label: "Email", url: "mailto:praj4936@gmail.com", icon: "mail" },
    ],
    tagline: "Built with love by Pankaj Raj",
    version: "v1.0.0",
    year: "2024",
  },
};
