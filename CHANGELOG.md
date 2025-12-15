# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2025-12-15

### Added

- Loading & Error States:** Added `loading.tsx` and `error.tsx` for both list and detail routes to handle UI states gracefully.

### Fixed

- Resolved hydration mismatch error by standardizing date formatting to use consistent `en-US` locale with UTC timezone in LaunchDetails component
- Imports of `LaunchDetails` and `LaunchList` components have been corrected to use the proper relative paths.
- Fixed date filtering logic in `LaunchList` component to correctly handle invalid dates when filtering launches by start and end dates.

### Changed

- Changed all `<img>` tags to Next.js `<Image>` component for optimized image loading and performance improvements.
- Refactored API calls from `fetch` to `axios` with centralized `axiosInstance` for better error handling and interceptor support.
- Implemented service layer architecture: `services/spacexApi.ts` handles API logic with reusable functions, wrapped by server actions in `app/api/server/launches.tsx`.
- Removed unnecessary `'use client'` directive from `LaunchDetails` component, converting it to a Server Component for improved performance.
- Updated `next.config.ts` to include `remotePatterns` for external image domains (Flickr, Imgur) to support Next.js Image optimization.

---

## Future Improvements

- **Server-Side Filtering**: Implement URL search params (`/launches?search=falcon&sort=date_utc&order=desc`) for server-side filtering, replacing current client-side filtering for better SEO and performance.

