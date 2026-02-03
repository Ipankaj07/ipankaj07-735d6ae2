import { useEffect, useState, type ChangeEvent } from "react";

const themeOptions = [
  { value: "cyber", label: "Cyber" },
  { value: "soft-black", label: "Soft Black" },
  { value: "light", label: "Light" },
  { value: "blue", label: "Blue" },
];

const storageKey = "theme";

const AdminPanel = () => {
  const [theme, setTheme] = useState("cyber");

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    const initialTheme = storedTheme ?? document.documentElement.dataset.theme ?? "cyber";
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
    <aside className="fixed bottom-6 right-6 z-50 rounded-sm border border-border bg-card/90 p-4 text-foreground shadow-lg backdrop-blur">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin Panel</p>
      <div className="mt-3 flex flex-col gap-2">
        <label className="text-xs font-medium text-foreground" htmlFor="theme-select">
          Theme preset
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          className="w-40 rounded-sm border border-border bg-background px-2 py-1 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {themeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default AdminPanel;
