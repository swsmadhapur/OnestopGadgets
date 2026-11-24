# UI/UX Design Specification — One Stop Gadgets

> **Document:** Design Specification & Component Design System  
> **Brand Name:** One Stop Gadgets  
> **Version:** 1.0  
> **Status:** Draft for Stakeholder Written Approval — **NO IMPLEMENTATION WITHOUT SIGN-OFF**  
> **Reference:** PRD Appendix A & Corporate Visual Assets

---

## 1. Brand Essence & Logo Architecture

### 1.1 Brand Identity Overview
**One Stop Gadgets** is an upscale, tech-focused deals aggregator and premium membership platform. The platform blends high-value consumer electronics discoveries (smartphones, audio, computing, wearables, smart home) with an exclusive subscriber club and compliant, transparent weekly Lucky Dip giveaways.

### 1.2 Official Emblem Logo
The brand identity centers around the circular tech shield emblem:
- **Central Shield Icon:** Encapsulates core gadget archetypes (smartphone, smartwatch, wireless headphones, and laptop) unified by a forward/upward-pointing growth arrow.
- **Circuitry & Cogwheel Accents:** Outer concentric cyber-circuit rings and gear elements symbolize cutting-edge tech curation and precision deal-finding.
- **Logo Typography:** 
  - "ONE STOP" rendered in high-glow Electric Cyan (`#00D2FF`) with a soft neon backglow.
  - "GADGETS" rendered in high-contrast Radiant Amber Gold (`#FF9900`) for warmth and visual punch.
- **Asset Location:** `design/brand/logo.jpg`

```text
[  Emblem Logo: Shield + Gadgets + Arrow + Outer Neon Rings  ]
             ONE STOP  (Electric Cyan Glow)
             GADGETS   (Vibrant Amber Gold)
```

### 1.3 Logo Application Rules
- **Header Placement:** Minimum height of 44px on desktop navigation, 36px on mobile.
- **Background Contrast:** The emblem is optimized for Midnight Navy (`#091B3D`) or dark gradient headers. When placed on light backgrounds, an illuminated dark circular bezel container is preserved.
- **Clear Space:** Maintain a minimum clear space equal to 50% of the emblem's inner shield width on all sides.

---

## 2. Color System & Design Tokens (Color Hunt Palette)

The brand color system has been updated to the exact Color Hunt palette (`https://colorhunt.co/palette/04156211468fda1212eeeeee`):

```text
+----------------------------------------------------------------------------------------------------+
|  DEEP NAVY BLUE     ROYAL BLUE         VIBRANT RED        CLEAN SOFT GRAY    PURE CARD WHITE       |
|  #041562            #11468F            #DA1212            #EEEEEE            #FFFFFF               |
|  (Header & Dark BG) (Nav & Trust)      (CTA, Login, Flash)(Page Canvas BG)   (Deal Containers)     |
+----------------------------------------------------------------------------------------------------+
```

### 2.1 Palette Tokens

| Token Name | Hex Code | Visual Preview | Role & Application | Contrast Standard (WCAG 2.2) |
|---|---|---|---|---|
| `palette-navy` | `#041562` | Deep Navy | Header background, Dark hero surface, Primary typography | 15.2:1 (**AAA Pass**) |
| `palette-royal` | `#11468F` | Royal Blue | Navigation items, Category badges, Fibo search border | 7.4:1 (**AAA Pass**) |
| `palette-red` | `#DA1212` | Vibrant Red | Main "Sign In" button, "Grab Deal", Urgency tags | 5.1:1 (**AA Pass**) |
| `palette-gray` | `#EEEEEE` | Soft Light Gray | Global page background, input fields, subtle separators | Clean base canvas |
| `palette-card` | `#FFFFFF` | Pure White | Individual deal cards, modals, dropdown containers | 1:1 Base |

### 2.2 Navigation Sequence & FiboSearch Architecture
The navigation bar follows the exact requested sequence:
1. **Logo:** Circular One Stop Gadgets emblem + brand name
2. **Home:** Direct link to main storefront
3. **Deals:** Directory of all curated gadget discounts
4. **About:** Authenticity pledge, partner verification, company mission
5. **Subscription Plans:** Transparent VIP tiers (Monthly, Quarterly, Annual)
6. **Lucky Dip:** 100% Free Entry weekly prize draw
7. **Contact Us:** Support desk, Grievance Officer details, inquiries
8. **Fibo Search:** Instant live AJAX autocomplete search with gadget thumbnails, real-time prices, and discount tags
9. **Login Button:** Styled in Vibrant Red (`#DA1212`) opening authentication modal

### 2.2 Semantic Token Mapping

