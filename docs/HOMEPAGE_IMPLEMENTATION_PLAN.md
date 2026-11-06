# JAIN JEWELLERS
## Homepage Implementation Master Plan

**Project:** Jain Jewellers — Premium Jewellery E-commerce Frontend  
**Version:** 1.0  
**Scope:** Homepage Only  
**Framework:** Next.js App Router  
**Language:** JavaScript  
**Styling:** Tailwind CSS + Custom CSS  
**Animations:** GSAP + ScrollTrigger + CSS Transitions  
**Data Source:** Local Mock JSON Data  
**Development Environment:** Google Antigravity

---

# 1. Project Overview

Jain Jewellers is a premium Indian jewellery brand website designed to deliver a modern, elegant and luxurious online shopping experience.

The homepage will showcase jewellery collections, categories, brand promises, customer experiences, promotional campaigns and shopping opportunities.

The website should combine traditional Indian jewellery aesthetics with modern luxury e-commerce usability.

### Project Objective

- Build a premium, visually attractive jewellery homepage.
- Establish a consistent brand identity.
- Showcase jewellery products and collections.
- Provide smooth navigation and shopping-oriented interactions.
- Deliver an excellent desktop and mobile experience.
- Create reusable components for future development.
- Keep the frontend architecture ready for future backend and admin integration.

### Current Development Scope

INCLUDED:
- Customer-facing homepage.
- Navigation and category menu.
- Campaign slider.
- Jewellery categories and product cards.
- Wishlist and cart UI interactions.
- Brand storytelling and trust sections.
- Testimonials and store experience.
- Responsive layouts.
- Mock JSON data.

NOT INCLUDED:
- Admin dashboard.
- Backend development.
- Database integration.
- Payment gateway.
- Real authentication.
- Order management backend.

All product and content data will initially come from local JSON files.

---

# 2. Brand Identity & Design System

## Brand Name
Jain Jewellers

## Design Direction
Royal Indian Luxury — Modern Minimalism.

The design should feel:
- Premium.
- Elegant.
- Trustworthy.
- Minimal.
- Sophisticated.
- Modern yet culturally connected.

## Primary Colour Palette

| Colour | Hex Code | Usage |
|---|---|---|
| Royal Burgundy | #8A0201 | Primary brand colour |
| Dark Burgundy | #650100 | Hover and active states |
| Metallic Gold | #D99506 | Luxury accents |
| Light Gold | #F6B621 | Highlights |
| White | #FFFFFF | Main background |
| Ivory | #FAF8F4 | Section backgrounds |
| Champagne | #F2E8D8 | Soft backgrounds |
| Charcoal | #292321 | Headings |
| Muted Text | #77716D | Descriptions |
| Soft Border | #E8E1D8 | Dividers and borders |

## Typography

Heading Font: Playfair Display  
Body Font: Lato or Inter

Use serif typography for elegant headings and sans-serif typography for readable navigation, product information and descriptions.

## Design Rules

1. Maintain consistent colours throughout the website.
2. Use gold as an accent, not as the dominant background colour.
3. Maintain sufficient whitespace.
4. Prioritize jewellery photography over decorative UI.
5. Avoid unnecessary borders, shadows and gradients.
6. Use consistent spacing, typography and border radius.
7. Keep all layouts responsive.
8. Maintain accessibility and sufficient text contrast.

---

# 3. Homepage Structure

The homepage must follow this exact section order.

## SECTION 01 — Main Navigation Bar

Elements:
- Jain Jewellers logo.
- Search bar.
- Sign In.
- Wishlist / Favourite.
- My Cart.

Requirements:
- Premium white header.
- Sticky navigation behaviour.
- Burgundy icons.
- Champagne bottom border.
- Search interaction.
- Wishlist and cart count indicators.

## SECTION 02 — Category Navigation

Categories:
- All Jewellery
- What's Trending
- Gold
- Diamond
- Silver
- Coins
- Collections
- About Us

Requirements:
- Separate navigation component.
- Elegant typography.
- Smooth hover effects.
- Dropdown or mega-menu where appropriate.
- Responsive mobile navigation.

## SECTION 03 — Hero Campaign Slider

Purpose:
Showcase premium jewellery campaigns and brand identity.

Features:
- Large editorial campaign images.
- Multiple campaign slides.
- Smooth transitions.
- Navigation arrows and pagination.
- Campaign title and CTA.
- Responsive image handling.

