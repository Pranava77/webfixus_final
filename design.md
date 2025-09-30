# WEBFIXUS Design System Documentation

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Components](#components)
6. [Page Layouts](#page-layouts)
7. [Animations & Interactions](#animations--interactions)
8. [Responsive Design](#responsive-design)
9. [Assets & Icons](#assets--icons)

---

## Brand Identity

### Brand Name
**WEBFIXUS** - A digital agency focused on AI-powered growth engines, web development, and creative solutions.

### Brand Values
- **Technical Excellence**: Precision in code and creativity
- **Growth-Focused**: AI-powered solutions for scaling brands
- **Innovation**: Cutting-edge design and development
- **Collaboration**: End-to-end digital ecosystem creation

---

## Color Palette

### Primary Colors
```css
--base-100: #e5efe1    /* Light cream/off-white - Primary background */
--base-200: #D3E4CD    /* Light sage green - Secondary background */
--base-300: #0a0a0a    /* Near black - Primary text */
--base-400: #1a1a1a    /* Dark gray - Secondary text */
```

### Accent Colors
```css
--accent-1: #99A799    /* Muted sage green - Primary accent */
--accent-2: #ADC2A9    /* Light sage green - Secondary accent */
--accent-3: #D3E4CD    /* Very light sage - Tertiary accent */
```

### Additional Colors
```css
--base-secondary-dark: #ADC2A9     /* Dark sage variant */
--base-secondary-fade: rgba(254, 245, 237, 0.15)  /* Fade overlay */
```

### Color Usage
- **Backgrounds**: `--base-100` for light sections, `--base-300` for dark sections
- **Text**: `--base-300` for primary text, `--base-100` for text on dark backgrounds
- **Accents**: Used for highlights, buttons, and interactive elements
- **Keywords**: Different accent colors for animated text highlights

---

## Typography

### Font Families

#### Primary Font: Host Grotesk
- **Usage**: Body text, paragraphs, general content
- **Weights**: 300-800 (variable font)
- **Style**: Modern, clean, highly readable

#### Headings Font: Barlow Condensed
- **Usage**: All headings (h1, h2, h3, h4)
- **Weight**: 900 (bold)
- **Style**: Condensed, uppercase, impactful
- **Transform**: Always uppercase

#### Monospace Font: DM Mono
- **Usage**: Code, labels, technical text
- **Weight**: 300, 400, 500
- **Style**: Monospace, technical feel
- **Transform**: Uppercase for labels

#### Serif Font: Instrument Serif
- **Usage**: Special paragraphs (p.md class)
- **Weight**: 400, 500, 600
- **Style**: Elegant, readable serif

### Typography Scale

#### Desktop
```css
h1: 12rem     /* Hero headlines */
h2: 8rem      /* Section headlines */
h3: 6rem      /* Subsection headlines */
h4: 2.5rem    /* Small headlines */
p: 1.1rem     /* Body text */
p.md: 1.3rem  /* Medium paragraphs */
p.lg: 1.5rem  /* Large paragraphs */
p.mono: 0.85rem /* Monospace labels */
```

#### Mobile (≤1000px)
```css
h1: 6rem      /* Reduced hero headlines */
h2: 5rem      /* Reduced section headlines */
h3: 3rem      /* Reduced subsection headlines */
p: 1rem       /* Reduced body text */
p.md: 1.125rem /* Reduced medium paragraphs */
p.lg: 1.25rem /* Reduced large paragraphs */
p.mono: 0.8rem /* Reduced monospace labels */
```

#### MacBook Screens (1001px-1440px)
```css
/* About page paragraphs specifically */
p: 1.8rem     /* Optimized for MacBook screens */
```

### Typography Properties
- **Line Height**: 0.85 for headings, 1.2-1.7 for paragraphs
- **Letter Spacing**: -0.02rem for headings
- **Text Transform**: Uppercase for headings and mono text
- **Font Weight**: 900 for headings, 500 for mono, variable for body

---

## Layout & Spacing

### Container System
```css
.container {
  width: 100%;
  height: 100%;
  padding: 2.75rem;        /* Desktop */
  max-width: 2000px;
  margin: 0 auto;
}

/* Mobile containers */
.container {
  padding: 2rem;           /* Mobile */
}
```

### Grid System
- **Full Viewport Sections**: `100vw` width, `100svh` height
- **Flexbox Layouts**: Centered content with flexible spacing
- **Symbol Containers**: Fixed height of `1.125rem` with `0.5rem` gaps

### Spacing Scale
- **Small**: 0.5rem, 1rem
- **Medium**: 1.5rem, 2rem, 2.75rem
- **Large**: 4rem, 6rem, 8rem
- **Extra Large**: 12rem+ for section spacing

---

## Components

### Navigation Menu

#### Menu Header
- **Background**: Transparent
- **Logo**: White SVG logo
- **Actions**: Calendly button + hamburger menu
- **Position**: Fixed top, full width

#### Menu Overlay
- **Background**: `--base-300` (dark)
- **Animation**: Scale transform from top
- **Navigation Links**: Large Barlow Condensed text (5rem)
- **Footer**: Social links + time display

#### Hamburger Icon
- **Size**: 20px × 25px
- **Lines**: 2px height, 20px width
- **Color**: `--base-100` (white)
- **Animation**: Rotate to X on open

### Buttons

#### Primary Button
- **Background**: `--base-300` (dark)
- **Text**: `--base-100` (white)
- **Font**: Barlow Condensed, uppercase
- **Padding**: Custom based on content
- **Hover**: Scale transform (1.02)

#### Calendly Button
- **Icon**: Calendar SVG (20px × 20px)
- **Style**: Circular, transparent background
- **Hover**: Scale transform
- **Function**: Opens Calendly popup

### Cards

#### Hero Cards
- **Layout**: 3-column grid
- **Content**: Plan/Design/Develop with numbers
- **Animation**: Flip effect on hover
- **Typography**: Mono labels

#### Service Cards
- **Background**: Gradient with glassmorphism
- **Border**: 1px solid with accent color
- **Border Radius**: 24px
- **Padding**: 4rem
- **Backdrop Filter**: Blur(20px)

#### Gallery Cards
- **Image**: Full cover with aspect ratio
- **Content**: Overlay with mono labels
- **Animation**: Sticky scroll effects

### Symbol System
- **Size**: 1.125rem × 1.125rem
- **Variants**: s1, s2, s3 (dark/light versions)
- **Usage**: Decorative elements, section dividers
- **Layout**: Flexbox with 0.5rem gaps

---

## Page Layouts

### Home Page (index.html)

#### Hero Section
- **Background**: `--base-100` (light)
- **Content**: Main headline + description + CTA
- **Cards**: 3-step process cards (Plan/Design/Develop)
- **Symbols**: Dark symbols on light background

#### About Section
- **Background**: `--base-300` (dark)
- **Content**: Company description + stats
- **Cards**: Service cards with glassmorphism
- **Text**: White text on dark background

#### Services Section
- **Background**: `--base-100` (light)
- **Content**: Service grid with descriptions
- **Cards**: Individual service cards
- **Symbols**: Dark symbols

#### Spotlight Section
- **Background**: `--base-300` (dark)
- **Content**: Portfolio showcase
- **Images**: Grid layout with spotlight banner
- **Text**: White text with accent highlights

### About Page (about.html)

#### Hero Section
- **Background**: Full-width image
- **Overlay**: Dark overlay with text
- **Content**: "The Alchemist Behind It" headline
- **Image**: Hero image with object-fit cover

#### Animated Text Section
- **Background**: `--base-100` (light)
- **Content**: Company description with keyword highlights
- **Animation**: Scroll-triggered word reveals
- **Keywords**: Color-coded backgrounds (accent-1, accent-2, accent-3)
- **Typography**: Large paragraphs (2.2rem desktop, 1.8rem MacBook, 1rem mobile)

#### Skills Section
- **Background**: `--base-300` (dark)
- **Content**: Skills showcase with interactive elements
- **Layout**: Two-column with symbols and content
- **Text**: White text on dark background

#### Team Gallery
- **Background**: `--base-100` (light)
- **Content**: Team member cards
- **Layout**: Sticky scroll gallery
- **Images**: Gallery images with labels

### Contact Page (contact.html)

#### Contact Section
- **Background**: `--base-300` (dark)
- **Layout**: Split layout (text left, calendar right)
- **Content**: Email + headline + Calendly widget
- **Calendar**: Inline Calendly widget with custom colors
- **Text**: White text on dark background

### Services Page (services.html)

#### Hero Section
- **Background**: `--base-100` (light)
- **Content**: Services headline + description
- **Typography**: Large headlines with centered text

#### Services Grid
- **Background**: `--base-300` (dark)
- **Content**: Service cards with glassmorphism
- **Layout**: Grid with individual service sections
- **Cards**: Gradient backgrounds with borders

### Work Page (work.html)

#### Work Section
- **Background**: `--base-100` (light)
- **Content**: Portfolio slider/carousel
- **Images**: Work showcase images
- **Navigation**: Slider controls

### Project Page (project.html)

#### Project Header
- **Background**: `--base-100` (light)
- **Content**: Project title + metadata
- **Layout**: Structured project information

#### Project Content
- **Background**: `--base-300` (dark)
- **Content**: Project details + images
- **Images**: Project showcase gallery
- **Text**: White text on dark background

---

## Animations & Interactions

### Page Transitions

#### Transition Overlay System
```css
.transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
}

.transition-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--base-300);
  transform: scaleY(0);
  transform-origin: top;
}

.transition-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
```

**Animation Sequence:**
1. **Entry**: Overlay scales from top (0 to 1)
2. **Logo Fade**: Logo fades in during transition
3. **Exit**: Overlay scales back to 0
4. **Duration**: ~800ms total

**Usage:**
```html
<div class="transition">
  <div class="transition-overlay overlay"></div>
  <div class="transition-logo">
    <img src="./global/logo-white.svg" alt="Logo" />
  </div>
</div>
```

### Scroll Animations

#### Line Reveal Animation
**Purpose**: Reveals headlines character by character from left to right

```css
[data-animate-type="line-reveal"] {
  overflow: hidden;
}

[data-animate-type="line-reveal"] .char {
  display: inline-block;
  transform: translateY(100%);
  opacity: 0;
}
```

**JavaScript Implementation:**
```javascript
// Split text into characters
const chars = element.textContent.split('');
element.innerHTML = chars.map(char => 
  `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
).join('');

// Animate each character
gsap.fromTo(element.querySelectorAll('.char'), 
  { y: '100%', opacity: 0 },
  { 
    y: '0%', 
    opacity: 1, 
    duration: 0.6, 
    stagger: 0.02,
    ease: 'power2.out'
  }
);
```

**Usage:**
```html
<h2 data-animate-type="line-reveal" data-animate-delay="0.25">
  Your Headline Here
</h2>
```

#### Scramble Text Animation
**Purpose**: Creates typewriter/scramble effect for mono text

```css
[data-animate-type="scramble"] {
  font-family: "DM Mono";
  text-transform: uppercase;
}
```

**JavaScript Implementation:**
```javascript
const scrambleText = (element, duration = 2000) => {
  const originalText = element.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  
  let scrambleInterval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map(char => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])
      .join('');
  }, 50);
  
  setTimeout(() => {
    clearInterval(scrambleInterval);
    element.textContent = originalText;
  }, duration);
};
```

**Usage:**
```html
<p class="mono" data-animate-type="scramble" data-animate-delay="0.2">
  <span>&#9654;</span> Scrambled Text
</p>
```

#### Keyword Highlight Animation
**Purpose**: Highlights important words with colored backgrounds during scroll

```css
.anime-text-container .anime-text .word span.keyword::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 1rem);
  height: calc(100% + 0.1rem);
  background-color: var(--accent-1);
  border-radius: 8px;
  z-index: -1;
  opacity: var(--bg-opacity, 0);
  transition: opacity 0.3s ease;
}
```

**JavaScript Implementation:**
```javascript
// Scroll-triggered keyword highlighting
ScrollTrigger.create({
  trigger: container,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    const progress = self.progress;
    const words = container.querySelectorAll('.word');
    
    words.forEach((word, index) => {
      const wordProgress = Math.min(1, (progress * words.length - index) / 2);
      const backgroundOpacity = Math.max(0, Math.min(1, wordProgress));
      
      word.style.setProperty('--bg-opacity', backgroundOpacity);
    });
  }
});
```

**Usage:**
```html
<div class="anime-text">
  <p>
    This is a <span class="keyword corner">highlighted</span> word 
    with <span class="keyword scroll">animation</span>.
  </p>
