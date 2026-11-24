# Product Requirements Document (PRD)
## One Stop Gadgets — Premium Deals, Membership & Weekly Lucky Dip Platform

**Version:** 1.0 (design-planning baseline)  
**Date:** 18 November 2026  
**Status:** Proposed — DESIGN APPROVAL REQUIRED; no development authorized  
**Owner:** Project stakeholder / Super Admin  
**Reference:** Cashback/deal-discovery platforms such as CashKaro; **create original branding and UI, not a copy**.

---

## 1. Executive summary
Develop a fast, premium-looking responsive deal-discovery website for **One Stop Gadgets** where visitors explore selected public gadget and tech deals, paying members unlock premium deals, and users can click a deal to visit the external merchant's website to purchase. Offer a recurring weekly Lucky Dip section with participant details, a Super Admin-controlled participant register, selection/announcement of winners, and separate restrictive Admin access. Build using PHP/Laravel, MySQL and phpMyAdmin. Create the **design file and obtain written approval BEFORE coding**. Keep system and product documentation synchronized with code changes through CI checks and change-management workflow.

**Important compliance gate:** The requested subscription-gated chance-based Lucky Dip may create gambling, lottery, or unfair-trade-practice issues depending on the jurisdiction and mechanics. A subscription must not be made a condition of entering a chance-based promotion without prior qualified legal review. For the initial design and planned implementation, use a **free-entry Lucky Dip path for eligible registered users**, including non-subscribers, with no purchase required, subject to approved terms. Subscriptions unlock premium *deals*, not higher chances of winning. A subscription-only entry mode is documented as **blocked / not authorized** pending written legal approval. The Super Admin may manage, approve and announce winners but must not silently alter a randomly drawn winner or misrepresent a discretionary selection as random.

## 2. Product objectives and metrics
- Create a polished and trusted platform for discovering curated shopping offers.
- Convert free accounts into paid subscribers through premium deal access.
- Drive external merchant affiliate-link clicks (without processing merchant purchases internally).
- Manage weekly Lucky Dip participants and outcomes transparently.
- Keep day-to-day Admin capabilities limited to deal/product link maintenance.
- Protect member data and maintain traceability of payments, draws, and administrator actions.

**KPIs:** visitor-to-registration conversion; free-to-paid conversion; active subscriptions; free/premium deal impressions and click-through rates; outbound affiliate clicks; cancellation/refund rate; Lucky Dip eligible entries and unique entrants; uptime; API latency; draw publication lead time.

**Out of scope for MVP:** direct checkout for merchant products, fulfillment, inventory management, guaranteed cashback, rewards wallet, mobile app, automated merchant order tracking without partner integrations, referral commissions, multiple paid-entry tickets.

## 3. Audiences and roles
1. **Guest:** browse public deals, view locked premium cards/teasers, subscription pricing, published Lucky Dip information and winners; cannot submit a Lucky Dip entry until registered and verified.
2. **Registered free user:** access public deals; view premium deal teasers, purchase membership, manage profile; **can enter a free-entry Lucky Dip** subject to the published rules and eligibility checks.
3. **Active paid subscriber:** access public and premium deals; same Lucky Dip eligibility and number of entries as a free user unless legally approved promotion rules state otherwise.
4. **Admin (deal manager):** access ONLY a dedicated product/deal management dashboard: create/edit/archive/delete product/deal records and validate product affiliate destination URLs. No participant, subscription, payment, user management, roles, settings, reports, winner selection or other controls.
5. **Super Admin:** full control over permitted content, deals, users, subscriptions, payment oversight, Lucky Dip rounds, participant register and winner selection/announcement, settings, permissions and audit logs. Privileged actions use server-side RBAC plus MFA and audit logging.

