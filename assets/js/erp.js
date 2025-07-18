document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP or ScrollTrigger is not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- 1. HERO ENTRANCE ANIMATION ---
    // This animation runs once on page load and WILL NOT be interfered with.
    // The button is guaranteed to appear and stay.
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.out' } });

    tl.from(".anim-title", { opacity: 0, y: 50, delay: 0.2 })
      .from(".anim-text", { opacity: 0, y: 40 }, "-=1") // Overlap for speed
      .from(".hero-video-wrapper", { opacity: 0, y: 100, scale: 0.9 }, "-=1");


    // --- 2. NEW PARALLAX SCROLL ANIMATION ---
    // This is a much simpler and more reliable scroll effect.
    // It does not use "pin", which was the source of the button conflict.

    // Animate the text container to move UP faster as you scroll.
    gsap.to(".hero-text-content", {
        yPercent: -50, // Move up by 50% of its own height
        ease: "none",
        scrollTrigger: {
            trigger: ".erp-hero",
            start: "top top", // Start when the top of the section hits the top of the screen
            end: "bottom top", // End when the bottom of the section leaves the top
            scrub: true // Links animation directly to scrollbar
        }
    });

    // Animate the video container to move UP SLOWER, creating the parallax depth effect.
    gsap.to(".hero-video-wrapper", {
        yPercent: -15, // Move up by only 15%
        ease: "none",
        scrollTrigger: {
            trigger: ".erp-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});






// === APPEND THIS CODE TO YOUR erp.js FILE ===

// --- 3. "WHAT YOU GET" ANIMATION ---
gsap.from(".anim-list-item", {
    duration: 0.8,
    opacity: 0,
    x: -30,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".features-list-section",
        start: "top 70%"
    }
});

// --- 4. VISUAL SHOWCASE TAB FUNCTIONALITY ---
const tabButtons = document.querySelectorAll(".tab-btn");
const tabImages = document.querySelectorAll(".tab-image");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tabId = button.dataset.tab;

        // Handle active state for buttons
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Handle active state for images with a fade
        tabImages.forEach(image => {
            if (image.dataset.tab === tabId) {
                gsap.to(image, { opacity: 1, duration: 0.5 });
                image.classList.add("active");
            } else {
                gsap.to(image, { opacity: 0, duration: 0.5 });
                image.classList.remove("active");
            }
        });
    });
});

// --- 5. WORKFLOW ANIMATION ---
gsap.from(".anim-step", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".workflow-list",
        start: "top 75%"
    }
});


// --- 7. FINAL CTA ANIMATION ---
// This animation is correct and can remain.
gsap.from(".anim-cta", {
    duration: 1.2,
    opacity: 0,
    scale: 0.9,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top 75%",
    }
});