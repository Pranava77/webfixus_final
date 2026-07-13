import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { initAnimations } from "./anime";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();

  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);

  gsap.set(".hero .hero-cards .card", { transformOrigin: "center center" });

  // Initial card animation - works on all screen sizes
  gsap.to(".hero .hero-cards .card", {
    scale: 1,
    duration: 0.75,
    delay: 0.25,
    stagger: 0.1,
    ease: "power4.out",
    onComplete: () => {
      gsap.set("#hero-card-1", { transformOrigin: "top right" });
      gsap.set("#hero-card-3", { transformOrigin: "top left" });
    },
  });

  const smoothStep = (p) => p * p * (3 - 2 * p);

  // Desktop scroll animation
  if (window.innerWidth > 1000) {
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "75% top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (window.heroLightningEffect) {
          window.heroLightningEffect.update(progress, self.getVelocity());
        }

        const heroCardsContainerOpacity = gsap.utils.interpolate(
          1,
          0.5,
          smoothStep(progress)
        );
        gsap.set(".hero-cards", {
          opacity: heroCardsContainerOpacity,
        });

        ["#hero-card-1", "#hero-card-2", "#hero-card-3"].forEach(
          (cardId, index) => {
            const delay = index * 0.9;
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - delay * 0.1) / (1 - delay * 0.1)
            );

            const y = gsap.utils.interpolate(
              "0%",
              "400%",
              smoothStep(cardProgress)
            );
            const scale = gsap.utils.interpolate(
              1,
              0.75,
              smoothStep(cardProgress)
            );

            let x = "0%";
            let rotation = 0;
            if (index === 0) {
              x = gsap.utils.interpolate("0%", "90%", smoothStep(cardProgress));
              rotation = gsap.utils.interpolate(
                0,
                -15,
                smoothStep(cardProgress)
              );
            } else if (index === 2) {
              x = gsap.utils.interpolate(
                "0%",
                "-90%",
                smoothStep(cardProgress)
              );
              rotation = gsap.utils.interpolate(
                0,
                15,
                smoothStep(cardProgress)
              );
            }

            gsap.set(cardId, {
              y: y,
              x: x,
              rotation: rotation,
              scale: scale,
            });
          }
        );
      },
    });
  } else {
    // Mobile scroll animation - simpler version
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "50% top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (window.heroLightningEffect) {
          window.heroLightningEffect.update(progress, self.getVelocity());
        }

        const heroCardsContainerOpacity = gsap.utils.interpolate(
          1,
          0.3,
          smoothStep(progress)
        );
        gsap.set(".hero-cards", {
          opacity: heroCardsContainerOpacity,
        });

        ["#hero-card-1", "#hero-card-2", "#hero-card-3"].forEach(
          (cardId, index) => {
            const delay = index * 0.3;
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - delay * 0.2) / (1 - delay * 0.2)
            );

            const y = gsap.utils.interpolate(
              "0%",
              "200%",
              smoothStep(cardProgress)
            );
            const scale = gsap.utils.interpolate(
              1,
              0.6,
              smoothStep(cardProgress)
            );

            gsap.set(cardId, {
              y: y,
              scale: scale,
            });
          }
        );
      },
    });

    // Mobile-specific card entrance animation
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        gsap.fromTo(".hero .hero-cards .card", 
          { 
            scale: 0,
            opacity: 0,
            y: 50
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
          }
        );
      }
    });
  }

  // Home services scroll animation - desktop only
  if (window.innerWidth > 1000) {
    ScrollTrigger.create({
      trigger: ".home-services",
      start: "top top",
      end: `+=${window.innerHeight * 2.4}px`,
      pin: ".home-services",
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: ".home-services",
      start: "top bottom",
      end: `+=${window.innerHeight * 2.4}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (window.lightningEffect) {
          window.lightningEffect.update(progress, self.getVelocity());
        }

        const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
        const headerY = gsap.utils.interpolate(
          "300%",
          "0%",
          smoothStep(headerProgress)
        );
        gsap.set(".home-services-header", {
          y: headerY,
        });

        ["#card-1", "#card-2", "#card-3"].forEach((cardId, index) => {
          const delay = index * 0.5;
          const cardProgress = gsap.utils.clamp(
            0,
            1,
            (progress - delay * 0.1) / (0.9 - delay * 0.1)
          );

          const innerCard = document.querySelector(
            `${cardId} .flip-card-inner`
          );

          let y;
          if (cardProgress < 0.4) {
            const normalizedProgress = cardProgress / 0.4;
            y = gsap.utils.interpolate(
              "-100%",
              "50%",
              smoothStep(normalizedProgress)
            );
          } else if (cardProgress < 0.6) {
            const normalizedProgress = (cardProgress - 0.4) / 0.2;
            y = gsap.utils.interpolate(
              "50%",
              "0%",
              smoothStep(normalizedProgress)
            );
          } else {
            y = "0%";
          }

          let scale;
          if (cardProgress < 0.4) {
            const normalizedProgress = cardProgress / 0.4;
            scale = gsap.utils.interpolate(
              0.25,
              0.75,
              smoothStep(normalizedProgress)
            );
          } else if (cardProgress < 0.6) {
            const normalizedProgress = (cardProgress - 0.4) / 0.2;
            scale = gsap.utils.interpolate(
              0.75,
              1,
              smoothStep(normalizedProgress)
            );
          } else {
            scale = 1;
          }

          let opacity;
          if (cardProgress < 0.2) {
            const normalizedProgress = cardProgress / 0.2;
            opacity = smoothStep(normalizedProgress);
          } else {
            opacity = 1;
          }

          let x, rotate, rotationY;
          if (cardProgress < 0.6) {
            x = index === 0 ? "100%" : index === 1 ? "0%" : "-100%";
            rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
            rotationY = 0;
          } else if (cardProgress < 1) {
            const normalizedProgress = (cardProgress - 0.6) / 0.4;
            x = gsap.utils.interpolate(
              index === 0 ? "100%" : index === 1 ? "0%" : "-100%",
              "0%",
              smoothStep(normalizedProgress)
            );
            rotate = gsap.utils.interpolate(
              index === 0 ? -5 : index === 1 ? 0 : 5,
              0,
              smoothStep(normalizedProgress)
            );
            rotationY = smoothStep(normalizedProgress) * 180;
          } else {
            x = "0%";
            rotate = 0;
            rotationY = 180;
          }

          gsap.set(cardId, {
            opacity: opacity,
            y: y,
            x: x,
            rotate: rotate,
            scale: scale,
          });

          gsap.set(innerCard, {
            rotationY: rotationY,
          });
        });
      },
    });
  } else {
    // Mobile home-services animation — one trigger drives the lightning
    // effect for the whole section, plus per-card entrance triggers so
    // each card feels like it "spreads in" as it scrolls into view.
    ScrollTrigger.create({
      trigger: ".home-services",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (window.lightningEffect) {
          const activeProgress = 0.5 + self.progress * 0.5;
          window.lightningEffect.update(activeProgress, self.getVelocity());
        }
      }
    });

    /* Mobile: cards live in a draggable, depth-stacked deck. Fade the
       whole deck in as the section enters view — no per-card horizontal
       motion so we don't fight the user's swipe gesture. */
    const deck = document.querySelector(".home-services .cards-container");
    if (deck) {
      gsap.set(deck, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: ".home-services",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(deck, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        },
      });
    }

    // ─── Tinder-style swipeable card stack ────────────────────────────
    const cardEls = Array.from(
      document.querySelectorAll(".home-services .cards-container .card")
    );

    if (cardEls.length) {
      const TOTAL = cardEls.length;
      let currentIndex = 0;
      let frontDraggable = null;

      const REST = {
        0: { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, zIndex: 30 },
        1: { x: 0, y: 16, scale: 0.94, opacity: 1, rotation: 0, zIndex: 20 },
        2: { x: 0, y: 30, scale: 0.88, opacity: 0.85, rotation: 0, zIndex: 10 },
      };
      /* Dismissed cards park off-screen on whichever side they were swiped
         toward. There's no back gesture — Tinder-style, both directions
         advance the deck. */
      const PARKED = {
        left: { x: "-120%", y: 0, scale: 0.9, opacity: 0, rotation: -8, zIndex: 0 },
        right: { x: "120%", y: 0, scale: 0.9, opacity: 0, rotation: 8, zIndex: 0 },
      };

      const targetForOffset = (offset) =>
        offset < 0 ? PARKED.left : REST[offset] || REST[2];

      const getCardAt = (offset) => cardEls[currentIndex + offset] || null;

      function layoutStack({ animate = true, excluding = null } = {}) {
        cardEls.forEach((card, i) => {
          if (card === excluding) return;
          const offset = i - currentIndex;
          const vars = {
            ...targetForOffset(offset),
            pointerEvents: offset < 0 ? "none" : "auto",
          };
          if (animate) {
            gsap.to(card, { ...vars, duration: 0.5, ease: "back.out(1.6)" });
          } else {
            gsap.set(card, vars);
          }
        });
      }

      function handleFrontDrag() {
        const distanceThreshold = this.target.offsetWidth * 0.32;
        const progress = gsap.utils.clamp(-1, 1, this.x / distanceThreshold);

        // Only update rotation; Draggable handles x internally
        gsap.set(this.target, { rotation: progress * 14 });

        /* Either drag direction reveals the next card underneath. */
        cardEls.forEach((card, i) => {
          if (card === this.target) return;
          const offset = i - currentIndex;
          if (offset === 1) {
            const p = Math.abs(progress);
            gsap.set(card, {
              y: gsap.utils.interpolate(REST[1].y, REST[0].y, p),
              scale: gsap.utils.interpolate(REST[1].scale, REST[0].scale, p),
              opacity: 1,
            });
          } else {
            gsap.set(card, targetForOffset(offset));
          }
        });
      }

      function snapBack() {
        const frontCard = getCardAt(0);
        gsap.to(frontCard, {
          x: 0,
          rotation: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.65)",
          overwrite: "auto",
        });
        layoutStack({ animate: true });
      }

      function commitSwipe(side) {
        const outgoingCard = getCardAt(0);
        const parked = PARKED[side];
        currentIndex += 1;

        gsap.to(outgoingCard, {
          x: side === "left" ? "-130%" : "130%",
          y: "+=10",
          rotation: side === "left" ? -22 : 22,
          opacity: 0,
          duration: 0.42,
          ease: "power1.in",
          overwrite: "auto",
          onComplete: () =>
            gsap.set(outgoingCard, { ...parked, pointerEvents: "none" }),
        });

        layoutStack({ animate: true, excluding: outgoingCard });
        setupFrontDraggable();
      }

      function handleFrontDragEnd() {
        const dragX = this.x;
        const velocityX = InertiaPlugin.getVelocity(this.target, "x");
        /* Kill the inertia throw before starting our own tweens — otherwise
           both keep writing x and the card stutters/rubber-bands. */
        if (this.tween) this.tween.kill();
        const distanceThreshold = this.target.offsetWidth * 0.32;
        const velocityThreshold = 600;

        const pastDistance = Math.abs(dragX) > distanceThreshold;
        const pastVelocity =
          Math.abs(velocityX) > velocityThreshold &&
          Math.sign(velocityX) === Math.sign(dragX);
        const wantsCommit = pastDistance || pastVelocity;

        const draggedLeft = dragX < -4;
        const draggedRight = dragX > 4;
        const canAdvance = currentIndex < TOTAL - 1;

        if (wantsCommit && canAdvance && (draggedLeft || draggedRight)) {
          commitSwipe(draggedLeft ? "left" : "right");
        } else {
          snapBack();
        }
      }

      /* ── Swipe hint ──────────────────────────────────────────────────
         Nudge the front card sideways (next card peeking up behind it) a
         couple of times once the deck scrolls into view, so it reads as
         swipeable. Killed forever on the first touch. */
      let hintTl = null;
      let hintDismissed = false;

      function killSwipeHint() {
        hintDismissed = true;
        if (hintTl) {
          hintTl.kill();
          hintTl = null;
        }
      }

      function playSwipeHint() {
        if (hintDismissed || hintTl || currentIndex !== 0) return;
        const front = getCardAt(0);
        const next = getCardAt(1);
        if (!front) return;

        hintTl = gsap.timeline({ delay: 1.2, repeat: 2, repeatDelay: 2.4 });
        hintTl.to(front, {
          x: -30,
          rotation: -2.5,
          duration: 0.4,
          ease: "power2.inOut",
        });
        if (next) {
          hintTl.to(
            next,
            {
              y: REST[1].y - 6,
              scale: REST[1].scale + 0.02,
              duration: 0.4,
              ease: "power2.inOut",
            },
            "<"
          );
        }
        hintTl.to(front, {
          x: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.55)",
        });
        if (next) {
          hintTl.to(
            next,
            {
              y: REST[1].y,
              scale: REST[1].scale,
              duration: 0.5,
              ease: "power2.out",
            },
            "<"
          );
        }
      }

      function setupFrontDraggable() {
        if (frontDraggable) {
          frontDraggable.kill();
          frontDraggable = null;
        }
        const frontCard = getCardAt(0);
        if (!frontCard) return;

        const big = Math.round(window.innerWidth * 1.5);
        /* Last card can't be dismissed — clamp it so drags just rubber-band
           via edgeResistance. Every other card drags freely both ways. */
        const bounds =
          currentIndex === TOTAL - 1
            ? { minX: 0, maxX: 0 }
            : { minX: -big, maxX: big };

        frontDraggable = Draggable.create(frontCard, {
          type: "x",
          inertia: true,
          bounds,
          edgeResistance: 0.65,
          allowNativeTouchScrolling: true,
          onPress: killSwipeHint,
          onDrag: handleFrontDrag,
          onDragEnd: handleFrontDragEnd,
        })[0];
      }

      function syncDeckHeight() {
        const deckEl = document.querySelector(
          ".home-services .cards-container"
        );
        const referenceBack = cardEls[0].querySelector(".flip-card-back");
        if (!deckEl || !referenceBack) return;
        const height = referenceBack.getBoundingClientRect().height;
        if (height > 0) deckEl.style.height = `${Math.ceil(height)}px`;
      }

      gsap.set(cardEls, { xPercent: -50, top: 0, pointerEvents: "auto" });
      layoutStack({ animate: false });
      syncDeckHeight();
      setupFrontDraggable();

      ScrollTrigger.create({
        trigger: ".home-services",
        start: "top 80%",
        once: true,
        onEnter: playSwipeHint,
      });

      const deckRO = new ResizeObserver(syncDeckHeight);
      deckRO.observe(cardEls[0].querySelector(".flip-card-back"));

      /* Mobile scrolling toggles the browser address bar, which fires a
         burst of resize events with height changing but width unchanged.
         Debounce and ignore height-only resizes so we don't re-layout the
         deck and rebuild the Draggable mid-scroll. */
      let lastWidth = window.innerWidth;
      let resizeDebounceTimer = null;
      window.addEventListener(
        "resize",
        () => {
          clearTimeout(resizeDebounceTimer);
          resizeDebounceTimer = setTimeout(() => {
            const newWidth = window.innerWidth;
            if (newWidth === lastWidth) return;
            lastWidth = newWidth;
            syncDeckHeight();
            setupFrontDraggable();
          }, 180);
        },
        { passive: true }
      );
    }
  }

  const spotlightTrack = document.querySelector(".home-spotlight-track");

  const getSpotlightMaxX = () =>
    spotlightTrack
      ? Math.max(0, spotlightTrack.scrollWidth - window.innerWidth)
      : 0;
  let spotlightMaxX = getSpotlightMaxX();
  ScrollTrigger.addEventListener("refreshInit", () => {
    spotlightMaxX = getSpotlightMaxX();
  });

  const spotlightHeader = document.querySelector(".spotlight-mask-header h3");
  let headerSplit = null;

  if (spotlightHeader) {
    headerSplit = SplitText.create(spotlightHeader, {
      type: "words",
      wordsClass: "spotlight-word",
    });

    gsap.set(headerSplit.words, { opacity: 0 });
  }

  ScrollTrigger.create({
    trigger: ".home-spotlight",
    start: "top top",
    end: `+=${window.innerHeight * 1.8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      if (spotlightTrack) {
        const animationProgress = Math.min(progress / 0.5, 1);

        gsap.set(spotlightTrack, {
          x: -spotlightMaxX * animationProgress,
        });
      }

      const maskContainer = document.querySelector(
        ".spotlight-mask-image-container"
      );
      const maskImage = document.querySelector(".spotlight-mask-image");

      if (maskContainer && maskImage) {
        if (progress <= 0.55) {
          const maskProgress = progress / 0.55;
          const maskSize = `${maskProgress * 900}%`;

          const imageScale = 1.25 - maskProgress * 0.25;

          maskContainer.style.setProperty("-webkit-mask-size", maskSize);
          maskContainer.style.setProperty("mask-size", maskSize);

          gsap.set(maskImage, {
            scale: imageScale,
          });
        } else {
          maskContainer.style.setProperty("-webkit-mask-size", "900%");
          maskContainer.style.setProperty("mask-size", "900%");

          gsap.set(maskImage, {
            scale: 1,
          });
        }
      }

      if (headerSplit && headerSplit.words.length > 0) {
        if (progress >= 0.55 && progress <= 0.85) {
          const textProgress = (progress - 0.55) / 0.3;
          const totalWords = headerSplit.words.length;

          headerSplit.words.forEach((word, index) => {
            const wordRevealProgress = index / totalWords;

            if (textProgress >= wordRevealProgress) {
              gsap.set(word, { opacity: 1 });
            } else {
              gsap.set(word, { opacity: 0 });
            }
          });
        } else if (progress < 0.55) {
          gsap.set(headerSplit.words, { opacity: 0 });
        } else if (progress > 0.85) {
          gsap.set(headerSplit.words, { opacity: 1 });
        }
      }
    },
  });

  const outroHeader = document.querySelector(".outro h3");
  let outroSplit = null;

  if (outroHeader) {
    outroSplit = SplitText.create(outroHeader, {
      type: "words",
      wordsClass: "outro-word",
    });

    gsap.set(outroSplit.words, { opacity: 0 });
  }

  const outroStrips = document.querySelectorAll(".outro-strip");
  const stripSpeeds = [0.3, 0.4, 0.25, 0.35, 0.2, 0.25];

  ScrollTrigger.create({
    trigger: ".outro",
    start: "top top",
    end: `+=${window.innerHeight * 1.8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      if (outroSplit && outroSplit.words.length > 0) {
        if (progress >= 0.25 && progress <= 0.75) {
          const textProgress = (progress - 0.25) / 0.5;
          const totalWords = outroSplit.words.length;

          outroSplit.words.forEach((word, index) => {
            const wordRevealProgress = index / totalWords;

            if (textProgress >= wordRevealProgress) {
              gsap.set(word, { opacity: 1 });
            } else {
              gsap.set(word, { opacity: 0 });
            }
          });
        } else if (progress < 0.25) {
          gsap.set(outroSplit.words, { opacity: 0 });
        } else if (progress > 0.75) {
          gsap.set(outroSplit.words, { opacity: 1 });
        }
      }
    },
  });

  ScrollTrigger.create({
    trigger: ".outro",
    start: "top bottom",
    end: `+=${window.innerHeight * 3.6}px`,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      outroStrips.forEach((strip, index) => {
        if (stripSpeeds[index] !== undefined) {
          const speed = stripSpeeds[index];
          const movement = progress * 100 * speed;

          gsap.set(strip, {
            x: `${movement}%`,
          });
        }
      });
    },
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item.open")
        .forEach((openItem) => openItem.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // Calendly popup functionality
  const calendlyBtn = document.querySelector(".calendly-menu-btn");
  if (calendlyBtn) {
    calendlyBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({
          url: 'https://calendly.com/unknwngod8/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=d3eace&primary_color=f5e0bd'
        });
      } else {
        // Fallback: open in new tab if Calendly script hasn't loaded
        window.open('https://calendly.com/unknwngod8/30min', '_blank');
      }
    });
  }

  // Hero Calendly button functionality
  const heroCalendlyBtn = document.querySelector("#hero-calendly-btn");
  if (heroCalendlyBtn) {
    heroCalendlyBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({
          url: 'https://calendly.com/unknwngod8/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=d3eace&primary_color=f5e0bd'
        });
      } else {
        // Fallback: open in new tab if Calendly script hasn't loaded
        window.open('https://calendly.com/unknwngod8/30min', '_blank');
      }
    });
  }

});
