// /final/scripts/storage.js
export const getPref = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export const setPref = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};