## 4. User journeys
### 4.1 Browse and access deals
Guest lands on homepage -> browses free deals / category pages -> sees premium badges and locked deal details -> registers or logs in -> subscribes if desired -> payment gateway confirms transaction server-to-server -> premium access is granted -> user clicks “View Deal” -> system validates access and stores click event -> user is safely redirected to approved merchant affiliate URL -> merchant handles payment, delivery, return and support according to merchant terms.

**Never claim a merchant purchase happened based solely on an outbound click.** Conversion attribution requires approved merchant affiliate network reports/webhooks, if later integrated.

### 4.2 Subscription flow
User selects plan -> checkout creates pending order -> hosted payment gateway -> signed server-side webhook verification + idempotent processing -> subscription activated according to paid start/end dates -> member sees receipt, expiration/renewal information. Failed/abandoned payments do not unlock deals. Expiry, refunds, chargebacks and cancellation policies must revoke/adjust access as appropriate. Renewals require consent as applicable; do not silently enroll in recurring charges.

### 4.3 Lucky Dip flow (compliance-first baseline)
Guest sees current weekly round, countdown, prize, rules and winner history -> register/log in and complete name/email/mobile verification -> fill/confirm required name, email and phone, consent and rule acceptance -> submit once per eligible user per round -> duplicate and fraud checks -> confirmation/entry reference -> Super Admin sees all entries, filters/exports according to need, runs documented selection procedure or records an independently verifiable winner process -> winner verification -> Super Admin publishes announcement -> site displays winner information **only to the extent authorized by winner consent**.

**Requested alternative, not approved for implementation:** non-subscriber must buy a subscription to enter the random Lucky Dip. This is not the MVP rule. If the business requires a skill contest or a subscription-linked promotion, legal counsel must first authorize precise eligibility, prize, free-entry alternative, age/region restrictions, disclosures, selection methods and tax treatment.

## 5. Functional requirements
Priority legend: **P0** mandatory MVP; **P1** next release; **P2** future.

| ID | Priority | Requirement | Acceptance criteria |
|---|---|---|---|
| FR-001 | P0 | Responsive homepage | Unique premium design on desktop/tablet/mobile, clear navigation, CTAs and featured deals. |
| FR-002 | P0 | Authentication | Email/password signup/login, verified email, secure reset, optional phone OTP; backend-managed sessions/tokens. |
| FR-003 | P0 | Deals catalog | Search, filters, categories, merchant, images, price, deal expiry, public/premium visibility. |
| FR-004 | P0 | Subscription restrictions | Premium deal details and outbound redirect enforced server-side for non-members. |
| FR-005 | P0 | External affiliate redirect | Safe approved https URL, tracked outbound click, no open redirects, no merchant checkout on platform. |
| FR-006 | P0 | Plan management | Super Admin can define active plans, pricing, duration, features and display order. |
| FR-007 | P0 | Payment processing | Gateway hosted checkout; signed webhooks; retries/idempotency; receipts; refund/chargeback reconciliation. |
| FR-008 | P0 | Member dashboard | Saved items (optional), plan status, transaction history, profile and preferences. |
| FR-009 | P0 | Lucky Dip weekly rounds | Weekly start/end, eligibility, prize, status and countdown from server time. |
| FR-010 | P0 | Lucky Dip entry form | Name, email, phone, consent/rules, validation, verified login and rate limits. |
| FR-011 | P0 | Lucky Dip free entry | Eligible registered non-subscribers and subscribers can enter once per round without purchase. |
| FR-012 | P0 | Participant dashboard | Only Super Admin views participant PII, counts, search, duplicate flags and exports. |
| FR-013 | P0 | Winner selection | Only Super Admin starts approved documented selection, with eligible snapshot, entropy/seed or attested selection evidence, immutable result and audit trail. |
| FR-014 | P0 | Winner announcement | Only Super Admin may publish/unpublish following verification; public display minimized and consent-based. |
| FR-015 | P0 | Restricted Admin portal | Admin can manage deals/products and external links ONLY; other endpoints return 403. |
| FR-016 | P0 | Super Admin portal | Can govern all authorized functions, roles, subscriptions, reports, Lucky Dip and settings. |
| FR-017 | P0 | Audit and logs | Record privileged mutations, payments, eligibility decisions, winner actions and redirect faults. |
| FR-018 | P0 | Legal pages | Privacy, terms, affiliate disclosure, subscription/cancellation/refund policy, Lucky Dip rules and contact. |
| FR-019 | P0 | Design-first approval | No code implementation begins before approved UI/UX and design specification. |
| FR-020 | P0 | Living documentation | Pull requests update docs and change log when behavior/schema/API changes; CI checks enforce. |
| FR-021 | P1 | Email/SMS alerts | Opt-in transactional messages for membership and winner notification. |
| FR-022 | P1 | Advanced insights | Super Admin: deal click analytics, conversion signals and membership cohorts. |
| FR-023 | P1 | Affiliate network imports | Merchant-approved transaction/cashback integrations if partner APIs permit. |
| FR-024 | P2 | Referral and loyalty | Future, separate compliance assessment and anti-abuse design. |

