"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

function DarkMode() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleThemeChange = () => {
    currentTheme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div className="h-5">
      <Switch
        className="data-[state=checked]:bg-primary"
        checked={currentTheme === "dark" ? true : false}
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
}

export default DarkMode;
