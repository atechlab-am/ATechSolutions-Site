# Changelog

All notable changes to this project are documented below, newest first.

Versions prior to this file (1.0.0 through 2.1.0) were tagged in git history
without recorded change notes and are not reconstructed here.

## 3.0.1 - 2026-10-08

### Fixed "Free IT Health Check" wording (it isn't free) and filled in remaining TODOs

- Removed "free"/"gratuit" from every health-check reference sitewide (nav CTA, hero/final CTAs,
  booking banner, trust badge, FAQ question, meta descriptions, JSON-LD descriptions, across all
  24 pages, EN and FR) — now reads "IT Health Check" / "Bilan TI". Fixed a resulting grammar glitch
  ("Book a IT Health Check" → "Book an IT Health Check").
- Filled in the 4 remaining `[TODO]` placeholders from the 3.0.0 repositioning:
  - `field-service.html` credibility section: confirmed real figure, "8 years of hands-on IT and
    field experience" (was a placeholder after the fabricated "10 years" claim was removed).
  - `index.html` homepage credibility section: removed the backup-technician/continuity-plan
    sentence entirely rather than leave a placeholder promising an arrangement that doesn't exist.
  - `industries-clinics.html`: reworded the data-handling callout to generic "sensitive patient
    information" language with no compliance framework named.
  - `index.html` sample-report callout: replaced the placeholder with a plain-language description
    of what a real monthly report covers (monitored/fixed/pending/backup status), instead of a
    link or embedded image that doesn't exist yet.

## 3.0.0 - 2026-10-08

### Full repositioning from break/fix technician to managed IT provider (MSP) for professional offices

Structural overhaul: new site architecture, new nav/footer sitewide, new primary funnel, several
new page types. Lands as a MAJOR version per this repo's versioning policy ("full redesigns,
structural overhauls").

- **Homepage rebuilt (`index.html`)** — new hero "Your IT department, without the hire," primary
  CTA is "Book a Free IT Health Check" (links to new `health-check.html`), secondary CTA is the
  phone number. Removed the Field Service card from the homepage audience-path section (demoted,
  see below). Added three new sections: "How it works" (Assess → Stabilize → Manage),
  "What's included" (monitoring & patching, verified backups, helpdesk, security basics,
  documentation, quarterly review), and a monthly-report transparency callout with a `[TODO]`
  placeholder for a real sample report. Added a hidden-by-default testimonials section (see
  `testimonials-data.js` below). Credibility section reworded to drop the fabricated "10 years of
  hands-on IT and field experience" claim — now owner-operated/accountability framing with a
  `[TODO]` placeholder for continuity/backup-technician details. Urgency banner now reads as a
  current health-check offer instead of generic insured-technician messaging.
- **Services page rebuilt (`services.html`)** — replaced the 9-card carousel with: a featured
  "Free IT Health Check" entry, a three-tier comparison table (Essentials / Managed / Complete,
  no prices, "Request a Quote" buttons only), and an "Add-on services" section covering the former
  one-off services (email & domain, email migration, computer setup, Windows 11 upgrade,
  network/Wi-Fi setup, backup setup, hourly support). Removed the now-unused carousel JS from
  `site.js` and its CSS from `styles.css`; added comparison-table CSS using existing design tokens.
- **New page `health-check.html`** — dedicated health-check request form (company name, number of
  users, current IT setup, biggest problem, preferred language). Submits through the existing
  contact-form backend (`form-handler.martins-anthony.workers.dev`) by mapping the new fields into
  a structured `message` string, since that backend's payload shape is fixed — no new backend
  endpoint was invented. Keeps the existing Calendly health-check booking link as an alternative.
- **New file `testimonials-data.js`** — empty `window.testimonials = []` data file with documented
  shape. `site.js` only renders and unhides the homepage testimonials section when this array is
  non-empty; no fabricated testimonials were added.
- **New industry pages** — `industries-clinics.html`, `industries-law-firms.html`,
  `industries-accounting.html`. Each has unique, general-knowledge copy about that industry's real
  IT concerns, no fabricated client counts or certifications, linked from the homepage footer.
- **New town pages** — `it-support-sainte-marthe-sur-le-lac.html`, `it-support-saint-eustache.html`,
  `it-support-deux-montagnes.html`, `it-support-sainte-joseph-du-lac.html`,
  `it-support-mirabel.html`, `it-support-boisbriand.html`, `it-support-rosemere.html`, one per
  canonical service-area town, each with a distinct angle (home-base framing, neighbor-proximity
  framing, etc.) rather than templated copy. `local.html`'s "town by town" section (previously only
  5 of 7 towns) is now a hub of cards linking to all 7 dedicated pages.
