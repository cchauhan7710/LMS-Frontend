import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  // load theme BEFORE first render
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sushil-academy-theme') || 'light';
  });

  const [colorTheme, setColorThemeState] = useState(() => {
    return localStorage.getItem('sushil-academy-color-theme') || 'orange';
  });

  // apply theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('sushil-academy-theme', theme);
  }, [theme]);

  // apply color theme
  useEffect(() => {
    const root = document.documentElement;

    ['orange', 'red', 'green', 'blue', 'purple'].forEach(color => {
      root.classList.remove(`theme-${color}`);
    });

    root.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  const setColorTheme = (color) => {
    setColorThemeState(color);
    localStorage.setItem('sushil-academy-color-theme', color);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
