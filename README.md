# FS Real Estate Advisory (`fs_properties`)

Production-ready Dubai Real Estate & Off-Plan Advisory platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and a dedicated **Full-Page CMS Control Panel (`cms/`)** with live backend API & `localStorage` synchronization.

---

## 🎨 Theme & Design System Reference

This section documents the authoritative color palette, typography rules, component specs, and active page routes across the application.

### 🎨 Color Palette

| Usage | Hex Code | Class Utility / Variable | Description |
| :--- | :--- | :--- | :--- |
| **Primary Gold Accent** | `#C5A267` / `#BFA16A` / `#BA955C` | `text-[#C5A267]`, `bg-[#BFA16A]` | Subheadings, active/hover link states, category badges, primary CTA buttons, footer column headers, CMS accents. |
| **Gold Hover State** | `#b59257` / `#aa8e59` | `hover:bg-[#b59257]` | Darker gold for button hover states. |
| **Primary Dark Text** | `#171717` / `#111111` | `text-[#171717]`, `text-[#111111]` | Main headings, card titles, primary body text, navbar text (`#171717`). |
| **Muted Subtitle Text** | `#858585` / `#737373` | `text-[#858585]`, `text-[#737373]` | Subtitles, developer names, field labels ("Best For", "Price From"). |
| **Light Off-White Section** | `#F8F6F2` | `bg-[#F8F6F2]` | Section backgrounds, icon containers, category badge backgrounds. |
| **Page Base Background** | `#FAF9F6` | `bg-[#FAF9F6]` | Main website and CMS base background color. |
| **Dark Widget / Footer Bg** | `#171717` / `#18181B` | `bg-[#171717]`, `bg-[#18181B]` | Footer background and dark sidebar contact widgets. |

---

### 🔤 Typography & Font Rules

| Font Family | Next.js Variable | Weights & Usage Rules |
| :--- | :--- | :--- |
| **Cinzel** | `--font-cinzel` (`font-cinzel`) | • **Regular (`font-normal` / 400):** Hero section primary headings across all pages (Height `550px`, Font Size `56px` / `lg:text-[56px]`), section headings.<br>• **Medium (`font-medium` / 500):** Selected Opportunities heading.<br>• **Bold (`font-bold` / 700):** All Developers heading, card titles. |
| **Playfair Display** | `--font-playfair` (`font-playfair`) | • **Semi-Bold (`font-semibold` / 600):** Main Section Headings (e.g. *"Why FS Recommends The Valley"*, property titles, community names).<br>• **Medium (`font-medium` / 500):** Homepage section headings (*"Opportunities We Currently Recommend"*). |
| **Donegal One** | `--font-donegal` (`font-donegal`) | • **Regular (`font-normal` / 400):** Dark banner headings (*"Tell us the brief instead."*, *"What brings you to dubai property?"*). |
| **Inter** | `--font-inter` (`font-inter`) | • **Regular (`font-normal` / 400):** Navbar navigation links (`text-[#171717] font-normal`), Hero section subtitles, breadcrumb navigation, property details tables.<br>• **Bold (`font-bold` / 700):** Card titles, price values, FS score metrics.<br>• **Light (`font-light` / 300):** Developer subtitles ("By Emaar"), secondary detail labels. |
| **Poppins** | `--font-poppins` (`font-poppins`) | • **Bold (`font-bold` / 700):** `/buy-detail` USPs headline, Price (`AED 24,750,000`), `Property Details`, `Amenities`, `Transactions for Similar Properties`, `Price & Trends`, and `Recommended for you` headings.<br>• **Semi-Bold (`font-semibold` / 600):** Footer column headings (`COMPANY`, `OPPORTUNITIES`, `INSIGHTS`, `SERVICES`), `READY` badges.<br>• **Medium (`font-medium` / 500):** Section taglines, intent buttons, card tags. |

---

## 🗺️ Page Routes & Core Components

