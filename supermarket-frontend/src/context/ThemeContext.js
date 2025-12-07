import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // මුලින්ම localStorage එකේ theme එකක් තියෙනවද බලනවා, නැත්නම් 'light' ගන්නවා
  const [theme, setTheme] = useState(localStorage.getItem('appTheme') || 'light');

  useEffect(() => {
    // Theme එක වෙනස් වුනාම Body එකේ class එක මාරු කරනවා
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // LocalStorage එකේ සේව් කරනවා
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// පහසුවෙන් පාවිච්චි කරන්න Hook එකක්
export const useTheme = () => useContext(ThemeContext);