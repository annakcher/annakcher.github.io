# Personal website
# Step-by-step guide of making this

Plain static HTML/CSS/JS.

```
index.html          Home — photo, bio, contact, research interests
research.html       Publications, working papers, in-progress projects
cv.html             Embedded + downloadable PDF, plus a short text summary
writing.html        Essays, reviews, shorter pieces
nerd-alert.html     Photo grid (with lightbox) and lists of enthusiasms
assets/css/style.css   All styling, including light/dark themes
assets/js/main.js      Mobile nav, theme toggle, lightbox
assets/img/            Profile photo, favicon, nerd-alert photos
assets/cv/             Put cv.pdf here
```

## Preview it locally

Double-click `index.html`. Every link is relative & everything should work from the local system.

To serve it properly (closer to how GitHub Pages behaves), run either:

```bash
python -m http.server 8000
```

then open <http://localhost:8000>.

## Publishing (or... republishing?) to GitHub Pages

1. Create a GitHub account.
2. Create a **public** repository named `<your-username>.github.io`. IMPORTANT: the name matters;
   that exact form gets you `https://<your-username>.github.io` as the URL.
3. Upload these files to the root of the repo. Easiest path if you're not using git yet:
   on the repo page, **Add file → Upload files**, then drag in everything from this folder.
   With git:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

4. In the repo, go to **Settings → Pages**, set Source to *Deploy from a branch*, branch
   `main`, folder `/ (root)`. Save.
5. Wait a minute or two (it will not be immediate), then visit `https://<your-username>.github.io`.

Every later push republishes automatically, usually within a minute.

### Custom domain (optional, later)

Buy a domain, add a file named `CNAME` at the repo root containing just the domain, and
point your DNS at GitHub's servers per
<https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>.
HTTPS is free and automatic.

## Painting backgrounds

I chose to use Grimshaw paintings as my backgrounds because I love them (although the images I selected might be slightly low quality).
Any page can take a painting as its background. Two steps.

1. Add `class="has-bg"` to that page's `<body>` tag.
2. Name the paintings in a `<style>` block in the same page's `<head>`:

```html
<style>
  body.has-bg::before { background-image: url('assets/img/grimshaw/snow-and-mist-grimshaw.jpg'); }
  [data-theme="dark"] body.has-bg::before { background-image: url('assets/img/grimshaw/a-wintry-moon-grimshaw.jpg'); }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) body.has-bg::before { background-image: url('assets/img/grimshaw/a-wintry-moon-grimshaw.jpg'); }
  }
</style>
```

Use `body.has-bg::before`, not `body::before` — `style.css` styles the layer with that
same selector, and a weaker one here loses to it. That matters if adding
`background-position` to steer the crop (see `index.html`, where a portrait painting
is pulled up toward the sky with `background-position: center 18%`).

The first line is the light-mode painting; the other two are the dark-mode one (two
rules because one covers the theme toggle and the other covers visitors whose system
is set to dark). Use a pale painting for light mode and a dark one for dark mode.

**The image must be named in the page, not in `style.css`.** A relative `url()` is
resolved against the file it's written in, so a path put in `style.css` would send the
browser looking for `assets/css/grimshaw/…` and fail silently. 

Tuning, both in `style.css`:

- `--scrim` — the wash between painting and content (deals with opacity).  Raise the alpha to mute a busy
  painting, lower it to let more through. Light and dark have separate values.
- `body.has-bg main > .wrap` — the translucent content panel. The `86%` in its
  `background` controls how much painting shows through behind your text.

If a page shows a painting, credit it in that page's footer using the
`<span class="credit">` line at the bottom of `index.html` as a template.

## Notes

- The nav bar is duplicated in each HTML file. That's the tradeoff for having no build
  step: if you add a page, add the link in all five files.
- `.nojekyll` tells GitHub Pages to serve the files as-is rather than running them
  through Jekyll. It matters if you ever add a folder starting with an underscore.
- The theme follows the visitor's system light/dark setting; the toggle in the header
  overrides it and remembers the choice.
