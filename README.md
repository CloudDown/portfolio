# Portfolio — Maxime Lauber

Static showcase site (HTML/CSS/JS). Featured projects link to GitHub; the “On GitHub” section loads public repos via the API (`CloudDown`).

## Files

| File | Role |
|------|------|
| `index.html` | Main page |
| `styles.css` | Styles |
| `script.js` | Theme, mailto form, GitHub sync |
| `pp.png` | Profile photo |

## Local preview

```bash
cd portfolio
python3 -m http.server 8080 --bind 127.0.0.1
# → http://127.0.0.1:8080
```

## Deployment

Push to `main` → GitHub Pages (repo `CloudDown/portfolio`).

GitHub profile: [github.com/CloudDown](https://github.com/CloudDown).

Contact details in `index.html` are **public** (intentional showcase).
