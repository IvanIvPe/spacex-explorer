# Changelog

## [Unreleased] - 2026-01-28

### Added
- System theme detection (respects user's OS dark/light mode preference)
- Polymorphic Button component with `asChild` pattern
- Inter font optimization via `next/font/google`

### Changed
- Replaced `dangerouslySetInnerHTML` with Next.js `Script` component for security
- Improved SSR compatibility with no-op storage fallback

### Fixed
- Theme flash on page load (FOUC prevention)
- Invalid HTML nesting (button inside anchor) on home page
- Debounced search firing after filter reset

## [Previous] - 2026-01-26

### Added
- Font Awesome icons and Inter font
- Dark SpaceX-inspired theme with modern effects
- Gradient accents, hover animations, and custom scrollbar
- Dark/Light mode toggle with persistent preference (localStorage)
- Theme store using Zustand for state management
- ThemeToggle component in navbar
- CSS variables for theme-aware colors across all components
- ImageGallery component with lightbox/modal for full-screen viewing
  - Keyboard navigation (arrow keys, escape)
  - Image counter and smooth animations
  - Responsive design with touch support
- Reset Filters button to clear all filters and search
- "Has Pictures" filter to show only launches with/without images

### Changed
- Redesigned navbar, buttons, cards, and filters with dark styling
- Updated all components to use CSS variables for theme support:
  - Navbar, Footer, LaunchList, LaunchDetails, Favorites
  - Button, Loading, Error components
- Improved favorite star visibility in both themes

### Fixed
- Select dropdown arrow glitch
- Button-inside-button styling on home page
- Loading spinner and text visibility in light mode
- Error message visibility in light mode