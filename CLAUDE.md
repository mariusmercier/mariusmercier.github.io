# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Marius Mercier, a PhD student in Cognitive Psychology. The site has been migrated from Create React App to Next.js 15.1.0 with the App Router. It's configured for static export and automatically deploys to GitHub Pages.

## Key Technologies

- **Next.js 15.1.0** with App Router and static export
- **React 18.3.1** with PropTypes for type checking
- **SCSS** for styling with component-based structure
- **markdown-to-jsx** and **react-markdown** for content rendering
- **FontAwesome** for icons
- **React Burger Menu** for mobile navigation
- **Jest** and React Testing Library for testing
- **ESLint** with Airbnb config
- **GitHub Actions** for automated deployment

## Common Commands

### Development
```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production (generates out/ directory)
npm run lint       # Run ESLint on app/, src/, and lib/
npm test           # Run Jest tests
npm run thumbnails # Render page-1 PNGs of public/files/*.pdf for the papers carousel (needs: brew install poppler)
```

### Deployment
```bash
npm run predeploy  # Alias for build
npm run analyze    # Analyze bundle size
```

### Node Version
Use Node.js v20.16.0 (specified in .nvmrc)

## Architecture

### Migration Status
Migrated from Create React App to Next.js. Legacy CRA code is retained but unused:
- `src/pages_old/` - Previous React Router pages (not wired into the Next.js app)
- `src/layouts_old/` - Previous layout components (not wired into the Next.js app)

### Core Structure (Next.js App Router)
- **app/**: Next.js App Router pages
  - `layout.js`: Root layout with providers
  - `page.js`: Home page (About)
  - `providers.js`: Client-side providers wrapper
  - Individual page directories: `contact/`, `publications/`, `resume/`
- **src/components/**: Reusable UI components organized by feature
  - `Site/SiteScroll.js`: renders the whole single-page site (Intro → About → Publications → CV → Contact); every route mounts it with a different `initialAnchor`
  - `Site/PaperCarousel.js`: the "Selected papers" thumbnail carousel at the top of the Publications section
  - `Site/tokens.js`: `COLORS` / `FONTS` used by the inline styles of the Site components
- **src/data/**: Static data files for content and configuration
- **src/static/css/**: SCSS files with structured architecture
- **lib/**: Shared helpers (`lastUpdated.js`, `markdown.js`)

### Data Management
- **src/data/about.md**: About page content in Markdown (rendered via `markdown-to-jsx`)
- **src/data/publications.js**: Publications data (peer-reviewed + working papers) as structured JS objects
- **src/data/resume/**: Resume data (`skills.js`, `work.js`, `degrees.js`, `courses.js`)
- **src/data/contact.js**: Social media links and contact information
- **src/data/routes.js**: Navigation route definitions
- **src/data/projects.js**, **src/data/stats/**: Data for currently disabled Projects/Stats pages

### Static Assets
- **public/cv/**: LaTeX CV source and PDF output
- **public/files/**: Publication PDFs
- **public/images/**: Images, favicons, and app icons
- **public/images/papers/**: Page-1 thumbnails of the publication PDFs, generated locally by `npm run thumbnails` and committed (CI has no poppler)
- **out/**: Next.js static export output directory

## Key Features

### Static Site Generation
- Configured with `output: 'export'` in next.config.js
- Generates static HTML for GitHub Pages compatibility
- Trailing slashes enabled for proper routing on static hosting

### SEO and Analytics
- React Helmet Async for meta tags management
- Google Analytics 4 integration (ID: G-F60T133RWZ)
- Sitemap.xml and robots.txt in public directory
- Structured metadata in each page component

### Responsive Design
- Mobile-first SCSS approach
- Hamburger menu for mobile navigation
- Component-specific responsive styles

## Testing

- Jest configuration with CSS and Markdown module mocking
- Test files in `src/__tests__/`
- Run individual tests with: `npm test -- --testNamePattern="test name"`

## Deployment

### GitHub Pages
- Automated via GitHub Actions (`.github/workflows/github-pages.yml`)
- Triggers on push to main branch
- Builds static site and deploys from `out/` directory
- Environment variables set during build:
  - `NEXT_PUBLIC_GA_TRACKING_ID`: Google Analytics ID

### Next.js Configuration
Key settings in `next.config.js`:
- Static export mode enabled
- Unoptimized images for static hosting
- Trailing slashes for GitHub Pages compatibility
- Custom webpack config for Markdown files
- ESLint errors ignored during builds

## Content Updates

### Personal Information
- Update `src/data/about.md` for bio content
- Modify `src/data/contact.js` for social media links
- Update `src/data/resume/` files for CV information
- Update `src/data/publications.js` to add/edit publications (PDF, code, DOI, ESM links)

### Adding a Publication PDF
- Drop the file in `public/files/` (e.g. `Mercier-2026a.pdf`)
- Reference it as `https://mariusmercier.github.io/files/<name>.pdf` in `publications.js` (the `public/` prefix is stripped at build time)
- Run `npm run thumbnails` and commit `public/images/papers/<name>.png`. It renders page 1; if the title page is not page 1 (e.g. a publisher's citation cover sheet), add a case to `page_for()` in `scripts/make-paper-thumbnails.sh` and re-run with `--force`
- To show it in the "Selected papers" carousel, give the entry `selected: N` (N = position, 1 = first). Entries without `selected` are not shown; the PDF must be self-hosted (`https://mariusmercier.github.io/files/<name>.pdf` or `/files/<name>.pdf`)

### Adding New Pages
1. Create new directory in `app/` with `page.js`
2. Add route to `src/data/routes.js`
3. Style with inline React style objects; add class rules to `src/static/css/main.scss` only for what inline styles cannot express (pseudo-classes, media queries)

### Styling
- `src/static/css/main.scss` is the only stylesheet imported (by `app/layout.js`); components use inline React style objects with tokens from `src/components/Site/tokens.js`
- Class rules in `main.scss` exist only for what inline styles cannot express (`:hover`, `:disabled`, `::-webkit-scrollbar`, media queries), e.g. `.paper-carousel*`
- The partials under `src/static/css/{libs,pages,components,layout,base}` are legacy and unused

## Important Notes

- Projects and Stats pages are currently disabled in routes.js
- CV is maintained as LaTeX in `public/cv/` - rebuild PDF after changes
- Publication PDFs stored in `public/files/`
- The project uses client-side navigation despite static export
- Some components still use legacy PropTypes instead of TypeScript