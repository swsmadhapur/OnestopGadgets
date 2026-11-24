# Technical Architecture Document — One Stop Gadgets

> **Document:** Architecture, Security & Data Model Specification  
> **Brand Name:** One Stop Gadgets  
> **Backend Framework:** PHP 8.3+ / Laravel 11+  
> **Database:** MySQL 8.4 LTS (InnoDB, strict mode) with phpMyAdmin (isolated)  
> **Frontend:** React 18+ / TypeScript / Vite / Tailwind CSS  
> **Status:** Architecture Proposal — Subject to Design Approval Gate

---

## 1. System Topology & Security Boundaries

```text
Visitor Browser (React SPA)
       │ (HTTPS / TLS 1.3 / WAF)
       ▼
  Cloudflare / CDN Edge
       │
       ▼
  Nginx Reverse Proxy (SSL Termination, Rate Limiting, CSP Headers)
       │
       ▼
  Laravel 11 REST API Engine (/api/v1)
       ├── Session & CSRF Auth: Laravel Sanctum
       ├── Server-Side RBAC: Policies & Gate Middleware
       │     ├── Guest
       │     ├── Free User
       │     ├── Paid VIP Subscriber
       │     ├── Deal Admin (Isolated /admin)
       │     └── Super Admin (MFA Protected /super-admin)
       ├── Cache & Queue Manager: Redis 7.x
       └── Services:
             ├── Deal Catalog & Category Filter Engine
             ├── Outbound Safe Redirect Controller (Allowlisted Hosts)
             ├── Hosted Checkout & Idempotent Webhook Processor (Razorpay/Cashfree)
             └── Provably Fair Lucky Dip Draw Engine (CSPRNG + Entropy Commitments)
       │
       ├── MySQL 8.4 LTS Database (Relational Schema with Encrypted PII)
       ├── phpMyAdmin (Internal VPC / VPN Only, Never Public)
       ├── S3-Compatible Media Bucket (Deals, Brand & Prize Media)
       └── External Merchant Affiliate Networks (Outbound Click Tracking)
```

---

## 2. Relational Schema Matrix (MySQL 8.4 LTS)

| Table | Primary Role | Security & Indexing Rules |
|---|---|---|
| `users` | User credentials & profiles | Unique `email`, indexed `phone_e164`, Argon2id password hash |
| `roles` | `super_admin`, `admin`, `customer` | Immutable system codes |
| `user_roles` | Role assignment | Composite unique `(user_id, role_id)` |
| `merchants` | External stores (Amazon, Flipkart, etc.) | Unique `approved_domain` list |
| `categories` | Gadget taxonomy | Self-referencing parent/child tree, unique `slug` |
| `deals` | Gadget offers & pricing claims | Indexed `(visibility, status, starts_at, ends_at)` |
| `deal_links` | Affiliate destination URLs | Encrypted destination URL, strict host check |
| `deal_clicks` | Outbound analytics | Minimised PII, masked user agents, rate-limited logging |
| `subscription_plans` | Monthly, Quarterly, Annual tiers | Unique plan code, integer minor amounts (e.g., paisa) |
| `subscription_orders` | Checkout intent records | Unique `gateway_order_id`, foreign key to user |
| `payments` | Completed financial transactions | Unique `gateway_payment_id`, atomic status update |
| `payment_webhook_events` | Idempotency event registry | Unique `(provider, event_id)` preventing double processing |
| `subscriptions` | Active member entitlements | Indexed `(user_id, status, ends_at)` |
| `lucky_dip_rounds` | Weekly giveaway round definitions | Start/end timestamps (`Asia/Kolkata`), status machine |
| `lucky_dip_entries` | Participant submission register | **UNIQUE `(round_id, user_id)`**, AES-256 encrypted PII snapshots |
| `lucky_dip_draws` | Provably fair draw audit ledger | Algorithm version, snapshot hash, entropy commitment & reveal |
| `lucky_dip_winners` | Published prize recipients | Unique `(round_id, prize_slot)`, verification checklist audit |
| `audit_logs` | Immutable operational audit trail | Append-only, actor IP masked, before/after JSON diff |
| `system_settings` | Platform configurations | Key-value store, Super Admin write-only |

---

## 3. Cryptographic Draw Selection Protocol

To prevent fraud and comply with promotional transparency:
1. **Round Close:** At round cutoff timestamp, `lucky_dip_rounds` status shifts to `closed`.
2. **Snapshot Creation:** A deterministic hash `SHA-256` of all verified, eligible `entry_id`s is computed and frozen into `eligible_set_hash`.
3. **Entropy Commitment:** The system combines server entropy (`random_bytes(32)`) with external high-entropy seeds.
4. **Deterministic Selection:** Winner entry index is computed: `winner_index = HMAC_SHA256(seed, snapshot_hash) % total_eligible`.
5. **Two-Stage Verification:** Super Admin verifies age, identity, and eligibility before executing the public announcement action.
