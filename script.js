/* =========================================================
   SAM. P TECK — PORTFOLIO JAVASCRIPT
   Interactive Portfolio Experience
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     02. SELECT ELEMENTS
  ======================================================= */

  const header =
    document.querySelector(".site-header");

  const navigationLinks =
    document.querySelectorAll(".desktop-nav a");

  const sections =
    document.querySelectorAll("main section[id]");

  const revealElements =
    document.querySelectorAll(
      ".service-item, .work-feature, .work-side, .course-card, .image-frame"
    );

  const disabledLinks =
    document.querySelectorAll(
      ".course-link.disabled"
    );

  const images =
    document.querySelectorAll("img");



  /* =======================================================
     03. SCROLL REVEAL
  ======================================================= */

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    /* Fallback for older browsers */

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }



  /* =======================================================
     04. ACTIVE NAVIGATION
  ======================================================= */

  if ("IntersectionObserver" in window) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            navigationLinks.forEach((link) => {

              link.classList.remove(
                "active"
              );

            });


            const activeLink =
              document.querySelector(
                `.desktop-nav a[href="#${entry.target.id}"]`
              );


            if (activeLink) {

              activeLink.classList.add(
                "active"
              );

            }

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach((section) => {

      navObserver.observe(section);

    });

  }



  /* =======================================================
     05. HEADER SCROLL EFFECT
  ======================================================= */

  const updateHeader =
    () => {

      if (!header) {
        return;
      }


      if (window.scrollY > 40) {

        header.classList.add(
          "scrolled"
        );

      } else {

        header.classList.remove(
          "scrolled"
        );

      }

    };


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();



  /* =======================================================
     06. SMOOTH INTERNAL NAVIGATION
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });


          /*
             Update browser URL without
             causing another page jump.
          */

          history.pushState(
            null,
            "",
            targetId
          );

        }
      );

    });



  /* =======================================================
     07. DISABLED COURSE BUTTONS
  ======================================================= */

  disabledLinks.forEach((element) => {

    element.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

      }
    );

  });



  /* =======================================================
     08. COURSE CARD INTERACTION
  ======================================================= */

  const courseCards =
    document.querySelectorAll(
      ".course-card"
    );


  courseCards.forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.classList.add(
          "course-hover"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.classList.remove(
          "course-hover"
        );

      }
    );

  });



  /* =======================================================
     09. IMAGE LOAD DETECTION
  ======================================================= */

  images.forEach((image) => {

    if (image.complete) {

      image.classList.add(
        "loaded"
      );

    } else {

      image.addEventListener(
        "load",
        () => {

          image.classList.add(
            "loaded"
          );

        },
        {
          once: true
        }
      );

    }

  });



  /* =======================================================
     10. EXTERNAL LINK SAFETY
  ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          const destination =
            link.getAttribute(
              "href"
            );


          if (destination) {

            console.log(
              `Opening external link: ${destination}`
            );

          }

        }
      );

    });



  /* =======================================================
     11. CURRENT YEAR
  ======================================================= */

  const yearElement =
    document.querySelector(
      ".footer-bottom span"
    );


  if (yearElement) {

    yearElement.textContent =
      `© ${new Date().getFullYear()} Sam. P Teck. All rights reserved.`;

  }



  /* =======================================================
     12. KEYBOARD ACCESSIBILITY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        document
          .querySelectorAll(
            ".course-hover"
          )
          .forEach((element) => {

            element.classList.remove(
              "course-hover"
            );

          });

      }

    }
  );



  /* =======================================================
     13. REDUCED MOTION
  ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    document.documentElement.style
      .scrollBehavior = "auto";

  }



  /* =======================================================
     14. PAGE INITIALIZATION
  ======================================================= */

  document.body.classList.add(
    "js-ready"
  );


  console.log(
    "✓ Sam. P Teck portfolio initialized successfully."
  );

});
