import { useEffect, useState, type ChangeEvent } from "react";

const themeOptions = [
  { value: "monokai", label: "Monokai" },
  { value: "cyber", label: "Cyber" },
  { value: "nord", label: "Nord" },
  { value: "solarized-dark", label: "Solarized Dark" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "blue", label: "Blue" },
  { value: "dracula", label: "Dracula" },
  { value: "soft-black", label: "Soft Black" },
  { value: "light", label: "Light" },
];

const storageKey = "theme";

const ThemeSelector = () => {
  const [theme, setTheme] = useState("monokai");

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    const initialTheme = storedTheme ?? document.documentElement.dataset.theme ?? "monokai";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextTheme = event.target.value;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-medium text-foreground whitespace-nowrap" htmlFor="theme-select">
        Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        className="rounded-sm border border-border bg-background px-2 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
