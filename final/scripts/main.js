// /final/scripts/main.js
import { getPref, setPref } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // nav
  const nav = document.querySelector('nav');
  const btn = document.querySelector('.nav-toggle');
  btn?.addEventListener('click', () => nav.classList.toggle('open'));

  // theme (example persistence)
  const themeBtn = document.querySelector('#theme-toggle');
  const pref = getPref('theme', 'light');
  if (pref === 'dark') document.documentElement.classList.add('dark');

  themeBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    setPref('theme', isDark ? 'dark' : 'light');
  });
});
