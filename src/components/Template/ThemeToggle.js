import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const preferredDark = window.matchMedia
      && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (preferredDark ? 'dark' : 'light');
    setTheme(initial);
    document.body.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle menu-hover"
      aria-label="Toggle dark mode"
      onClick={toggle}
    >
      <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
    </button>
  );
};

export default ThemeToggle;