- **Sitewide town-list and spelling fixes** — "Rosemere" (missing accent) and the previously
  5-of-7-town gap on `local.html` are fixed everywhere, including every page's footer, meta
  description, and JSON-LD `areaServed`. Canonical 7-town list: Sainte-Marthe-sur-le-Lac,
  Sainte-Joseph-du-Lac, Deux-Montagnes, Saint-Eustache, Mirabel, Boisbriand, Rosemère.
- **Nav/footer sitewide sweep** — removed "Field Service" from the top-level nav and collapsed the
  "For Business" dropdown (now just flat "Services" / "Service Area" links, since Apps also moved
  out of it); both Field Service and Apps are now footer-only (Quick Links), demoted but not
  deleted or unlinked from the sitemap. Applied identically across all 13 pre-existing pages plus
  every new page (24 HTML files total). Added an "Industries" footer column on the homepage linking
  to the 3 new industry pages.
- **Removed fabricated experience claim** — "10 years of hands-on IT and field experience" removed
  from `field-service.html` and its translation strings, replaced with
  `[TODO: years of hands-on IT and field experience]` (no invented number).
- **Softened Law 25 compliance claim** — `privacy.html` previously stated outright "Law 25
  compliant" / "in compliance with Quebec's Law 25." Reworded to "in line with" / "designed to
  support your readiness under" in both languages — never claims outright legal compliance.
- **FAQ additions (`faq.html`)** — new "Managed IT" section with three MSP-specific questions:
  "What does managed IT include?", "Do I need a long contract?" (references the real existing
  3-month-minimum/30-day-notice policy, not a fabricated SLA), and "What happens in the free health
  check?" — no pricing in any answer.
- **SEO pass, sitewide** — added `ProfessionalService` JSON-LD to every page that previously lacked
  one (11 of 13 original pages); added `hreflang="en"`/`"fr"`/`"x-default"` alternate tags pointing
  to the same canonical URL on every page (the site serves both languages from one URL via
  client-side toggle, so true per-language URLs don't exist — this signals bilingual availability
  without overclaiming separate URLs); regenerated `sitemap.xml` with all 11 new pages, fixed stale
  lastmod dates; standardized `logo.png` alt text to "ATechSolutions logo" everywhere.
- **Removed a stray `priceRange` field** from `local.html`'s JSON-LD (pricing-adjacent signal,
  inconsistent with the no-pricing rule).

## 2.9.0 - 2026-09-10

### Repositioned the site around the on-site technician; added Field Service as a primary focus

