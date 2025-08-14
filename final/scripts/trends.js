// /final/scripts/trends.js
import { getPref, setPref } from './storage.js';
import { setupModal } from './modal.js';

const state = {
  data: [],
  filtered: [],
  filter: getPref('filterSeason', 'all')
};

const grid = document.querySelector('#trends-grid');
const seasonSelect = document.querySelector('#season');
const modal = setupModal();

function render(items) {
  grid.innerHTML = items.map(item => `
    <article class="card" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" width="800" height="600" loading="lazy">
      <div class="pad">
        <h3>${item.title}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Season:</strong> ${item.season}</p>
        <p>${item.description}</p>
      </div>
      <div class="pad" style="border-top:1px solid #eee;">
        <button class="btn" data-open="${item.id}">Details</button>
      </div>
    </article>
  `).join('');
}

function applyFilter() {
  const f = state.filter;
  state.filtered = f === 'all' ? state.data : state.data.filter(x => x.season === f);
  render(state.filtered);
}

function wireCardClicks() {
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (!btn) return;
    const id = Number(btn.dataset.open);
    const item = state.data.find(x => x.id === id);
    if (!item) return;

    modal.dialog.querySelector('.dialog-content').innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="800" height="600" loading="lazy" style="width:100%;height:auto;border-radius:8px;">
      <h3 style="margin:.6rem 0 0">${item.title}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Season:</strong> ${item.season}</p>
      <p>${item.longDescription}</p>
    `;
    modal.open();
  });
}

async function init() {
  try {
    const res = await fetch('./data/trends.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    // Ensure at least 15
    state.data = json.items.slice(0, 15).map((x, i) => ({ id: i+1, ...x }));
    seasonSelect.value = state.filter;
    applyFilter();
    wireCardClicks();

    seasonSelect.addEventListener('change', () => {
      state.filter = seasonSelect.value;
      setPref('filterSeason', state.filter);
      applyFilter();
    });

  } catch (err) {
    grid.innerHTML = `<p>Sorry, we couldn’t load trends right now. Please try again later.</p>`;
    console.error(err);
  }
}

init();
