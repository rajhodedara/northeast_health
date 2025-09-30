// src/hooks/useDarkMode.js

import { useState, useEffect } from 'react';

/**
 * A custom React hook to manage and persist the theme (light/dark mode).
 * Defaults to 'light' mode if no theme is saved in localStorage.
 */
const useDarkMode = () => {
  // 1. Initialize theme state.
  // The function passed to useState runs only on the initial render.
  const [theme, setTheme] = useState(() => {
    // Check if running in a browser environment.
    if (typeof window !== 'undefined') {
      // Check for a user's previously saved theme in localStorage.
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // If no saved theme, ALWAYS default to 'light' mode.
      return 'light';
    }
    // Default for server-side rendering or other environments.
    return 'light';
  });

  // 2. Determine the opposite theme, useful for the UI of a toggle button.
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  // 3. Use an effect to apply side-effects when the theme state changes.
  useEffect(() => {
    // Ensure this code runs only in the browser.
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement; // This is the <html> tag

    // Update the class on the <html> element.
    root.classList.remove(colorTheme); // Remove the old theme class (e.g., 'dark')
    root.classList.add(theme);       // Add the new theme class (e.g., 'light')

    // Save the user's theme preference in localStorage for future visits.
    localStorage.setItem('theme', theme);

  }, [theme, colorTheme]); // This effect re-runs whenever 'theme' or 'colorTheme' changes.

  // 4. Create a function that toggles the theme state.
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // 5. Return the tools the component will need: the opposite theme name and the toggle function.
  return [colorTheme, toggleTheme];
};

export default useDarkMode;