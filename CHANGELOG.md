# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2025-05-09
### Added
- Initial stable release of `next-template-docker`
- Supports multi-container apps with frontend, backend, and MongoDB
- Docker healthchecks and centralized `.env` support
- Shared Docker network (`appnet`) for inter-container communication
- `apps.json` auto-registration for CLI compatibility
- `.env.example` to simplify configuration for new apps
- Customizable ports for frontend, backend, and Mongo
- Pre-built `Dockerfile`s and `docker-compose.yml` setup
- Improved startup and Mongo connection reliability
