/* ============================================================
   DAMIR HOTEL — site.js  (shared behavior)
   ============================================================ */
(function () {
  'use strict';
  var doc = document;

  /* ============================================================
     HOTEL CONFIG FILL
     Elements with data-h="key"      → text content from HOTEL
     Elements with data-h-href="key" → href attribute from HOTEL
     Elements with data-h-src="key"  → src attribute from HOTEL
     Elements with data-h-stats      → rendered from HOTEL.stats
     Elements with data-h-social     → rendered from HOTEL.social
     Nested paths use dot notation:  "maps.link"
     ============================================================ */
  (function () {
    var H = window.HOTEL;
    if (!H) return;
    function get(path) {
      return path.split('.').reduce(function (o, k) { return o && o[k]; }, H);
    }
    doc.querySelectorAll('[data-h]').forEach(function (el) {
      var v = get(el.getAttribute('data-h'));
      if (v == null) return;
      el.textContent = v;
      if (el.tagName === 'A') {
        if (el.getAttribute('data-h') === 'phone') el.href = 'tel:' + v;
        else if (el.getAttribute('data-h') === 'email') el.href = 'mailto:' + v;
      }
    });
    doc.querySelectorAll('[data-h-href]').forEach(function (el) {
      var v = get(el.getAttribute('data-h-href'));
      if (v != null) el.setAttribute('href', v);
    });
    doc.querySelectorAll('[data-h-src]').forEach(function (el) {
      var v = get(el.getAttribute('data-h-src'));
      if (v != null) el.setAttribute('src', v);
    });
    doc.querySelectorAll('[data-h-stats]').forEach(function (el) {
      if (!H.stats) return;
      el.textContent = '';
      H.stats.forEach(function (s) {
        var fact = doc.createElement('div'); fact.className = 'fact';
        var n = doc.createElement('div'); n.className = 'n'; n.textContent = s.n;
        var l = doc.createElement('div'); l.className = 'l'; l.textContent = s.l;
        fact.appendChild(n); fact.appendChild(l); el.appendChild(fact);
      });
    });
    doc.querySelectorAll('[data-h-social]').forEach(function (el) {
      if (!H.social) return;
      el.textContent = '';
      H.social.forEach(function (s) {
        var a = doc.createElement('a');
        a.href = s.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = s.label;
        el.appendChild(a);
      });
    });
  })();

  /* ---- year ---- */
  doc.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- header scroll state ---- */
  var header = doc.querySelector('.site-header');
  if (header) {
    var solid = header.classList.contains('on-light');
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('is-solid');
      else if (!solid) header.classList.remove('is-solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile nav ---- */
  var toggle = doc.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      doc.body.classList.toggle('nav-open');
    });
    doc.querySelectorAll('.mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () { doc.body.classList.remove('nav-open'); });
    });
  }

  /* ---- reveal on scroll ---- */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    // safety: reveal anything already within the viewport on load
    // (tall elements may never cross a ratio threshold)
    var safety = function () {
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) && r.bottom > 0) el.classList.add('in');
      });
    };
    window.addEventListener('load', function () { setTimeout(safety, 200); });
    setTimeout(safety, 600);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ============================================================
     INQUIRY MODAL  (booking + room booking + generic)
     ============================================================ */
  var modal = doc.getElementById('inquiry-modal');
  function openModal(prefill) {
    if (!modal) return;
    var form = modal.querySelector('form');
    var success = modal.querySelector('.form-success');
    if (success) success.classList.remove('show');
    if (form) form.style.display = '';
    // reset fields' invalid state
    modal.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
    // prefill
    if (prefill) {
      Object.keys(prefill).forEach(function (k) {
        var input = modal.querySelector('[name="' + k + '"]');
        if (input && prefill[k]) input.value = prefill[k];
      });
      var ctx = modal.querySelector('[data-modal-context]');
      if (ctx) {
        if (prefill._context) { ctx.textContent = prefill._context; ctx.style.display = ''; }
        else ctx.style.display = 'none';
      }
    }
    modal.classList.add('is-open');
    doc.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    doc.body.style.overflow = '';
  }
  window.DamirModal = { open: openModal, close: closeModal };

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-modal-close]')) closeModal();
    });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); closeLightbox(); }
  });

  /* triggers that open the inquiry modal */
  doc.querySelectorAll('[data-book]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var room = btn.getAttribute('data-room');
      var prefill = {};
      if (room) { prefill.room = room; prefill._context = room; }
      openModal(prefill);
    });
  });

  /* booking bar -> modal with chosen dates */
  var bookingBar = doc.getElementById('booking-form');
  if (bookingBar) {
    bookingBar.addEventListener('submit', function (e) {
      e.preventDefault();
      var ci = bookingBar.querySelector('[name="checkin"]');
      var co = bookingBar.querySelector('[name="checkout"]');
      var g = bookingBar.querySelector('[name="guests"]');
      openModal({
        checkin: ci ? ci.value : '',
        checkout: co ? co.value : '',
        guests: g ? g.value : '',
        _context: 'Check availability'
      });
    });
    // sensible default dates
    var ci = bookingBar.querySelector('[name="checkin"]');
    var co = bookingBar.querySelector('[name="checkout"]');
    if (ci && co) {
      var t = new Date(); t.setDate(t.getDate() + 1);
      var t2 = new Date(); t2.setDate(t2.getDate() + 3);
      var fmt = function (d) { return d.toISOString().slice(0, 10); };
      ci.value = fmt(t); ci.min = fmt(new Date());
      co.value = fmt(t2); co.min = fmt(t);
      ci.addEventListener('change', function () { co.min = ci.value; if (co.value < ci.value) co.value = ci.value; });
    }
  }

  /* ============================================================
     FORM VALIDATION + SUCCESS  (any [data-validate] form)
     ============================================================ */
  function validateForm(form) {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (input) {
      var field = input.closest('.field');
      var val = (input.value || '').trim();
      var bad = !val;
      if (input.type === 'email' && val) bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
      if (field) field.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    return ok;
  }
  doc.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid textarea, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }
      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
      }
      form.reset();
    });
    // clear invalid on input
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('invalid');
    });
  });

  /* ============================================================
     GALLERY  (filter + lightbox)
     ============================================================ */
  var galItems = Array.prototype.slice.call(doc.querySelectorAll('.gal-item'));
  doc.querySelectorAll('.gal-filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      doc.querySelectorAll('.gal-filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-filter');
      galItems.forEach(function (it) {
        var show = f === 'all' || it.getAttribute('data-cat') === f;
        it.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* lightbox (works on .gal-item and any [data-lightbox] gallery) */
  var lightbox = doc.getElementById('lightbox');
  var lbImg, lbCount, lbList = [], lbIndex = 0;
  function buildLbList() {
    return galItems.filter(function (it) { return !it.classList.contains('is-hidden'); });
  }
  function openLightbox(list, index) {
    if (!lightbox) return;
    lbList = list; lbIndex = index;
    showLb();
    lightbox.classList.add('is-open');
    doc.body.style.overflow = 'hidden';
  }
  function showLb() {
    if (!lbImg) return;
    var el = lbList[lbIndex];
    var src = el.getAttribute('data-full') || (el.querySelector('img') && el.querySelector('img').src);
    lbImg.src = src;
    if (lbCount) lbCount.textContent = (lbIndex + 1) + ' / ' + lbList.length;
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    doc.body.style.overflow = '';
  }
  function lbStep(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); }
  if (lightbox) {
    lbImg = lightbox.querySelector('img');
    lbCount = lightbox.querySelector('.lb-count');
    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-prev').addEventListener('click', function () { lbStep(-1); });
    lightbox.querySelector('.lb-next').addEventListener('click', function () { lbStep(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    galItems.forEach(function (it) {
      it.addEventListener('click', function () {
        var list = buildLbList();
        openLightbox(list, list.indexOf(it));
      });
    });
    doc.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'ArrowLeft') lbStep(-1);
      if (e.key === 'ArrowRight') lbStep(1);
    });
  }
  window.closeLightbox = closeLightbox;

  /* ============================================================
     ROOM DETAIL  — thumbnail gallery switch
     ============================================================ */
  var roomMain = doc.querySelector('[data-room-main]');
  if (roomMain) {
    doc.querySelectorAll('[data-room-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-src');
        roomMain.style.opacity = '0';
        setTimeout(function () { roomMain.src = src; roomMain.style.opacity = '1'; }, 180);
        doc.querySelectorAll('[data-room-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });
  }

  /* ============================================================
     TESTIMONIAL slider
     ============================================================ */
  var quoteWrap = doc.querySelector('[data-testimonials], [data-quotes]');
  if (quoteWrap) {
    var quotes = (window.HOTEL && window.HOTEL.testimonials) ||
      JSON.parse(quoteWrap.getAttribute('data-quotes') || '[]');
    var bq = quoteWrap.querySelector('blockquote');
    var by = quoteWrap.querySelector('.by');
    var dotsWrap = quoteWrap.querySelector('.quote-dots');
    var qi = 0, timer;
    quotes.forEach(function (_, i) {
      var b = doc.createElement('button');
      b.className = 'quote-dot' + (i === 0 ? ' is-active' : '');
      b.addEventListener('click', function () { setQuote(i); reset(); });
      dotsWrap.appendChild(b);
    });
    function setQuote(i) {
      qi = i;
      bq.style.opacity = '0'; by.style.opacity = '0';
      setTimeout(function () {
        bq.textContent = quotes[i].text;
        by.textContent = quotes[i].by;
        bq.style.opacity = '1'; by.style.opacity = '1';
      }, 280);
      dotsWrap.querySelectorAll('.quote-dot').forEach(function (d, di) { d.classList.toggle('is-active', di === i); });
    }
    function next() { setQuote((qi + 1) % quotes.length); }
    function reset() { clearInterval(timer); timer = setInterval(next, 6000); }
    bq.style.transition = 'opacity .35s ease'; by.style.transition = 'opacity .35s ease';
    reset();
  }
})();
