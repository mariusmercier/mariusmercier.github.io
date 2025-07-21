# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Marius Mercier, a PhD student in Social Psychology. The site is built as a React-based Jamstack application that automatically deploys to GitHub Pages. The website features pages for About, Resume, Publications, and Contact information.

## Key Technologies

- **React 18** with React Router for navigation
- **SCSS** for styling with a component-based structure
- **react-snap** for static site generation and pre-rendering
- **FontAwesome** for icons
- **markdown-to-jsx** for content rendering
- **Jest** and React Testing Library for testing
- **ESLint** with Airbnb config for code linting
- **GitHub Actions** for automated deployment

## Common Commands

### Development
```bash
npm start          # Start development server (localhost:3000)
npm run build      # Build for production
npm run lint       # Run ESLint
npm test           # Run Jest tests
```

### Deployment
```bash
npm run predeploy  # Build and render static site (includes react-snap)
npm run analyze    # Analyze bundle size
```

### Node Version
Use Node.js v20.16.0 (specified in .nvmrc)

## Architecture

### Core Structure
- **src/App.js**: Main application component with lazy-loaded routes
- **src/layouts/Main.js**: Layout wrapper with navigation, sidebar, and SEO components
- **src/pages/**: Page components (About, Resume, Publications, Contact, etc.)
- **src/components/**: Reusable UI components organized by feature
- **src/data/**: Static data files for content, skills, work experience, etc.

### Page Structure
Each page follows a consistent pattern:
- Uses the Main layout wrapper
- Includes page-specific title and meta description
- Lazy-loaded for performance optimization

### Data Management
- **src/data/about.md**: About page content in Markdown
- **src/data/resume/**: Resume data (skills, work experience, education)
- **src/data/contact.js**: Social media links and contact information
- **src/data/routes.js**: Navigation route definitions

### Static Assets
- **public/**: Static files including CV, papers, images, and SEO files
- **src/static/css/**: SCSS files organized by components, layout, and pages
- Uses a structured CSS architecture with variables, mixins, and component-specific styles

## Key Features

### Static Site Generation
- Uses react-snap for pre-rendering all routes
- Generates static HTML for better SEO and performance
- Configured with retry logic in GitHub Actions due to react-snap flakiness

### SEO and Analytics
- react-helmet-async for meta tags and titles
- Google Analytics integration (GA4)
- Sitemap.xml and robots.txt included
- Favicon and app icons configured

### Responsive Design
- Mobile-first SCSS approach
- Hamburger menu for mobile navigation
- Responsive grid system for projects and skills

## Testing

- Jest configuration with module name mapping for CSS and Markdown files
- React Testing Library for component testing
- Single test file: `src/__tests__/App.test.js`

## Deployment

### GitHub Pages
- Automatic deployment via GitHub Actions on pushes to main branch
- Uses Node.js setup with caching
- Builds and renders with retry logic for stability
- Configures and deploys to GitHub Pages environment

### Environment Variables
- `REACT_APP_GA_TRACKING_ID`: Google Analytics tracking ID
- `PUBLIC_URL`: Base URL for routing (set automatically by React Scripts)

## Content Updates

### Personal Information
- Update `src/data/about.md` for bio content
- Modify `src/data/contact.js` for social media links
- Update `src/data/resume/` files for skills, work experience, and education

### Styling
- Main stylesheet: `src/static/css/main.scss`
- Component styles in `src/static/css/components/`
- Page-specific styles in `src/static/css/pages/`
- Variables and mixins in `src/static/css/libs/`

## Important Notes

- The Projects page is currently commented out in routing
- CV is maintained as a LaTeX file in `public/cv/`
- Publication PDFs are stored in `public/files/`
- Site uses react-snap which can be flaky - deployment includes retry logic
- ESLint uses Airbnb configuration with some customizations