## 6. Page inventory
**Public:** `/`, `/deals`, `/deals/:slug`, `/categories/:slug`, `/premium`, `/pricing`, `/lucky-dip`, `/lucky-dip/winners`, `/login`, `/register`, `/forgot-password`, `/privacy`, `/terms`, `/affiliate-disclosure`, `/subscription-policy`, `/lucky-dip/rules`, `/contact`.

**Member:** `/account`, `/account/subscription`, `/account/payments`, `/account/lucky-dip-entries`, `/checkout/subscription/:planId`.

**Admin:** `/admin/deals`, `/admin/deals/new`, `/admin/deals/:id/edit`, `/admin/products` (no navigation or API access outside deal/product management).

**Super Admin:** `/super-admin`, `/super-admin/deals`, `/super-admin/categories`, `/super-admin/merchants`, `/super-admin/plans`, `/super-admin/subscriptions`, `/super-admin/payments`, `/super-admin/users`, `/super-admin/lucky-dip/rounds`, `/super-admin/lucky-dip/rounds/:id/participants`, `/super-admin/lucky-dip/winners`, `/super-admin/reports`, `/super-admin/settings`, `/super-admin/audit-logs`.

## 7. Detailed business rules
### Deal visibility
- `visibility = public | premium`, `status = draft | published | archived`, optional `starts_at`/`ends_at`.
- A free user can see a premium deal *teaser* with limited information; exact deal URL/claim code and full member benefits are hidden until access is authorized.
- **Backend** validates effective subscription for detail API and redirect, even if user changes client-side code.
- Redirect only if deal published, offer valid, allowed URL host and user entitled. Expired deals display a clear status.
- Products are sold by third-party merchants; display affiliate commission disclosure.

### Membership
- Plans might include Monthly, Quarterly and Annual. **Prices must be supplied/approved by business; none assumed.**
- Valid states: `pending`, `active`, `past_due`, `cancelled`, `expired`, `refunded`, `suspended`.
- Gateway webhook (not return URL) is payment authority. Confirm signature, amount, currency, gateway transaction ID and event replay handling.
- Member upgrade/downgrade/renewal and cancellation policies require explicit business approval.

### Lucky Dip
- One defined weekly round at a time per promotion; timezone `Asia/Kolkata`, explicit start/end timestamps.
- No entry fees; no paid advantage or extra entries for subscribers in the baseline.
- One entry per verified eligible account per round. Support rate limits and phone/email duplicate review; avoid unauthorized blanket bans based on shared households.
- Form requires name, email, phone, rules acknowledgement and necessary privacy consent. Transactional participation messages are separate from optional marketing consent.
- Eligibility: jurisdiction/age/prize restrictions and winner claim deadline are to be specified in written rules before launch.
- Super Admin controls create/open/close rounds, participant visibility, selection approval, verification, publication and withdrawal with a reason and audit trail.
- Prefer a documented verifiable random selection of *eligible* entries; Super Admin may initiate the process but cannot arbitrarily choose a desired person while presenting the outcome as random. If a judged/skill-based competition is chosen instead, rename and publish its criteria.
- Public winner card shows name initials or consented display name, prize, round and announcement date; never publish email or phone.
- Winner selection must use atomic database transaction/locking; one published winner per defined prize slot, with immutable event evidence.
- Export participant personal data is restricted and logged; retention windows approved before launch.