Special Feature:
Use the custom jewellery assembly animation sequence as a signature hero experience when its assets are ready.

The animation should visually progress from individual jewellery components to an assembled bridal jewellery set and finally a bridal reveal.

## SECTION 04 — Find Your Perfect Match

Purpose:
Help visitors discover jewellery based on their preferences.

Features:
- Attractive visual cards.
- Jewellery preference options.
- Smooth card hover interactions.
- Clear navigation or CTA.

## SECTION 05 — Shop by Category

Categories:
- Earrings
- Jewellery Sets
- Chains
- Bracelets
- Pendants
- Rings
- Mangalsutra
- Explore More Categories

Requirements:
- Category image cards.
- Consistent aspect ratios.
- Elegant category labels.
- Interactive hover states.

## SECTION 06 — Jain Promises

Purpose:
Build customer trust.

Potential highlights:
- Certified Jewellery.
- Quality Assurance.
- Transparent Pricing.
- Trusted Craftsmanship.
- Customer Support.

Use elegant icons, short descriptions and gold accents.

## SECTION 07 — Diamond Jewellery

Purpose:
Showcase the diamond jewellery collection.

Features:
- Premium campaign visual.
- Selected diamond products.
- Collection CTA.
- Editorial layout.

## SECTION 08 — Shop by Gender

Categories:
- Women
- Men
- Kids

Features:
- Large visual cards.
- Premium lifestyle photography.
- Interactive hover animations.

## SECTION 09 — Explore Jewellery

Purpose:
Show selected jewellery products.

Features:
- Product cards.
- Product images.
- Product names.
- Prices.
- Wishlist button.
- Quick View or product-detail navigation where implemented.

## SECTION 10 — Explore Our Range

Two main areas:

### Shop by Metal
- Gold
- Diamond
- Silver
- Daily Wear

### Jain World
- Brand collections.
- Jewellery stories.
- Special ranges.

Use editorial image layouts and attractive CTAs.

## SECTION 11 — Gifting & More

Purpose:
Showcase jewellery gifting opportunities.

Features:
- Occasion-based campaigns.
- Gift collection cards.
- CTA for exploring gifting products.

## SECTION 12 — Bridal Collection

Purpose:
Showcase premium bridal jewellery.

Features:
- Large bridal campaign photography.
- Premium editorial content.
- Bridal collection cards.
- Explore Collection CTA.

## SECTION 13 — Discover Our Collection

Purpose:
Showcase curated collections.

Features:
- Multiple collection cards.
- Consistent visual hierarchy.
- Smooth transitions.
- Collection exploration CTA.

## SECTION 14 — Shop by Budget

Purpose:
Help users find jewellery according to budget.

Budget ranges will be configurable through mock data.

Features:
- Budget-based cards.
- Clear price ranges.
- Smooth hover effects.
- Navigation to relevant collection.

## SECTION 15 — Customer Testimonials

Purpose:
Build brand credibility.

Features:
- Customer feedback cards.
- Customer names.
- Review descriptions.
- Optional rating indicators.
- Smooth testimonial carousel.

Only use sample/demo testimonials until verified customer reviews are available.

## SECTION 16 — Jain Experience

Purpose:
Communicate the brand's customer experience.

Features:
- Jewellery craftsmanship.
- Personal shopping experience.
- Customer service.
- Brand storytelling.
- Premium campaign imagery.

## SECTION 17 — Store & Customer Services

Include:

1. Visit Our Store.
2. Book an Appointment.
3. Talk to an Expert.
4. Digital Gold.
5. Blogs.
6. Jewellery Guide.

Each item should have a dedicated visual card and clear CTA.

## SECTION 18 — Footer

Include:
- Brand logo.
- Brand description.
- Quick Links.
- Jewellery Categories.
- Customer Support.
- Contact Information.
- Social Media Links.
- Legal Links.
- Copyright information.

Design:
- Burgundy background.
- White typography.
- Gold accents.
- Responsive multi-column layout.

---

# 4. Animation & Interaction Strategy

## Core Animation Philosophy

Every homepage section and card should feel smooth, polished and premium.

Animations must improve the shopping experience rather than distract from the jewellery.

The website should have a consistent motion language.

### A. Global Animations

- Smooth page entrance.
- Subtle section reveal on scroll.
- Smooth hover transitions.
- Elegant button interactions.
- Image reveal effects.
- Consistent easing and timing.
- No unnecessary bouncing or aggressive motion.

