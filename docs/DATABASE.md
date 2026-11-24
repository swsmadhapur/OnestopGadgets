# Database Design & Relational Schema — One Stop Gadgets

> **Database Engine:** MySQL 8.4 LTS  
> **Storage Engine:** InnoDB (Strict Mode, `utf8mb4_unicode_ci`)  
> **Identifiers:** Big Integer Unsigned Primary Keys  
> **Timestamps:** UTC Storage (`created_at`, `updated_at`, `deleted_at`)  
> **PII Encryption:** AES-256-GCM via Laravel Model Encryption (`encrypted` cast)

---

## 1. Schema Entity Relationship Map

```text
       [merchants] 1 ──────── n [deals] n ──────── 1 [categories]
                                   │
                                   ├── 1 ─── 1 [deal_links] (Encrypted Target)
                                   └── 1 ─── n [deal_clicks] (Outbound Analytics)

       [users] 1 ──────── n [user_roles] n ──────── 1 [roles]
          │
          ├── 1 ──────── n [subscriptions] n ──────── 1 [subscription_plans]
          ├── 1 ──────── n [subscription_orders] ─── 1 [payments]
          │                                              │
          │                                     [payment_webhook_events]
          ├── 1 ──────── n [lucky_dip_entries] n ─── 1 [lucky_dip_rounds]
          │                      │                           │
          │                      ▼                           ▼
          │               [lucky_dip_draws] ───────── [lucky_dip_winners]
          │
          └── 1 ──────── n [audit_logs]
```

---

## 2. Table Definitions & Constraints

### 2.1 Core Identity & RBAC
- **`users`**: User identity accounts.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `name` VARCHAR(150) NOT NULL
  - `email` VARCHAR(191) NOT NULL UNIQUE
  - `phone_e164` VARCHAR(25) NULL (Indexed)
  - `password_hash` VARCHAR(255) NOT NULL (Argon2id)
  - `email_verified_at` TIMESTAMP NULL
  - `phone_verified_at` TIMESTAMP NULL
  - `status` ENUM('active','suspended','pending_verification') DEFAULT 'active'
  - `created_at`, `updated_at`, `deleted_at` (SoftDeletes)

- **`roles`**: System roles.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `code` VARCHAR(50) NOT NULL UNIQUE (`super_admin`, `admin`, `customer`)
  - `name` VARCHAR(100) NOT NULL
  - `description` VARCHAR(255) NULL

- **`user_roles`**: Composite role assignment.
  - `user_id` BIGINT UNSIGNED NOT NULL, FK -> `users(id)` ON DELETE CASCADE
  - `role_id` BIGINT UNSIGNED NOT NULL, FK -> `roles(id)` ON DELETE CASCADE
  - PRIMARY KEY (`user_id`, `role_id`)

### 2.2 Deals & Merchant Links
- **`merchants`**: External stores.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `name` VARCHAR(100) NOT NULL
  - `domain` VARCHAR(150) NOT NULL UNIQUE (e.g. `amazon.in`, `flipkart.com`, `apple.com`)
  - `logo_path` VARCHAR(255) NULL
  - `is_approved` BOOLEAN DEFAULT TRUE

- **`categories`**: Gadget taxonomy.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `parent_id` BIGINT UNSIGNED NULL, FK -> `categories(id)` ON DELETE SET NULL
  - `slug` VARCHAR(100) NOT NULL UNIQUE
  - `name` VARCHAR(100) NOT NULL
  - `icon_name` VARCHAR(50) NULL
  - `display_order` INT DEFAULT 0

- **`deals`**: Deals catalog.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `merchant_id` BIGINT UNSIGNED NOT NULL, FK -> `merchants(id)`
  - `category_id` BIGINT UNSIGNED NOT NULL, FK -> `categories(id)`
  - `title` VARCHAR(255) NOT NULL
  - `slug` VARCHAR(191) NOT NULL UNIQUE
  - `description` TEXT NULL
  - `image_path` VARCHAR(255) NULL
  - `price_display` DECIMAL(10,2) NULL (Informational price)
  - `original_price` DECIMAL(10,2) NULL
  - `discount_percentage` INT NULL
  - `visibility` ENUM('public','premium') DEFAULT 'public' (Indexed)
  - `status` ENUM('draft','published','archived') DEFAULT 'draft' (Indexed)
  - `starts_at` TIMESTAMP NULL
  - `ends_at` TIMESTAMP NULL
  - `created_by` BIGINT UNSIGNED NULL, FK -> `users(id)`
  - `updated_by` BIGINT UNSIGNED NULL, FK -> `users(id)`
  - Timestamps, SoftDeletes
  - INDEX `idx_deals_query` (`visibility`, `status`, `starts_at`, `ends_at`)

