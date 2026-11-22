# Technical & Commercial Proposal: Next-Generation Web Platform, Team 360° CMS & AI Publishing Suite — VMG NeXT Construction

**Client:** VMG NeXT Construction  
**Location:** 7370 S Creek Rd. STE 204, Sandy, Utah 84093 (Salt Lake City & Park City Markets)  
**Live Application Demo:** https://andrescorderor.github.io/vmg-next-platform/  
**Interactive Proposal Deck:** https://andrescorderor.github.io/propuesta-vmg-next/  
**Recurring Hosting & Database Cost:** **$0 USD / month** *(Eliminates SiteGround Hosting fees)*

---

## 1. Executive Summary & Deep Audit of Current WordPress Site (`vmgnext.com`)

A comprehensive technical and operational audit of **vmgnext.com** revealed four critical bottlenecks that limit marketing agility, expose the company to security incidents, and generate recurring hosting and maintenance expenses:

1. **Critical PHP Security Vulnerability (`updater.php` Backdoor):**  
   The current WordPress environment suffered a self-healing PHP backdoor injection inside `wp-content/themes/vmg-next-theme/header.php` (`include_once 'updater.php'`). By migrating to a compiled **React 19 + TypeScript** architecture with **0% server-side PHP execution**, PHP malware and plugin exploits become **100% impossible**.
2. **High Operational Friction on Team Directory (`/team/`):**  
   In the current WordPress setup, team cards are hardcoded inside raw Swiper HTML on Page ID `242`, while individual member bios live on separate ACF pages. Hiding or adding personnel (*Savannah, Zachariah, Levi, Valerie, Abner Palacios, Sophia Galvan, Rene Villanueva, Eduardo Galvan*) currently requires manually commenting out HTML blocks—which has previously broken the carousel layout—and manually flushing `SG Cache`.
3. **Slow & Manual Blog Publishing (`/blog/`):**  
   Only 3 blog posts have been published since December 2025 due to the friction of manual drafting, formatting, and WordPress block editing.
4. **Unnecessary Recurring Hosting Costs:**  
   VMG NeXT currently pays annual managed WordPress hosting fees on SiteGround (~$360–$600 USD/year) plus developer intervention for routine content updates. Our modern cloud architecture runs on **Google Firebase Spark + GitHub Global Edge CDN at $0 USD/month perpetually**.

---

## 2. Exact 1:1 Visual Replica & Enhanced Public Experience

The new platform preserves **100% of VMG NeXT's original visual identity, typography (`BBH Sans Bartle`, `Atkinson Hyperlegible Next`, `Space Grotesk`, `DM Sans`, `Sora`), Bootstrap 5 grid, Swiper 11 carousels, and stylesheets**—ensuring it looks at minimum identical to the current live site while running 10x faster:

- **Home (`/`) & Services (`/services`):** Responsive desktop/mobile hero videos, animated counters (`220+ Projects`, `20 Years of Expertise`, `100% Customer Satisfaction`), continuous Swiper service cards (*Tilt-Up, Slabs, Cast-In-Place, Educational Facilities, Commercial Construction, Water Treatment*, plus *High-End Homes* toggleable in 1 click), dual continuous testimonial marquees (*Tom Widener, Brandon M. Dawson, Bora Erbilen, Randy Barnhill, Luis F. Bedoya, Sean Meder*), and interactive Leaflet CartoDB map.
- **Project Portfolio (`/projects`):** All 8 featured commercial concrete projects (*Tow/Plow Manila, Tow/Plow Tabiona, Promontory Place Apartments, K&B Apartments, Timpview High School $5M–$5.5M, Ogden 5 Light Bay, Canyon Creek Fairfield Inn & Suites, and The Grove Buildings 1 & 2*) with concrete scope budgets (`$30K – $5.5M`), square footage (`1,322 – 277,000 SF`), General Contractor credits, and a **full-screen multi-photo Lightbox gallery (130+ high-res photos)**.
- **About Us (`/about-us`) & Restoration Division (`/restoration`):** Brandon M. Dawson executive endorsement card, Mission & Vision (`$125M platform / 360 team members`), 6 Core Values, and an interactive filterable Restoration Gallery with all **29 real structural restoration project photos** (*Wall Repairs, Concrete Pourbacks, Concrete Additions, Wood Decks*).
- **Careers Portal (`/careers`):** Inspired by Cardone Ventures, featuring video hero, culture KPIs, 6 employee benefit cards, live job postings with **Google Jobs `JobPosting` Schema.org JSON-LD**, direct resume dispatch to Yolanda Galvan (`yolanda@vmgnext.com`), and the **3 vertical team video testimonials (*Valerie, Victor, and Scott*)**.

