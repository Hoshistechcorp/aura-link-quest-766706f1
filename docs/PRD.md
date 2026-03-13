# Product Requirements Document (PRD)
## Meridian Tours — Tourism & Hospitality Growth Platform

**Version:** 1.0  
**Last Updated:** March 13, 2026  
**Status:** In Progress  

---

## 1. Executive Summary

Meridian Tours is a full-stack tourism and hospitality growth platform that provides businesses (restaurants, hotels, bars, cafés, fast casual, retail) with a single-link digital presence — combining microsites, loyalty, gamification, analytics, QR codes, AI concierge, and more into one unified system. The platform also serves as a destination management tool for tourism boards and city visitor bureaus.

### Core Value Proposition
> "Growth infrastructure for hospitality — your entire brand in one beautiful link."

### Target Users
| User Type | Description |
|-----------|------------|
| **Business Owners** | Restaurant, hotel, bar, café, retail operators |
| **Tourism Boards** | City/regional destination marketing organizations |
| **Visitors/Guests** | End consumers discovering and engaging with venues |
| **Affiliates/Influencers** | Partners promoting businesses for commission |

---

## 2. Architecture Overview

### 2.1 Frontend Stack
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling with semantic design tokens |
| shadcn/ui | Component library (Radix primitives) |
| Framer Motion | Animations & transitions |
| React Router v6 | Client-side routing |
| TanStack Query | Server state management |
| Recharts | Data visualization |
| Lucide React | Icon system |

### 2.2 Backend Stack (Supabase / Lovable Cloud)
| Service | Purpose |
|---------|---------|
| PostgreSQL | Primary database |
| Supabase Auth | Authentication (email, Google, Apple) |
| Supabase Storage | Image/file uploads (CDN-backed) |
| Edge Functions | Serverless API endpoints |
| Realtime | Live subscriptions for dashboards |
| Row Level Security | Data access control |

---

## 3. Frontend PRD

### 3.1 Navigation System

#### F-001: Sticky Navigation Bar
- **Priority:** P0 — Critical
- **Component:** `<StickyNav />`
- **Description:** Fixed top navigation with backdrop blur effect, logo, dark mode toggle, sign in/sign up buttons
- **Acceptance Criteria:**
  - Nav stays fixed on scroll with `backdrop-blur-md` effect
  - Responsive: hamburger menu on mobile (<768px)
  - Logo links to `/`
  - Sign In routes to `/dashboard` (authenticated) or `/login`
  - Sign Up routes to `/onboarding`
- **Design Tokens:** `bg-background/80`, `border-border`, `text-foreground`

#### F-002: Dark Mode Toggle
- **Priority:** P1 — High
- **Component:** `<DarkModeToggle />`
- **Hook:** `useDarkMode()`
- **Description:** Sun/Moon icon toggle persisting theme preference to localStorage
- **Acceptance Criteria:**
  - Theme persists across sessions via `localStorage`
  - Icon animates between Sun ↔ Moon
  - All components respect CSS variables in both modes
  - System preference detection on first visit

#### F-003 / F-004: Auth Buttons
- **Priority:** P0 — Critical
- **Components:** `<SignInButton />`, `<SignUpButton />`
- **Acceptance Criteria:**
  - Sign In: outline variant, routes to `/dashboard`
  - Sign Up: primary CTA variant, routes to `/onboarding`
  - Loading states during auth check
  - Authenticated users see avatar/profile dropdown instead

---

### 3.2 Landing Page — Hero Section

#### F-005: Main Headline
- **Priority:** P0 — Critical
- **Text:** "Growth infrastructure for hospitality."
- **Animation:** Framer Motion fade-up, plays once on mount
- **Responsive:** Single line desktop, wraps gracefully on mobile

#### F-006: Subheadline
- **Priority:** P0 — Critical
- **Text:** Explains one-link concept with loyalty, gamification, analytics
- **Constraint:** Max 2 lines on desktop

#### F-007: Industry Tags
- **Priority:** P1 — High
- **Component:** `<IndustryBadge />`
- **Items:** Restaurants, Hotels, Bars, Cafés, Fast Casual, Retail
- **Icons:** `UtensilsCrossed`, `Hotel`, `Wine`, `Coffee`, `Sandwich`, `Store`
- **Layout:** Horizontal flex-wrap with gap-2

