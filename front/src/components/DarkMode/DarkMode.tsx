"use client";
import { useEffect, useState } from "react";

const DarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // Si el tema es "system", seguir el modo del sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      localStorage.setItem("theme", "system");
    }
  }, [theme]);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 rounded ${theme === "light" ? "bg-quaternary text-white" : "bg-gray-200 dark:bg-tertiary dark:text-white"}`}
      >
        Claro
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 rounded ${theme === "dark" ? "bg-quaternary text-white" : "bg-gray-200 dark:bg-tertiary dark:text-white"}`}
      >
        Oscuro
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`px-4 py-2 rounded ${theme === "system" ? "bg-quaternary text-white" : "bg-gray-200 dark:bg-tertiary dark:text-white"}`}
      >
        Automático
      </button>
    </div>
  );
};

export default DarkMode;
