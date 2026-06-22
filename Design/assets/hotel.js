/* ============================================================
   HOTEL CONFIG — edit this file to customise the site for a
   different property. All hotel-specific data lives here.
   ============================================================ */
window.HOTEL = {

  /* -- identity -- */
  name:    'Damir Hotel',

  /* -- contact -- */
  address: 'Qaraqalpaqstan, 6 A, Nukus',
  phone:   '+998 55 106 07 07',
  email:     'damirhotel@gmail.com',
  telegram:  'https://t.me/damirhotel',

  /* -- form endpoint --
     Point this at the Cloudflare Worker URL (worker/wrangler.toml), NOT the GAS URL directly.
     The Worker signs each request with HMAC before forwarding to GAS.
     Leave empty to fall back to Telegram (dev mode). */
  formEndpoint: 'https://script.google.com/macros/s/AKfycbwoOYRs7rGOJO9sJBZqS2mqo_FqLtYGOearOWGJ4-SmWLywH65_6CdScgvUazK730Cq/exec',

  /* -- footer blurb -- */
  footerDesc: 'A contemporary landmark of hospitality in Nukus, Qaraqalpaqstan — crystal-lit interiors, marble finishes and attentive service, steps from the Savitsky Museum.',

  /* -- social links (label + url pairs) -- */
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/idealhotel.nukus' },
    { label: 'Telegram',  url: 'https://t.me/damirhotel' },
  ],

  /* -- maps -- */
  maps: {
    embed: 'https://maps.google.com/maps?q=Qaraqalpaqstan+6+A+Nukus+Uzbekistan&z=17&output=embed',
    link:  'https://maps.google.com/?q=Qaraqalpaqstan+6+A+Nukus+Uzbekistan',
  },

  /* -- stats strip (shown on homepage and about page) -- */
  stats: [
    { n: '9.2',    l: 'Guest rating'     },
    { n: '9.1',    l: 'Couples score'    },
    { n: '8.9',    l: 'Facilities score' },
    { n: '1.5 km', l: 'To Nukus Airport' },
  ],

  /* -- testimonials (rotating slider on homepage) -- */
  testimonials: [
    { text: 'Great location — walking distance to the Savitsky Museum. Nice area to hang out with friends on every floor too.', by: 'Choon — Singapore' },
    { text: 'New hotel, modern and clean, very central. Great location near the Art Museum. They arranged a taxi trip to Moynaq for me.', by: 'Duncan — United Kingdom' },
    { text: 'The staff very helpful and friendly, beautifully decorated, comfortable, walking distance to all sites to be visited.', by: 'Jenny — Australia' },
  ],

};
