// /final/scripts/modal.js
export function setupModal() {
  const backdrop = document.querySelector('.dialog-backdrop');
  if (!backdrop) return;

  const dialog = backdrop.querySelector('.dialog');
  const closeBtn = backdrop.querySelector('.close');

  const close = () => backdrop.classList.remove('open');
  const open = () => backdrop.classList.add('open');

  closeBtn?.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
  });

  return { open, close, backdrop, dialog };
}
