/* ==========================================================================
   main.js — fills the page from content.js and wires up the interactive bits.
   You shouldn't need to edit this to change words; see content.js.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  var root = document.documentElement;
  root.classList.add("js");

  if (!C) {
    console.error("content.js did not load: SITE_CONTENT is missing.");
    return;
  }

  // Look up "about.heading" style paths in the content object.
  function get(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, C);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- 1. Fill in content ---------- */

  document.title = C.meta.title;
  document.querySelector('meta[name="description"]').setAttribute("content", C.meta.description);

  document.querySelectorAll("[data-content]").forEach(function (node) {
    var value = get(node.dataset.content);
    if (value != null) node.textContent = value;
  });

  document.querySelectorAll("[data-src]").forEach(function (img) {
    img.src = get(img.dataset.src);
    if (img.dataset.alt) img.alt = get(img.dataset.alt);
  });

  document.querySelectorAll("[data-link]").forEach(function (a) {
    var link = get(a.dataset.link);
    a.href = link.href;
    a.textContent = link.label;
  });

  document.querySelectorAll("[data-paragraphs]").forEach(function (box) {
    get(box.dataset.paragraphs).forEach(function (text) {
      box.appendChild(el("p", null, text));
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  var renderers = {
    nav: function (list, items) {
      items.forEach(function (item) {
        var li = el("li");
        var a = el("a", null, item.label);
        a.href = item.href;
        li.appendChild(a);
        list.appendChild(li);
      });
    },

    "about.facts": function (dl, items) {
      items.forEach(function (fact) {
        var row = el("div", "fact");
        row.appendChild(el("dt", null, fact.label));
        row.appendChild(el("dd", null, fact.value));
        dl.appendChild(row);
      });
    },

    "books.items": function (box, items) {
      if (!items.length) {
        var empty = el("div", "empty-shelf");
        empty.appendChild(el("span", "empty-shelf-books"));
        empty.lastChild.setAttribute("aria-hidden", "true");
        empty.appendChild(el("p", null, C.books.emptyMessage));
        box.appendChild(empty);
        return;
      }
      var ul = el("ul", "book-grid");
      items.forEach(function (book) {
        var li = el("li");
        var card = el("article", "book-card");
        if (book.cover) {
          var img = el("img", "book-card-cover");
          img.src = book.cover;
          img.alt = book.coverAlt || "";
          card.appendChild(img);
        }
        card.appendChild(el("h3", null, book.title));
        if (book.series) card.appendChild(el("p", "kicker", book.series));
        if (book.blurb) card.appendChild(el("p", null, book.blurb));
        if (book.link) {
          var a = el("a", "button", book.link.label);
          a.href = book.link.href;
          card.appendChild(a);
        }
        li.appendChild(card);
        ul.appendChild(li);
      });
      box.appendChild(ul);
    },
  };

  document.querySelectorAll("[data-list]").forEach(function (box) {
    var key = box.dataset.list;
    if (renderers[key]) renderers[key](box, get(key) || []);
  });

  /* ---------- 2. Mobile menu (the "hamburger") ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  toggle.hidden = false;

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  navList.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- 3. Gentle fade-in as sections scroll into view ---------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    reveals.forEach(function (s) { observer.observe(s); });
    // Keyboard users: never leave focused content invisible.
    document.addEventListener("focusin", function (e) {
      var s = e.target.closest(".reveal");
      if (s) s.classList.add("is-visible");
    });
  } else {
    reveals.forEach(function (s) { s.classList.add("is-visible"); });
  }

  /* ---------- 4. Newsletter form (preview only, not connected) ---------- */

  var form = document.querySelector(".signup");
  var input = form.querySelector("input");
  var error = document.getElementById("email-error");
  var status = form.querySelector(".status");
  var N = C.newsletter;

  // The error box is a live "alert" region, so changing its text is read out
  // even when focus is already in the email field.
  function showError(message) {
    error.textContent = "";
    setTimeout(function () { error.textContent = message; }, 50);
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", "email-error email-hint");
    status.textContent = "";
    input.focus();
  }

  function clearError() {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    input.setAttribute("aria-describedby", "email-hint");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!value) return showError(N.errorEmpty);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return showError(N.errorInvalid);
    clearError();
    form.reset();
    status.textContent = N.success;
  });

  /* ---------- 5. Palette preview (designer tool) ----------
     Add ?palette to the address to show the switcher, e.g.
       index.html?palette            shows the switcher
       index.html?palette=coastal    starts on that palette
     The colours themselves are defined at the top of css/styles.css. */

  var PALETTES = [
    { id: "garden", name: "Garden green", about: "Deep green from the logo, warm cream, rose accents." },
    { id: "coastal", name: "Coastal blue", about: "East Coast sea blue, soft sand, sunny yellow." },
    { id: "rose", name: "Country rose", about: "Rich berry and blush pink, warm and romantic." },
    { id: "midnight", name: "Midnight suspense", about: "Dark background, light text, golden accents." },
  ];

  var params = new URLSearchParams(window.location.search);
  if (!params.has("palette")) return;

  function applyPalette(id) {
    if (id === "garden") root.removeAttribute("data-palette");
    else root.setAttribute("data-palette", id);
  }

  var start = params.get("palette");
  var current = PALETTES.some(function (p) { return p.id === start; }) ? start : "garden";
  applyPalette(current);

  var panel = el("aside", "palette-panel");
  panel.setAttribute("aria-labelledby", "palette-heading");
  var fieldset = el("fieldset");
  var legend = el("legend");
  legend.id = "palette-heading";
  legend.textContent = "Colour palette preview";
  fieldset.appendChild(legend);

  PALETTES.forEach(function (p) {
    var label = el("label", "palette-option");
    var radio = el("input");
    radio.type = "radio";
    radio.name = "palette";
    radio.value = p.id;
    radio.checked = p.id === current;
    radio.setAttribute("aria-describedby", "palette-about-" + p.id);
    var swatch = el("span", "palette-swatch palette-swatch-" + p.id);
    swatch.setAttribute("aria-hidden", "true");
    var text = el("span", "palette-text");
    text.appendChild(el("span", "palette-name", p.name));
    var about = el("span", "palette-about", p.about);
    about.id = "palette-about-" + p.id;
    text.appendChild(about);
    label.append(radio, swatch, text);
    fieldset.appendChild(label);
  });

  fieldset.addEventListener("change", function (e) {
    applyPalette(e.target.value);
    var url = new URL(window.location);
    url.searchParams.set("palette", e.target.value);
    history.replaceState(null, "", url);
  });

  panel.appendChild(fieldset);
  document.body.appendChild(panel);
})();