## 8. Authorization matrix
| Capability | Guest | Free | Paid | Admin | Super Admin |
|---|---|---|---|---|---|
| View public deals | Yes | Yes | Yes | Yes | Yes |
| View locked premium teaser | Yes | Yes | Yes | Yes | Yes |
| Access premium deal/redirect | No | No | Yes | No by role* | Yes by privileged role* |
| Submit eligible free Lucky Dip entry | No | Yes | Yes | Not via staff role* | Not via staff role* |
| Create/update/archive/delete deals & links | No | No | No | Yes | Yes |
| Manage product categories/merchants | No | No | No | No | Yes |
| View Lucky Dip participants | No | Own only | Own only | No | Yes |
| Manage rounds/select/announce winner | No | No | No | No | Yes |
| Manage users/payments/subscriptions/settings | No | No | No | No | Yes |
| View admin audit logs | No | No | No | No | Yes |

`*` Staff accounts should be segregated from consumer entitlements; privileges do not implicitly confer consumer participation or purchased memberships.

## 9. Recommended technology stack
| Layer | Technology | Justification |
|---|---|---|
| UI | React + TypeScript + Vite | Typed, modular interactive premium storefront. |
| Design/styling | Tailwind CSS + reusable accessible UI components | Consistent responsive design tokens and high reuse. |
| State/data | TanStack Query; React Router; React Hook Form + Zod | API caching, routing, validation. |
| Backend | **PHP 8.3+ / Laravel 11+** | Mature ORM, queues, policies, auth, testing, mail. |
| API | Versioned REST `/api/v1` JSON | Web-first with extensibility. |
| Authentication | Laravel Sanctum secure same-site session cookies for SPA | CSRF-safe session auth; optional OTP and staff MFA. |
| Database | **MySQL 8.4 LTS** | Relational integrity and transactional correctness. |
| DB administration | **phpMyAdmin** (private/admin-only) | Operate and inspect MySQL, never exposed publicly. |
| Queue/cache | Redis + Laravel queues | Transactional email, webhook jobs, scheduled tasks, cache. |
| Payments | Indian compliant gateway e.g. Razorpay/Cashfree, pending commercial approval | Hosted checkout, webhook verification. |
| Notifications | Email provider + optional India-compliant SMS provider | Verification, receipts, results. |
| Assets | S3-compatible private/public object storage + CDN | Product images, documents; no binary data in MySQL. |
| Deployment | Nginx + PHP-FPM; static SPA hosting/CDN; managed MySQL | Scalable hosting with backups. |
| Source/CI | GitHub/GitLab CI, Composer, PHPUnit/Pest, Vitest/Playwright | Automated release, testing, documentation checks. |

## 10. High-level architecture
```text
Visitor browser (React SPA + HTTPS)
  -> CDN / WAF / frontend hosting
  -> Laravel API (PHP-FPM, Nginx, CSRF/session auth, RBAC policies)
      -> MySQL (users, deals, plans, payments, draws, entries, winners, audit)
      -> Redis (queues, cache, throttling)
      -> Object storage (product and prize media)
      -> Payment gateway (hosted checkout + signed webhooks)
      -> Email/SMS providers
      -> Affiliate merchant redirects (allowlisted destination domains)
  -> Super Admin + Admin role-limited screens on same API
```
