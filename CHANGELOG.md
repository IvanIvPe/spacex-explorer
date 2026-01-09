# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-01-09

### Added

- Implemented Zustand for state management
- Created centralized favorites store (`useFavoritesStore`)
- Added automatic localStorage persistence for favorites using Zustand middleware

### Changed

- Refactored `Favorites.tsx` to use Zustand store instead of manual localStorage management
- Refactored `LaunchList.tsx` to use Zustand store for favorites state
- Removed manual `useState` and `useEffect` syncing in favor of reactive Zustand store
- Simplified favorites toggle logic across components