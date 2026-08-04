/* Small progressive enhancements: mobile nav, theme toggle, photo lightbox.
   Everything here is optional — the site works fine without JS. */

// --- Mobile navigation -----------------------------------------------------

const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// --- Theme toggle ----------------------------------------------------------

const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    // Light is the default regardless of the visitor's system setting.
    const current = document.documentElement.dataset.theme || 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* private browsing — the choice just won't persist */
    }
  });
}

// --- Lightbox for the Nerd Alert photo grid --------------------------------

const photos = document.querySelectorAll('.photo-card img');

if (photos.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <figure style="margin:0">
      <img alt="">
      <figcaption></figcaption>
    </figure>`;
  document.body.append(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('figcaption');

  photos.forEach((photo) => {
    photo.addEventListener('click', () => {
      lightboxImg.src = photo.currentSrc || photo.src;
      lightboxImg.alt = photo.alt;
      lightboxCaption.textContent =
        photo.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());

  // Click anywhere outside the image to dismiss.
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}
