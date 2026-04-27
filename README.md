# mariusmercier.github.io

Source for my [personal website](https://mariusmercier.github.io/) — a Next.js static site deployed to GitHub Pages.

Forked from [mldangelo/personal-site](https://github.com/mldangelo/personal-site) (MIT).

## Tech stack

- [Next.js 15.1](https://nextjs.org/) (App Router, static export)
- [React 18.3](https://react.dev/)
- SCSS, FontAwesome, `markdown-to-jsx` / `react-markdown`
- Jest + React Testing Library, ESLint (Airbnb)
- Auto-deployed via GitHub Actions to GitHub Pages

## Local development

Requires Node.js v20.16.0 (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
npm test
```

## Project layout

- `app/` — Next.js App Router pages (`page.js`, `contact/`, `publications/`, `resume/`)
- `src/components/` — UI components
- `src/data/` — content (`about.md`, `publications.js`, `contact.js`, `resume/`, `routes.js`)
- `src/static/css/` — SCSS
- `public/files/` — publication PDFs (referenced as `https://mariusmercier.github.io/files/<name>.pdf`)
- `public/cv/` — LaTeX CV source + compiled PDF
- `lib/` — small helpers (`markdown.js`, `lastUpdated.js`)

See [`CLAUDE.md`](./CLAUDE.md) for more detail on architecture and conventions.

## Deployment

Push to `main` triggers `.github/workflows/github-pages.yml`, which builds and deploys `out/`.

## License

MIT — see [`LICENSE`](./LICENSE).
