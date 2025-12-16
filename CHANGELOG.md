# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2025-12-16

### Added

- Added a new reusable `Button` component with a few variants.
- Placed "No Images Available" placeholder text in the `LaunchDetails` component when there are no images to display.
- Favorites page that lists all favorited launches with the ability to remove them from favorites.

### Changed

- Downgraded version of React from `"19.2.0"` to `"19.1.3"` in `package.json` for compatibility reasons.
- Loading and Error states are now reusable components that are used across multiple pages.



### Known Issues
- Next.js Console Error - DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.

## Future Improvements

- **Server-Side Filtering**: Implement URL search params (`/launches?search=falcon&sort=date_utc&order=desc`) for server-side filtering, replacing current client-side filtering for better SEO and performance.