</div>
```

#### Sticky Scroll Elements
**Purpose**: Elements that stick during scroll for visual impact

```css
.sticky-element {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 1;
}

.sticky-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**JavaScript Implementation:**
```javascript
ScrollTrigger.create({
  trigger: '.sticky-container',
  pin: '.sticky-element',
  start: 'top top',
  end: '+=200%',
  pinSpacing: false
});
```

### Hover Effects

#### Button Scale Hover
```css
.button {
  transition: transform 0.2s ease;
  cursor: pointer;
}

.button:hover {
  transform: scale(1.02);
}
```

#### Card Flip Animation
```css
.card {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card:hover {
  transform: rotateY(180deg);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

#### Menu Text Slide Effect
```css
.menu-nav a {
  position: relative;
  overflow: hidden;
}

.menu-nav a::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.menu-nav a:hover::before {
  transform: translateY(0);
}
```

### Advanced Scroll Animations

#### Parallax Scrolling
```javascript
// Parallax effect for background elements
gsap.to('.parallax-bg', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

#### Progressive Image Reveal
```css
.reveal-image {
  opacity: 0;
  transform: scale(1.1);
  transition: all 0.8s ease;
}

.reveal-image.visible {
  opacity: 1;
  transform: scale(1);
}
```

```javascript
// Intersection Observer for image reveals
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-image').forEach(img => {
  imageObserver.observe(img);
});
```

#### Text Typewriter Effect
```javascript
const typewriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';
  
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};
```

### Animation Timing & Easing

#### Easing Functions
```css
/* CSS Easing */
.ease-in-out { transition-timing-function: ease-in-out; }
.ease-out { transition-timing-function: ease-out; }
.ease-in { transition-timing-function: ease-in; }
.custom-bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
```

```javascript
// GSAP Easing
gsap.to(element, { 
  x: 100, 
  duration: 1, 
  ease: 'power2.out'        // Smooth deceleration
});

gsap.to(element, { 
  x: 100, 
  duration: 1, 
  ease: 'back.out(1.7)'     // Overshoot effect
});

gsap.to(element, { 
  x: 100, 
  duration: 1, 
  ease: 'elastic.out(1, 0.3)' // Elastic bounce
});
```

#### Animation Delays
```css
/* Staggered animations */
.animate-item:nth-child(1) { animation-delay: 0.1s; }
.animate-item:nth-child(2) { animation-delay: 0.2s; }
.animate-item:nth-child(3) { animation-delay: 0.3s; }
```

```javascript
// GSAP Stagger
gsap.fromTo('.animate-item', 
  { opacity: 0, y: 50 },
  { 
    opacity: 1, 
    y: 0, 
    duration: 0.6, 
    stagger: 0.1,  // 0.1s delay between each element
    ease: 'power2.out'
  }
);
```

### Performance Optimization

#### Will-Change Property
```css
.animated-element {
  will-change: transform, opacity;
  /* Remove will-change after animation completes */
}

.animated-element.animation-complete {
  will-change: auto;
}
```

#### GPU Acceleration
```css
.gpu-accelerated {
  transform: translateZ(0);
  /* or */
  transform: translate3d(0, 0, 0);
}
```

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Utilities

#### Reusable Animation Classes
```css
/* Fade animations */
.fade-in { opacity: 0; }
.fade-in.visible { opacity: 1; transition: opacity 0.6s ease; }

/* Slide animations */
.slide-up { transform: translateY(50px); opacity: 0; }
.slide-up.visible { transform: translateY(0); opacity: 1; transition: all 0.6s ease; }

/* Scale animations */
.scale-in { transform: scale(0.8); opacity: 0; }
.scale-in.visible { transform: scale(1); opacity: 1; transition: all 0.6s ease; }
```

#### JavaScript Animation Helpers
```javascript
// Reusable animation functions
const animateOnScroll = (selector, animationClass = 'visible') => {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

// Usage
animateOnScroll('.fade-in');
animateOnScroll('.slide-up');
```

### Animation Best Practices

1. **Performance**: Use `transform` and `opacity` for smooth 60fps animations
2. **Accessibility**: Respect `prefers-reduced-motion` setting
3. **Timing**: Keep animations under 300ms for UI interactions
4. **Easing**: Use appropriate easing functions for natural motion
5. **Staggering**: Use staggered animations for multiple elements
6. **Cleanup**: Remove event listeners and observers when components unmount
7. **Testing**: Test animations on various devices and connection speeds

---

## Responsive Design

### Breakpoints
- **Mobile**: ≤1000px
- **MacBook**: 1001px-1440px
- **Desktop**: 1441px+

### Mobile Adaptations
- **Typography**: Reduced font sizes across all elements
- **Layout**: Stacked layouts, full-width elements
- **Spacing**: Reduced padding and margins
- **Images**: Responsive sizing with object-fit cover
- **Navigation**: Hamburger menu overlay

### MacBook Optimizations
- **About Page**: Specific font size (1.8rem) for better readability
- **Layout**: Optimized for MacBook screen dimensions
- **Typography**: Balanced sizing for MacBook viewport

---

## Assets & Icons

### Logo System
- **Primary Logo**: `logo-white.svg` (white version)
- **Favicon**: `favicon-32x32.png`
- **Site Icon**: `site-icon.png`

### Symbol System
- **s1-dark.png**: Dark variant symbol 1
- **s1-light.png**: Light variant symbol 1
- **s2-dark.png**: Dark variant symbol 2
- **s2-light.png**: Light variant symbol 2
- **s3-dark.png**: Dark variant symbol 3
- **s3-light.png**: Light variant symbol 3

### Image Assets
- **Hero Images**: `about-hero-img.jpg`
- **Gallery Images**: `gallery-img-1.jpg` through `gallery-img-6.jpg`
- **Project Images**: `project-img-1.jpg` through `project-img-4.jpg`
- **Work Images**: `slider-img-1.jpg` through `slider-img-4.jpg`
- **Spotlight Images**: `spotlight-img-1.jpg` through `spotlight-img-9.jpg`
- **Spotlight Banner**: `spotlight-banner.jpg`

### Icons
- **Calendar Icon**: SVG for Calendly button
- **Arrow Icons**: `footer-right-arrow.png`
- **Mask Elements**: `spotlight-mask.svg`

---

## Technical Implementation

### CSS Architecture
- **Global Styles**: `globals.css` - Base styles, variables, typography
- **Component Styles**: Individual CSS files per page/component
- **Responsive**: Mobile-first approach with media queries
- **Custom Properties**: CSS variables for consistent theming

### JavaScript Libraries
- **GSAP**: Animation library for complex animations
- **ScrollTrigger**: GSAP plugin for scroll-based animations
- **SplitText**: GSAP plugin for text animations
- **Lenis**: Smooth scroll library
- **Calendly**: External widget for scheduling

### Build System
- **Vite**: Build tool and development server
- **Multi-page**: Separate HTML files for each page
- **Asset Optimization**: Image optimization and bundling
- **Vercel Deployment**: Configured for Vercel hosting

---

## Usage Guidelines

### Color Usage
- Use `--base-100` for light backgrounds and dark text
- Use `--base-300` for dark backgrounds and light text
- Use accent colors sparingly for highlights and CTAs
- Maintain sufficient contrast ratios for accessibility

### Typography
- Use Barlow Condensed for all headings
- Use Host Grotesk for body text
- Use DM Mono for technical labels and code
- Use Instrument Serif for special emphasis

### Layout
- Maintain consistent container padding
- Use the symbol system for visual breaks
- Implement proper responsive behavior
- Follow the established spacing scale

### Animations
- Keep animations smooth and purposeful
- Use scroll triggers for content reveals
- Implement hover states for interactive elements
- Ensure animations don't interfere with usability

---

*This design system documentation serves as the single source of truth for all design decisions and implementations across the WEBFIXUS website.*
