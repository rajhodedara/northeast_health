// src/components/ui/ThemeToggle.jsx

import React from 'react';
import useDarkMode from '../../hooks/useDarkMode'; // Adjust path based on your file structure
import Button from './Button'; // Assuming Button component path
import Icon from '../AppIcon';  // Assuming Icon component path

const ThemeToggle = () => {
  // colorTheme will be 'dark' if we are switching to dark, and 'light' if we are switching to light
  const [colorTheme, toggleTheme] = useDarkMode();

  // We check colorTheme to determine which icon to show (the target theme's icon)
  const iconName = colorTheme === 'dark' ? 'Sun' : 'Moon';

  // For dark mode, set icon color to white
  const iconColor = colorTheme === 'dark' ? 'text-black' : 'text-white';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${colorTheme} mode`}
      className="hidden sm:flex"
    >
      {/* Apply dynamic text color based on theme */}
      <Icon name={iconName} size={20} className={iconColor} />
    </Button>
  );
};

export default ThemeToggle;
