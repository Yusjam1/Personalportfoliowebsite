# Personal Portfolio Website

Interactive personal portfolio for Yusuf Jamali.

## Stack

- HTML
- CSS
- Vanilla JavaScript
- GitHub Pages (auto deploy workflow included)

## Edit Content

- Profile and section content: `index.html`
- Styles and visual theme: `styles.css`
- Projects list and interactions: `script.js`

To add your own project links, update the `projectList` array in `script.js`.

## Run Locally

You can open `index.html` directly, or use a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Push to GitHub Repo

```bash
git remote add origin https://github.com/Yusjam1/Personalportfoliowebsite.git
git add .
git commit -m "Build personal portfolio website"
git push -u origin main
```

If `origin` already exists, run:

```bash
git remote set-url origin https://github.com/Yusjam1/Personalportfoliowebsite.git
```

## Deploy Anytime

1. Push changes to `main`.
2. In GitHub, open repository Settings -> Pages.
3. Set Source to `GitHub Actions` (one-time setup).
4. The included workflow (`.github/workflows/deploy.yml`) will publish automatically.

Expected Pages URL:

https://yusufjamaliweb-livid.vercel.app/
