# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-01-19

### Added


### Changed

- Refactored `Favorites.tsx` to use Zustand store instead of manual localStorage management
- Refactored `LaunchList.tsx` to use Zustand store for favorites state
- Removed server-side data fetching from `app/favorites/page.tsx`
- Moved data fetching to client-side using React Query in `Favorites.tsx` component