import ThemeSelector from "@/components/ThemeSelector";
import { type IconKey } from "@/lib/portfolioConfig";
import { usePortfolio } from "@/lib/portfolioStore";
import { useMemo } from "react";

const iconOptions: { value: IconKey; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "mail", label: "Mail" },
  { value: "phone", label: "Phone" },
  { value: "map", label: "Map" },
  { value: "code", label: "Code" },
  { value: "music", label: "Music" },
  { value: "plane", label: "Plane" },
  { value: "gamepad", label: "Gamepad" },
  { value: "graduation", label: "Graduation" },
  { value: "award", label: "Award" },
];
const heroIconOptions = iconOptions.filter((option) =>
  ["github", "linkedin", "mail", "phone", "map"].includes(option.value)
);
const interestIconOptions = iconOptions.filter((option) =>
  ["code", "music", "plane", "gamepad"].includes(option.value)
);
const educationIconOptions = iconOptions.filter((option) =>
  ["graduation", "award"].includes(option.value)
);
const contactIconOptions = iconOptions.filter((option) =>
  ["mail", "phone", "map"].includes(option.value)
);
const footerIconOptions = iconOptions.filter((option) =>
  ["github", "linkedin", "mail", "phone", "map"].includes(option.value)
);

const Admin = () => {
  const { data, setData, resetData } = usePortfolio();

  const inputClassName =
    "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";
  const textareaClassName =
    "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";
  const sectionClassName = "rounded-md border border-border bg-card/40 p-6 space-y-6";

  const updateHero = (updates: Partial<typeof data.hero>) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...updates } }));
  };

  const updateAbout = (updates: Partial<typeof data.about>) => {
    setData((prev) => ({ ...prev, about: { ...prev.about, ...updates } }));
  };

  const updateExperience = (updates: Partial<typeof data.experience>) => {
    setData((prev) => ({ ...prev, experience: { ...prev.experience, ...updates } }));
  };

  const updateProjects = (updates: Partial<typeof data.projects>) => {
    setData((prev) => ({ ...prev, projects: { ...prev.projects, ...updates } }));
  };

  const updateSkills = (updates: Partial<typeof data.skills>) => {
    setData((prev) => ({ ...prev, skills: { ...prev.skills, ...updates } }));
  };

  const updateEducation = (updates: Partial<typeof data.education>) => {
    setData((prev) => ({ ...prev, education: { ...prev.education, ...updates } }));
  };

  const updateContact = (updates: Partial<typeof data.contact>) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...updates } }));
  };

  const updateFooter = (updates: Partial<typeof data.footer>) => {
    setData((prev) => ({ ...prev, footer: { ...prev.footer, ...updates } }));
  };

  const updateBlog = (updates: Partial<typeof data.blog>) => {
    setData((prev) => ({ ...prev, blog: { ...prev.blog, ...updates } }));
  };

  const keywordText = useMemo(() => data.hero.highlightKeywords.join("\n"), [data.hero.highlightKeywords]);
  const marqueeText = useMemo(() => data.skills.marquee.join("\n"), [data.skills.marquee]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 space-y-12">
        <header className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Admin</span>
            <h1 className="text-3xl font-semibold">Portfolio Content Manager</h1>
            <p className="text-sm text-muted-foreground">
              Edit your portfolio content below. Changes persist in local storage and update the live site instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetData}
              className="rounded-sm border border-primary/40 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              Reset to defaults
            </button>
            <a
              href="/"
              className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View Portfolio
            </a>
          </div>
        </header>
        <ThemeSelector />

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Blog</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Title</span>
              <input
                className={inputClassName}
                value={data.blog.title}
                onChange={(event) => updateBlog({ title: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Subtitle</span>
              <input
                className={inputClassName}
                value={data.blog.subtitle}
                onChange={(event) => updateBlog({ subtitle: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Tagline</span>
              <input
                className={inputClassName}
                value={data.blog.tagline}
                onChange={(event) => updateBlog({ tagline: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Markdown content</span>
              <textarea
                className={textareaClassName}
                rows={16}
                value={data.blog.content}
                onChange={(event) => updateBlog({ content: event.target.value })}
              />
            </label>
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <input
                className={inputClassName}
                value={data.hero.statusText}
                onChange={(event) => updateHero({ statusText: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Greeting</span>
              <input
                className={inputClassName}
                value={data.hero.greeting}
                onChange={(event) => updateHero({ greeting: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">First name</span>
              <input
                className={inputClassName}
                value={data.hero.firstName}
                onChange={(event) => updateHero({ firstName: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Last name</span>
              <input
                className={inputClassName}
                value={data.hero.lastName}
                onChange={(event) => updateHero({ lastName: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Role prefix</span>
              <input
                className={inputClassName}
                value={data.hero.rolePrefix}
                onChange={(event) => updateHero({ rolePrefix: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Role emphasis</span>
              <input
                className={inputClassName}
                value={data.hero.roleEmphasis}
                onChange={(event) => updateHero({ roleEmphasis: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Terminal label</span>
              <input
                className={inputClassName}
                value={data.hero.terminalLabel}
                onChange={(event) => updateHero({ terminalLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Description</span>
              <textarea
                className={textareaClassName}
                rows={4}
                value={data.hero.description}
                onChange={(event) => updateHero({ description: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Highlight keywords (one per line)</span>
              <textarea
                className={textareaClassName}
                rows={4}
                value={keywordText}
                onChange={(event) =>
                  updateHero({
                    highlightKeywords: event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">CTA Links</h3>
              <button
                type="button"
                onClick={() =>
                  updateHero({
                    ctaLinks: [...data.hero.ctaLinks, { label: "New CTA", href: "#" }],
                  })
                }
                className="text-xs text-primary"
              >
                + Add CTA
              </button>
            </div>
            {data.hero.ctaLinks.map((cta, index) => (
              <div key={`${cta.label}-${index}`} className="grid gap-3 md:grid-cols-[2fr_2fr_auto]">
                <input
                  className={inputClassName}
                  value={cta.label}
                  onChange={(event) => {
                    const next = [...data.hero.ctaLinks];
                    next[index] = { ...cta, label: event.target.value };
                    updateHero({ ctaLinks: next });
                  }}
                />
                <input
                  className={inputClassName}
                  value={cta.href}
                  onChange={(event) => {
                    const next = [...data.hero.ctaLinks];
                    next[index] = { ...cta, href: event.target.value };
                    updateHero({ ctaLinks: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateHero({ ctaLinks: data.hero.ctaLinks.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Social Links</h3>
              <button
                type="button"
                onClick={() =>
                  updateHero({
                    socialLinks: [
                      ...data.hero.socialLinks,
                      { label: "New", url: "https://", icon: "github" },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add Link
              </button>
            </div>
            {data.hero.socialLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="grid gap-3 md:grid-cols-[2fr_2fr_1fr_auto]">
                <input
                  className={inputClassName}
                  value={link.label}
                  onChange={(event) => {
                    const next = [...data.hero.socialLinks];
                    next[index] = { ...link, label: event.target.value };
                    updateHero({ socialLinks: next });
                  }}
                />
                <input
                  className={inputClassName}
                  value={link.url}
                  onChange={(event) => {
                    const next = [...data.hero.socialLinks];
                    next[index] = { ...link, url: event.target.value };
                    updateHero({ socialLinks: next });
                  }}
                />
                <select
                  className={inputClassName}
                  value={link.icon}
                  onChange={(event) => {
                    const next = [...data.hero.socialLinks];
                    next[index] = { ...link, icon: event.target.value as IconKey };
                    updateHero({ socialLinks: next });
                  }}
                >
                  {heroIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    updateHero({
                      socialLinks: data.hero.socialLinks.filter((_, idx) => idx !== index),
                    })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">About</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Section label</span>
              <input
                className={inputClassName}
                value={data.about.sectionLabel}
                onChange={(event) => updateAbout({ sectionLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Heading</span>
              <input
                className={inputClassName}
                value={data.about.heading}
                onChange={(event) => updateAbout({ heading: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Interests label</span>
              <input
                className={inputClassName}
                value={data.about.interestsLabel}
                onChange={(event) => updateAbout({ interestsLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Terminal label</span>
              <input
                className={inputClassName}
                value={data.about.terminalLabel}
                onChange={(event) => updateAbout({ terminalLabel: event.target.value })}
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Image URL</span>
              <input
                className={inputClassName}
                value={data.about.image.src}
                onChange={(event) =>
                  updateAbout({ image: { ...data.about.image, src: event.target.value } })
                }
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Image alt</span>
              <input
                className={inputClassName}
                value={data.about.image.alt}
                onChange={(event) =>
                  updateAbout({ image: { ...data.about.image, alt: event.target.value } })
                }
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Image ID label</span>
              <input
                className={inputClassName}
                value={data.about.image.idLabel}
                onChange={(event) =>
                  updateAbout({ image: { ...data.about.image, idLabel: event.target.value } })
                }
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Bio paragraphs</h3>
              <button
                type="button"
                onClick={() =>
                  updateAbout({ bioParagraphs: [...data.about.bioParagraphs, "New paragraph"] })
                }
                className="text-xs text-primary"
              >
                + Add paragraph
              </button>
            </div>
            {data.about.bioParagraphs.map((paragraph, index) => (
              <div key={index} className="flex gap-3">
                <textarea
                  className={textareaClassName}
                  rows={3}
                  value={paragraph}
                  onChange={(event) => {
                    const next = [...data.about.bioParagraphs];
                    next[index] = event.target.value;
                    updateAbout({ bioParagraphs: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateAbout({ bioParagraphs: data.about.bioParagraphs.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <label className="space-y-2">
            <span className="text-sm text-muted-foreground">Location</span>
            <input
              className={inputClassName}
              value={data.about.location}
              onChange={(event) => updateAbout({ location: event.target.value })}
            />
          </label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Interests</h3>
              <button
                type="button"
                onClick={() =>
                  updateAbout({
                    interests: [...data.about.interests, { label: "New interest", icon: "code" }],
                  })
                }
                className="text-xs text-primary"
              >
                + Add interest
              </button>
            </div>
            {data.about.interests.map((interest, index) => (
              <div key={`${interest.label}-${index}`} className="grid gap-3 md:grid-cols-[2fr_1fr_auto]">
                <input
                  className={inputClassName}
                  value={interest.label}
                  onChange={(event) => {
                    const next = [...data.about.interests];
                    next[index] = { ...interest, label: event.target.value };
                    updateAbout({ interests: next });
                  }}
                />
                <select
                  className={inputClassName}
                  value={interest.icon}
                  onChange={(event) => {
                    const next = [...data.about.interests];
                    next[index] = { ...interest, icon: event.target.value as IconKey };
                    updateAbout({ interests: next });
                  }}
                >
                  {interestIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    updateAbout({ interests: data.about.interests.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Experience</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Section label</span>
              <input
                className={inputClassName}
                value={data.experience.sectionLabel}
                onChange={(event) => updateExperience({ sectionLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Heading</span>
              <input
                className={inputClassName}
                value={data.experience.heading}
                onChange={(event) => updateExperience({ heading: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Terminal label</span>
              <input
                className={inputClassName}
                value={data.experience.terminalLabel}
                onChange={(event) => updateExperience({ terminalLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Current badge label</span>
              <input
                className={inputClassName}
                value={data.experience.currentBadgeLabel}
                onChange={(event) => updateExperience({ currentBadgeLabel: event.target.value })}
              />
            </label>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Roles</h3>
              <button
                type="button"
                onClick={() =>
                  updateExperience({
                    items: [
                      ...data.experience.items,
                      {
                        company: "New Company",
                        role: "Role",
                        period: "",
                        location: "",
                        url: "https://",
                        current: false,
                        responsibilities: [""],
                      },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add role
              </button>
            </div>
            {data.experience.items.map((item, index) => (
              <div key={`${item.company}-${index}`} className="space-y-4 rounded-md border border-border/70 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className={inputClassName}
                    value={item.company}
                    onChange={(event) => {
                      const next = [...data.experience.items];
                      next[index] = { ...item, company: event.target.value };
                      updateExperience({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.role}
                    onChange={(event) => {
                      const next = [...data.experience.items];
                      next[index] = { ...item, role: event.target.value };
                      updateExperience({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.period}
                    onChange={(event) => {
                      const next = [...data.experience.items];
                      next[index] = { ...item, period: event.target.value };
                      updateExperience({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.location}
                    onChange={(event) => {
                      const next = [...data.experience.items];
                      next[index] = { ...item, location: event.target.value };
                      updateExperience({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.url}
                    onChange={(event) => {
                      const next = [...data.experience.items];
                      next[index] = { ...item, url: event.target.value };
                      updateExperience({ items: next });
                    }}
                  />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(event) => {
                        const next = [...data.experience.items];
                        next[index] = { ...item, current: event.target.checked };
                        updateExperience({ items: next });
                      }}
                    />
                    Current role
                  </label>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Responsibilities</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...data.experience.items];
                        next[index] = {
                          ...item,
                          responsibilities: [...item.responsibilities, ""],
                        };
                        updateExperience({ items: next });
                      }}
                      className="text-xs text-primary"
                    >
                      + Add
                    </button>
                  </div>
                  {item.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-3">
                      <textarea
                        className={textareaClassName}
                        rows={2}
                        value={resp}
                        onChange={(event) => {
                          const next = [...data.experience.items];
                          const responsibilities = [...item.responsibilities];
                          responsibilities[respIndex] = event.target.value;
                          next[index] = { ...item, responsibilities };
                          updateExperience({ items: next });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...data.experience.items];
                          next[index] = {
                            ...item,
                            responsibilities: item.responsibilities.filter((_, idx) => idx !== respIndex),
                          };
                          updateExperience({ items: next });
                        }}
                        className="text-xs text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateExperience({ items: data.experience.items.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove role
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Section label</span>
              <input
                className={inputClassName}
                value={data.projects.sectionLabel}
                onChange={(event) => updateProjects({ sectionLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Heading</span>
              <input
                className={inputClassName}
                value={data.projects.heading}
                onChange={(event) => updateProjects({ heading: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Hint</span>
              <input
                className={inputClassName}
                value={data.projects.hint}
                onChange={(event) => updateProjects({ hint: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Modal tech label</span>
              <input
                className={inputClassName}
                value={data.projects.modalTechLabel}
                onChange={(event) => updateProjects({ modalTechLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">View code label</span>
              <input
                className={inputClassName}
                value={data.projects.viewCodeLabel}
                onChange={(event) => updateProjects({ viewCodeLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Live demo label</span>
              <input
                className={inputClassName}
                value={data.projects.liveDemoLabel}
                onChange={(event) => updateProjects({ liveDemoLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">View source aria label</span>
              <input
                className={inputClassName}
                value={data.projects.viewSourceAriaLabel}
                onChange={(event) => updateProjects({ viewSourceAriaLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">View live aria label</span>
              <input
                className={inputClassName}
                value={data.projects.viewLiveAriaLabel}
                onChange={(event) => updateProjects({ viewLiveAriaLabel: event.target.value })}
              />
            </label>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Project list</h3>
              <button
                type="button"
                onClick={() =>
                  updateProjects({
                    items: [
                      ...data.projects.items,
                      {
                        title: "New project",
                        description: "",
                        tech: [""],
                        github: "https://",
                        external: null,
                        image: null,
                      },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add project
              </button>
            </div>
            {data.projects.items.map((project, index) => (
              <div key={`${project.title}-${index}`} className="space-y-4 rounded-md border border-border/70 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className={inputClassName}
                    value={project.title}
                    onChange={(event) => {
                      const next = [...data.projects.items];
                      next[index] = { ...project, title: event.target.value };
                      updateProjects({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={project.github}
                    onChange={(event) => {
                      const next = [...data.projects.items];
                      next[index] = { ...project, github: event.target.value };
                      updateProjects({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    placeholder="External URL"
                    value={project.external ?? ""}
                    onChange={(event) => {
                      const next = [...data.projects.items];
                      next[index] = {
                        ...project,
                        external: event.target.value.trim() === "" ? null : event.target.value,
                      };
                      updateProjects({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    placeholder="Image URL"
                    value={project.image ?? ""}
                    onChange={(event) => {
                      const next = [...data.projects.items];
                      next[index] = {
                        ...project,
                        image: event.target.value.trim() === "" ? null : event.target.value,
                      };
                      updateProjects({ items: next });
                    }}
                  />
                </div>
                <textarea
                  className={textareaClassName}
                  rows={3}
                  value={project.description}
                  onChange={(event) => {
                    const next = [...data.projects.items];
                    next[index] = { ...project, description: event.target.value };
                    updateProjects({ items: next });
                  }}
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tech stack</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...data.projects.items];
                        next[index] = { ...project, tech: [...project.tech, ""] };
                        updateProjects({ items: next });
                      }}
                      className="text-xs text-primary"
                    >
                      + Add tech
                    </button>
                  </div>
                  {project.tech.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-3">
                      <input
                        className={inputClassName}
                        value={tech}
                        onChange={(event) => {
                          const next = [...data.projects.items];
                          const techList = [...project.tech];
                          techList[techIndex] = event.target.value;
                          next[index] = { ...project, tech: techList };
                          updateProjects({ items: next });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...data.projects.items];
                          next[index] = { ...project, tech: project.tech.filter((_, idx) => idx !== techIndex) };
                          updateProjects({ items: next });
                        }}
                        className="text-xs text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => updateProjects({ items: data.projects.items.filter((_, idx) => idx !== index) })}
                  className="text-xs text-destructive"
                >
                  Remove project
                </button>
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className={inputClassName}
              value={data.projects.viewMore.label}
              onChange={(event) =>
                updateProjects({ viewMore: { ...data.projects.viewMore, label: event.target.value } })
              }
            />
            <input
              className={inputClassName}
              value={data.projects.viewMore.url}
              onChange={(event) =>
                updateProjects({ viewMore: { ...data.projects.viewMore, url: event.target.value } })
              }
            />
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Section label</span>
              <input
                className={inputClassName}
                value={data.skills.sectionLabel}
                onChange={(event) => updateSkills({ sectionLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Heading</span>
              <input
                className={inputClassName}
                value={data.skills.heading}
                onChange={(event) => updateSkills({ heading: event.target.value })}
              />
            </label>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Categories</h3>
              <button
                type="button"
                onClick={() =>
                  updateSkills({
                    categories: [...data.skills.categories, { title: "NEW", skills: [""] }],
                  })
                }
                className="text-xs text-primary"
              >
                + Add category
              </button>
            </div>
            {data.skills.categories.map((category, catIndex) => (
              <div key={`${category.title}-${catIndex}`} className="space-y-3 rounded-md border border-border/70 p-4">
                <div className="flex items-center gap-3">
                  <input
                    className={inputClassName}
                    value={category.title}
                    onChange={(event) => {
                      const next = [...data.skills.categories];
                      next[catIndex] = { ...category, title: event.target.value };
                      updateSkills({ categories: next });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateSkills({ categories: data.skills.categories.filter((_, idx) => idx !== catIndex) })
                    }
                    className="text-xs text-destructive"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Skills</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...data.skills.categories];
                        next[catIndex] = { ...category, skills: [...category.skills, ""] };
                        updateSkills({ categories: next });
                      }}
                      className="text-xs text-primary"
                    >
                      + Add skill
                    </button>
                  </div>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex gap-3">
                      <input
                        className={inputClassName}
                        value={skill}
                        onChange={(event) => {
                          const next = [...data.skills.categories];
                          const skills = [...category.skills];
                          skills[skillIndex] = event.target.value;
                          next[catIndex] = { ...category, skills };
                          updateSkills({ categories: next });
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...data.skills.categories];
                          next[catIndex] = {
                            ...category,
                            skills: category.skills.filter((_, idx) => idx !== skillIndex),
                          };
                          updateSkills({ categories: next });
                        }}
                        className="text-xs text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <label className="space-y-2">
            <span className="text-sm text-muted-foreground">Marquee text (one per line)</span>
            <textarea
              className={textareaClassName}
              rows={4}
              value={marqueeText}
              onChange={(event) =>
                updateSkills({
                  marquee: event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Education</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Section label</span>
              <input
                className={inputClassName}
                value={data.education.sectionLabel}
                onChange={(event) => updateEducation({ sectionLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Heading</span>
              <input
                className={inputClassName}
                value={data.education.heading}
                onChange={(event) => updateEducation({ heading: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Terminal label</span>
              <input
                className={inputClassName}
                value={data.education.terminalLabel}
                onChange={(event) => updateEducation({ terminalLabel: event.target.value })}
              />
            </label>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Education entries</h3>
              <button
                type="button"
                onClick={() =>
                  updateEducation({
                    items: [
                      ...data.education.items,
                      {
                        institution: "New School",
                        degree: "",
                        period: "",
                        location: "",
                        grade: null,
                        icon: "graduation",
                      },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add entry
              </button>
            </div>
            {data.education.items.map((item, index) => (
              <div key={`${item.institution}-${index}`} className="space-y-4 rounded-md border border-border/70 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className={inputClassName}
                    value={item.institution}
                    onChange={(event) => {
                      const next = [...data.education.items];
                      next[index] = { ...item, institution: event.target.value };
                      updateEducation({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.degree}
                    onChange={(event) => {
                      const next = [...data.education.items];
                      next[index] = { ...item, degree: event.target.value };
                      updateEducation({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.period}
                    onChange={(event) => {
                      const next = [...data.education.items];
                      next[index] = { ...item, period: event.target.value };
                      updateEducation({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    value={item.location}
                    onChange={(event) => {
                      const next = [...data.education.items];
                      next[index] = { ...item, location: event.target.value };
                      updateEducation({ items: next });
                    }}
                  />
                  <input
                    className={inputClassName}
                    placeholder="Grade (optional)"
                    value={item.grade ?? ""}
                    onChange={(event) => {
                      const next = [...data.education.items];
                      next[index] = {
                        ...item,
                        grade: event.target.value.trim() === "" ? null : event.target.value,
                      };
                      updateEducation({ items: next });
                    }}
                  />
                <select
                  className={inputClassName}
                  value={item.icon}
                  onChange={(event) => {
                    const next = [...data.education.items];
                    next[index] = { ...item, icon: event.target.value as IconKey };
                    updateEducation({ items: next });
                  }}
                >
                  {educationIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateEducation({ items: data.education.items.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove entry
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Contact</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Section label</span>
              <input
                className={inputClassName}
                value={data.contact.sectionLabel}
                onChange={(event) => updateContact({ sectionLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Heading</span>
              <input
                className={inputClassName}
                value={data.contact.heading}
                onChange={(event) => updateContact({ heading: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Intro title</span>
              <input
                className={inputClassName}
                value={data.contact.introTitle}
                onChange={(event) => updateContact({ introTitle: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Intro description</span>
              <textarea
                className={textareaClassName}
                rows={3}
                value={data.contact.introDescription}
                onChange={(event) => updateContact({ introDescription: event.target.value })}
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Terminal label</span>
              <input
                className={inputClassName}
                value={data.contact.terminalLabel}
                onChange={(event) => updateContact({ terminalLabel: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Help command</span>
              <input
                className={inputClassName}
                value={data.contact.helpCommand}
                onChange={(event) => updateContact({ helpCommand: event.target.value })}
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Terminal intro lines</h3>
              <button
                type="button"
                onClick={() =>
                  updateContact({
                    terminalIntroLines: [...data.contact.terminalIntroLines, "New line"],
                  })
                }
                className="text-xs text-primary"
              >
                + Add line
              </button>
            </div>
            {data.contact.terminalIntroLines.map((line, index) => (
              <div key={index} className="flex gap-3">
                <input
                  className={inputClassName}
                  value={line}
                  onChange={(event) => {
                    const next = [...data.contact.terminalIntroLines];
                    next[index] = event.target.value;
                    updateContact({ terminalIntroLines: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateContact({
                      terminalIntroLines: data.contact.terminalIntroLines.filter((_, idx) => idx !== index),
                    })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <label className="space-y-2">
            <span className="text-sm text-muted-foreground">Command placeholder</span>
            <input
              className={inputClassName}
              value={data.contact.commandPlaceholder}
              onChange={(event) => updateContact({ commandPlaceholder: event.target.value })}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Help toast title</span>
              <input
                className={inputClassName}
                value={data.contact.toastMessages.helpTitle}
                onChange={(event) =>
                  updateContact({
                    toastMessages: { ...data.contact.toastMessages, helpTitle: event.target.value },
                  })
                }
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Help fallback description</span>
              <input
                className={inputClassName}
                value={data.contact.toastMessages.helpFallbackDescription}
                onChange={(event) =>
                  updateContact({
                    toastMessages: {
                      ...data.contact.toastMessages,
                      helpFallbackDescription: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Unknown toast title</span>
              <input
                className={inputClassName}
                value={data.contact.toastMessages.unknownTitle}
                onChange={(event) =>
                  updateContact({
                    toastMessages: { ...data.contact.toastMessages, unknownTitle: event.target.value },
                  })
                }
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Unknown toast description</span>
              <input
                className={inputClassName}
                value={data.contact.toastMessages.unknownDescription}
                onChange={(event) =>
                  updateContact({
                    toastMessages: {
                      ...data.contact.toastMessages,
                      unknownDescription: event.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Quick actions</h3>
              <button
                type="button"
                onClick={() =>
                  updateContact({
                    quickActions: [
                      ...data.contact.quickActions,
                      { label: "New action", href: "https://", icon: "mail" },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add action
              </button>
            </div>
            {data.contact.quickActions.map((action, index) => (
              <div key={`${action.label}-${index}`} className="grid gap-3 md:grid-cols-[2fr_2fr_1fr_auto]">
                <input
                  className={inputClassName}
                  value={action.label}
                  onChange={(event) => {
                    const next = [...data.contact.quickActions];
                    next[index] = { ...action, label: event.target.value };
                    updateContact({ quickActions: next });
                  }}
                />
                <input
                  className={inputClassName}
                  value={action.href}
                  onChange={(event) => {
                    const next = [...data.contact.quickActions];
                    next[index] = { ...action, href: event.target.value };
                    updateContact({ quickActions: next });
                  }}
                />
                <select
                  className={inputClassName}
                  value={action.icon}
                  onChange={(event) => {
                    const next = [...data.contact.quickActions];
                    next[index] = { ...action, icon: event.target.value as IconKey };
                    updateContact({ quickActions: next });
                  }}
                >
                  {contactIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    updateContact({
                      quickActions: data.contact.quickActions.filter((_, idx) => idx !== index),
                    })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Info cards</h3>
              <button
                type="button"
                onClick={() =>
                  updateContact({
                    infoCards: [
                      ...data.contact.infoCards,
                      { label: "NEW", value: "", icon: "map" },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add card
              </button>
            </div>
            {data.contact.infoCards.map((card, index) => (
              <div key={`${card.label}-${index}`} className="grid gap-3 md:grid-cols-[1fr_2fr_2fr_1fr_auto]">
                <input
                  className={inputClassName}
                  value={card.label}
                  onChange={(event) => {
                    const next = [...data.contact.infoCards];
                    next[index] = { ...card, label: event.target.value };
                    updateContact({ infoCards: next });
                  }}
                />
                <input
                  className={inputClassName}
                  value={card.value}
                  onChange={(event) => {
                    const next = [...data.contact.infoCards];
                    next[index] = { ...card, value: event.target.value };
                    updateContact({ infoCards: next });
                  }}
                />
                <input
                  className={inputClassName}
                  placeholder="Optional link"
                  value={card.href ?? ""}
                  onChange={(event) => {
                    const next = [...data.contact.infoCards];
                    next[index] = {
                      ...card,
                      href: event.target.value.trim() === "" ? undefined : event.target.value,
                    };
                    updateContact({ infoCards: next });
                  }}
                />
                <select
                  className={inputClassName}
                  value={card.icon}
                  onChange={(event) => {
                    const next = [...data.contact.infoCards];
                    next[index] = { ...card, icon: event.target.value as IconKey };
                    updateContact({ infoCards: next });
                  }}
                >
                  {contactIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    updateContact({
                      infoCards: data.contact.infoCards.filter((_, idx) => idx !== index),
                    })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Commands</h3>
              <button
                type="button"
                onClick={() =>
                  updateContact({
                    commands: [
                      ...data.contact.commands,
                      { command: "new", action: { type: "url", value: "https://" } },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add command
              </button>
            </div>
            {data.contact.commands.map((command, index) => (
              <div key={`${command.command}-${index}`} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_2fr_auto]">
                <input
                  className={inputClassName}
                  value={command.command}
                  onChange={(event) => {
                    const next = [...data.contact.commands];
                    next[index] = { ...command, command: event.target.value };
                    updateContact({ commands: next });
                  }}
                />
                <input
                  className={inputClassName}
                  placeholder="Aliases (comma separated)"
                  value={command.aliases?.join(", ") ?? ""}
                  onChange={(event) => {
                    const next = [...data.contact.commands];
                    next[index] = {
                      ...command,
                      aliases: event.target.value
                        .split(",")
                        .map((alias) => alias.trim())
                        .filter(Boolean),
                    };
                    updateContact({ commands: next });
                  }}
                />
                <select
                  className={inputClassName}
                  value={command.action.type}
                  onChange={(event) => {
                    const next = [...data.contact.commands];
                    next[index] = {
                      ...command,
                      action: { ...command.action, type: event.target.value as "mailto" | "tel" | "url" },
                    };
                    updateContact({ commands: next });
                  }}
                >
                  <option value="mailto">Mail</option>
                  <option value="tel">Phone</option>
                  <option value="url">URL</option>
                </select>
                <input
                  className={inputClassName}
                  value={command.action.value}
                  onChange={(event) => {
                    const next = [...data.contact.commands];
                    next[index] = {
                      ...command,
                      action: { ...command.action, value: event.target.value },
                    };
                    updateContact({ commands: next });
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateContact({ commands: data.contact.commands.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClassName}>
          <h2 className="text-xl font-semibold">Footer</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm text-muted-foreground">Tagline</span>
              <input
                className={inputClassName}
                value={data.footer.tagline}
                onChange={(event) => updateFooter({ tagline: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Version</span>
              <input
                className={inputClassName}
                value={data.footer.version}
                onChange={(event) => updateFooter({ version: event.target.value })}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted-foreground">Year</span>
              <input
                className={inputClassName}
                value={data.footer.year}
                onChange={(event) => updateFooter({ year: event.target.value })}
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Social links</h3>
              <button
                type="button"
                onClick={() =>
                  updateFooter({
                    socialLinks: [
                      ...data.footer.socialLinks,
                      { label: "New", url: "https://", icon: "github" },
                    ],
                  })
                }
                className="text-xs text-primary"
              >
                + Add link
              </button>
            </div>
            {data.footer.socialLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="grid gap-3 md:grid-cols-[2fr_2fr_1fr_auto]">
                <input
                  className={inputClassName}
                  value={link.label}
                  onChange={(event) => {
                    const next = [...data.footer.socialLinks];
                    next[index] = { ...link, label: event.target.value };
                    updateFooter({ socialLinks: next });
                  }}
                />
                <input
                  className={inputClassName}
                  value={link.url}
                  onChange={(event) => {
                    const next = [...data.footer.socialLinks];
                    next[index] = { ...link, url: event.target.value };
                    updateFooter({ socialLinks: next });
                  }}
                />
                <select
                  className={inputClassName}
                  value={link.icon}
                  onChange={(event) => {
                    const next = [...data.footer.socialLinks];
                    next[index] = { ...link, icon: event.target.value as IconKey };
                    updateFooter({ socialLinks: next });
                  }}
                >
                  {footerIconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    updateFooter({ socialLinks: data.footer.socialLinks.filter((_, idx) => idx !== index) })
                  }
                  className="text-xs text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