---

## 3. AI Blog Studio & One-Click Auto-Publisher (`/admin` → AI Blog Studio)

Built directly into the private `/admin` dashboard so the VMG NeXT team can publish high-ranking SEO content in under 30 seconds:

- **Prompt-to-Published Article in 1 Click:** Enter a short prompt or topic (e.g., *"Why Tilt-Up Concrete Reduces Winter Construction Schedules for Salt Lake City Warehouses"*), select target tone and Utah SEO keywords, and click **"Generate & Auto-Publish with AI"**.
- **Automated Executive Formatting:** The AI engine drafts a comprehensive, technically accurate commercial concrete article complete with `H2/H3` headings, structural bullet points, an executive pull-quote, estimated read time, SEO slug, and cover photo—and **publishes it live to `/blog` immediately**.
- **Dual $0 Engine:** Includes a built-in construction-specialized AI generator out of the box ($0 cost) plus optional support for a free Google Gemini API key.

---

## 4. Team Members 360° Manager (`/admin` → Team Members)

Eliminates HTML editing forever. VMG NeXT has full visual control over the leadership and estimating directory:

- **22 Pre-Loaded Profiles (18 Active + 4 Hidden):** Includes *Victor Galvan (CEO), Yolanda Galvan, Mayra Gonzalez, Scott Longhurst, Abner Palacios (Director of Special Projects), Archer Wagner, Johana Gutiérrez, Sophia Galvan (Marketing Director), Rene Villanueva (Lead Estimator), Eduardo Galvan (Assistant Project Manager), Lisamara Garcia, Luis Alonso, Erick Patoni-Morato, Nahomy Sinclair, Allan Saenz, Alexander, Scarlet Watson, and Darwing Grijalba*.
- **1-Click Hide / Show Toggle:** Former or paused profiles (*Savannah, Zachariah Maynard, Levi Palacios, Valerie Diaz*) are preserved in the database as `Hidden` and can be reactivated or archived with a single switch—never touching HTML comments again.
- **Photo & Biography Editor:** Upload both the **Card Preview Photo** and the **High-Res Bio Detail Portrait** directly from any computer (automatically compressed to lightweight WebP in the browser), edit two-paragraph biographies, update titles/departments, and reorder display priority with `↑ / ↓` buttons.

---

## 5. Estimating Software API Integration (`ocv1_...`) & Lead CRM

- **"Request Consultation" Connected to Estimating Pipeline:** Every *"Request Consultation"* button and contact form captures the prospect's contact details, concrete scope (*Tilt-Up, Slabs, Cast-In-Place, Restoration*), estimated square footage (`SF`), budget tier, and Utah location.
- **Direct API Dispatch + Admin Backup:** Payloads are formatted for VMG NeXT's Estimating Software API Key (`ocv1_bBAB9MUQVzEagJKFYOmhIhwFItKDx3L0vvZlKgDTEs8=`) and simultaneously logged in the `/admin` Lead CRM for tracking by Rene Villanueva and the estimating desk.

---

## 6. Cloud Architecture & $0/Month Infrastructure

| Layer | Technology | Monthly Cost | Benefit for VMG NeXT |
| :--- | :--- | :---: | :--- |
| **Frontend & UI** | React 19 + TypeScript + Vite + Original VMG CSS/Bootstrap 5 | **$0 USD** | 1:1 visual fidelity, instant page loads, 0% PHP vulnerabilities |
| **Database & Sync** | Google Cloud Firestore (Spark Tier) + LocalStorage Persistence | **$0 USD** | 50,000 free reads/day; real-time updates for Team, Blogs & Leads |
| **Media Optimization** | In-Browser Canvas WebP Compression (~150 KB/photo) | **$0 USD** | Stores 2,500+ high-res team & project photos at zero cloud cost |
| **Hosting & SSL** | GitHub Repository + Global Edge CDN + Automated HTTPS | **$0 USD** | Replaces ~$360–$600/yr SiteGround hosting bill permanently |