#### F-008 / F-009: Hero CTAs
- **Priority:** P0 / P1
- **Buttons:**
  - "Join Waitlist" → smooth scroll to `#waitlist` section
  - "View Public Page" → routes to `/microsite`
- **Styling:** Primary with shadow, Secondary with outline

#### F-010: Background Gradient
- **Priority:** P2 — Medium
- **Implementation:** Radial gradient with `bg-primary/5` blur behind hero
- **Performance:** CSS-only, no JS animation

---

### 3.3 Landing Page — Content Sections

#### F-011–F-014: "Who It's For" Section
- **Priority:** P1 — High
- **Cards:** 3 feature cards (Restaurant, Hotel, Bar/Lounge)
- **Animation:** Staggered entrance via Framer Motion
- **Layout:** 3-column grid → single column on mobile
- **Each card includes:** Icon, title, bullet points of specific features

#### F-015–F-030: Features Grid ("15 Modules. One Link.")
- **Priority:** P0 — Critical
- **Layout:** Responsive grid (4 cols desktop → 2 cols tablet → 1 col mobile)
- **Card Component:** `<FeatureCard icon={} title="" description="" />`

| ID | Feature | Icon | Description |
|----|---------|------|-------------|
| F-016 | Microsite | `Link` | Your entire brand in one beautiful link |
| F-017 | Smart QR | `QrCode` | One scan opens your entire world |
| F-018 | Digital Menu | `ChefHat` | Always up-to-date, always stunning |
| F-019 | Gamification | `Gamepad2` | Spin-to-win, scratch cards, instant rewards |
| F-020 | Loyalty | `Heart` | Points & tiers that drive repeat visits |
| F-021 | Referrals | `Share2` | Turn happy guests into growth engines |
| F-022 | Reviews | `Star` | Collect & showcase real guest feedback |
| F-023 | Reputation | `Shield` | Own your reviews across every platform |
| F-024 | Analytics | `BarChart3` | Know exactly what's working |
| F-025 | Affiliates | `Handshake` | Let partners earn while you grow |
| F-026 | Influencers | `Megaphone` | Find, manage, measure creator ROI |
| F-027 | Multi-Location | `MapPin` | Every venue, one dashboard |
| F-028 | Card Studio | `CreditCard` | Digital cards with NFC & QR |
| F-029 | Gallery | `ImageIcon` | Showcase your space beautifully |
| F-030 | AI Concierge | `MessageSquare` | Smart guest assistance, 24/7 |

#### F-031–F-032: Video Demo Section
- **Priority:** P1 — High
- **Component:** YouTube embed with click-to-play overlay
- **Behavior:** Thumbnail placeholder first, loads iframe on click
- **Aspect Ratio:** 16:9

#### F-033–F-036: Waitlist Section
- **Priority:** P0 — Critical
- **Background:** Primary gradient card with rounded corners
- **Form Fields:** Email input with validation
- **Submit:** Toast confirmation via Sonner, clears input
- **Secondary CTA:** "Book a Demo" mailto link

#### F-037–F-039: Footer
- **Priority:** P2 — Medium
- **Content:** Logo, Features link (scroll to `#features`), Demo link (`/microsite`), Copyright
- **Social Links:** Icons for major platforms

---

### 3.4 Public Microsite

#### F-042: Public Microsite Page
- **Priority:** P0 — Critical
- **Route:** `/microsite`
- **Description:** Mobile-first public-facing page for each business/destination

**Module Categories (consolidated for clean UX):**

| Category | Modules Included | Route |
|----------|-----------------|-------|
| Things To Do | Attractions, tours, activities | `/destination/things-to-do` |
| Events & Festivals | Calendar, featured events, venues | `/destination/events-festivals` |
| Food & Dining | Restaurants, cuisine filtering, food tours | `/destination/food-dining` |
| Hotels & Stays | Accommodations, booking, packages | `/destination/hotels` |
| Arts & Culture | Museums, theater, public art | `/destination/culture` |
| Nature & Parks | Outdoor activities, trails | `/destination/nature` |
| Nightlife | Bars, clubs, live music | `/microsite/events` |
| Sports & Recreation | Stadiums, team stores, athletes | `/destination/things-to-do` |
| Family Friendly | Kid attractions, family hotels | `/destination/attractions` |
| Deals & Packages | Special offers, bundles, coupons | `/destination/deals` |
| Transportation | Airport, transit, rideshare, bikes | `/destination/transportation` |
| Plan Your Trip | AI itinerary builder | `/destination/plan-trip` |
| Photo & Video | Galleries, user content | `/destination/photos` |
| Neighborhoods | District guides, filtered views | `/destination/neighborhoods` |
| Visitor Services | FAQs, accessibility, live chat | `/microsite/faqs` |
| Community | Local creators, blogs, influencers | `/destination/creators` |