| Token Name | Hex Code | Role & Usage | Contrast vs White | WCAG 2.2 Standard |
|---|---|---|---|---|
| `color-primary-red` | `#D92035` | Main "Grab Deal" CTAs, "Up to 50% Off" sale badges, Lucky Dip countdown alert | 4.81:1 | **AA Pass** |
| `color-deep-red` | `#AA152B` | Hover & pressed states for primary buttons, active badge outlines | 7.15:1 | **AAA Pass** |
| `color-royal-blue` | `#123C91` | Primary navigation bar, trust seals, verified merchant chips | 8.94:1 | **AAA Pass** |
| `color-electric-blue` | `#2865DA` | Premium membership banners, unlocked deal badges, focus rings, hyperlinks | 4.62:1 | **AA Pass** |
| `color-midnight-navy` | `#091B3D` | Dark hero headers, dashboard sidebars, primary text on light backgrounds | 14.52:1 | **AAA Pass** |
| `color-cyan-glow` | `#00D2FF` | Neon accent lines, badge glow borders on dark backgrounds | Accents | High-contrast on Navy |
| `color-amber-gold` | `#FF9900` | Gadget rating stars, Lucky Dip trophy icons, exclusive perks highlight | Accents | High-contrast on Navy |
| `color-surface-cool` | `#F3F6FC` | Global page background, inactive tab pills, subtle divider fills | Base | Neutral canvas |
| `color-surface-card` | `#FFFFFF` | Individual deal cards, modal sheets, checkout summaries | 1:1 Base | Pure clean card base |
| `color-border-subtle` | `#DCE4F0` | Default card borders, form field boundaries, data table rows | 1.3:1 Base | Clean separation |
| `color-text-primary` | `#091B3D` | Primary headings, deal titles, prices | 14.52:1 | **AAA Pass** |
| `color-text-secondary` | `#52627B` | Subtext, merchant store names, timestamps, disclaimers | 5.22:1 | **AA Pass** |
| `color-success` | `#157A5B` | Verified deals, confirmed entries, payment success toasts | 4.95:1 | **AA Pass** |
| `color-warning` | `#A65C00` | Expiring deals (e.g., "Ends in 2h"), verification pending | 5.12:1 | **AA Pass** |

### 2.3 Gradients & Atmosphere
- **Hero Masterpiece Gradient:** `linear-gradient(135deg, #091B3D 0%, #123C91 55%, #D92035 130%)`
- **Premium Member Card Gradient:** `linear-gradient(140deg, #123C91 0%, #2865DA 70%, #00D2FF 120%)`
- **Lucky Dip Jackpot Gradient:** `linear-gradient(120deg, #D92035 0%, #FF9900 100%)`
- **Dark Surface Glow:** `radial-gradient(circle at 50% 0%, rgba(40, 101, 218, 0.15), transparent 70%)`

---

## 3. Typography & Responsive Layout Grid

### 3.1 Typography Scale (Manrope / Inter)
- **Primary Typeface:** `Manrope`, sans-serif (Google Fonts)  
- **Secondary / Code:** `JetBrains Mono` / system monospace (for voucher codes & seed hashes)

| Level | Desktop Size / Line-Height | Mobile Size / Line-Height | Weight | Tracking |
|---|---|---|---|---|
| **Display 1 (Hero)** | 52px / 60px | 34px / 40px | 800 (ExtraBold) | -0.025em |
| **Heading 1 (H1)** | 40px / 48px | 28px / 34px | 700 (Bold) | -0.02em |
| **Heading 2 (H2)** | 28px / 36px | 22px / 28px | 700 (Bold) | -0.015em |
| **Heading 3 (H3)** | 20px / 28px | 18px / 24px | 600 (SemiBold) | -0.01em |
| **Body Regular** | 16px / 24px | 15px / 22px | 400 (Regular) | normal |
| **Body Medium / Lead**| 16px / 24px | 15px / 22px | 500 (Medium) | normal |
| **Caption / Badge** | 12px / 16px | 11px / 15px | 700 (Bold) | +0.03em |

