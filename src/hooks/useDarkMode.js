// src/hooks/useDarkMode.js

import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // 1. Initialize theme state from local storage or default to system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // Check OS preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default if running server-side or environment is unknown
  });

  // The inverse of the current theme (i.e., the theme we are switching to)
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the opposite theme class and add the current one
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Save the preference for persistence
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Returns the toggle function and the *inverse* theme for button text/icon selection
  return [colorTheme, toggleTheme];
};

export default useDarkMode;