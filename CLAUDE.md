# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Marius Mercier, a PhD student in Social Psychology. The site has been migrated from Create React App to Next.js 15.1.0 with the App Router. It's configured for static export and automatically deploys to GitHub Pages.

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
The project is transitioning from Create React App to Next.js. Legacy code exists in:
- `src/pages_old/` - Previous React Router pages
- `src/layouts_old/` - Previous layout components

### Core Structure (Next.js App Router)
- **app/**: Next.js App Router pages
  - `layout.js`: Root layout with providers
  - `page.js`: Home page (About)
  - `providers.js`: Client-side providers wrapper
  - Individual page directories: `contact/`, `publications/`, `resume/`
- **src/components/**: Reusable UI components organized by feature
- **src/data/**: Static data files for content and configuration
- **src/static/css/**: SCSS files with structured architecture

### Data Management
- **src/data/about.md**: About page content in Markdown
- **src/data/publications.md**: Publications content in Markdown
- **src/data/resume/**: Resume data (skills.js, work.js, education.js, etc.)
- **src/data/contact.js**: Social media links and contact information
- **src/data/routes.js**: Navigation route definitions

### Static Assets
- **public/cv/**: LaTeX CV source and PDF output
- **public/files/**: Publication PDFs
- **public/images/**: Images, favicons, and app icons
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

### Adding New Pages
1. Create new directory in `app/` with `page.js`
2. Add route to `src/data/routes.js`
3. Create corresponding SCSS file in `src/static/css/pages/`

### Styling
- Main stylesheet: `src/static/css/main.scss`
- Component styles in `src/static/css/components/`
- Page-specific styles in `src/static/css/pages/`
- Utility files in `src/static/css/libs/`

## Important Notes

- Projects and Stats pages are currently disabled in routes.js
- CV is maintained as LaTeX in `public/cv/` - rebuild PDF after changes
- Publication PDFs stored in `public/files/`
- The project uses client-side navigation despite static export
- Some components still use legacy PropTypes instead of TypeScript