**Quick Category Chips:** Museums, Outdoor, Family, Nightlife, Food Tours, Sports, Shopping, Wellness

**Featured Content Grid:** 4–6 curated highlights chosen by tourism board

---

### 3.5 Dashboard

#### F-040: Business Dashboard
- **Priority:** P0 — Critical
- **Route:** `/dashboard`
- **Layout:** Sidebar navigation + main content area (`<DashboardLayout />`)

**Dashboard Sections:**

| Section | Route | Description |
|---------|-------|-------------|
| Overview | `/dashboard` | KPIs, charts, recent activity |
| Analytics | `/dashboard/analytics` | Deep-dive metrics, date ranges, export |
| QR Management | `/dashboard/qr` | Generate/manage QR codes |
| Card Studio | `/dashboard/cards` | Digital card builder |
| Loyalty | `/dashboard/loyalty` | Points/tier configuration |
| Gamification | `/dashboard/gamification` | Game setup & prizes |
| Referrals | `/dashboard/referrals` | Referral program management |
| Reputation | `/dashboard/reputation` | Review aggregation |
| SEO | `/dashboard/seo` | Search optimization tools |
| Team | `/dashboard/team` | Staff management |
| Locations | `/dashboard/locations` | Multi-venue management |
| Affiliates | `/dashboard/affiliates` | Partner management |
| Influencers | `/dashboard/influencers` | Creator management |
| Subscription | `/dashboard/subscription` | Plan & billing |
| Settings | `/dashboard/settings` | Account configuration |
| Admin | `/dashboard/admin` | Platform administration |

#### F-041: Business Onboarding Flow
- **Priority:** P0 — Critical
- **Route:** `/onboarding`
- **Steps:**
  1. Business info (name, type, location)
  2. Branding (logo, colors, fonts)
  3. Feature selection (which modules to enable)
  4. Review & launch
- **Requirements:** Progress indicator, save & resume capability

---

### 3.6 Itinerary Builder

#### F-047 (Visitor): Itinerary Builder
- **Route:** `/destination/plan-trip`
- **Features:**
  - Create multiple itineraries
  - Drag-and-drop items into days
  - Add notes, reorder activities
  - Time estimates between locations
  - Share via public URL
  - Export as PDF
  - Works without login (localStorage for anonymous)

#### Save Button (F-023)
- Heart icon on all content cards and detail pages
- Adds item to user's itinerary
- Visual feedback (filled heart animation)
- Persists to localStorage (anonymous) or DB (authenticated)

---

### 3.7 Shared UI Components

| Component | File | Purpose |
|-----------|------|---------|
| `<AuraCard />` | `components/aura/AuraCard.tsx` | Reusable content card |
| `<ActionButton />` | `components/aura/ActionButton.tsx` | Styled action button |
| `<UsageMeter />` | `components/aura/UsageMeter.tsx` | Plan usage visualization |
| `<DashboardLayout />` | `components/aura/DashboardLayout.tsx` | Dashboard shell with sidebar |
| `<MicrositeHeader />` | `components/aura/MicrositeHeader.tsx` | Microsite top bar |
| `<DestinationHeader />` | `components/aura/DestinationHeader.tsx` | Destination page header |
| `<EcosystemLauncher />` | `components/aura/EcosystemLauncher.tsx` | App ecosystem grid |

---

## 4. Backend PRD

### 4.1 Database Schema

#### Core Tables

