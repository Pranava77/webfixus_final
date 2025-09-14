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

  // Service sections stagger animation
  const serviceSections = document.querySelectorAll('.service-section');
  if (serviceSections.length > 0) {
    gsap.fromTo(
      serviceSections,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.services-content',
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Process items stagger animation
  const processItems = document.querySelectorAll('.process-item');
  if (processItems.length > 0) {
    gsap.fromTo(
      processItems,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.process-grid',
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // CTA list items animation
  const ctaListItems = document.querySelectorAll('.cta-list li');
  ctaListItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item.closest('.service-cta-box'),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Service section hover animations with dynamic border
  serviceSections.forEach((section) => {
    const icon = section.querySelector('.service-icon-large');
    
    section.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    
    section.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
    });

    // Dynamic border effect
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      
      // Calculate distance from center for intensity
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const intensity = Math.min(distance / maxDistance, 1);
      
      // Update the gradient angle and intensity based on mouse position
      const gradient = `linear-gradient(${angle + 90}deg, 
        rgba(153, 167, 153, ${0.3 + intensity * 0.7}), 
        rgba(173, 194, 169, ${0.5 + intensity * 0.5}))`;
      section.style.setProperty('--hover-gradient', gradient);
      
      // Add subtle glow effect
      const glowIntensity = intensity * 0.3;
      section.style.setProperty('--glow-opacity', glowIntensity);
    });
  });

  // Process item hover animations
  processItems.forEach((item) => {
    const icon = item.querySelector('.process-icon');
    
    item.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
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
});