### 3.2 Spacing & Radii
- **Base Spacing Rhythm (8pt):** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`
- **Border Radii:**
  - Standard Deal Cards: `16px` (`rounded-2xl`)
  - Modals & Banners: `20px` (`rounded-3xl`)
  - Form Fields & Buttons: `10px` (`rounded-lg`)
  - Category Pills & Status Badges: `9999px` (`rounded-full`)

---

## 4. Component UI Specifications

### 4.1 Global Navigation Header
- **Desktop (Sticky, Backdrop Blur):**
  - **Left:** One Stop Gadgets Logo (Height 44px) + Category Dropdown.
  - **Center:** Quick Search Bar (`Search 5,000+ Gadget Deals, Phones, Audio...`) with category filter prefix.
  - **Right:** Navigation Links ("All Deals", "Premium Perks", "Weekly Lucky Dip", "Pricing") + "Login" button + Red "Join Free" CTA.
  - **Logged-in State:** Shows Member Badge (Free vs VIP) + Avatar dropdown.

### 4.2 Deal Card Components

#### Type A: Public Deal Card
```text
+---------------------------------------------------------------+
| [Image: Noise-Cancelling Headphones]   [SAVE 42% (Red Badge)] |
| Merchant: Amazon India                 Expires: 3 days        |
| Sony WH-1000XM5 Wireless Headphones                           |
| ₹26,990  (was ₹34,990)                                        |
| [View Deal at Amazon ->] (Blue Outline Button)                |
+---------------------------------------------------------------+
```

#### Type B: Premium Locked Deal Card (Teaser State)
```text
+---------------------------------------------------------------+
| [Image: Blurred / Watermarked Apple iPad Air] [PREMIUM EXCLUSIVE]
| Merchant: Apple Authorized Partner     Expires: 24 hours      |
| Apple iPad Air M2 (256GB, Wi-Fi)                              |
| Exclusive Member Cashback: ₹4,500 Extra Savings               |
| [Locked Icon] "Unlock with One Stop VIP Membership"           |
| [Unlock Deal Now] (Primary Red Solid Button)                  |
+---------------------------------------------------------------+
```

### 4.3 Weekly Lucky Dip Showcase & Entry Form
- **Hero Banner:** Midnight Navy backdrop with radiating Electric Blue circuit lines and glowing Amber trophy.
- **Round Details:** "Round #42: Win a Brand New Apple iPhone 16 Pro (128GB)"
- **Live Countdown:** Server-synced countdown timer (`Days : Hours : Mins : Secs`).
- **Legal Compliance Banner:** "100% Free Entry • No Purchase Necessary • Registered Members Only".
- **Entry Form:**
  - Input: Full Legal Name (Auto-populated from verified profile).
  - Input: Verified Email Address.
  - Input: Mobile Number (+91 default, E.164 compliant).
  - Checkbox: "I agree to the Official Lucky Dip Rules (v1.2) and confirm I am 18+ years of age." (Mandatory).
  - Checkbox: "Send me exclusive weekend gadget price-drop notifications via WhatsApp/Email." (Optional).
  - CTA Button: "Submit My Free Entry" (Gradient Red-to-Amber with haptic feedback).
- **Post-Submission Confirmation Modal:**
  - Displays Unique Cryptographic Entry Reference: `#OSG-RD42-882910`
  - Reassurance: "Your entry is securely registered in Round #42 draw snapshot."

---

## 5. Screen Wireframes

### 5.1 Desktop Homepage Layout (1280px Grid)

```text
+---------------------------------------------------------------------------------------------------------+
| [ LOGO ]  [Search Gadgets, Phones, Smart Tech...]       All Deals   Premium   Lucky Dip   Pricing   [Login] |
+---------------------------------------------------------------------------------------------------------+
|  HERO SECTION (Midnight Navy to Deep Blue with Red Accent Flare)                                        |
|  "SMARTEST WAYS TO BUY TECH & GADGETS"                                                                  |
|  Curated Deals • Exclusive VIP Discounts • Weekly Free Lucky Dip Giveaways                              |
|  [Explore Top Deals (Blue)]      [Unlock VIP Membership (Red)]                                         |
+---------------------------------------------------------------------------------------------------------+
|  QUICK CATEGORY TILES                                                                                   |
|  [Smartphones] [Audio & Earbuds] [Laptops & PCs] [Smartwatches] [Gaming] [Smart Home] [Accessories]    |
+---------------------------------------------------------------------------------------------------------+
|  TODAY'S HOTTEST TECH DEALS (4-Column Responsive Grid)                                                  |
|  +-------------------+  +-------------------+  +-------------------+  +-------------------+             |
|  | [Deal Card 1]     |  | [Deal Card 2]     |  | [Deal Card 3]     |  | [Deal Card 4]     |             |
|  +-------------------+  +-------------------+  +-------------------+  +-------------------+             |
+---------------------------------------------------------------------------------------------------------+
|  VIP PREMIUM EXCLUSIVES (Members Only Teasers with Red/Electric Blue Glow)                              |
|  +-------------------+  +-------------------+  +-------------------+  +-------------------+             |
|  | [Locked Teaser 1] |  | [Locked Teaser 2] |  | [Locked Teaser 3] |  | [Locked Teaser 4] |             |
|  +-------------------+  +-------------------+  +-------------------+  +-------------------+             |
+---------------------------------------------------------------------------------------------------------+
|  WEEKLY LUCKY DIP HIGHLIGHT                                                                             |
|  [Prize Showcase: iPad Pro M4]   Round Closes In: 02d : 14h : 22m : 05s   [Enter Free (Red CTA)]         |
+---------------------------------------------------------------------------------------------------------+
|  RECENT WINNERS WALL & VERIFICATION LOG (Consented Initialed Winners)                                   |
|  "Rahul K. won Sony WH-1000XM5 (Round #41)" • "Priya S. won Apple Watch Series 10 (Round #40)"           |
+---------------------------------------------------------------------------------------------------------+
|  FOOTER: Mandatory Affiliate Disclosures • DPDP Privacy Policy • Terms • Grievance Officer Contact    |
+---------------------------------------------------------------------------------------------------------+
```