```sql
-- Business accounts
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('restaurant','hotel','bar','cafe','fast_casual','retail','destination')),
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  cover_url TEXT,
  description TEXT,
  address JSONB, -- {street, city, state, zip, country, lat, lng}
  contact JSONB, -- {phone, email, website}
  social_links JSONB, -- {instagram, facebook, twitter, tiktok}
  branding JSONB, -- {primary_color, secondary_color, font}
  enabled_modules TEXT[] DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles (CRITICAL: separate from profiles)
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'business_owner', 'staff', 'user');

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  UNIQUE (user_id, role, business_id)
);

-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Multi-location support
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address JSONB NOT NULL,
  phone TEXT,
  hours JSONB, -- {mon: {open, close}, tue: ...}
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Content & Listings Tables

```sql
-- Attractions / Things to Do
CREATE TABLE attractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- museum, outdoor, family, nightlife, sports, arts
  description TEXT,
  images TEXT[] DEFAULT '{}',
  location JSONB, -- {address, lat, lng}
  hours JSONB,
  admission_price JSONB, -- {adult, child, senior, free: boolean}
  duration_minutes INT,
  website TEXT,
  ticket_url TEXT,
  neighborhood TEXT,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  accessibility JSONB, -- {wheelchair, hearing, visual, sensory_friendly}
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Restaurants / Dining
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cuisine_types TEXT[] DEFAULT '{}',
  price_range INT CHECK (price_range BETWEEN 1 AND 4), -- $ to $$$$
  description TEXT,
  images TEXT[] DEFAULT '{}',
  location JSONB,
  hours JSONB,
  phone TEXT,
  website TEXT,
  reservation_url TEXT,
  neighborhood TEXT,
  is_featured BOOLEAN DEFAULT false,
  special_menus JSONB, -- [{name, description, available_dates}]
  chef_features JSONB, -- {name, bio, photo_url}
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Accommodations
CREATE TABLE accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hotel','hostel','bnb','resort','vacation_rental')),
  price_range INT CHECK (price_range BETWEEN 1 AND 4),
  description TEXT,
  images TEXT[] DEFAULT '{}',
  location JSONB,
  amenities TEXT[] DEFAULT '{}',
  website TEXT,
  booking_url TEXT,
  near_stadium BOOLEAN DEFAULT false,
  world_cup_rates JSONB, -- {rate, availability, badge: boolean}
  neighborhood TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT, -- concert, festival, sports, cultural, food, family
  description TEXT,
  images TEXT[] DEFAULT '{}',
  venue_name TEXT,
  venue_location JSONB,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT, -- iCal RRULE format
  ticket_url TEXT,
  price JSONB, -- {min, max, free: boolean}
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Deals & Packages
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  deal_type TEXT CHECK (deal_type IN ('discount','bundle','coupon','package')),
  coupon_code TEXT,
  partner_url TEXT,
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,
  terms TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Neighborhoods
CREATE TABLE neighborhoods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  location JSONB, -- center point + boundary polygon
  highlights TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Menu System

```sql
-- Digital Menu
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  dietary_tags TEXT[] DEFAULT '{}', -- vegan, gf, halal, etc.
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);
```

#### Gamification System

```sql
-- Spin-to-Win Configuration
CREATE TABLE spin_wheels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  segments JSONB NOT NULL, -- [{label, prize, probability, color}]
  daily_spin_limit INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Scratch Cards
CREATE TABLE scratch_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  prizes JSONB NOT NULL, -- [{label, probability, value}]
  design JSONB, -- {background, overlay, reveal_animation}
  expiry_hours INT DEFAULT 24,
  is_active BOOLEAN DEFAULT true
);

-- Game Plays (tracking)
CREATE TABLE game_plays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  business_id UUID REFERENCES businesses(id),
  game_type TEXT NOT NULL CHECK (game_type IN ('spin','scratch','scavenger')),
  game_id UUID NOT NULL,
  result JSONB, -- {won: boolean, prize, value}
  redeemed BOOLEAN DEFAULT false,
  redeemed_at TIMESTAMPTZ,
  played_at TIMESTAMPTZ DEFAULT now()
);

-- Scavenger Hunts
CREATE TABLE scavenger_hunts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  checkpoints JSONB NOT NULL, -- [{id, name, location, clue, qr_code}]
  reward JSONB, -- {type, value, description}
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  criteria JSONB NOT NULL, -- {type: 'visits'|'spend'|'checkin', threshold: number}
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);
```

