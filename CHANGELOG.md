# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2025-12-22

### Added

- Implemented URL search params (`/launches?search=falcon&sort=date_utc&order=desc`) for server-side filtering, replacing current client-side filtering for better SEO and performance.


### Changed


### Known Issues
- Next.js Console Error - DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.

