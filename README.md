# One Stop Gadgets — Premium Deals, VIP Membership & Weekly Lucky Dip

> **Platform:** Deals aggregator & VIP membership club with compliant weekly giveaways  
> **Backend:** PHP 8.3 / Laravel 11 / MySQL 8.4 LTS / Redis 7 / phpMyAdmin  
> **Frontend:** React 18 / TypeScript / Vite / Tailwind CSS (Red & Blue Design System)  
> **Brand Identity:** One Stop Gadgets (`design/brand/logo.jpg`)

---

## Repository Structure

```text
one-stop-gadgets/
├── docs/                     # Living Documentation & PRD Specs
│   ├── PRD.md               # Product Requirements Baseline
│   ├── DESIGN_SPEC.md       # Approved UI/UX Design System & Wireframes
│   ├── ARCHITECTURE.md      # System Topology & Technical Architecture
│   ├── DATABASE.md          # Relational Schema (18 Tables) & Data Dictionary
│   ├── API.md               # Versioned REST API v1 Specification
│   ├── SECURITY.md          # DPDP Act 2023, Open Redirect & RBAC Threat Model
│   ├── LUCKY_DIP_RULES.md   # Compliant 100% Free-Entry Promotion Rules
│   └── OPERATIONS.md        # Docker Compose, phpMyAdmin & Deployment Runbooks
├── design/
│   ├── brand/               # Brand Logo Assets (logo.jpg)
│   └── prototype/           # Interactive Clickable Prototype (index.html)
├── frontend/                # React 18 + TypeScript + Vite SPA
├── backend/                 # Laravel 11 REST API Engine
│   ├── app/                 # Models, Services, Policies, Controllers
│   ├── database/migrations/ # 18 InnoDB MySQL DDL Migrations
│   └── routes/api.php       # Role-Segregated Endpoint Routes
├── infra/
│   ├── docker/              # Multi-container Docker Compose & Dockerfiles
│   └── nginx/               # Nginx Reverse Proxy & Security Headers
└── scripts/
    └── docs-impact-check.sh # CI Living Documentation Impact Validator
```

---

## Quickstart

### 1. View Interactive Design Prototype
Open [design/prototype/index.html](file:///c:/one%20stop%20Gadgets/design/prototype/index.html) directly in Chrome/Edge to test all storefront and admin screens.

### 2. Local Docker Environment
```bash
cd infra/docker
docker-compose up -d --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api/v1`
- phpMyAdmin: `http://localhost:8081` (Isolated internal network)

### 3. Frontend Standalone
```bash
cd frontend
npm run dev
```