| Route | Page File | Core Components | Description |
| :--- | :--- | :--- | :--- |
| `/` & `/homepage` | `app/page.tsx`, `app/homepage/page.tsx` | `HeroSection`, `RecommendedOpportunities`, `ExploreCommunity`, `GoalSelectionStep`, `OffPlanGuideSection`, `BuyerGuideFaqSection` | Main Home page with Hero Banner, 4-Icon Feature Bar, Recommended Opportunities, Explore by Community, Off-Plan Long Content Guide, and FAQs. |
| `/buy` | `app/buy/page.tsx` | `BuyHeroSection`, `BuySearchFilterSection`, `BuyPropertyListingsSection`, `OffPlanGuideSection`, `BuyerGuideFaqSection` | Buy in Dubai property search catalog with 9-col listings, 3-col sidebar widgets, pagination, About R. Hills, Properties to explore, long off-plan guide, and FAQs. |
| `/buy-detail` | `app/buy-detail/page.tsx` | `BuyDetailFirstSection`, `BuyDetailMortgageCalculator`, `BuyDetailRecommendedSection` | Ready & Resale Property Detail page supporting dynamic `?slug=` routing (`Lake View \| Rare to Market \| Garden Hall`), interactive photo gallery + lightbox, USPs bar, pricing & property details table, expandable description & bullets, 9 vector-icon amenities, Sold/Rented transaction tables, Price & Size vs. Average trend cards, map location, building/community insights, mortgage calculator, and full-width 4-column recommended project cards. |
| `/project-main-page` | `app/project-main-page/page.tsx` | `ProjectMainHero`, `ProjectGridSection`, `OffPlanGuideSection` | Off-Plan Property For Sale In Dubai directory with search/filter controls, 20 curated developer projects, and comprehensive Off-Plan guide. |
| `/project-detail` | `app/project-detail/page.tsx` | `ProjectDetailHero`, `ProjectDetailSection` | Off-Plan Project Detail page supporting dynamic `?slug=` routing with 10 CMS-managed sections: Hero, Overview & Key Metrics, Floor Plans, Amenities, Video Showcase, Categorized Photo Gallery (All/Interior/Exterior/Lifestyle), Map Coordinates, Investment Guide, FAQs, and Similar Projects. |
| `/communities` | `app/communities/page.tsx` | `CommunityHeroSection`, `CommunityGridSection`, `OffPlanGuideSection`, `BuyerGuideFaqSection` | Communities hub page with luxury hero, 12 master community cards (3 per row, 4 rows), long educational guide, and FAQs. |
| `/community-detail` | `app/community-detail/page.tsx` | `CommunityDetailHero`, `CommunityOverviewSection`, `SelectedOpportunitiesSection`, `CommunityAmenitiesLocationSection`, `OffPlanGuideSection`, `BuyerGuideFaqSection` | Detailed community landing page supporting dynamic `?slug=` routing with breadcrumb hero, overview, 4x3 opportunities grid, community amenities, off-plan guide, and FAQs. |
| `/compare-communities` | `app/compare-communities/page.tsx` | `CompareCommunitiesHero`, `CommunityComparisonSection` | Side-by-side community comparison matrix evaluating lifestyle, yields, and advisory scores. |
| `/developers` & `/developer` | `app/developers/page.tsx`, `app/developer/page.tsx` | `DeveloperHeroSection`, `DevelopersIntroSection`, `DevelopersDirectoryGrid`, `DevelopersCompareAndBriefSection`, `OffPlanGuideSection`, `BuyerGuideFaqSection` | Master Developers directory with 12 developer profiles, search/filter bar, comparison brief banner, off-plan guide, and FAQs. |
| `/developer-detail` | `app/developer-detail/page.tsx` | `DeveloperHeroSection`, `DeveloperBriefSection`, `DevelopersDirectoryGrid`, `DeveloperAskBriefBanner`, `OffPlanGuideSection`, `BuyerGuideFaqSection` | Developer detail page supporting dynamic `?slug=` routing with Key Numbers yellow banner, Measured live register metrics card, developer projects grid, consultation banner, and guide. |
| `/blog` | `app/blog/page.tsx` | `BlogHeroSection`, `BlogGridSection` | Real Estate Insights & News hub with category tabs (`All`, `Real Estate`, `Coming Soon`), search bar, and paginated article cards. |
| `/blog-details` | `app/blog-details/page.tsx` | `BlogHeroSection`, `BlogDetailsContentSection` | Individual blog article page supporting dynamic `?slug=` routing with auto-generated Table of Contents, watermarked feature images, Key Figures snapshot table, and sidebar widgets. |
| `/the-valley` | `app/the-valley/page.tsx` | `TheValleyHero`, `ValleyOverviewScoreSection`, `WhyFSRecommendsValleySection`, `ValleyHighlightsSection` | Recommendation Result / Featured Community showcase for The Valley by Emaar. |
| `/ai-assessment` | `app/ai-assessment/page.tsx` | `AIAssessmentHero`, `GoalSelectionStep` | Interactive 5-step AI real estate goal assessment wizard. |
| `/advisory-report` | `app/advisory-report/page.tsx` | `AdvisoryReportHero`, `OverallMatchScoreSection`, `RecommendedCommunitiesSection` | Personalized AI Advisory Report displaying match scores and top 3 recommended communities. |
| `/about-us` | `app/about-us/page.tsx` | `AboutUsHero`, `AboutUsSection` | FS Real Estate Advisory vision, philosophy, and core advisory pillars. |

