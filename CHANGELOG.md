# Changelog

## [Unreleased] - 2026-02-05

### Added
- Dashboard page with launch analytics and charts
  - Launches by Year: ComposedChart showing total launches and success trend line
  - Success Rate: Pie chart displaying successful vs failed launches
  - Overview stats cards (Total Launches, Successful, Upcoming)
- Chart components with recharts library
  - `LaunchsByYear` component: Bar chart with trend line
  - `SuccessRatePie` component: Donut pie chart with percentage badge
- `getAllLaunches()` API function for fetching complete launch data for charts


## [Unreleased] - 2026-02-03

### Added
- Dynamic Footer with real-time SpaceX API data
  - Live statistics fetched from SpaceX API (Total Launches, Landings, Reflights)
  - `getLaunchStats()` function in spacexApi service
- Error handling for API calls with graceful fallback to default values

### Changed
- Replaced Font Awesome icons with Lucide React icons throughout the application
- Removed all Font Awesome packages and webfonts
- Updated all components to use inline Lucide SVG icons instead of CSS pseudo-elements
- Refactored Footer component to be an async Server Component
- Footer now uses Lucide `Rocket` icon instead of Font Awesome

### Fixed
- Favorite star button jumping on hover (transform conflict resolved)

## [Previous] - 2026-01-30

### Added
- Local Font Awesome package (`@fortawesome/fontawesome-free`)
- Font files served from public/webfonts directory

### Changed
- Replaced Font Awesome CDN import with local `@font-face` declarations
- Improved offline support and faster icon loading

## [Previous] - 2026-01-28

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