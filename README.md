# Portfolio — Maxime Lauber

Site vitrine statique (HTML/CSS/JS). Les projets phares pointent vers GitHub ; la section « Sur GitHub » charge les dépôts publics via l’API (`CloudDown`).

## Fichiers

| Fichier | Rôle |
|---------|------|
| `index.html` | Page principale |
| `styles.css` | Styles |
| `script.js` | Thème, formulaire mailto, sync GitHub |
| `pp.png` | Photo profil |

## Preview local

```bash
cd portfolio
python3 -m http.server 8080 --bind 127.0.0.1
# → http://127.0.0.1:8080
```

## Déploiement

Push sur `main` → GitHub Pages (repo `CloudDown/portfolio`).

Profil GitHub : [github.com/CloudDown](https://github.com/CloudDown).

Les coordonnées dans `index.html` sont **publiques** (vitrine volontaire).