---

## 🎛️ CMS Control Panel & Full-Page Section Builder (`cms/`)

The CMS is a dedicated Next.js application in `cms/` running on port `3001` (`http://localhost:3001`). It connects to the REST API backend (`http://127.0.0.1:8000/api`) with instant `localStorage` fallback/live-sync so edits reflect immediately on the frontend (`http://localhost:3000`).

### 🏠 Property Listings (`Ready & Resale`) & `/buy-detail` Section Builder

Inside the **Property Listings** tab (`activeTab === 'properties'`), the active listing (**`Lake View | Rare to Market | Garden Hall`**) and any newly created properties open in the Full-Page Property Section Editor with **8 dedicated `/buy-detail` page sections**:

1. **Section #1 — `Hero & Photo Gallery` (`buy-detail-hero`)**:
   - **All Images — Upload Images To The Gallery** dashed blue drag-and-drop container supporting multi-image upload, drag reordering, and instant `×` deletion.
   - Connected directly to the `/buy-detail` 3-image hero collage and full-screen interactive photo lightbox.
   - Breadcrumb navigation path, photo count badge text (`20 Photos`), and `Verified` / `SuperAgent` badge toggles.
2. **Section #2 — `Property Details & Pricing` (`buy-detail-overview`)**:
   - **USPs (Unique Selling Points)** builder with `+ Add USP` button (renders `Lake View | Rare to Market | Garden Hall` joined by `|` on the frontend).
   - **Price** box (`Price (AED)`, `Upfront Costs Label`, `Monthly Estimate`).
   - **Property Details Heading** (`Property Details`) and the **5 underlined specification fields**: `Property type`, `Furnishing`, `Bedrooms`, `Area / sq ft`, and `Bathrooms`.
3. **Section #3 — `Description & Key Features` (`buy-detail-description`)**:
   - `Eyebrow Subtitle` (`Villa for sale in Cluster 50, Mediterranean Clusters`) and `Availability Text` (`Available from 28 Sep 2026`).
   - Dynamic **Description Paragraphs** (`+ Add Paragraph`) and **Key Feature Bullet Points** (`+ Add Bullet`).
4. **Section #4 — `Property Amenities` (`buy-detail-amenities`)**:
   - In-place multi-select dropdown connected to the **Global Amenities** and **Global Icons** libraries, displaying each amenity's vector SVG icon (`Unfurnished`, `Central A/C`, `Built in Wardrobes`, `Kitchen Appliances`, `Security`, `Barbecue Area`, `Private Pool`, `Walk-in Closet`, `Private Garden`, plus community/project amenities).
5. **Section #5 — `Transactions & Price Trends` (`buy-detail-trends`)**:
   - **Transactions for Similar Properties**: Subtitle input, **Sold For (AED)** table on top, and **Rented For (AED / year)** table stacked directly below Sold For, each with `+ Add Row`.
   - **Price & Trends (2 Separate Stacked Cards)**:
     - **Card 1 — Price vs. Average**: `Price vs. Average Badge` (`6% Lower`), `Comparison Description`, `This property (Price)`, and `Average sale price`.
     - **Card 2 — Size vs. Average**: `Size vs. Average Badge` (`33% Larger`), `Comparison Description`, `This property (Size)`, and `Average size`.
