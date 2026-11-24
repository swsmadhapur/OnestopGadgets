# Security & Compliance Specification — One Stop Gadgets

> **Document:** Security Controls, DPDP Act 2023 Compliance & Threat Model  
> **Brand Name:** One Stop Gadgets  
> **Version:** 1.0

---

## 1. Regulatory & Privacy Compliance (DPDP Act 2023)

### 1.1 Data Minimization & Consent Management
- **Purpose Limitation:** Contact details (legal name, email, phone) collected for Lucky Dip participation are processed strictly for entry deduplication, fraud prevention, and winner verification.
- **Separate Marketing Consent:** Marketing communications (WhatsApp/Email price-drop alerts) require an independent, unchecked, freely revocable opt-in checkbox.
- **Public Winner Privacy:** The public winners wall displays only consented display names (e.g. "Rahul K.", "Priya S.") and prize descriptions. Unconsented display, full names, phone numbers, or emails are strictly prohibited from public presentation.

### 1.2 Cryptographic PII Protection at Rest
- Sensitive participant snapshot fields (`name_snapshot_encrypted`, `email_snapshot_encrypted`, `phone_snapshot_encrypted`) in `lucky_dip_entries` are encrypted using AES-256-GCM before storage.
- Key rotation is governed by Laravel's application key mechanism.

---

## 2. Threat Modeling & Defensive Controls

### 2.1 Open Redirect Prevention (PRD § 5 FR-005)
- **Risk:** Malicious actors manipulate deal URLs to redirect users to phishing sites.
- **Defense:**
  - Destination URLs in `deal_links` are validated against an allowlist of approved domains in `merchants.domain` (e.g. `amazon.in`, `flipkart.com`, `apple.com`).
  - The redirect controller (`POST /api/v1/deals/{id}/outbound`) checks that the URL host strictly equals or is a legitimate subdomain of an approved merchant.
  - Redirect URLs are delivered via short-lived signed HMAC tokens (60-second TTL), preventing link tampering.

### 2.2 Payment Webhook Replay & Idempotency (PRD § 5 FR-007)
- **Risk:** Network retries or replayed webhook events creating duplicate subscriptions.
- **Defense:**
  - Every inbound webhook from Razorpay/Cashfree is validated with HMAC-SHA256 signature verification.
  - The `payment_webhook_events` table enforces a `UNIQUE(provider, event_id)` constraint.
  - Handled in an atomic database transaction (`DB::transaction`) with row locking (`lockForUpdate`).

### 2.3 Strict Role Boundaries & Escalation Prevention (PRD § 8)
- **Deal Admin Isolation:** Deal Admin accounts have zero access to user rosters, subscription payments, or Lucky Dip participant registries. The API route group `/api/v1/admin/*` is separated from `/api/v1/super-admin/*` with independent Laravel Policies.
- **Privilege Separation:** Administrative accounts cannot enter the Lucky Dip giveaway.
- **MFA Enforcement:** Super Admin logins require multi-factor authentication (TOTP or SMS OTP).