#### Loyalty & Referrals

```sql
-- Loyalty Program Config
CREATE TABLE loyalty_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  points_per_dollar INT DEFAULT 1,
  points_per_visit INT DEFAULT 10,
  tiers JSONB DEFAULT '[]', -- [{name, threshold, benefits, color}]
  is_active BOOLEAN DEFAULT true
);

-- User Loyalty Balances
CREATE TABLE loyalty_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  points INT DEFAULT 0,
  tier TEXT DEFAULT 'bronze',
  lifetime_points INT DEFAULT 0,
  UNIQUE(user_id, business_id)
);

-- Loyalty Transactions
CREATE TABLE loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('earn','redeem','bonus','expire')),
  points INT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Redemption Catalog
CREATE TABLE loyalty_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  points_cost INT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Referral Program
CREATE TABLE referral_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  referrer_reward JSONB, -- {type: 'points'|'discount', value}
  referee_reward JSONB,
  is_active BOOLEAN DEFAULT true
);

-- Referral Codes
CREATE TABLE referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  uses INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Referral Tracking
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id),
  referee_id UUID REFERENCES auth.users(id),
  code_id UUID REFERENCES referral_codes(id),
  business_id UUID REFERENCES businesses(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','completed','rewarded')),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Reviews & Reputation

```sql
-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- 'restaurant', 'attraction', 'hotel', 'event'
  entity_id UUID NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  photos TEXT[] DEFAULT '{}',
  is_approved BOOLEAN DEFAULT false,
  response TEXT, -- business owner response
  response_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- External Review Aggregation
CREATE TABLE external_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'google', 'yelp', 'tripadvisor'
  external_id TEXT,
  rating DECIMAL(2,1),
  review_count INT,
  url TEXT,
  last_synced_at TIMESTAMPTZ
);
```

#### QR Codes & Analytics

```sql
-- QR Codes
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  target_url TEXT NOT NULL,
  style JSONB DEFAULT '{}', -- {color, logo, shape}
  format TEXT DEFAULT 'png' CHECK (format IN ('png','svg')),
  scan_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'page_view','qr_scan','booking','game_play','referral'
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  visitor_id TEXT, -- anonymous hash
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Daily Aggregates (materialized for dashboard performance)
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  qr_scans INT DEFAULT 0,
  bookings INT DEFAULT 0,
  game_plays INT DEFAULT 0,
  referrals INT DEFAULT 0,
  UNIQUE(business_id, date)
);
```

#### Itinerary Builder

```sql
-- Itineraries
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id), -- destination/tourism board
  title TEXT NOT NULL DEFAULT 'My Trip',
  share_slug TEXT UNIQUE,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Itinerary Days
CREATE TABLE itinerary_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID REFERENCES itineraries(id) ON DELETE CASCADE,
  date DATE,
  day_number INT NOT NULL,
  notes TEXT
);

-- Itinerary Items
CREATE TABLE itinerary_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id UUID REFERENCES itinerary_days(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- 'attraction','restaurant','event','hotel'
  entity_id UUID NOT NULL,
  sort_order INT DEFAULT 0,
  start_time TIME,
  duration_minutes INT,
  notes TEXT
);

-- Saved Items (heart/bookmark)
CREATE TABLE saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, entity_type, entity_id)
);
```

#### Affiliates & Influencers

```sql
-- Affiliate Programs
CREATE TABLE affiliate_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  commission_type TEXT CHECK (commission_type IN ('percentage','flat')),
  commission_value DECIMAL(10,2),
  cookie_days INT DEFAULT 30,
  is_active BOOLEAN DEFAULT true
);

-- Affiliate Partners
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES affiliate_programs(id) ON DELETE CASCADE,
  tracking_code TEXT UNIQUE NOT NULL,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  earnings DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','suspended')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Influencer Campaigns
CREATE TABLE influencer_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  influencer_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  brief TEXT,
  deliverables JSONB, -- [{type: 'post'|'story'|'reel', quantity, deadline}]
  compensation JSONB, -- {type: 'flat'|'commission'|'product', value}
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Notifications & Alerts

