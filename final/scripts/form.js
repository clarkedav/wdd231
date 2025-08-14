document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const ts = document.querySelector('#timestamp');
  if (ts) ts.value = new Date().toISOString();

  form?.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default submit

    const get = id => document.querySelector(`#${id}`)?.value?.trim() ?? '';
    localStorage.setItem('firstName', get('firstName'));
    localStorage.setItem('lastName', get('lastName'));
    localStorage.setItem('email', get('email'));
    localStorage.setItem('phone', get('phone'));
    localStorage.setItem('message', get('message') || '');
    localStorage.setItem('timestamp', ts?.value || '');

    // redirect to thank-you page
    window.location.href = 'thankyou.html';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('out-first').textContent = localStorage.getItem('firstName') || 'N/A';
  document.getElementById('out-last').textContent = localStorage.getItem('lastName') || 'N/A';
  document.getElementById('out-email').textContent = localStorage.getItem('email') || 'N/A';
  document.getElementById('out-phone').textContent = localStorage.getItem('phone') || 'N/A';
  document.getElementById('out-ts').textContent = localStorage.getItem('timestamp') 
    ? new Date(localStorage.getItem('timestamp')).toLocaleString() 
    : 'N/A';
});

