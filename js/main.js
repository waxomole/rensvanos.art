(function () {
  var lang = document.documentElement.lang === "en" ? "en" : "nl";
  var EMAIL = "prints@rensvanos.art";
  var T = {
    nl: {
      status: {
        print: "Print beschikbaar",
        origineel: "Origineel beschikbaar",
        beide: "Print & origineel beschikbaar",
        uitverkocht: "Uitverkocht"
      },
      enquire: "Vraag naar dit werk",
      subject: "Aanvraag: ",
      close: "Sluiten",
      prev: "Vorig werk",
      next: "Volgend werk",
      soldNote: "Dit werk is uitverkocht — interessee voor iets vergelijkbaars? Mail gerust."
    },
    en: {
      status: {
        print: "Print available",
        origineel: "Original available",
        beide: "Print & original available",
        uitverkocht: "Sold out"
      },
      enquire: "Enquire about this work",
      subject: "Enquiry: ",
      close: "Close",
      prev: "Previous work",
      next: "Next work",
      soldNote: "This work is sold out — interested in something similar? Feel free to email."
    }
  }[lang];

  function field(art, key) {
    if (lang === "en") {
      var enKey = key + "En";
      if (art[enKey]) return art[enKey];
    }
    return art[key];
  }

  var grid = document.getElementById("galleryGrid");
  if (grid && typeof ARTWORKS !== "undefined") {
    ARTWORKS.forEach(function (art, index) {
      var card = document.createElement("article");
      card.className = "art-card glass reveal";
      card.setAttribute("role", "button");
      card.tabIndex = 0;
      card.setAttribute("aria-label", field(art, "title"));

      var img = document.createElement("img");
      img.className = "art-card__img";
      img.src = art.src;
      img.alt = field(art, "alt") || field(art, "title");
      img.loading = "lazy";
      img.onerror = function () { card.remove(); };

      var caption = document.createElement("div");
      caption.className = "art-card__caption";

      var title = document.createElement("span");
      title.className = "art-card__title";
      title.textContent = field(art, "title");

      var tag = document.createElement("span");
      tag.className = "art-card__tag";
      tag.textContent = field(art, "tag") || "";

      caption.appendChild(title);
      caption.appendChild(tag);
      card.appendChild(img);
      card.appendChild(caption);

      var open = function () { openLightbox(index); };
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      grid.appendChild(card);
    });
  }

  var lightbox = document.getElementById("lightbox");
  var current = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    current = (index + ARTWORKS.length) % ARTWORKS.length;
    var art = ARTWORKS[current];
    var img = lightbox.querySelector(".lightbox__img");
    var title = lightbox.querySelector(".lightbox__title");
    var meta = lightbox.querySelector(".lightbox__meta");
    var status = lightbox.querySelector(".lightbox__status");
    var note = lightbox.querySelector(".lightbox__note");
    var enquire = lightbox.querySelector(".lightbox__enquire");

    img.src = art.src;
    img.alt = field(art, "alt") || field(art, "title");
    title.textContent = field(art, "title");
    meta.textContent = [field(art, "tag"), art.year].filter(Boolean).join(" · ");
    status.textContent = T.status[art.status] || "";
    status.className = "lightbox__status" + (art.status === "uitverkocht" ? " is-sold" : "");
    note.hidden = art.status !== "uitverkocht";
    if (!note.hidden) note.textContent = T.soldNote;
    if (art.status !== "uitverkocht") {
      enquire.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(T.subject + field(art, "title"));
      enquire.hidden = false;
    } else {
      enquire.hidden = true;
    }
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox__backdrop")) closeLightbox();
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", function () { openLightbox(current - 1); });
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", function () { openLightbox(current + 1); });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(current - 1);
      if (e.key === "ArrowRight") openLightbox(current + 1);
    });
  }

  var instaGrid = document.getElementById("instaGrid");
  var instaSection = document.getElementById("instagram");
  if (instaGrid && typeof INSTAGRAM_POSTS !== "undefined" && INSTAGRAM_POSTS.length) {
    INSTAGRAM_POSTS.forEach(function (post) {
      var code = String(post).split("/").filter(Boolean).pop();
      var frame = document.createElement("iframe");
      frame.src = "https://www.instagram.com/p/" + code + "/embed";
      frame.loading = "lazy";
      frame.setAttribute("title", "Instagram post");
      frame.setAttribute("scrolling", "no");
      frame.setAttribute("frameborder", "0");
      var wrap = document.createElement("div");
      wrap.className = "insta__embed glass";
      wrap.appendChild(frame);
      instaGrid.appendChild(wrap);
    });
    if (instaSection) instaSection.hidden = false;
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