### B. Card Animations

All relevant category, product, campaign, collection and service cards should have polished interactions.

Examples:
- Image scale on hover.
- Slight card elevation.
- Smooth image transition.
- Subtle overlay reveal.
- Text fade or slide.
- Wishlist icon interaction.
- CTA reveal where appropriate.

Avoid applying the exact same animation to every card. Use variations according to the component's purpose.

### C. Scroll Animations

Use GSAP and ScrollTrigger for:

- Section reveal animations.
- Staggered card entrance.
- Image reveal.
- Text entrance.
- Horizontal scrolling sections where useful.
- Scroll-linked campaign transitions.
- Pinned storytelling sections where appropriate.

Animations should trigger at meaningful scroll positions and should not interfere with normal scrolling.

### D. Hero Jewellery Assembly Animation

Use the prepared jewellery image sequence as a special scroll-driven animation.

Expected sequence:

1. Individual jewellery components.
2. Components begin assembling.
3. Necklace takes shape.
4. Matching earrings and maang tikka appear.
5. Complete bridal jewellery set.
6. Final bridal reveal.

Implementation:
- Canvas-based image sequence.
- GSAP ScrollTrigger.
- Preloaded and optimized WebP/AVIF frames.
- Responsive canvas sizing.
- Progressive frame loading.
- Reduced-motion fallback.

### E. Button Animations

- Smooth colour transition.
- Subtle background or underline effect.
- Clear hover and focus states.
- No excessive animation.

### F. Loading & Entrance Effects

- Avoid blank or flashing content.
- Use lightweight skeletons only where useful.
- Animate content after it becomes ready.
- Prevent layout shifts.

### Animation Performance Rules

1. Prefer transform and opacity animations.
2. Avoid unnecessary layout-triggering animations.
3. Do not animate every element simultaneously.
4. Keep scroll interactions responsive.
5. Clean up GSAP ScrollTriggers on component unmount.
6. Respect prefers-reduced-motion.
7. Avoid loading the complete high-resolution animation sequence immediately.
8. Test animations on mobile devices.
9. Maintain smooth scrolling without locking the user unnecessarily.
10. Prioritize real device performance over visual complexity.

---

# 5. Technical Architecture

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js App Router | Application framework |
| React | UI components |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| Custom CSS | Brand-specific design |
| GSAP | Advanced animations |
| GSAP ScrollTrigger | Scroll-driven effects |
| Lucide React | Icons |
| Local JSON | Mock data |
| React Context | Cart and wishlist state |

## Recommended Folder Structure

src/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── MainNavbar.jsx
│   │   ├── CategoryNavbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── CampaignSlider.jsx
│   │   ├── FindYourMatch.jsx
│   │   ├── ShopByCategory.jsx
│   │   ├── JainPromises.jsx
│   │   ├── DiamondCollection.jsx
│   │   ├── ShopByGender.jsx
│   │   ├── ExploreJewellery.jsx
│   │   ├── ExploreOurRange.jsx
│   │   ├── GiftingSection.jsx
│   │   ├── BridalCollection.jsx
│   │   ├── DiscoverCollection.jsx
│   │   ├── ShopByBudget.jsx
│   │   ├── Testimonials.jsx
│   │   ├── JainExperience.jsx
│   │   └── StoreServices.jsx
│   │
│   ├── ui/
│   │   ├── SectionHeading.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── CampaignCard.jsx
│   │   ├── CollectionCard.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── PrimaryButton.jsx
│   │   └── SectionReveal.jsx
│   │
│   └── animations/
│       ├── ScrollReveal.jsx
│       └── JewellerySequence.jsx
│
├── context/
│   ├── CartContext.jsx
│   └── WishlistContext.jsx
│
├── data/
│   ├── mock_data.json
│   ├── categories.json
│   ├── banners.json
│   ├── collections.json
│   ├── testimonials.json
│   └── services.json
│
├── hooks/
│   └── useScrollAnimation.js
│
└── utils/
    └── productHelpers.js

Note: Create components and folders progressively. Do not generate all files before their implementation phase.

---

# 6. Mock Data Strategy

All homepage content should come from structured local JSON files wherever practical.

Product data may contain:

- id
- slug
- name
- category
- type
- price
- material
- purity
- weight
- images
- featured
- newArrival
- inStock
- tags

Campaign data:
- id
- title
- subtitle
- desktopImage
- mobileImage
- ctaLabel
- ctaLink

