/* =====================================================================
   Portfolio — main.js   (vanilla JS, no dependencies)

   Handles:  scroll-progress bar  ·  sticky-nav state
             ·  reveal-on-scroll (IntersectionObserver)
             ·  active nav-link highlighting  ·  mobile menu
             ·  rotating hero role  ·  back-to-top  ·  footer year

   Respects the user's "reduce motion" OS setting throughout.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll: progress bar + sticky nav + back-to-top ---------- */
  var progress = document.getElementById("scroll-progress");
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("back-to-top");
  var ticking = false;

  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (st / docH) * 100 : 0;

    if (progress) progress.style.width = pct + "%";
    if (nav) nav.classList.toggle("scrolled", st > 40);
    if (toTop) toTop.classList.toggle("show", st > 500);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll(); // set correct state on load

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Reveal-on-scroll (with stagger) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  // Give each element a small delay based on its position among reveal siblings,
  // so grouped items (cards, tags, facts) cascade in nicely.
  revealEls.forEach(function (el) {
    if (!el.parentElement) return;
    var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList && c.classList.contains("reveal");
    });
    var idx = sibs.indexOf(el);
    el.style.setProperty("--reveal-delay", Math.min(idx, 6) * 70 + "ms");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    // No animation: just show everything.
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Active nav-link highlighting ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    Array.prototype.forEach.call(sections, function (s) { spy.observe(s); });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("nav-menu");
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    if (burger) {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
    }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    // Close the menu after tapping any link inside it.
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Rotating hero role ----------
     Edit this list to change the words that cycle in the hero. */
  var roles = ["Python Developer", "Backend Developer", "AI & ML Enthusiast"];
  var rotator = document.getElementById("role-rotator");
  if (rotator && !reduceMotion && roles.length > 1) {
    var i = 0;
    rotator.style.transition = "opacity .3s ease";
    setInterval(function () {
      rotator.style.opacity = "0";
      setTimeout(function () {
        i = (i + 1) % roles.length;
        rotator.textContent = roles[i];
        rotator.style.opacity = "1";
      }, 300);
    }, 2400);
  }
})();
