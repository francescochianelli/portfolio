document.addEventListener("DOMContentLoaded", function () {
  var scrim = document.querySelector("[data-scrim]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var mobileInfos = document.querySelector("[data-mobile-infos]");
  var menuOpenLinks = document.querySelectorAll("[data-menu-open]");
  var infosOpenLinks = document.querySelectorAll("[data-infos-open]");
  var menuCloseLinks = document.querySelectorAll("[data-menu-close]");
  var overlayTriggers = document.querySelectorAll("[data-overlay]");
  var overlayClosers = document.querySelectorAll("[data-overlay-close]");
  var overlayPanels = document.querySelectorAll("[data-overlay-panel]");

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove("is-open");
    if (mobileInfos) mobileInfos.classList.remove("is-open");
  }

  function closeAllOverlays() {
    overlayPanels.forEach(function (panel) {
      panel.classList.remove("is-visible");
    });
    if (scrim) scrim.classList.remove("is-visible");
  }

  menuOpenLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      closeAllOverlays();
      closeMobileMenu();
      if (mobileMenu) mobileMenu.classList.add("is-open");
    });
  });

  infosOpenLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      closeAllOverlays();
      closeMobileMenu();
      if (mobileInfos) mobileInfos.classList.add("is-open");
    });
  });

  menuCloseLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      closeMobileMenu();
    });
  });

  overlayTriggers.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var name = link.getAttribute("data-overlay");
      closeMobileMenu();
      closeAllOverlays();
      var panel = document.querySelector('[data-overlay-panel="' + name + '"]');
      if (panel) panel.classList.add("is-visible");
      if (scrim) scrim.classList.add("is-visible");
    });
  });

  overlayClosers.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      closeAllOverlays();
    });
  });

  if (scrim) {
    scrim.addEventListener("click", function () {
      closeAllOverlays();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllOverlays();
      closeMobileMenu();
    }
  });

  // Scroll reveal: fade in project images as they enter the viewport.
  // Only runs on project pages (.project-images), never on the home grid.
  var projectImages = document.querySelectorAll(".project-images img");
  if (projectImages.length) {
    var revealImage = function (img) {
      img.classList.add("is-visible");
    };

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var img = entry.target;
              if (img.complete) {
                revealImage(img);
              } else {
                img.addEventListener("load", function () { revealImage(img); }, { once: true });
              }
              obs.unobserve(img);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      projectImages.forEach(function (img) { revealObserver.observe(img); });
    } else {
      projectImages.forEach(revealImage);
    }
  }
});
