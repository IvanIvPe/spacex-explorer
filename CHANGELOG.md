# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2025-12-29

### Added

- Implemented debounced search input (500ms) that automatically updates URL query parameters in real-time without requiring form submission.

### Changed

- Separated search functionality from other filters - search now updates instantly with debounce, while timeline, status, sort, and date filters remain on the "Apply Filters" button.
- Modified `updateFilters` function to preserve search parameter from URL when applying other filters, ensuring independent filter management.