```sql
-- Emergency Alerts
CREATE TABLE emergency_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  severity TEXT CHECK (severity IN ('info','warning','critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- SMS Alert Subscriptions
CREATE TABLE sms_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(phone, business_id)
);

-- Waitlist
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'landing_page',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Digital Cards

```sql
-- Card Templates
CREATE TABLE card_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('loyalty','business','vip','event')),
  design JSONB NOT NULL, -- {layout, colors, fields, background}
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Issued Cards
CREATE TABLE digital_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES card_templates(id),
  card_data JSONB, -- custom field values
  nfc_id TEXT UNIQUE,
  qr_code_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Photo & Content

```sql
-- Photo Albums
CREATE TABLE photo_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  is_community BOOLEAN DEFAULT false, -- user-submitted
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Photos
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES photo_albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  photographer TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog / Articles
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  body TEXT,
  cover_url TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 4.2 Row Level Security (RLS)

```sql
-- Security definer function (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Business-scoped access function
CREATE OR REPLACE FUNCTION public.owns_business(_user_id UUID, _business_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND business_id = _business_id
      AND role IN ('business_owner', 'admin')
  )
$$;

-- Example RLS policies
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view businesses"
  ON businesses FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Owners can update their business"
  ON businesses FOR UPDATE TO authenticated
  USING (public.owns_business(auth.uid(), id));

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view menu items"
  ON menu_items FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Owners can manage menu items"
  ON menu_items FOR ALL TO authenticated
  USING (public.owns_business(auth.uid(), business_id));

-- Apply similar patterns to all tables
```

### 4.3 Edge Functions (Serverless API)

| Function | Method | Purpose | Dependencies |
|----------|--------|---------|--------------|
| `waitlist-signup` | POST | Add email to waitlist, send confirmation | Resend/SendGrid |
| `generate-qr` | POST | Generate QR code image (PNG/SVG) | qrcode library |
| `process-referral` | POST | Validate referral code, credit both parties | Loyalty system |
| `spin-wheel` | POST | Validate spin eligibility, determine prize | Gamification engine |
| `scratch-card` | POST | Reveal scratch card result | Gamification engine |
| `ai-concierge` | POST | Process guest question via LLM | OpenAI/Anthropic API |
| `sync-reviews` | CRON | Pull reviews from Google/Yelp APIs | Platform API keys |
| `send-sms-alert` | POST | Send emergency SMS to subscribers | Twilio |
| `export-itinerary` | POST | Generate PDF of itinerary | PDF library |
| `analytics-aggregate` | CRON | Roll up daily analytics | Analytics events table |
| `check-availability` | POST | Query partner APIs for hotel/restaurant availability | Partner APIs |

### 4.4 Storage Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `business-assets` | Public read, auth write | Logos, covers, branding |
| `menu-images` | Public read, auth write | Menu item photos |
| `gallery-photos` | Public read, auth write | Photo album images |
| `user-uploads` | Auth read/write | User-submitted content (pending approval) |
| `qr-codes` | Public read, auth write | Generated QR code images |
| `card-assets` | Public read, auth write | Digital card designs |

### 4.5 Authentication Flows

| Flow | Method | Details |
|------|--------|---------|
| Email/Password | Supabase Auth | Standard signup with email confirmation |
| Google OAuth | Supabase Auth | One-click sign in via Google |
| Apple Sign In | Supabase Auth | One-click sign in via Apple |
| Magic Link | Supabase Auth | Passwordless email login |
| Anonymous | localStorage | Itinerary builder works without account |

### 4.6 Realtime Subscriptions

| Channel | Use Case |
|---------|----------|
| `analytics_events` | Live dashboard counters |
| `reviews` | New review notifications |
| `emergency_alerts` | Alert banner updates |
| `game_plays` | Leaderboard updates |

---

## 5. Sprint Plan

### Sprint 1 (Weeks 1–2) — Foundation ✅
- [x] Landing page (hero, features grid, waitlist, footer)
- [x] Dark mode toggle
- [x] Navigation system
- [x] Basic routing structure
- [x] Microsite shell

### Sprint 2 (Weeks 3–4) — Content ✅
- [x] "Who It's For" section
- [x] Features grid (15 modules)
- [x] Video demo section
- [x] Microsite category consolidation
- [x] Destination sub-pages

### Sprint 3 (Weeks 5–6) — Core Platform 🔄
- [ ] Authentication (Lovable Cloud)
- [ ] Business onboarding flow
- [ ] Dashboard with real data
- [ ] Database schema deployment
- [ ] Menu builder (CRUD)

### Sprint 4 (Weeks 7–8) — Engagement
- [ ] QR code generator
- [ ] Photo gallery with lightbox
- [ ] Reviews system (collect + display)
- [ ] Analytics event tracking
- [ ] Itinerary builder v1

### Sprint 5 (Weeks 9–10) — Growth
- [ ] Gamification (spin wheel + scratch cards)
- [ ] Loyalty points + tiers
- [ ] Reputation dashboard (external review sync)
- [ ] Multi-location management
- [ ] AI concierge v1

### Sprint 6 (Weeks 11–12) — Partnerships
- [ ] Referral engine
- [ ] Affiliate dashboard
- [ ] Influencer campaign management
- [ ] Deals & packages system

### Sprint 7 (Weeks 13–14) — Intelligence
- [ ] AI concierge (full LLM integration)
- [ ] Advanced analytics (cohorts, funnels)
- [ ] Real-time updates (crowd levels, wait times)
- [ ] Live chat (AI + human handoff)

### Sprint 8 (Weeks 15–16) — Premium
- [ ] Card Studio (digital cards + NFC)
- [ ] PDF itinerary export
- [ ] Multilingual expansion
- [ ] Accessibility audit & improvements
- [ ] Performance optimization

---

## 6. World Cup Module (Add-on)

### Specific Features
| Feature | Description |
|---------|-------------|
| Match Schedule | Filterable by date/team, stadium info |
| Match Detail | Stadium map + "Before/After the Match" curated lists |
| Team Guides | Per-team: supporter bars, cuisine, cultural tips |
| Fan Zone Locator | Map with official/unofficial viewing party markers |
| Last-Minute Finder | Match day → nearby available hotels/restaurants |
| Near Stadium Toggle | Filter accommodations by proximity to venue |
| World Cup Badge | Visual indicator on listings with special rates |

### Database Additions
```sql
CREATE TABLE world_cup_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_a TEXT NOT NULL,
  team_b TEXT NOT NULL,
  match_date TIMESTAMPTZ NOT NULL,
  stadium TEXT NOT NULL,
  stadium_location JSONB,
  stage TEXT, -- group, round_of_16, quarter, semi, final
  group_name TEXT
);

