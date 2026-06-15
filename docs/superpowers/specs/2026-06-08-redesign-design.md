# IDEAL Hotel — Frontend Redesign
**Date:** 2026-06-08
**Status:** Approved

## Goal
Redesign all pages of the IDEAL Hotel static site to match a boutique luxury hotel aesthetic (reference: wakemedellin.com style): dark, cinematic hero sections with warm cream content areas. Prioritise calm, unhurried hotel UX throughout.

---

## Design System

### Color Palette

Two modes that alternate across the page:

**Dark (hero, footer, editorial banners):**
- Background: `#1c1410`
- Background deep: `#16100d`
- Headline: `#f5ede0`
- Body text: `rgba(245,237,224,0.55)`
- Accent (amber): `#d4a96a`
- Border: `rgba(255,255,255,0.08)`

**Light (content sections — existing values kept):**
- Background: `#F6F1E7` (cream)
- Background alt: `#E7DECB` (sand)
- Headline: `#26231E` (ink)
- Body text: `#4A453B` (ink-soft)
- Accent: `#A87926` (gold)
- Border: `rgba(38,35,30,0.13)`

### Typography
No font changes. Keep Cormorant Garamond (serif headlines) + Mulish (body sans). Both suit luxury hotel.

### Motion
All transitions slow to `600–900ms` with `cubic-bezier(.22,.61,.36,1)`. Scroll reveals: opacity fade only (no slide-up bounce — too energetic for a relaxing hotel feel).

### Spacing
Generous padding on all sections. Hotel sites should breathe.

---

## Navigation

**Structure:** Centered blur glass bar

```
[Rooms] [Dining] [Gallery]     IDEAL · HOTEL     [About] [Contact] [Book a stay]
```

- Transparent with `backdrop-filter: blur(12px)` and `background: rgba(28,20,16,0.55)` over the hero
- Becomes solid `#1c1410` after scrolling past the hero (JS scroll listener, existing pattern)
- `IDEAL · HOTEL` in amber spaced caps at center
- `Book a stay` right-most — amber text, thin amber border, pill shape
- **Mobile:** hamburger → fullscreen dark overlay with large serif links and generous tap targets. Book a stay as a full-width amber button at bottom.

---

## Homepage (`index.html`)

### Hero — Split layout
- Left 48%: `#1c1410` background, vertically centered content:
  - Eyebrow (amber, spaced caps): `Nukus · Karakalpakstan`
  - H1 (Cormorant Garamond, large, italic): `Modern luxury, genuinely warm.`
  - Subtext (small, muted): hotel tagline
  - Two buttons: `Book your stay` (amber filled) + `Explore rooms` (ghost/outline)
- Right 52%: full-height photo, no overlay
- Thin `1px` amber vertical rule between halves
- Scroll cue bottom-left: `↓ Scroll` tiny spaced caps

### Booking bar
White card floating on cream, immediately below hero. Check-in / Check-out / Guests / Submit. Elevated shadow.

### Welcome section (cream bg)
Split: text left, tall portrait photo right. Slow fade-in reveal. "Our story →" quiet text link.

### Highlights grid (sand bg `#E7DECB`)
4 cards: `01–04` amber numbers, heading, description, text link. No box shadows — whitespace only.

### Featured rooms (cream bg)
3 cards: photo top 65%, details below. Hover: photo scale 1.04 over 600ms. "All rooms →" ghost button in header.

### Amenities strip (sand bg)
Icon + label + description, 3-column. Same sand tone as highlights — creates page rhythm.

### Editorial quote banner (dark)
Back to `#1c1410`. Faint photo overlay. Large italic Cormorant Garamond quote centered. Amber eyebrow.

### Testimonials (cream bg)
Single rotating quote, centered. Generous vertical padding.

### Final CTA banner (dark)
Dark photo full-bleed. Headline + amber `Book your stay` button.

### Footer (dark `#1c1410`)
Existing footer content, restyled for dark: amber brand mark, muted link colors, amber social links.

---

## Inner Pages

Every inner page shares:
- Same centered blur nav
- **Page hero:** full-width dark photo strip (~50vh), page title centered in white serif
- Content drops to cream palette below

### Rooms (`rooms.html`)
Room card grid after hero. Photo-first cards with name, brief description, CTA button always visible (not just on hover).

### Room detail (`room.html`)
Full-bleed hero photo. Split below: room details + amenity list left, sticky booking panel right (on desktop).

### Dining (`dining.html`)
Hero photo of buffet/restaurant. Alternating split sections (text / photo) on cream.

### Gallery (`gallery.html`)
Dark hero. Masonry photo grid below on cream. Existing lightbox kept.

### About (`about.html`)
Dark hero. Editorial cream layout: large pull-quote, story text, supporting photo.

### Contact (`contact.html`)
Dark hero. Address + hours left, embedded map right. Inquiry form below on cream.

---

## Hotel UX Principles

- **Booking always reachable:** in nav, in hero, in final CTA banner, and as a floating amber button bottom-right on mobile
- **Room cards:** CTA always visible — not hidden behind hover
- **Forms:** calm validation — quiet amber inline messages, no jarring red flashes
- **Images:** `loading="lazy"` on all below-fold images. No layout shift.
- **No auto-play video/audio** — adds anxiety, not calm
- **Scroll reveals:** slow opacity fade only — replace existing slide-up (`translateY`) on `.reveal` class with a pure opacity transition (0 → 1, 700ms). Stagger cards by 100ms delay per sibling.

---

## Files to Change

| File | Changes |
|---|---|
| `assets/styles.css` | New dark palette tokens, nav styles, hero split, dark section classes, motion slowdown |
| `index.html` | Nav HTML (centered), hero restructure (split), footer dark class |
| `rooms.html` | Nav HTML, page hero section |
| `room.html` | Nav HTML, page hero section |
| `dining.html` | Nav HTML, page hero section |
| `gallery.html` | Nav HTML, page hero section |
| `about.html` | Nav HTML, page hero section |
| `contact.html` | Nav HTML, page hero section |
| `assets/site.js` | Nav scroll behaviour (transparent → solid on scroll), mobile overlay menu |
