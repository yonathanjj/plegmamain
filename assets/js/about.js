document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP or ScrollTrigger is not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- 1. HERO SECTION ANIMATION ---
    gsap.from(".anim-hero-heading span", {
        duration: 1,
        y: 60,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
    });

    gsap.from(".anim-hero-p", {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power3.out",
        delay: 0.6
    });

    gsap.from(".anim-hero-cta", {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: "power3.out",
        delay: 0.8
    });


    // --- 2. MISSION & VISION CARD ANIMATIONS ---
    gsap.from(".anim-card", {
        duration: 1,
        opacity: 0,
        y: 60,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".mission-vision-section",
            start: "top 75%",
        }
    });
});






// === APPEND THIS CODE TO YOUR about.js FILE ===

// --- 3. "WHAT WE STAND FOR" GRID ANIMATION ---
gsap.from(".anim-value", {
    duration: 0.8,
    opacity: 0,
    y: 40,
    stagger: 0.1, // A slight delay between each item animating in
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".values-grid",
        start: "top 75%",
    }
});






// === APPEND THIS CODE TO YOUR about.js FILE ===

// --- 4. "OUR PRESENCE" SECTION ANIMATION ---
gsap.from(".anim-location", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".presence-section",
        start: "top 70%",
    }
});

// --- 5. FINAL CTA ANIMATION ---
gsap.from(".anim-cta-final", {
    duration: 1,
    opacity: 0,
    scale: 0.9,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top 75%",
    }
});