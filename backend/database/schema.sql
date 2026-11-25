-- ====================================================================
-- ONE STOP GADGETS — Master MySQL Schema (one_stop_gadgets)
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `one_stop_gadgets` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `one_stop_gadgets`;

-- 1. Roles & Permissions Table
CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL UNIQUE,
    `description` VARCHAR(255) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `role_id` INT UNSIGNED NOT NULL DEFAULT 1,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `phone` VARCHAR(20) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) DEFAULT NULL,
    `state` VARCHAR(100) DEFAULT NULL,
    `current_role` ENUM('free', 'vip', 'expired') NOT NULL DEFAULT 'free',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT,
    INDEX `idx_user_auth` (`email`, `is_active`, `deleted_at`),
    INDEX `idx_user_role` (`current_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(60) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(20) NOT NULL,
    `display_order` INT UNSIGNED NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Products Table (Includes auto-generated discount and VIP threshold column)
CREATE TABLE IF NOT EXISTS `products` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT UNSIGNED NOT NULL,
    `sku` VARCHAR(60) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(100) NOT NULL,
    `store` VARCHAR(60) NOT NULL DEFAULT 'Amazon Verified',
    `store_icon` VARCHAR(20) NOT NULL DEFAULT '🛒',
    `selling_price` DECIMAL(10,2) NOT NULL,
    `original_price` DECIMAL(10,2) NOT NULL,
    `discount_percentage` INT GENERATED ALWAYS AS (ROUND(((original_price - selling_price) / original_price) * 100)) STORED,
    `icon` VARCHAR(20) NOT NULL DEFAULT '📱',
    `image_url` VARCHAR(500) DEFAULT NULL,
    `rating` DECIMAL(2,1) NOT NULL DEFAULT 4.5,
    `description` TEXT,
    `merchant_affiliate_url` VARCHAR(1000) NOT NULL,
    `is_vip_exclusive` TINYINT(1) GENERATED ALWAYS AS (CASE WHEN selling_price >= 50000.00 THEN 1 ELSE 0 END) STORED,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `deleted_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT,
    INDEX `idx_category_pricing` (`category_id`, `selling_price`, `is_active`, `deleted_at`),
    INDEX `idx_vip_threshold` (`is_vip_exclusive`),
    FULLTEXT INDEX `ft_product_search` (`title`, `brand`, `description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Product Clickstream Tracking
CREATE TABLE IF NOT EXISTS `product_clicks` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `user_agent` VARCHAR(255) DEFAULT NULL,
    `clicked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_click_analytics` (`product_id`, `clicked_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Subscription Plans Table
CREATE TABLE IF NOT EXISTS `subscription_plans` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `plan_code` VARCHAR(30) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `original_price` DECIMAL(10,2) NOT NULL,
    `duration_days` INT UNSIGNED NOT NULL,
    `lucky_dip_entries_per_draw` INT UNSIGNED NOT NULL DEFAULT 1,
    `badge` VARCHAR(60) DEFAULT NULL,
    `features_json` JSON NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Subscriptions Table
CREATE TABLE IF NOT EXISTS `subscriptions` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `membership_code` VARCHAR(40) NOT NULL UNIQUE,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `plan_id` INT UNSIGNED NOT NULL,
    `amount_paid` DECIMAL(10,2) NOT NULL,
    `status` ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
    `activated_at` TIMESTAMP NOT NULL,
    `expires_at` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
    FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE RESTRICT,
    INDEX `idx_user_membership` (`user_id`, `status`, `expires_at`),
    INDEX `idx_sub_expiry` (`expires_at`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Payment Transactions Table
CREATE TABLE IF NOT EXISTS `payment_transactions` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `subscription_id` BIGINT UNSIGNED NULL,
    `plan_id` INT UNSIGNED NOT NULL,
    `razorpay_order_id` VARCHAR(100) NOT NULL UNIQUE,
    `razorpay_payment_id` VARCHAR(100) NULL UNIQUE,
    `razorpay_signature` VARCHAR(255) NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
    `payment_method` VARCHAR(50) DEFAULT NULL,
    `status` ENUM('created', 'authorized', 'captured', 'failed', 'refunded') NOT NULL DEFAULT 'created',
    `failure_reason` VARCHAR(255) DEFAULT NULL,
    `webhook_verified` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
    FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`id`) ON DELETE RESTRICT,
    INDEX `idx_rzp_order` (`razorpay_order_id`),
    INDEX `idx_rzp_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Lucky Dip Campaigns Table
CREATE TABLE IF NOT EXISTS `lucky_dip_campaigns` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(150) NOT NULL,
    `prize_name` VARCHAR(150) NOT NULL,
    `prize_image_url` VARCHAR(500) NOT NULL,
    `starts_at` TIMESTAMP NOT NULL,
    `ends_at` TIMESTAMP NOT NULL,
    `draw_at` TIMESTAMP NOT NULL,
    `server_seed_hash` VARCHAR(64) NOT NULL,
    `server_seed_revealed` VARCHAR(64) DEFAULT NULL,
    `client_seed` VARCHAR(64) DEFAULT NULL,
    `status` ENUM('upcoming', 'active', 'closed', 'drawn', 'cancelled') NOT NULL DEFAULT 'upcoming',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Lucky Dip Entries Table
CREATE TABLE IF NOT EXISTS `lucky_dip_entries` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `ticket_number` VARCHAR(40) NOT NULL UNIQUE,
    `participant_name` VARCHAR(100) NOT NULL,
    `participant_email` VARCHAR(150) NOT NULL,
    `participant_phone` VARCHAR(20) NOT NULL,
    `participant_city` VARCHAR(100) NOT NULL,
    `entry_hash` VARCHAR(64) NOT NULL,
    `is_eligible` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `lucky_dip_campaigns`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
    UNIQUE KEY `uq_user_campaign_ticket` (`campaign_id`, `user_id`, `ticket_number`),
    INDEX `idx_campaign_entries` (`campaign_id`, `is_eligible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Lucky Dip Winners Table
CREATE TABLE IF NOT EXISTS `lucky_dip_winners` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT UNSIGNED NOT NULL,
    `entry_id` BIGINT UNSIGNED NOT NULL UNIQUE,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `prize_awarded` VARCHAR(150) NOT NULL,
    `winning_hash` VARCHAR(64) NOT NULL,
    `draw_date` VARCHAR(40) NOT NULL,
    `initial` VARCHAR(5) NOT NULL,
    `badge_color` VARCHAR(20) NOT NULL DEFAULT '#E68A00',
    `verification_status` ENUM('pending_claim', 'verified', 'dispatched', 'forfeited') NOT NULL DEFAULT 'pending_claim',
    `published_by_superadmin` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `lucky_dip_campaigns`(`id`) ON DELETE RESTRICT,
    FOREIGN KEY (`entry_id`) REFERENCES `lucky_dip_entries`(`id`) ON DELETE RESTRICT,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `subject` VARCHAR(150) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('unread', 'in_progress', 'resolved', 'spam') NOT NULL DEFAULT 'unread',
    `ip_address` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. System Settings Table
CREATE TABLE IF NOT EXISTS `system_settings` (
    `setting_key` VARCHAR(60) PRIMARY KEY,
    `setting_value` TEXT NOT NULL,
    `setting_group` VARCHAR(40) NOT NULL DEFAULT 'general',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Audit Logs Table
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NULL,
    `action` VARCHAR(100) NOT NULL,
    `target_entity` VARCHAR(60) NOT NULL,
    `target_id` VARCHAR(60) DEFAULT NULL,
    `details_json` JSON DEFAULT NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_audit_time` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
