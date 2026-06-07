/* Shared room data for Damir Hotel. Prices are public reference rates in UZS and can change by date. */
window.DAMIR_ROOMS = [
  {
    id: 'twin',
    name: 'Twin Room',
    tag: 'For two',
    price: '1,079,759', size: '20 m²', beds: 'Two single beds', guests: 'Up to 2 guests', view: 'City',
    desc: 'Two separate beds, city views and a terrace — a practical, comfortable choice for friends or colleagues.',
    long: 'The Twin Room pairs two single beds with air conditioning, a flat-screen TV, tea and coffee facilities, free Wi-Fi and an ensuite bathroom with toiletries, slippers and bathrobes. Rooms include city views and terrace access.',
    images: ['twin.jpg', 'twin3.jpg', 'twin2.jpg', 'bath.jpg'],
    amenities: ['Two single beds', 'City view', 'Terrace', 'Air conditioning', 'Flat-screen TV', 'Ensuite bathroom', 'Free Wi-Fi', 'Tea & coffee']
  },
  {
    id: 'double',
    name: 'Double or Twin Room',
    tag: 'For two',
    price: '1,079,759', size: '20 m²', beds: 'One large double bed', guests: 'Up to 2 guests', view: 'City',
    desc: 'A large double bed, warm wood detail and the essentials for an easy central Nukus stay.',
    long: 'The Double or Twin Room is arranged around a large double bed with air conditioning, a flat-screen TV, tea and coffee facilities, free Wi-Fi and a private bathroom. The room looks toward the city and includes terrace access.',
    images: ['king.jpg', 'king2.jpg', 'king-top.jpg', 'bath.jpg'],
    amenities: ['Large double bed', 'City view', 'Terrace', 'Air conditioning', 'Flat-screen TV', 'Ensuite bathroom', 'Free Wi-Fi', 'Tea & coffee']
  },
  {
    id: 'triple',
    name: 'Triple Room',
    tag: 'For groups',
    price: '1,439,678', size: '20 m²', beds: 'Three single beds', guests: 'Up to 3 guests', view: 'City',
    desc: 'Three single beds with city views, terrace access and the same included breakfast and Wi-Fi.',
    long: 'The Triple Room is set up for small groups or families, with three single beds, air conditioning, a flat-screen TV, free Wi-Fi, tea and coffee facilities and an ensuite bathroom with guest toiletries.',
    images: ['triple.jpg', 'triple2.jpg', 'room-detail.jpg', 'bath2.jpg'],
    amenities: ['Three single beds', 'City view', 'Terrace', 'Air conditioning', 'Flat-screen TV', 'Ensuite bathroom', 'Free Wi-Fi', 'Tea & coffee']
  },
  {
    id: 'suite',
    name: 'Suite',
    tag: 'Private suite',
    price: '1,499,665', size: '20 m²', beds: 'One large double bed', guests: 'Up to 2 guests', view: 'City',
    desc: 'A private suite with a large double bed, city views, terrace access and a little more privacy.',
    long: 'The Suite gives guests a private suite layout with a large double bed, air conditioning, flat-screen TV, free Wi-Fi, tea and coffee facilities, city views, terrace access and an ensuite bathroom with bathrobes, slippers and toiletries.',
    images: ['suite-living.jpg', 'junior-suite.jpg', 'bath.jpg', 'robes.jpg'],
    amenities: ['Large double bed', 'Private suite', 'City view', 'Terrace', 'Air conditioning', 'Flat-screen TV', 'Free Wi-Fi', 'Bathrobes & slippers']
  }
];

/* ---- shared line icons (stroke = currentColor) ---- */
window.DAMIR_ICONS = {
  size: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V3h6M21 15v6h-6M21 9V3h-6M3 15v6h6"/></svg>',
  bed: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6h18v6M3 18v2M21 18v2M3 12V8a2 2 0 0 1 2-2h6v6"/></svg>',
  guests: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.6 5.6 0 0 1 11 0M16 5.3a3.2 3.2 0 0 1 0 5.6M16.8 13.4a5.6 5.6 0 0 1 3.7 6.6"/></svg>',
  view: '<svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/></svg>'
};

window.renderRoomCard = function (r) {
  var I = window.DAMIR_ICONS;
  return '' +
    '<article class="room-card reveal">' +
      '<a class="room-thumb" href="room.html?id=' + r.id + '">' +
        '<img src="assets/photos/' + r.images[0] + '" alt="' + r.name + '" loading="lazy">' +
        '<span class="room-price-tag">UZS ' + r.price + ' <small>/ night</small></span>' +
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