- **`deal_links`**: Protected outbound links.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `deal_id` BIGINT UNSIGNED NOT NULL UNIQUE, FK -> `deals(id)` ON DELETE CASCADE
  - `destination_url_encrypted` TEXT NOT NULL (AES-256 encrypted at rest)
  - `approved_host` VARCHAR(150) NOT NULL (Host allowlist verification)
  - `tracking_code` VARCHAR(100) NULL
  - `is_active` BOOLEAN DEFAULT TRUE

- **`deal_clicks`**: Outbound telemetry.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `deal_id` BIGINT UNSIGNED NOT NULL, FK -> `deals(id)` ON DELETE CASCADE
  - `user_id_nullable` BIGINT UNSIGNED NULL, FK -> `users(id)` ON DELETE SET NULL
  - `clicked_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  - `referrer_tag` VARCHAR(100) NULL
  - `session_hash` CHAR(64) NULL (Hashed visitor session)
  - `ip_masked` VARCHAR(45) NULL (Truncated / anonymized)
  - INDEX `idx_deal_clicks_analytics` (`deal_id`, `clicked_at`)

### 2.3 Subscription Billing (Razorpay / Cashfree)
- **`subscription_plans`**: Available tiers.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `code` VARCHAR(50) NOT NULL UNIQUE (`monthly`, `quarterly`, `annual`)
  - `name` VARCHAR(100) NOT NULL
  - `price_minor` INT UNSIGNED NOT NULL (Amount in paise, e.g. 29900 = ₹299)
  - `currency` CHAR(3) DEFAULT 'INR'
  - `duration_days` INT UNSIGNED NOT NULL
  - `features_json` JSON NOT NULL
  - `is_active` BOOLEAN DEFAULT TRUE

- **`subscription_orders`**: Checkout intents.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `user_id` BIGINT UNSIGNED NOT NULL, FK -> `users(id)`
  - `plan_id` BIGINT UNSIGNED NOT NULL, FK -> `subscription_plans(id)`
  - `amount_minor` INT UNSIGNED NOT NULL
  - `currency` CHAR(3) DEFAULT 'INR'
  - `gateway_order_id` VARCHAR(100) NOT NULL UNIQUE
  - `status` ENUM('created','attempted','paid','failed') DEFAULT 'created'
  - Timestamps

- **`payments`**: Reconciled transactions.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `order_id` BIGINT UNSIGNED NOT NULL, FK -> `subscription_orders(id)`
  - `gateway_payment_id` VARCHAR(100) NOT NULL UNIQUE
  - `amount_minor` INT UNSIGNED NOT NULL
  - `currency` CHAR(3) DEFAULT 'INR'
  - `status` ENUM('captured','refunded','disputed') DEFAULT 'captured'
  - `paid_at` TIMESTAMP NOT NULL
  - Timestamps

- **`payment_webhook_events`**: Idempotency ledger.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `provider` VARCHAR(50) NOT NULL (`razorpay`, `cashfree`)
  - `event_id` VARCHAR(150) NOT NULL
  - `payload_hash` CHAR(64) NOT NULL
  - `processing_status` ENUM('received','processed','ignored','failed') DEFAULT 'received'
  - `received_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  - UNIQUE KEY `uk_provider_event` (`provider`, `event_id`)

- **`subscriptions`**: Active entitlements.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `user_id` BIGINT UNSIGNED NOT NULL, FK -> `users(id)`
  - `plan_id` BIGINT UNSIGNED NOT NULL, FK -> `subscription_plans(id)`
  - `order_id` BIGINT UNSIGNED NOT NULL, FK -> `subscription_orders(id)`
  - `status` ENUM('active','past_due','cancelled','expired') DEFAULT 'active'
  - `starts_at` TIMESTAMP NOT NULL
  - `ends_at` TIMESTAMP NOT NULL
  - `cancelled_at` TIMESTAMP NULL
  - INDEX `idx_sub_entitlement` (`user_id`, `status`, `ends_at`)

