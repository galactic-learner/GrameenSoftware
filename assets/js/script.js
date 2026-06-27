/* ============================================================
   GrameenSoftware v2 — script.js
   Shared across index.html and all project pages
   ============================================================ */

(function () {

    /* ── MOBILE MENU ─────────────────────────────────────── */

    var hamburger  = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    var overlay    = document.getElementById('overlay');
    var mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('show');
        overlay.classList.add('show');
        document.documentElement.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
        overlay.classList.remove('show');
        document.documentElement.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
        mobileMenu.classList.contains('show') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    /* ── DESKTOP DROPDOWN (JS-driven, not CSS :hover)
         Avoids touch-device freeze caused by stuck :hover state
       ─────────────────────────────────────────────────────── */

    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dd) {

        var trigger = dd.querySelector('a');

        // Desktop: toggle on mouseenter / mouseleave
        dd.addEventListener('mouseenter', function () {
            if (window.matchMedia('(pointer: fine)').matches) {
                dd.classList.add('open');
            }
        });

        dd.addEventListener('mouseleave', function () {
            dd.classList.remove('open');
        });

        // Touch / mobile: toggle on tap of trigger link
        trigger.addEventListener('click', function (e) {
            if (!window.matchMedia('(pointer: fine)').matches) {
                // On touch devices the dropdown is not shown;
                // just let the href navigate normally.
                return;
            }
        });
    });

    // Close any open dropdown when clicking elsewhere
    document.addEventListener('click', function (e) {
        dropdowns.forEach(function (dd) {
            if (!dd.contains(e.target)) {
                dd.classList.remove('open');
            }
        });
    });

    /* ── CONTACT FORM (index only) ───────────────────────── */

    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var button = contactForm.querySelector('button[type="submit"]');
            button.innerText = 'Sent ✓';
            button.style.background = '#2ecc71';

            setTimeout(function () {
                button.innerText = 'Send Message';
                button.style.background = '';
                contactForm.reset();
            }, 2500);
        });
    }

    /* ── ACTIVE NAV LINK ON SCROLL (index only, throttled) ─ */

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length) {

        var ticking = false;

        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(function () {
                var current = '';

                sections.forEach(function (section) {
                    if (window.scrollY >= section.offsetTop - 120) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });

        }, { passive: true });
    }

})();