6. **Section #6 — `Location & Map` (`buy-detail-location`)**:
   - Primary & secondary address lines and interactive Google Maps URL.
7. **Section #7 — `Building & Community Insights` (`buy-detail-building`)**:
   - `About Cluster 50` and `About Mediterranean Clusters` tab headings, price range, summary description, and 6 rating breakdown scores (`5.0`).
8. **Section #8 — `Recommended Properties` (`buy-detail-recommended`)**:
   - Two-column **Drag-and-Drop Project Selector** (**Featured Popular Projects** pool on the left & active **Featured** cards on the right).
   - Synced live with the full-width 4-column `Recommended for you` cards grid at the bottom of `/buy-detail`.

---

### 🌐 Global CMS Modules

- **Website Pages (`pages`)**: Full section-by-section editor for all core static pages (`home`, `buy`, `buy-detail`, `project-main-page`, `communities`, `compare-communities`, `developers`, `ai-assessment`, `the-valley`, `advisory-report`, `about-us`).
- **Off-Plan Projects (`offplans`)**: Manages all 20 off-plan project launches (`DAMAC Island 2`, `Emaar Creek Crescent`, `Tessera`, etc.), each opening with 10 `project-detail` sections.
- **Communities (`communities`)**: Manages all 12 Dubai master communities with 5 `community-detail` sections per community.
- **Developers (`projects` / `developers`)**: Manages all 12 master developers with 5 `developer-detail` sections per developer.
- **Blogs & Insights (`blogs`)**: Manages all 11 real estate articles with 6 `blog-details` sections, rich-text body editor, and Key Figures snapshot table.
- **Global FAQs (`faqs`) & Client Reviews (`reviews`)**: Centralized management of FAQ items and verified client testimonials synced across all pages.
- **Global Amenities (`amenities`) & Icons Library (`icons`)**: Centralized vector SVG and image icon asset library (`21+` default amenities and `38+` vector/image icons) with `+ Add New Amenity` (with Global Icon selector) and `+ Upload / Add Icon`.

---

## 📁 Project Structure

```text
fs_properties/
├── .agents/          # Project-specific AI agent rules & workspace boundaries
├── app/              # Next.js App Router pages (/, /buy, /buy-detail, /project-detail, /communities, /developers, /blog, etc.)
├── cms/              # Dedicated Next.js CMS Control Panel application (Port 3001)
│   ├── app/          # CMS dashboard & full-page section builder (cms/app/page.tsx)
│   └── public/       # Synced static image & icon assets for CMS previews
├── components/       # Modular, single-purpose UI components (BuyDetailFirstSection, BuyDetailRecommendedSection, etc.)
├── lib/              # Shared data & CMS synchronization helpers
│   ├── cms.ts        # Core page content fetcher (fetchPageContent)
│   ├── properties.ts # Property listings & /buy-detail section builder helpers
│   ├── projects.ts   # Off-plan projects & /project-detail helpers
│   ├── communities.ts# Master communities & /community-detail helpers
│   ├── developers.ts # Master developers & /developer-detail helpers
│   └── blogs.ts      # Blog articles & /blog-details helpers
├── public/           # Static assets (property photography, icons, brochures, maps)
├── styles/           # Global CSS & Tailwind configurations (styles/globals.css)
├── types/            # TypeScript interface definitions
├── AGENTS.md         # Agent scope rules and Next.js guidelines
├── eslint.config.mjs # ESLint flat configuration
└── .prettierrc       # Prettier code style configuration
```

---

## 🚀 Getting Started

### 1. Run Main Frontend (`http://localhost:3000`)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website (and [http://localhost:3000/buy-detail](http://localhost:3000/buy-detail) for the Property Detail page).

### 2. Run CMS Control Panel (`http://localhost:3001`)

```bash
cd cms
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to access the CMS Control Panel.

---

## 📜 Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build application for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint code quality checks
- `npm run format` — Automatically format code with Prettier
- `npm run format:check` — Check code formatting compliance
