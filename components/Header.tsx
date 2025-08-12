import useThemeStore from "@/store";
import { IconBrightness } from "@tabler/icons-react";
import React from "react";

const Header = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 flex justify-end p-4">
      <button
        onClick={handleThemeChange}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <IconBrightness className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      </button>
    </div>
  );
};

export default Header;
