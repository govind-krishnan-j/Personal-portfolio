# Portfolio Website

A fast, responsive, single-page portfolio built with **plain HTML, CSS, and JavaScript** — no
build step, no frameworks, no dependencies to install. Just open the file and it runs.

## Features
- Scroll-triggered reveal animations (vanilla `IntersectionObserver`)
- Scroll-progress bar + sticky nav that highlights the current section
- Light / dark theme toggle (remembers your choice)
- Rotating hero role text
- Fully responsive (mobile menu included)
- Accessible: semantic HTML, keyboard focus styles, and it honours "reduce motion"

## File structure
```
portfolio/
├── index.html        ← all the content (edit this first)
├── css/
│   └── styles.css     ← all styling + theme colors
├── js/
│   └── main.js        ← animations, theme toggle, nav behavior
├── assets/            ← put resume.pdf and your photo here
└── README.md
```

## How to view it
Just **double-click `index.html`** — it opens in your browser. No server needed.

> Tip: for live-reload while editing, use VS Code's "Live Server" extension, or run a tiny
> local server with Python: `python -m http.server` then visit `http://localhost:8000`.

## How to make it yours
Everything you need to change is marked with `<!-- TODO -->` comments in `index.html`. Search for
`TODO` and work through them:

1. **Name, role & tagline** — top of `index.html` (title, nav logo, hero).
2. **Bio** — the About section.
3. **Rotating roles** — edit the `roles` list near the bottom of `js/main.js`.
4. **Skills** — add/remove `<li>` items in the Skills section.
5. **Projects** — update the two real cards; copy the template card (`<article class="card ...">`)
   to add more. Point the "Code" / "Live Demo" links at your real URLs.
6. **Experience** — fill in the timeline entries, or delete the whole `#experience` section.
7. **Contact + socials** — replace `your.email@example.com` and the `#` LinkedIn links everywhere.
8. **Resume** — drop `resume.pdf` into `assets/` (the Resume button already links to it).
9. **Photo** — put an image in `assets/` and replace the `<div class="avatar">GK</div>` in About with
   `<img src="assets/photo.jpg" alt="Your Name">`.

### Change the colors
Open `css/styles.css` and edit the variables at the top — `:root` controls the **light** theme and
`[data-theme="dark"]` the **dark** theme. Change `--accent` to re-brand the whole site in one edit.

## Deploy it (free)

**GitHub Pages**
1. Create a new GitHub repo and push these files to it.
2. Repo → **Settings → Pages** → Source: `main` branch, `/root` → **Save**.
3. Your site goes live at `https://<username>.github.io/<repo>/` within a minute.

**Netlify / Vercel** — even simpler: drag-and-drop this folder onto the Netlify dashboard, or import
the repo in Vercel. Both give a free URL and support custom domains.

## Optional: a real contact form
The contact button uses a `mailto:` link. To collect messages without a backend, sign up at
[formspree.io](https://formspree.io) and replace the button with a form:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <input type="email" name="email" placeholder="Your email" required>
  <textarea name="message" placeholder="Your message" required></textarea>
  <button type="submit" class="btn btn--primary">Send</button>
</form>
```
