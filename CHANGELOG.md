# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-01-19

### Added

- Added consistent sorting to `getLaunchesByIds` function (sorts by date_utc in descending order)
- Added retry functionality to favorites error state with a dedicated retry button
- Added improved empty state in favorites error handling with link to browse launches

### Fixed

- Fixed inconsistent ordering of favorite launches in the UI by adding sort option to API query
- Improved error handling in Favorites component - users can now retry fetching or navigate to browse launches instead of being stuck on error message

---

## [Unreleased] - 2025-12-29

### Added

- Implemented debounced search input (500ms) that automatically updates URL query parameters in real-time without requiring form submission.

### Changed

- Separated search functionality from other filters - search now updates instantly with debounce, while timeline, status, sort, and date filters remain on the "Apply Filters" button.
- Modified `updateFilters` function to preserve search parameter from URL when applying other filters, ensuring independent filter management.
