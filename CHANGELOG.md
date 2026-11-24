# Changelog — One Stop Gadgets

All notable changes to this project are documented in this file in compliance with the PRD living documentation policy.

## [1.0.0-phase2] - 2026-11-18
### Added
- **Phase 0 & 1 Completed:**
  - Stakeholder approval granted for `PROJECT_EXECUTION_PLAN.md`.
  - Brand identity established for **One Stop Gadgets** with official circular emblem logo.
  - Signature Red & Blue design tokens defined and tested for WCAG 2.2 AA compliance.
  - Interactive clickable prototype deployed to `design/prototype/index.html`.
- **Phase 2 Technical Scaffolding:**
  - Complete 18-table MySQL 8.4 DDL migrations authored in `backend/database/migrations/`.
  - Core Eloquent Models with AES-256 encrypted casts and relationship maps in `backend/app/Models/`.
  - Core Business Services:
    - `RedirectService.php`: Allowlist destination validation and telemetry logging.
    - `DrawService.php`: Provably fair CSPRNG draw engine with SHA-256 entropy commitments.
    - `WebhookService.php`: Idempotent Razorpay/Cashfree webhook reconciliation.
  - Versioned REST API routes defined in `backend/routes/api.php` with role isolation between `/admin` and `/super-admin`.
  - React 18 + TypeScript + Vite frontend scaffolding initialized in `frontend/`.
  - Multi-container Docker infrastructure in `infra/docker/` with isolated phpMyAdmin.
  - Living documentation impact check script in `scripts/docs-impact-check.sh` and CI workflow `.github/workflows/docs-check.yml`.
