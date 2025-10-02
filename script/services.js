import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initAnimations } from "./anime";

document.addEventListener("DOMContentLoaded", () => {
gsap.registerPlugin(ScrollTrigger);
  initAnimations();

  // Initialize service cards
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    const header = card.querySelector('.service-card-header');
    const content = card.querySelector('.service-card-content');
    const expandIcon = card.querySelector('.expand-icon');
    
    // Set initial states
    gsap.set(content, { height: 0, opacity: 0 });
    gsap.set(expandIcon, { rotation: 0 });

    // Add click handler
    header.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      
      // Close all other cards
      serviceCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('expanded')) {
          otherCard.classList.remove('expanded');
          const otherContent = otherCard.querySelector('.service-card-content');
          const otherIcon = otherCard.querySelector('.expand-icon');
          
          gsap.to(otherContent, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
          
          gsap.to(otherIcon, {
            rotation: 0,
            duration: 0.5,
            ease: "power2.inOut"
          });
        }
      });

      // Toggle current card
      if (!isExpanded) {
        card.classList.add('expanded');
        
        // Get the content height
        gsap.set(content, { height: "auto", opacity: 1 });
        const height = content.offsetHeight;
        gsap.set(content, { height: 0, opacity: 0 });
        
        // Animate opening
        gsap.to(content, {
          height: height,
        opacity: 1,
        duration: 0.5,
          ease: "power2.inOut"
        });
        
        gsap.to(expandIcon, {
          rotation: 45,
          duration: 0.5,
          ease: "power2.inOut"
        });
      } else {
        card.classList.remove('expanded');
        
        // Animate closing
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });
        
        gsap.to(expandIcon, {
          rotation: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }
    });

    // Add hover animation
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('expanded')) {
        gsap.to(card, {
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('expanded')) {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });

  // Initialize Calendly buttons
  const calendlyBtn = document.getElementById('services-calendly-btn');
  if (calendlyBtn) {
    calendlyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({
          url: 'https://calendly.com/unknwngod8/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=d3eace&primary_color=f5e0bd'
        });
      } else {
        window.open('https://calendly.com/unknwngod8/30min', '_blank');
      }
    });
  }

  // Initialize menu Calendly button
  const menuCalendlyBtn = document.querySelector('.calendly-menu-btn');
  if (menuCalendlyBtn) {
    menuCalendlyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({
          url: 'https://calendly.com/unknwngod8/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=d3eace&primary_color=f5e0bd'
        });
      } else {
        window.open('https://calendly.com/unknwngod8/30min', '_blank');
      }
    });
  }
});