### 2.4 Lucky Dip (Compliant Free Entry)
- **`lucky_dip_rounds`**: Weekly rounds.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `title` VARCHAR(150) NOT NULL
  - `prize_name` VARCHAR(150) NOT NULL
  - `prize_image_path` VARCHAR(255) NULL
  - `starts_at` TIMESTAMP NOT NULL
  - `ends_at` TIMESTAMP NOT NULL
  - `selection_at` TIMESTAMP NULL
  - `status` ENUM('draft','active','closed','drawn','completed') DEFAULT 'draft'
  - `rules_version` VARCHAR(20) DEFAULT '1.0'
  - `published_at` TIMESTAMP NULL

- **`lucky_dip_entries`**: Free entry register.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `round_id` BIGINT UNSIGNED NOT NULL, FK -> `lucky_dip_rounds(id)` ON DELETE CASCADE
  - `user_id` BIGINT UNSIGNED NOT NULL, FK -> `users(id)` ON DELETE CASCADE
  - `name_snapshot_encrypted` TEXT NOT NULL (AES-256)
  - `email_snapshot_encrypted` TEXT NOT NULL (AES-256)
  - `phone_snapshot_encrypted` TEXT NOT NULL (AES-256)
  - `rules_accepted_at` TIMESTAMP NOT NULL
  - `marketing_opt_in` BOOLEAN DEFAULT FALSE
  - `eligibility_status` ENUM('eligible','pending_verification','disqualified') DEFAULT 'eligible'
  - `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  - **UNIQUE KEY `uk_round_user` (`round_id`, `user_id`)** (Strict 1 entry per round)

- **`lucky_dip_draws`**: Provably fair evidence.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `round_id` BIGINT UNSIGNED NOT NULL, FK -> `lucky_dip_rounds(id)`
  - `algorithm_version` VARCHAR(50) DEFAULT 'CSPRNG_SHA256_V1'
  - `eligible_set_hash` CHAR(64) NOT NULL (SHA-256 hash of frozen participant list)
  - `seed_commitment` CHAR(64) NOT NULL (SHA-256 commit of secret server seed)
  - `seed_reveal_secure` VARCHAR(255) NOT NULL
  - `selected_entry_id` BIGINT UNSIGNED NOT NULL, FK -> `lucky_dip_entries(id)`
  - `initiated_by` BIGINT UNSIGNED NOT NULL, FK -> `users(id)`
  - `conducted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  - `state` ENUM('pending_verification','verified','rejected') DEFAULT 'pending_verification'

- **`lucky_dip_winners`**: Published winners.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `round_id` BIGINT UNSIGNED NOT NULL, FK -> `lucky_dip_rounds(id)`
  - `draw_id` BIGINT UNSIGNED NOT NULL, FK -> `lucky_dip_draws(id)`
  - `entry_id` BIGINT UNSIGNED NOT NULL, FK -> `lucky_dip_entries(id)`
  - `prize_slot` INT UNSIGNED DEFAULT 1
  - `verification_status` ENUM('verified','claimed','forfeited') DEFAULT 'verified'
  - `display_name_consent` VARCHAR(100) NOT NULL (e.g. "Rahul K.")
  - `announced_at` TIMESTAMP NULL
  - `published_by` BIGINT UNSIGNED NULL, FK -> `users(id)`
  - UNIQUE KEY `uk_round_slot` (`round_id`, `prize_slot`)

### 2.5 Security, Logs & Settings
- **`audit_logs`**: Immutable security journal.
  - `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
  - `actor_id` BIGINT UNSIGNED NULL, FK -> `users(id)` ON DELETE SET NULL
  - `action` VARCHAR(100) NOT NULL
  - `entity_type` VARCHAR(100) NOT NULL
  - `entity_id` BIGINT UNSIGNED NULL
  - `before_hash` CHAR(64) NULL
  - `after_hash` CHAR(64) NULL
  - `ip_masked` VARCHAR(45) NOT NULL
  - `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

- **`system_settings`**: Global platform config.
  - `key` VARCHAR(100) PRIMARY KEY
  - `value_json` JSON NOT NULL
  - `updated_by` BIGINT UNSIGNED NULL, FK -> `users(id)`
  - `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
