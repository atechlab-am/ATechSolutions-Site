# Changelog

All notable changes to this project are documented below, newest first.

Versions prior to this file (1.0.0 through 2.1.0) were tagged in git history
without recorded change notes and are not reconstructed here.

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
