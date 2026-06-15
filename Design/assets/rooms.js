/* Shared room data for IDEAL Hotel. Prices are public reference rates in UZS and can change by date. */
/* USD rate: 12,700 UZS = $1 USD — update quarterly */
window.DAMIR_ROOMS = [
  {
    id: 'twin',
    name: 'Twin Room',
    tag: 'For two',
    price: '1,079,759', priceUsd: '85', size: '30 m²', beds: 'Two single beds', guests: 'Up to 2 guests', view: 'City',
    desc: 'Two comfortable single beds with city views, a full bathroom with bathrobe and slippers, and a dining area.',
    long: 'The 30 m² Twin Room has two single beds and city views. The ensuite bathroom includes a shower, bidet, bathrobe, slippers, hairdryer and free toiletries. The room features air conditioning, flat-screen TV, tea and coffee maker, electric kettle, safety deposit box, dining area, wardrobe and clothes rack.',
    images: ['twin-room2.jpg', 'twin.jpg', 'twin-interior.jpg', 'bath-marble.jpg'],
    amenities: ['Two single beds', 'City view', 'Air conditioning', 'Flat-screen TV', 'Shower & bidet', 'Bathrobe & slippers', 'Safety deposit box', 'Breakfast included']
  },
  {
    id: 'suite',
    name: 'Standard Suite',
    tag: 'For two',
    price: '1,499,665', priceUsd: '118', size: '32 m²', beds: 'One large double bed', guests: 'Up to 2 guests', view: 'City',
    desc: 'A generous 32 m² suite with a large double bed, full bathroom with bathrobe and slippers, and a dining area.',
    long: 'The 32 m² Standard Suite has one large double bed. The ensuite bathroom includes a shower, bidet, bathrobe, slippers, hairdryer and free toiletries. The suite features air conditioning, flat-screen TV, tea and coffee maker, electric kettle, safety deposit box, dining area, wardrobe and clothes rack.',
    images: ['suite-bed.jpg', 'suite-bed2.jpg', 'suite-desk.jpg', 'bath-marble.jpg'],
    amenities: ['Large double bed', 'Air conditioning', 'Flat-screen TV', 'Shower & bidet', 'Bathrobe & slippers', 'Safety deposit box', 'Dining area', 'Breakfast included']
  },
  {
    id: 'single',
    name: 'Single Room',
    tag: 'Solo traveller',
    price: '719,839', priceUsd: '57', size: '26 m²', beds: 'One single bed', guests: '1 guest', view: 'View',
    desc: 'A well-appointed 26 m² single room with a private bathroom including bathrobe, slippers and hairdryer.',
    long: 'The 26 m² Single Room has one single bed. The private bathroom includes a shower, bidet, bathrobe, slippers, hairdryer and free toiletries. The room features air conditioning, flat-screen TV, tea and coffee maker, electric kettle, safety deposit box, dining area, wardrobe and clothes rack.',
    images: ['single-room2.jpg', 'single.jpg', 'twin-interior.jpg', 'bath-marble.jpg'],
    amenities: ['Single bed', 'Air conditioning', 'Flat-screen TV', 'Shower & bidet', 'Bathrobe & slippers', 'Safety deposit box', 'Tea & coffee', 'Breakfast included']
  },
  {
    id: 'triple',
    name: 'Family Room',
    tag: 'For families',
    price: '1,439,678', priceUsd: '113', size: '32 m²', beds: 'Multiple beds', guests: 'Up to 3 guests', view: 'City',
    desc: 'A spacious family room with city views, full bathroom with bathrobe and slippers, and a dining area.',
    long: 'The Family Room is set up for families, with multiple beds, air conditioning, a flat-screen TV, free Wi-Fi, tea and coffee facilities and a full ensuite bathroom with shower, bidet, bathrobe, slippers, hairdryer and free toiletries.',
    images: ['family-room.jpg', 'family-room2.jpg', 'twin-interior.jpg', 'bath-marble.jpg'],
    amenities: ['Multiple beds', 'City view', 'Air conditioning', 'Flat-screen TV', 'Shower & bidet', 'Bathrobe & slippers', 'Safety deposit box', 'Breakfast included']
  }
];

/* ---- shared line icons (stroke = currentColor) ---- */
window.DAMIR_ICONS = {
  size: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6M21 15v6h-6M21 9V3h-6M3 15v6h6"/></svg>',
  bed: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6h18v6M3 18v2M21 18v2M3 12V8a2 2 0 0 1 2-2h6v6"/></svg>',
  guests: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.6 5.6 0 0 1 11 0M16 5.3a3.2 3.2 0 0 1 0 5.6M16.8 13.4a5.6 5.6 0 0 1 3.7 6.6"/></svg>'
};

window.renderRoomCard = function (r) {
  var I = window.DAMIR_ICONS;
  return '' +
    '<article class="room-card reveal">' +
      '<a class="room-thumb" href="room.html?id=' + r.id + '">' +
        '<img src="assets/photos/' + r.images[0] + '" alt="' + r.name + '" loading="lazy">' +
        '<span class="room-price-tag">$' + r.priceUsd + ' <small>/ night</small><em>UZS ' + r.price + '</em></span>' +
      '</a>' +
      '<div class="room-body">' +
        '<h3>' + r.name + '</h3>' +
        '<p class="room-desc">' + r.desc + '</p>' +
        '<div class="room-meta">' +
          '<span>' + I.size + r.size + '</span>' +
          '<span>' + I.bed + r.beds + '</span>' +
          '<span>' + I.guests + r.guests + '</span>' +
        '</div>' +
        '<div class="room-actions">' +
          '<a class="tlink" href="room.html?id=' + r.id + '">View room ' +
            '<svg class="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15M13 6l6 6-6 6"/></svg></a>' +
          '<button class="btn" data-book data-room="' + r.name + '">Book</button>' +
        '</div>' +
      '</div>' +
    '</article>';
};
