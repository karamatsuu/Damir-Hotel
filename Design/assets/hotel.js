/* ============================================================
   HOTEL CONFIG — edit this file to customise the site for a
   different property. All hotel-specific data lives here.
   ============================================================ */
window.HOTEL = {

  /* -- identity -- */
  name:    'IDEAL Hotel',

  /* -- contact -- */
  address: 'ул. А. Досназарова, 100А, 230100 Nukus',
  phone:   '+998 61 222 33 44',
  email:     'info@idealhotel.uz',
  whatsapp:  'https://wa.me/998612223344',

  /* -- form endpoint (Google Apps Script web app URL) --
     Paste the URL from your deployed Apps Script here.
     See Design/assets/form-endpoint.gs for setup instructions.
     Leave empty to skip submission (dev mode). */
  formEndpoint: '',

  /* -- footer blurb -- */
  footerDesc: 'A contemporary landmark of hospitality in Nukus, Karakalpakstan — crystal-lit interiors, marble finishes and attentive service, steps from the Savitsky Museum.',

  /* -- social links (label + url pairs) -- */
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/idealhotel.nukus' },
    { label: 'Telegram',  url: 'https://t.me/idealhotelnukus' },
  ],

  /* -- maps -- */
  maps: {
    embed: 'https://maps.google.com/maps?q=ул.+А.+Досназарова+100А+Nukus+Uzbekistan&z=17&output=embed',
    link:  'https://maps.google.com/?q=ул.+А.+Досназарова+100А+Nukus+Uzbekistan',
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
