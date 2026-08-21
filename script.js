/* =========================================================
   SAM. P TECK — PREMIUM PORTFOLIO JAVASCRIPT
   Interactive Portfolio Experience
========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. SELECT ELEMENTS
  ======================================================= */

  const body = document.body;

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
    document.querySelectorAll(".course-link.disabled");

  const images =
    document.querySelectorAll("img");


  /* =======================================================
     02. PAGE LOADER
  ======================================================= */

  const loader = document.createElement("div");

  loader.className = "page-loader";

  loader.innerHTML = `
    <div class="loader-inner">
      <span class="loader-brand">SAM. P TECK<span>.</span></span>
      <span class="loader-line"></span>
      <span class="loader-text">LOADING EXPERIENCE</span>
    </div>
  `;

  body.prepend(loader);


  window.addEventListener("load", () => {

    setTimeout(() => {

      loader.classList.add("loader-hidden");

      body.classList.add("page-loaded");

      setTimeout(() => {

        loader.remove();

      }, 800);

    }, 350);

  });


  /* =======================================================
     03. SCROLL REVEAL
  ======================================================= */

  const revealElement = (element) => {

    element.classList.add("is-visible");

  };


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              revealElement(entry.target);

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -60px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(revealElement);

  }


  /* =======================================================
     04. SCROLL PROGRESS BAR
  ======================================================= */

  const progressBar =
    document.createElement("div");

  progressBar.className =
    "scroll-progress";

  document.body.appendChild(progressBar);


  const updateScrollProgress = () => {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {

      progressBar.style.width = "0%";

      return;

    }

    const progress =
      (scrollTop / documentHeight) * 100;

    progressBar.style.width =
      `${Math.min(progress, 100)}%`;

  };


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );


  updateScrollProgress();


  /* =======================================================
     05. DYNAMIC HEADER
  ======================================================= */

  const updateHeader = () => {

    if (!header) {
      return;
    }


    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  updateHeader();


  /* =======================================================
     06. ACTIVE NAVIGATION
  ======================================================= */

  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navigationLinks.length
  ) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            navigationLinks.forEach((link) => {

              link.classList.remove("active");

            });


            const activeLink =
              document.querySelector(
                `.desktop-nav a[href="#${entry.target.id}"]`
              );


            if (activeLink) {

              activeLink.classList.add("active");

            }

          });

        },
        {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0
        }
      );


    sections.forEach((section) => {

      navObserver.observe(section);

    });

  }


  /* =======================================================
     07. SMOOTH INTERNAL NAVIGATION
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


        history.pushState(
          null,
          "",
          targetId
        );

      });

    });


  /* =======================================================
     08. COURSE CARD INTERACTION
  ======================================================= */

  const courseCards =
    document.querySelectorAll(".course-card");


  courseCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

      card.classList.add("course-hover");

    });


    card.addEventListener("mouseleave", () => {

      card.classList.remove("course-hover");

    });


    card.addEventListener("focusin", () => {

      card.classList.add("course-hover");

    });


    card.addEventListener("focusout", () => {

      card.classList.remove("course-hover");

    });

  });


  /* =======================================================
     09. HIGHLIGHT ADVANCED DATA ANALYTICS COURSE
  ======================================================= */

  courseCards.forEach((card) => {

    const link =
      card.querySelector(
        'a[href*="freecodecamp.org"]'
      );


    if (!link) {
      return;
    }


    card.classList.add(
      "featured-course"
    );


    const badge =
      document.createElement("span");

    badge.className =
      "featured-course-badge";

    badge.textContent =
      "FEATURED COURSE";


    card.prepend(badge);

  });


  /* =======================================================
     10. DISABLED COURSE LINKS
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
     11. BACK TO TOP BUTTON
  ======================================================= */

  const backToTop =
    document.createElement("button");

  backToTop.className =
    "back-to-top";

  backToTop.type = "button";

  backToTop.setAttribute(
    "aria-label",
    "Back to top"
  );

  backToTop.innerHTML = "↑";


  document.body.appendChild(backToTop);


  const updateBackToTop = () => {

    if (window.scrollY > 700) {

      backToTop.classList.add("visible");

    } else {

      backToTop.classList.remove("visible");

    }

  };


  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );


  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* =======================================================
     12. PREMIUM CUSTOM CURSOR
  ======================================================= */

  const supportsHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (supportsHover) {

    const cursor =
      document.createElement("div");

    cursor.className =
      "custom-cursor";


    const cursorDot =
      document.createElement("div");

    cursorDot.className =
      "custom-cursor-dot";


    document.body.appendChild(cursor);

    document.body.appendChild(cursorDot);


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;


        cursorDot.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      }
    );


    const animateCursor = () => {

      cursorX +=
        (mouseX - cursorX) * 0.15;

      cursorY +=
        (mouseY - cursorY) * 0.15;


      cursor.style.transform =
        `translate3d(${cursorX}px, ${cursorY}px, 0)`;


      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();


    document
      .querySelectorAll(
        "a, button, .course-card, .image-frame"
      )
      .forEach((element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursor.classList.add(
              "cursor-hover"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.classList.remove(
              "cursor-hover"
            );

          }
        );

      });

  }


  /* =======================================================
     13. IMAGE PERFORMANCE OPTIMIZATION
  ======================================================= */

  images.forEach((image) => {

    image.decoding = "async";


    if (
      !image.hasAttribute("loading") &&
      !image.closest(".hero-section")
    ) {

      image.loading = "lazy";

    }


    if (image.complete) {

      image.classList.add("loaded");

    } else {

      image.addEventListener(
        "load",
        () => {

          image.classList.add("loaded");

        },
        {
          once: true
        }
      );

    }

  });


  /* =======================================================
     14. EXTERNAL LINK HANDLING
  ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach((link) => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });


  /* =======================================================
     15. CURRENT YEAR
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
     16. KEYBOARD ACCESSIBILITY
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
     17. REDUCED MOTION
  ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    document.documentElement.style
      .scrollBehavior = "auto";

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }


  /* =======================================================
     18. PAGE INITIALIZATION
  ======================================================= */

  body.classList.add(
    "js-ready"
  );


  console.log(
    "✓ Sam. P Teck premium portfolio initialized successfully."
  );

});    );

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