- **New page `field-service.html`** — field-service / dispatch subcontracting page aimed at ops/dispatch coordinators (hardware vendors, ITADs, warranty companies, field service marketplaces). Built from the `about.html` layout, reuses existing components only (`.hero`, `.split-grid`, `.support-note`, `.detail-grid`). Covers coverage area (Greater Montreal + North Shore/Laurentians, based in Sainte-Marthe-sur-le-Lac), a credibility block (10 years' experience + liability insurance), capabilities (server hardware, networking, POS hardware, desktop/laptop), and on-call / scheduled dispatch availability. No pricing, no certifications. New `fieldServicePage` translation block (en/fr).
- **Nav** — added "Field Service" as a top-level nav item (first, before "For Business") across all 12 existing pages + the new page; also added to footer Quick Links. New `nav.fieldService` key (en/fr).
- **Homepage banner** — replaced the stale "Windows 10 support ends October 2025" banner with an evergreen line ("Professional, insured, on-site IT support across Greater Montreal").
- **Homepage reposition** — hero now leads with "a professional, insured technician" positioning for all three audiences (dispatch, business, home), anchored on "Greater Montreal" instead of "Deux-Montagnes area". Added a three-path section (Field Service / For Business / For Home) using `.cards-grid`, and one shared credibility section using `.support-note`. Reworded the "No long contracts" trust badge to "Flexible engagement options" (no longer contradicts the MSP 3-month minimum on services.html). Rewrote the "you're talking to Anthony" paragraph to work for all three audiences while keeping the personal-accountability angle.
- **Removed the homepage testimonials/star-rating placeholder** — the 5-stars-no-quote block was removed entirely (no fabricated quotes added). The "Leave a Google Review" link was relocated to the footer as a plain text link.
- **Services summary reorder** — IT Health Check moved first and given a "Start Here" label with a `--brand-soft` highlight (new `.service-teaser-tag.is-featured` + `.service-teaser-featured-label` rules, existing variables only).
- **Shared CTA** — homepage hero / credibility / personal-trust CTAs relabelled from "Get Help Now" / "Book a Free Call" to "Get in Touch". Added a 4th card to `booking.html`, "Field Service & Dispatch Inquiry", currently reusing the on-site-visit Calendly event (`.booking-cards` reflows to 2×2 automatically). New `bookingSection.field*` keys (en/fr).
- **Unchanged:** `services.html` (including all MSP / managed-support content and pricing), `residential.html`, `local.html`.

## 2.8.0

### Removed "small" from all business/office descriptions sitewide

- Dropped "small" and "SMB"/"PME" everywhere referring to businesses/offices, across all 12 pages, both languages — copy now just says "business"/"office"
- Renamed the "Small Business" monthly plan tier and contact form option to "Standard" (EN) / plan tier stays consistent in FR
- Covers translation source strings, HTML fallback text, page titles, meta descriptions, and JSON-LD structured data

## 2.7.0

### Turned the services list into a carousel

- services.html's 9 service cards no longer stack for scrolling — one card shows at a time with prev/next arrow navigation
- Auto-advances every 6 seconds, pauses on hover or keyboard focus, and stops auto-advancing once the user manually navigates
- Wraps around at both ends (next from the last card returns to the first, and vice versa)

## 2.6.2

### Reworded the homepage hero headline again

- "IT support small offices can actually rely on" still read as generic marketing-speak — replaced with a concrete, fact-based headline: "One technician. Fast on-site response across the Deux-Montagnes area."
- Widened the shared `.hero-copy h1` max-width (14ch → 32ch) to fit the longer headline without an awkward narrow wrap; verified it doesn't break the shorter headlines on apps/services/booking/residential pages
- Updated in both languages, plus the HTML fallback text

## 2.6.1

### Reworded the homepage hero headline

- Replaced "IT support that actually picks up the phone" (felt gimmicky/cliché) with "IT support small offices can actually rely on" — leads with reliability instead of responsiveness
- Updated in both languages, plus the HTML fallback text

## 2.6.0

### Surfaced Monthly Support Plans & RMM more prominently

- Moved Monthly Support Plans to the first service listed on services.html (was last of 9)
- Added "Monthly Plans & RMM" as the lead tag in the homepage Services teaser

## 2.5.0

### Added RMM to Monthly Support Plans

- Added a "What's included" checklist to the Monthly Support Plans service entry on services.html, leading with Remote Monitoring & Management (RMM)

## 2.4.1

### Fixed the "For Business" dropdown being unclickable

- The submenu closed before the cursor could reach it, because the gap between the toggle button and the dropdown broke the CSS hover state
- Added an invisible hover bridge over the gap so the dropdown stays open when moving the mouse down into it

## 2.4.0

### Consolidated the main navigation into a submenu

- Grouped Services, Service Area, and Apps under a new "For Business" dropdown, cutting the nav from 7 flat top-level links to 5
- Desktop: dropdown opens on hover/focus; mobile: expands inline within the existing slide-down menu on tap
- Renamed "Home Users" label to "For Home" across both languages
- Applied identically across all 12 pages (nav markup is duplicated per-page, no shared header include)

## 2.3.0

### Simplified the homepage

- Cut "Problems we solve" (duplicated the Services section), the inline Monthly Plans grid, and the "Who we help" tag grid (condensed to one sentence)
- Merged the Reviews and Personal-trust sections into one
- Shrank the full 6-card Services section to a compact teaser + "View all services" link
- Replaced the inline Booking widget (3 Calendly cards) with a single "Book a time" button linking to booking.html
- Replaced the inline FAQ (5 Q&As) with a "See all FAQs" link to faq.html
- Removed ~65 now-unused translation keys left behind by the above
- Homepage went from 11 stacked sections to 7

## 2.2.0

### Removed sitewide pricing, flattened visual style

- Replaced all displayed pricing with "Contact us for a quote" / "Contactez-nous pour une soumission"
- Reduced corner radius scale, removed hover-lift animations and glow shadows
- Removed floating background gradient blobs
- Unified typography to a single typeface (Manrope), replaced gold accent with the blue brand palette
