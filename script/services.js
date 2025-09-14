import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation functions
function initAnimations() {
  // Scramble text animation
  const scrambleElements = document.querySelectorAll('[data-animate-type="scramble"]');
  scrambleElements.forEach((element, index) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: element.dataset.animateDelay || 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Line reveal animation
  const lineRevealElements = document.querySelectorAll('[data-animate-type="line-reveal"]');
  lineRevealElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: element.dataset.animateDelay || 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Reveal animation (for hero h1)
  const revealElements = document.querySelectorAll('[data-animate-type="reveal"]');
  revealElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: element.dataset.animateDelay || 0,
        ease: "power3.out",
      }
    );
  });

  // Fade up animation
  const fadeUpElements = document.querySelectorAll('[data-animate-type="fade-up"]');
  fadeUpElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: element.dataset.animateDelay || 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Service cards stagger animation
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(
      serviceCards,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.services-grid-container',
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Process steps stagger animation
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length > 0) {
    gsap.fromTo(
      processSteps,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.process-timeline',
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Timeline dots animation
  const stepDots = document.querySelectorAll('.step-dot');
  stepDots.forEach((dot, index) => {
    gsap.fromTo(
      dot,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.2 + 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: dot.closest('.process-step'),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Step tags animation
  const stepTags = document.querySelectorAll('.tag');
  stepTags.forEach((tag, index) => {
    gsap.fromTo(
      tag,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1 + 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tag.closest('.process-step'),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Service card hover animations
  serviceCards.forEach((card) => {
    const icon = card.querySelector('.service-icon');
    const number = card.querySelector('.service-number');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      gsap.to(number, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(number, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Process step hover animations
  processSteps.forEach((step) => {
    const stepNumber = step.querySelector('.step-number');
    
    step.addEventListener('mouseenter', () => {
      gsap.to(stepNumber, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    
    step.addEventListener('mouseleave', () => {
      gsap.to(stepNumber, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();

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

  // Services CTA button functionality
  const servicesCalendlyBtn = document.querySelector("#services-calendly-btn");
  if (servicesCalendlyBtn) {
    servicesCalendlyBtn.addEventListener("click", function(e) {
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

  // Parallax effect for hero section
  const heroSection = document.querySelector('.services-hero');
  if (heroSection) {
    gsap.to(heroSection, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Smooth reveal for service features
  const serviceFeatures = document.querySelectorAll('.service-features li');
  serviceFeatures.forEach((feature, index) => {
    gsap.fromTo(
      feature,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: feature.closest('.service-card'),
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
});
