document.addEventListener("DOMContentLoaded", () => {
    // Check for GSAP
    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded.");
        return;
    }

    // --- 1. HERO ENTRANCE ANIMATION ---
    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1
        }
    });

    // Animate heading lines
    tl.from(".anim-heading span", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        delay: 0.2
    });

    // Animate subheading paragraph
    tl.from(".anim-subheading", {
        y: 30,
        opacity: 0
    }, "-=0.7"); // Overlap with previous animation

    // Animate buttons
    tl.from(".anim-buttons", {
        y: 20,
        opacity: 0
    }, "<0.2"); // Start shortly after the paragraph

    // Animate the drone image
    tl.from(".drone-image", {
        x: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1.5
    }, 0); // Start at the beginning of the timeline


    // --- 2. CONTINUOUS FLOATING DRONE ANIMATION ---
    // This runs separately from the main timeline
    gsap.to(".drone-image", {
        y: "-=20", // Move up 20px
        rotation: 2, // Slightly rotate
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1, // Loop forever
        yoyo: true // Go back and forth
    });
});







// --- 5. PARALLAX HOVER EFFECT FOR CARDS WITH IMAGES ---
const imageCards = document.querySelectorAll(".service-card.has-bg-image");

imageCards.forEach(card => {
    // Find the background image within this specific card
    const cardBgImage = card.querySelector(".card-bg-image");

    // Animate on mouse move
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Use GSAP to animate the image's transform property
        gsap.to(cardBgImage, {
            x: -x / 20, // Divide by a number to control the "strength" of the effect
            y: -y / 20,
            scale: 1.1, // A slight zoom adds to the effect
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Reset on mouse leave
    card.addEventListener("mouseleave", () => {
        gsap.to(cardBgImage, {
            x: 0,
            y: 0,
            scale: 1, // Reset scale
            duration: 0.8,
            ease: "elastic.out(1, 0.5)" // A nice bouncy return
        });
    });
});








// === APPEND THIS CODE TO YOUR services.js FILE ===

// --- 6. FEATURES ACCORDION FUNCTIONALITY ---
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    // Set initial state for GSAP animation
    gsap.set(content, { height: 0, opacity: 0 });

    header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all other items first (optional, for a classic accordion)
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains("active")) {
                otherItem.classList.remove("active");
                gsap.to(otherItem.querySelector(".accordion-content"), {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            }
        });

        // Toggle the clicked item
        if (!isActive) {
            item.classList.add("active");
            // Use GSAP's "auto" height to animate to the content's natural height
            gsap.to(content, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            });
        } else {
            item.classList.remove("active");
            gsap.to(content, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        }
    });
});





// === APPEND THIS CODE TO YOUR services.js FILE ===

// --- 7. WEBSITE FEATURES SECTION ANIMATIONS ---

// Animate the feature list items
gsap.from(".anim-feature-li", {
    duration: 0.8,
    opacity: 0,
    x: -30,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".features-list",
        start: "top 80%"
    }
});

// Animate the image slider container
gsap.from(".image-slider-container", {
    duration: 1.2,
    opacity: 0,
    scale: 0.9,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".image-slider-container",
        start: "top 75%"
    }
});


// --- 8. IMAGE SLIDER FUNCTIONALITY ---
const images = gsap.utils.toArray(".slider-img");
let currentIndex = 0;
const transitionDuration = 1; // 1 second fade
const displayDuration = 3; // 3 seconds visible

// Set the first image to be visible immediately
gsap.set(images[0], { opacity: 1 });

function playSlider() {
    gsap.to(images[currentIndex], {
        opacity: 0,
        duration: transitionDuration,
        ease: "power2.inOut"
    });

    // Increment index, looping back to 0 if necessary
    currentIndex = (currentIndex + 1) % images.length;

    gsap.to(images[currentIndex], {
        opacity: 1,
        duration: transitionDuration,
        ease: "power2.inOut"
    });
}

// Set an interval to run the slider
// We use GSAP's delayedCall for better performance and control
gsap.delayedCall(displayDuration, function repeat() {
    playSlider();
    gsap.delayedCall(displayDuration, repeat);
});






// DELETE the old flowchart animation and REPLACE with this

// --- 9. BACKEND "DATA STACK" & ADDONS ANIMATION ---
if (document.querySelector(".backend-section")) {
    const stackTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".backend-section",
            start: "top 60%"
        }
    });

    // Animate the stack layers assembling themselves
    stackTl.from(".stack-layer", {
        duration: 1.2,
        opacity: 0,
        y: 100,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Animate the Add-Ons content right after
    stackTl.from(".addons-content h3, .addons-list li, .backend-footer", {
        duration: 0.8,
        opacity: 0,
        x: -30,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.8"); // Overlap for a smooth transition


    // Add the mouse-move parallax effect for extra depth
    const stackVisual = document.querySelector(".stack-visual");
    stackVisual.addEventListener("mousemove", (e) => {
        const rect = stackVisual.getBoundingClientRect();
        let x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        let y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        gsap.to(".stack-layer", {
            duration: 1,
            rotationY: x * 15, // Tilt on Y-axis
            rotationX: -y * 15 + 45, // Add to the base 45deg tilt
            ease: "power2.out"
        });
    });

    stackVisual.addEventListener("mouseleave", () => {
        gsap.to(".stack-layer", {
            duration: 1,
            rotationY: 0,
            rotationX: 45, // Return to base tilt
            ease: "elastic.out(1, 0.5)"
        });
    });
}




// === APPEND THIS CODE TO YOUR services.js FILE ===

// --- 12. SCROLL ANIMATION FOR PROCESS LIST ---
gsap.from(".process-step", {
    duration: 0.8,
    opacity: 0,
    y: 40,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".process-list",
        start: "top 80%"
    }
});






// DELETE the old "TECH STACK ANIMATION" and REPLACE with this

// --- 13. TECH SLIDER SECTION ANIMATION ---
// We only need to animate the container itself into view.
gsap.from(".tech-slider-container", {
    duration: 1.2,
    opacity: 0,
    y: 50,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".tech-slider-section",
        start: "top 75%"
    }
});


// The CTA animation remains correct
// --- 14. FINAL CTA ANIMATION ---
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
