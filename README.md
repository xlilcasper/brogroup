# BRO – Brothers Reclaiming Ourselves

> **Strength • Support • Hope**

Website for [brogroup.org](https://brogroup.org) — a peer-led support community for male survivors of sexual abuse and assault.

---

## 📁 Project Structure

```
brogroup/
├── index.html              # Home page (single scrolling landing)
├── resources.html          # Resources page (crisis, books, orgs)
├── for-professionals.html  # For Professionals page
├── contact.html            # Contact page with form
├── favicon.svg             # SVG favicon
├── css/
│   └── styles.css          # All styles (custom properties + components)
├── js/
│   └── main.js             # All interactions (nav, reveal, form)
└── README.md               # This file
```

**No build step required.** No framework, no bundler, no database. Plain HTML/CSS/JS.

---

## 🚀 Getting Started

1. **Open directly in a browser:**
   Double-click `index.html` or serve with any static server:

   ```bash
   # Python
   python -m http.server 8000

   # Node
   npx serve .

   # VS Code: Live Server extension
   ```

2. **Deploy:**
   Upload the folder to any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a traditional web host via FTP.

---

## ✏️ How to Edit

### Text / Content
Open each `.html` file and edit the content directly. All pages are static HTML.

### Colors / Fonts
Edit the CSS custom properties at the top of `css/styles.css`:

```css
:root {
  --clr-bg:     #121212;   /* Background */
  --clr-gold:   #E2B04A;   /* Accent */
  --clr-slate:  #4C647A;   /* Secondary accent */
  --clr-text:   #F5F5F5;  /* Body text */
}
```

### Images
Replace Unsplash URLs in `<img src="...">` attributes with your own images. To use local images, place them in an `images/` folder and reference them relatively (e.g., `images/hero.jpg`).

### Meeting Times / Addresses
Search for `<!-- EDIT:` markers in the HTML files — meeting details are clearly marked for easy updating.

### Contact Form
The contact form on `contact.html` is configured to use [Formspree](https://formspree.io) for free form submissions without a backend.

1. Create a free Formspree account at [formspree.io](https://formspree.io)
2. Create a new form and copy your **Form ID**
3. In `js/main.js`, replace `YOUR_FORM_ID` with your actual Formspree form ID:

```js
// In js/main.js
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### SEO
Update the `<meta>` tags in each HTML file's `<head>`:
- `title` — page title
- `meta name="description"` — brief page description
- Keywords are listed in `index.html`

### Analytics
Add your analytics snippet (Google Analytics, Plausible, etc.) just before the closing `</head>` tag in each HTML file.

---

## 🎨 Design Decisions

- **Dark charcoal** background (#121212) — chosen intentionally for a sensitive subject matter. Calming, not clinical.
- **Warm gold** (#E2B04A) — evoking hope and warmth, distinct from the cold blue of most medical/clinical sites.
- **Slate blue** (#4C647A) — mountain tones that connect to the mountain imagery in the logo.
- **Inter font** — modern, accessible, excellent readability.
- **Rounded corners + generous whitespace** — softness, approachability.
- **No photography of sad/dark imagery** — only hopeful nature scenes (sunrise, mountains, light).

---

## ♿ Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`)
- ARIA labels on icon-only buttons
- `aria-expanded` on mobile nav toggle
- `aria-live` on form error regions
- Keyboard navigable (tab order, focus styles)
- `prefers-reduced-motion` respected in CSS animations
- Color contrast meets WCAG AA

---

## 📱 Responsive

Built mobile-first. Breakpoints:
- `< 640px` — single column, stacked layouts
- `640–768px` — tablet adjustments
- `768px+` — desktop layouts

---

## 📝 Content Editing Tips

- **FAQ** — Edit `index.html` around line 220. Add/remove `<details>` blocks.
- **Meeting info** — Edit the "Meeting Information" section in `index.html`.
- **Resources** — Edit `resources.html`. Cards use the `.resource-card` class.
- **Professionals flyer** — Currently a placeholder. Replace with an actual PDF link and remove the placeholder UI.

---

## 🔒 Security Notes

- Static files only — no server-side code, no databases
- Contact form submissions handled by Formspree (not stored on your server)
- No user accounts, no cookies, no tracking scripts included by default
- HTTPS recommended for deployment

---

## 📋 Acceptance Test

> "If a man who has never told anyone what happened to him visits the website at 2:00 a.m., he should leave feeling safer, more hopeful, and comfortable attending a meeting."

Every change should pass this test.

---

*Built with care. No man should have to heal alone.*
