(function () {
  var grid = document.getElementById("galleryGrid");
  if (grid && typeof ARTWORKS !== "undefined") {
    ARTWORKS.forEach(function (art) {
      var card = document.createElement("article");
      card.className = "art-card glass reveal";

      var img = document.createElement("img");
      img.className = "art-card__img";
      img.src = art.src;
      img.alt = art.alt || art.title;
      img.loading = "lazy";
      img.onerror = function () {
        card.remove();
      };

      var caption = document.createElement("div");
      caption.className = "art-card__caption";

      var title = document.createElement("span");
      title.className = "art-card__title";
      title.textContent = art.title;

      var tag = document.createElement("span");
      tag.className = "art-card__tag";
      tag.textContent = art.tag || "";

      caption.appendChild(title);
      caption.appendChild(tag);
      card.appendChild(img);
      card.appendChild(caption);
      grid.appendChild(card);
    });
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
