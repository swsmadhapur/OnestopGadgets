# Operations, Deployment & CI/CD Manual — One Stop Gadgets

> **Environment:** Docker / Nginx / PHP 8.3 FPM / MySQL 8.4 LTS / Redis 7 / phpMyAdmin  
> **Repository:** `c:\one stop Gadgets`

---

## 1. Local Development via Docker Compose

### 1.1 Quickstart
To launch the full local development stack:
```bash
cd infra/docker
docker-compose up -d --build
```

### 1.2 Service Port Topology
- **Frontend SPA (Vite / React):** `http://localhost:3000`
- **Backend API (Nginx / Laravel):** `http://localhost:8080/api/v1`
- **MySQL 8.4 LTS:** `localhost:3306` (Internal network only in production)
- **phpMyAdmin (Isolated DB Management):** `http://localhost:8081` (Restricted to local development / VPN in production)
- **Redis 7:** `localhost:6379`

---

## 2. phpMyAdmin Security Isolation Guidelines

1. **Production Isolation:** phpMyAdmin must NEVER be exposed on public DNS (e.g. `pma.onestopgadgets.com`).
2. **Access Control:**
   - Bind phpMyAdmin strictly to internal private VPC subnet (`10.0.0.0/16`) or Tailscale / WireGuard admin VPN.
   - Enforce HTTP Basic Authentication at Nginx ingress prior to phpMyAdmin login screen.
   - Enforce IP allowlist in Nginx config (`allow 192.168.1.0/24; deny all;`).

---

## 3. Database Migration & Seeding Commands

Once containers are active:
```bash
# Run all 18 database migrations
docker-compose exec app php artisan migrate

# Seed initial roles, demo merchants, and categories
docker-compose exec app php artisan db:seed

# Inspect schema in phpMyAdmin
open http://localhost:8081
```

---

## 4. Disaster Recovery & Automated Backups

- **Daily Logical Backups:** Managed mysqldump runs daily at 02:00 UTC, encrypts with GPG, and pushes to an off-site private S3 bucket.
- **Point-in-Time Recovery:** MySQL binary logging (`binlog`) enabled with 7-day retention.
- **Health Checks:** `/api/v1/health` probes database connectivity, Redis ping, and queue worker status.