### 5.2 Mobile Responsive Homepage Layout (360px–420px)

```text
+------------------------------------+
| [=]   [ ONE STOP GADGETS ]   [🔍]  |
+------------------------------------+
| HERO BANNER                        |
| Smartest Deals on Top Gadgets      |
| [Explore Deals] [Join VIP]         |
+------------------------------------+
| CATEGORIES (Horizontal Swipe)      |
| (Phones) (Audio) (Laptops) (Watches)|
+------------------------------------+
| FLASH GADGET DEALS                 |
| +--------------------------------+ |
| | Deal Card (Image + Save 35%)   | |
| +--------------------------------+ |
| | Deal Card (Image + Save 40%)   | |
| +--------------------------------+ |
+------------------------------------+
| LUCKY DIP SPOTLIGHT                |
| Win iPhone 16 Pro • Free Entry     |
| [ Enter Lucky Dip ]                |
+------------------------------------+
| BOTTOM NAVIGATION BAR (Fixed)      |
| [Home]  [Deals]  [LuckyDip]  [Me]  |
+------------------------------------+
```

---

## 6. Administrative Role Dashboards

### 6.1 Deal Admin Dashboard (`/admin/*`) — Strictly Restricted
> Deal Admins manage product and deal links only. Access to user lists, payments, participants, or winner draws results in immediate `HTTP 403 Forbidden`.

```text
+-------------------------------------------------------------------------------------------+
| ONE STOP GADGETS [Staff Deal Portal]                                     [Deal Admin: John]
+-------------------+-----------------------------------------------------------------------+
| SIDEBAR           | DEAL MANAGEMENT CONSOLE                                               |
| • All Deals       | Filters: [Status: All v] [Category: All v] [Search Deal...] [+ Add Deal] |
| • Add New Deal    |-----------------------------------------------------------------------|
| • Product Links   | Title                  Merchant   Type    Status    Clicks   Actions  |
| • Logout          | MacBook Air M3 16GB    Amazon     Premium Published  1,420   [Edit]   |
|                   | Pixel Buds Pro 2       Flipkart   Public  Published  850     [Edit]   |
|                   | Galaxy S24 Ultra       Samsung    Premium Draft      0       [Edit]   |
+-------------------+-----------------------------------------------------------------------+
```

### 6.2 Super Admin Control Center (`/super-admin/*`)
> Full governance over deals, users, subscriptions, payment logs, and cryptographically verified Lucky Dip draws.

```text
+-------------------------------------------------------------------------------------------+
| ONE STOP GADGETS [Super Admin Console]                      [MFA Verified] [Admin: Super]  |
+-------------------+-----------------------------------------------------------------------+
| SIDEBAR           | EXECUTIVE OVERVIEW & LUCKY DIP CONTROL CENTER                         |
| • Overview        | KPI CARDS:                                                            |
| • Deals           | [Active Deals: 248] [VIP Subscribers: 1,840] [Round #42 Entrants: 6,420]
| • Categories      |-----------------------------------------------------------------------|
| • Merchants       | ROUND #42 MANAGEMENT: Apple iPhone 16 Pro Giveaway                     |
| • Users           | Status: Active • Closes: Nov 24, 2026, 23:59 IST • Entrants: 6,420    |
| • Subscriptions   | [View Participant Register]  [Export CSV (Logged)]  [Run Fair Draw]   |
| • Payments        |-----------------------------------------------------------------------|
| • Lucky Dip       | AUDIT & SECURITY STREAM (Real-Time):                                  |
|   - Rounds        | • Nov 18, 15:30: SuperAdmin initiated verified draw for Round #41     |
|   - Participants  | • Nov 18, 14:15: Webhook verified: Razorpay payment ₹499 for User #391|
|   - Winners       | • Nov 18, 12:00: Deal Admin updated destination URL for Deal #118     |
| • Audit Logs      |                                                                       |
| • Settings        |                                                                       |
+-------------------+-----------------------------------------------------------------------+
```

---

## 7. Design Review & Approval Gate

```text
================================================================================
STAKEHOLDER APPROVAL STATUS: PENDING
Design Specification Version: 1.0
Reviewed By: ____________________________________
Signature / Date: ______________________________
Approval Verdict: [ ] APPROVED   [ ] REVISIONS REQUIRED
================================================================================
```