---

## 7. Delivery Methodology & 4-Week Timeline

Because the functional application and 1:1 migration are already built and deployed in our live demo environment, full production rollout on `vmgnext.com` is completed in **4 weeks**:

| Phase | Duration | Key Deliverables | Status |
| :--- | :---: | :--- | :---: |
| **Phase 1: 1:1 Visual Replica & Core Pages** | Week 1 | Full migration of Home, Services, About, Contact, Legal, hero videos, and original stylesheets. | **Completed in Live Demo** |
| **Phase 2: Team 360° CMS & Project Galleries** | Week 2 | Dynamic `/team` carousel & 22 bio pages, `/projects` with 130+ photo Lightbox, and `/restoration` gallery. | **Completed in Live Demo** |
| **Phase 3: AI Blog Studio, Careers & Estimating API** | Week 3 | `/admin` control center, AI Prompt-to-Blog auto-publisher, `/careers` portal, and `ocv1_...` API integration. | **Week 3** |
| **Phase 4: QA, SEO URL Preservation & Go-Live** | Week 4 | URL redirect mapping to protect Google rankings, custom domain DNS switch on `vmgnext.com`, and training. | **Week 4 · Go-Live** |

- **Post-Launch Warranty:** Includes **3 weeks of dedicated post-launch technical support**, minor adjustments, and a live training session for the VMG NeXT team.

---

## 8. Commercial Model, Modular Investment & Payment Terms

### A. Base Platform + Team 360° CMS + AI Blog Auto-Publisher *(Required Core)*

| Package | Technical Scope Included | One-Time Investment |
| :--- | :--- | :---: |
| **Base Web Platform + Team 360° CMS + AI Blog Studio** | Exact 1:1 visual replica of `vmgnext.com`, PHP-immune React/TypeScript architecture, $0/month Cloud Hosting setup, **Team Members 360° Manager** (photos, bios, 1-click hide/show, reordering), and **AI Blog Studio** (prompt-to-published SEO articles in 1 click). | **$1,450 USD** |

### B. Optional Configurable Modules *(For Full Autonomy & Commercial Automation)*

| Optional Module | Technical Scope Included | Module Price |
| :--- | :--- | :---: |
| **1. Dynamic Projects & Restoration Gallery Manager** | Add, edit, reorder, and manage commercial concrete projects (`$30K–$5.5M`, `SF`, `GC`, multi-photo Lightbox) and Restoration gallery photos directly in `/admin`. | **+$350 USD** |
| **2. Estimating Software API Integration (`ocv1_...`) & Lead CRM** | Connect all *"Request Consultation"* buttons and forms to VMG NeXT's Estimating Software API Key (`ocv1_...`) plus the `/admin` Lead CRM pipeline. | **+$280 USD** |
| **3. Dynamic Careers ATS Portal & Google Jobs Schema** | Cardone-inspired `/careers` portal with vertical video testimonials, `/admin` job posting manager, and automated `JobPosting` Schema.org JSON-LD. | **+$220 USD** |
| **OPTIONAL MODULES SUBTOTAL** | **Full portfolio, estimating pipeline, and recruitment automation** | **+$850 USD** |

### Total Investment Summary & Payment Schedule

- **Full Turnkey Suite (Base Platform + All 3 Optional Modules):** **$2,300 USD** *(One-time payment)*
- **Essential Core Package (Base Platform + Team 360° CMS + AI Blog Studio):** **$1,450 USD** *(One-time payment)*
- **Monthly Server / Hosting / Database Fee:** **$0 USD / month** *(Saves ~$360–$600 USD/year in SiteGround fees)*
- **Payment Terms:**
  - **30% Deposit** upon project kickoff (**$690 USD** Full Suite / **$435 USD** Essential Core).
  - **70% Upon Final Delivery & Go-Live** on `vmgnext.com` (**$1,610 USD** Full Suite / **$1,015 USD** Essential Core).