Category data:
- id
- name
- image
- slug
- description

Testimonial data:
- id
- customerName
- review
- rating

Do not hardcode repeated product and campaign content inside individual UI components.

---

# 7. Responsive Design

The homepage must work across:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Requirements:
- Responsive navigation.
- Mobile menu.
- Responsive campaign images.
- Adaptive product grids.
- Touch-friendly interactions.
- Mobile-friendly carousels.
- Proper spacing and typography.
- No horizontal overflow.
- Optimized images for each viewport.

---

# 8. Development Phases

Implementation must follow these phases in order.

## PHASE 01 — Project Audit & Design Foundation

- Verify Next.js project.
- Verify Tailwind CSS.
- Install required dependencies.
- Add brand fonts.
- Configure global design tokens.
- Create base UI styles.
- Establish folder architecture.
- Configure reusable container and spacing rules.

## PHASE 02 — Header & Navigation

- Main Navbar.
- Category Navbar.
- Search UI.
- Sign-in UI placeholder.
- Wishlist and cart icons.
- Responsive mobile navigation.
- Sticky behaviour.

## PHASE 03 — Hero Campaign

- Campaign slider.
- Campaign content.
- Responsive image handling.
- Navigation controls.
- Hero entrance animation.

## PHASE 04 — Core Shopping Sections

- Find Your Perfect Match.
- Shop by Category.
- Jain Promises.
- Diamond Jewellery.
- Shop by Gender.
- Explore Jewellery.

## PHASE 05 — Brand Storytelling Sections

- Explore Our Range.
- Gifting & More.
- Bridal Collection.
- Discover Our Collection.
- Jain Experience.

## PHASE 06 — Shopping Discovery & Trust

- Shop by Budget.
- Customer Testimonials.
- Store Services.

## PHASE 07 — Footer

- Footer columns.
- Social links.
- Contact and support information.
- Responsive footer.

## PHASE 08 — Animation Enhancement

- GSAP setup.
- ScrollTrigger integration.
- Card hover animations.
- Section reveal animations.
- Staggered animations.
- Hero scroll sequence.
- Performance optimization.

## PHASE 09 — Functional Interactions

- Cart state.
- Wishlist state.
- Search interaction.
- Campaign slider controls.
- Product quick view where appropriate.
- Navigation interactions.

## PHASE 10 — Testing & Final Polish

- Responsive testing.
- Animation testing.
- Console error checks.
- Image optimization.
- Accessibility checks.
- Performance checks.
- Final homepage review.

---

# 9. AI Agent Development Rules

These rules must be followed whenever an AI coding agent works on this project.

1. Always read this implementation plan before making major changes.
2. Work on one implementation phase at a time.
3. Never redesign the approved homepage structure without permission.
4. Follow the official brand colour palette.
5. Reuse existing components instead of creating duplicates.
6. Use JavaScript, not TypeScript.
7. Use local JSON mock data.
8. Do not introduce backend functionality.
9. Do not build an admin panel.
10. Use responsive layouts.
11. Every relevant card must have polished interactions.
12. Use GSAP and ScrollTrigger for advanced scroll-based animations.
13. Avoid excessive animations that harm usability.
14. Do not install unnecessary dependencies.
15. Inspect the existing code before modifying it.
16. Do not overwrite working components without a reason.
17. After every phase, run the application and inspect the browser.
18. Fix errors before moving to the next phase.
19. Keep components reusable and maintainable.
20. Update this plan if an approved architectural decision changes.

---

# 10. Definition of Done

The homepage will be considered complete when:

- All approved sections are implemented in the correct order.
- Brand identity is consistent throughout.
- Navigation and UI interactions work.
- Product cards render from mock data.
- Wishlist and cart interactions work locally.
- All relevant cards have smooth interactions.
- Scroll animations work correctly.
- Hero campaign animation works or has a suitable fallback.
- Desktop and mobile layouts are polished.
- No critical console errors remain.
- Images are optimized.
- Accessibility and reduced-motion behaviour are considered.
- The homepage is ready for future backend integration.

---

# FINAL PROJECT PRINCIPLE

Build Jain Jewellers as a premium, product-first Indian jewellery experience.

The priority is not simply to create a website with many sections. The priority is to create a cohesive luxury brand experience with excellent usability, elegant visual storytelling, high-quality jewellery presentation and smooth, purposeful animations.

**One phase at a time. One reusable component at a time. Test before moving forward.**