CREATE TABLE fan_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('official','unofficial')),
  location JSONB NOT NULL,
  capacity INT,
  schedule JSONB,
  amenities TEXT[] DEFAULT '{}'
);

CREATE TABLE team_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  flag_url TEXT,
  supporter_bars JSONB, -- [{name, location}]
  restaurants JSONB, -- [{name, cuisine}]
  cultural_tips TEXT[],
  fan_chants TEXT[]
);
```

---

## 7. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Performance** | First Contentful Paint < 1.5s, Largest Contentful Paint < 2.5s |
| **Images** | Lazy loading, WebP format, responsive srcset |
| **SEO** | Title < 60 chars, meta desc < 160 chars, single H1, JSON-LD, sitemap.xml |
| **Accessibility** | WCAG 2.1 AA, keyboard nav, screen reader labels, alt text on all images |
| **Responsive** | Mobile-first, breakpoints: 640/768/1024/1280px |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| **Security** | RLS on all tables, HTTPS only, input sanitization, rate limiting |
| **Uptime** | 99.9% availability target |
| **Data Privacy** | GDPR compliant, anonymous analytics, clear privacy policy |

---

## 8. API Rate Limits & Quotas

| Endpoint | Limit |
|----------|-------|
| Waitlist signup | 5/min per IP |
| QR generation | 50/hour per business |
| Spin wheel | 1/day per user per business (configurable) |
| AI concierge | 20 messages/session |
| Review sync | 4x/day per platform |
| SMS alerts | 100/alert per business |

---

## 9. Monitoring & Observability

| Tool | Purpose |
|------|---------|
| Supabase Dashboard | DB queries, auth logs, storage usage |
| Edge Function Logs | API error tracking |
| Anonymous Analytics | Page views, popular content (no PII) |
| Error Tracking | Runtime error capture (Sentry/LogRocket) |

---

*Document maintained by the Meridian Tours product team.*
