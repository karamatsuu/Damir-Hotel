# Damir Hotel Website

A polished static website for Damir Hotel in Nukus, Uzbekistan. The site presents the hotel, rooms, dining, gallery, location, and reservation inquiry flow using plain HTML, CSS, and JavaScript.

## Overview

The project is built as a lightweight multi-page static site. It does not require a build step, package manager, framework, or backend server.

Main pages:

- `index.html` - homepage with hero, booking bar, highlights, featured rooms, amenities, and testimonials
- `rooms.html` - room and suite listing
- `room.html` - dynamic room detail page driven by the `id` query parameter
- `dining.html` - breakfast, restaurant, and minimarket information
- `gallery.html` - filterable photo gallery with lightbox
- `about.html` - hotel story, values, and guest essentials
- `contact.html` - contact details, map, and inquiry form

## Features

- Responsive layout for desktop, tablet, and mobile
- Shared navigation, footer, booking modal, and inquiry forms
- Room data rendered from `assets/rooms.js`
- Gallery filtering and image lightbox
- Scroll reveal animations
- Basic client-side form validation
- Multilingual text support through `assets/i18n.js`
- Google Maps embed on the contact page
- Local image assets for rooms, dining, hotel spaces, and gallery pages

## Project Structure

```text
.
├── Design/
│   ├── index.html
│   ├── rooms.html
│   ├── room.html
│   ├── dining.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── assets/
│       ├── styles.css
│       ├── site.js
│       ├── rooms.js
│       ├── i18n.js
│       └── photos/
└── Photos/
```

`Design/` contains the website that should be deployed. `Photos/` contains source or reference photo files used during the design process.

## Running Locally

Because this is a static site, you can open `Design/index.html` directly in a browser.

For a more production-like local preview, serve the `Design/` folder with a simple HTTP server:

```bash
cd Design
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Deployment

Deploy the contents of the `Design/` directory to any static hosting provider, for example:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any standard web hosting service

For GitHub Pages, set the publishing source to the `Design/` folder if supported by your workflow, or move/copy the contents of `Design/` to the published branch or root directory used by Pages.

## Content Updates

### Rooms

Room content is stored in:

```text
Design/assets/rooms.js
```

Update `window.DAMIR_ROOMS` to change room names, descriptions, prices, amenities, or images. Room detail pages use URLs like:

```text
room.html?id=suite
room.html?id=twin
```

### Images

Website images are stored in:

```text
Design/assets/photos/
```

When replacing an image, keep the same filename to avoid editing HTML and JavaScript references. If you add a new filename, update the relevant page or `rooms.js`.

### Styles

Global styling lives in:

```text
Design/assets/styles.css
```

### Shared Behavior

Shared JavaScript behavior lives in:

```text
Design/assets/site.js
```

This includes the mobile menu, booking modal, form validation, gallery lightbox, room image switching, testimonial slider, and scroll reveal effects.

### Translations

Translations are managed in:

```text
Design/assets/i18n.js
```

Add or edit dictionary entries there when page copy changes.

## Forms

The reservation and contact forms are currently client-side only. Submitting a valid form shows an on-page success message, but it does not send email or save requests.

To make forms production-ready, connect them to a backend endpoint, form service, CRM, or email automation provider.

## Notes

- The site uses local assets and standard browser APIs.
- No npm dependencies are required.
- No database is required.
- External services are limited to the Google Maps embed and social/contact links.

## License

No license has been specified yet. Add one before publishing or accepting outside contributions.
