# REST API Specification — One Stop Gadgets

> **Base URL:** `/api/v1`  
> **Protocol:** HTTPS / JSON REST  
> **Authentication:** Laravel Sanctum Cookie Session (Web) / Bearer Token  
> **Headers:** `Accept: application/json`, `X-CSRF-TOKEN` (for mutating requests)

---

## 1. Authentication & Profile Endpoints

### `POST /api/v1/auth/register`
- **Access:** Public (Guest)
- **Body:** `{ "name": "string", "email": "string", "phone": "string", "password": "string", "password_confirmation": "string" }`
- **Response `201 Created`:** `{ "user": { "id": 1, "name": "Venkata J", "email": "user@example.com" }, "token": "..." }`

### `POST /api/v1/auth/login`
- **Access:** Public (Guest)
- **Body:** `{ "email": "string", "password": "string" }`
- **Response `200 OK`:** `{ "user": { ... }, "roles": ["customer"] }`

### `POST /api/v1/auth/logout`
- **Access:** Authenticated
- **Response `204 No Content`**

### `GET /api/v1/me`
- **Access:** Authenticated
- **Response `200 OK`:** Returns current user profile, active VIP subscription status, and role privileges.

---

## 2. Public & Member Deals Endpoints

### `GET /api/v1/deals`
- **Access:** Public
- **Query Params:** `category`, `search`, `visibility` (public|premium), `merchant`, `page`, `limit`
- **Behavior:** Returns all public deals in full. Premium deals return **teaser masks** (title, category, discount percentage, but destination URL and secret voucher codes remain null/redacted).
- **Response `200 OK`:** Paginated deal cards.

### `GET /api/v1/deals/{slug}`
- **Access:** Public
- **Behavior:** If deal is `premium`, evaluates `Auth::user()->hasActiveSubscription()`.
  - Non-members: Returns redacted teaser data with `"is_locked": true`.
  - VIP Members: Returns full details, promo voucher codes, and affiliate claim tokens.

### `POST /api/v1/deals/{id}/outbound`
- **Access:** Public / Member Gated
- **Behavior:**
  1. Checks deal visibility. If `premium` and user is not paid subscriber, returns `403 Forbidden` with `"code": "SUBSCRIPTION_REQUIRED"`.
  2. Validates destination host in `deal_links` against `merchants.domain` allowlist.
  3. Records asynchronous click metric in `deal_clicks`.
  4. Returns signed, temporary redirect URL (expires in 60s).
- **Response `200 OK`:** `{ "redirect_url": "https://www.amazon.in/dp/...?tag=onestopgadgets-21", "expires_in": 60 }`

---

## 3. Subscription & Billing Endpoints

### `GET /api/v1/plans`
- **Access:** Public
- **Response `200 OK`:** Active subscription tiers (`monthly`, `quarterly`, `annual`) with INR pricing and feature sets.

### `POST /api/v1/subscription-orders`
- **Access:** Authenticated Customer
- **Body:** `{ "plan_id": 2 }`
- **Behavior:** Creates pending order and communicates with Razorpay/Cashfree to generate a `gateway_order_id`.
- **Response `201 Created`:** `{ "order_id": 142, "gateway_order_id": "order_Hk29snAlx", "amount_minor": 69900, "currency": "INR" }`

### `POST /api/v1/webhooks/payments/{provider}`
- **Access:** External Gateway Only (Signed Webhook)
- **Headers:** `X-Razorpay-Signature: <hmac_sha256>`
- **Behavior:**
  1. Verifies payload signature using gateway webhook secret.
  2. Checks `payment_webhook_events` to ensure `(provider, event_id)` has not been processed (idempotency).
  3. Updates `subscription_orders` status to `paid`.
  4. Provisions / extends `subscriptions` record atomically.
- **Response `200 OK`:** `{ "status": "processed" }`

---

## 4. Weekly Lucky Dip Endpoints (Free Entry Baseline)

### `GET /api/v1/lucky-dip/current`
- **Access:** Public
- **Response `200 OK`:** Returns current active round details, prize metadata, server timestamp (`Asia/Kolkata`), countdown target, and legal rules version.

### `POST /api/v1/lucky-dip/{roundId}/entries`
- **Access:** Authenticated & Verified Customer
- **Body:** `{ "name": "Venkata J", "email": "user@example.com", "phone": "+919876543210", "rules_accepted": true, "marketing_opt_in": false }`
- **Validation:**
  - Mandatory confirmation of 18+ age and rules acceptance.
  - Server checks `UNIQUE (round_id, user_id)`. If duplicate: returns `409 Conflict` (`"ALREADY_ENTERED"`).
- **Behavior:** Encrypts PII snapshots via AES-256 and records entry reference.
- **Response `201 Created`:** `{ "entry_reference": "OSG-RD42-994821", "created_at": "..." }`

### `GET /api/v1/lucky-dip/winners`
- **Access:** Public
- **Response `200 OK`:** Consented public winner ledger (masked display names e.g. "Rahul K.", prizes won, round numbers). Never exposes emails or phone numbers.

---

## 5. Staff Role-Segregated Portals

### Deal Admin Endpoints (Scope: Deals & Links ONLY)
- `GET /api/v1/admin/deals` — List managed deals.
- `POST /api/v1/admin/deals` — Create deal draft.
- `PATCH /api/v1/admin/deals/{id}` — Update deal information.
- `PATCH /api/v1/admin/deals/{id}/link` — Update destination URL (Strict host allowlist validation).
- `*` **Any request to `/api/v1/super-admin/*` returns `403 Forbidden`.**

### Super Admin Endpoints (Full Governance & Draw Execution)
- `GET /api/v1/super-admin/metrics` — Financial and platform KPIs.
- `GET /api/v1/super-admin/lucky-dip/rounds/{id}/entries` — Paginated entries with logged PII reveal capabilities.
- `POST /api/v1/super-admin/lucky-dip/rounds/{id}/draw` — Executes provably fair CSPRNG draw algorithm, creates immutable snapshot and entropy commitment.
- `POST /api/v1/super-admin/lucky-dip/rounds/{id}/winner/publish` — Publishes verified winner to public wall.
- `GET /api/v1/super-admin/audit-logs` — Immutable audit trail with actor details and diff hashes.
