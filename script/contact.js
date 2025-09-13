import gsap from "gsap";
import { initAnimations } from "./anime.js";

function flickerReveal(element, delay = 0) {
  gsap.set(element, {
    opacity: 0,
    scale: 0.98,
    filter: "brightness(0.7) contrast(1.2)",
  });

  const tl = gsap.timeline({ delay: delay });

  tl.to(element, { duration: 0.05, opacity: 0.3 })
    .to(element, { duration: 0.08, opacity: 0 })
    .to(element, { duration: 0.03, opacity: 0.6 })
    .to(element, { duration: 0.06, opacity: 0.1 })
    .to(element, { duration: 0.04, opacity: 0.8 })
    .to(element, { duration: 0.07, opacity: 0 })
    .to(element, { duration: 0.02, opacity: 0.4 })
    .to(element, { duration: 0.05, opacity: 0 })
    .to(element, { duration: 0.03, opacity: 0.9 })
    .to(element, { duration: 0.04, opacity: 0.2 })
    .to(element, {
      duration: 0.3,
      opacity: 1,
      scale: 1,
      filter: "brightness(1) contrast(1)",
      ease: "power2.out",
    });

  return tl;
}

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();

  const contactGif = document.querySelector(".contact-gif");
  if (contactGif) {
    flickerReveal(contactGif, 1);
  }

  // Calendly popup functionality
  const calendlyBtn = document.querySelector(".calendly-menu-btn");
  if (calendlyBtn) {
    calendlyBtn.addEventListener("click", function() {
      Calendly.initPopupWidget({
        url: "https://calendly.com/unknwngod8/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=d3eace&primary_color=f5e0bd"
      });
    });
  }
});
