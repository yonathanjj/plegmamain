document.addEventListener("DOMContentLoaded", () => {
    // First, check if GSAP is loaded. If not, we log an error and stop.
    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded. Animations will not work.");
        return;
    }

    // --- MAIN INTRO ANIMATION ---
    // We use a GSAP timeline to sequence our animations.
    // 'defaults' sets properties that apply to all animations in this timeline.
    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out", // A smooth easing for a modern feel
            duration: 0.8
        }
    });

    // 1. Animate the main card container into view.
    // It scales up and fades in for a gentle arrival.
    tl.to(".contact-section", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut"
    });

    // 2. Animate the staggered content on the left info panel.
    // 'stagger: 0.1' means each element with the class '.anim-stagger' will start its animation 0.1s after the previous one.
    // The '<0.2' timing parameter starts this animation 0.2s after the start of the previous one (the card reveal).
    tl.from(".anim-stagger", {
        y: 30,
        opacity: 0,
        stagger: 0.1
    }, "<0.2");

    // 3. Animate the form elements on the right.
    // We animate them as a group for a clean, flowing effect.
    // The '<0.2' starts this at the same time as the info panel content, making the page feel like it's loading in unison.
    tl.from(".anim-form", {
        x: 30,
        opacity: 0,
        stagger: 0.1
    }, "<0.2");


    // --- ENHANCEMENT: INTERACTIVE SUBMIT BUTTON ---
    // This adds a small, delightful interaction to the submit button using GSAP.

    const submitBtn = document.querySelector(".submit-btn");
    const btnText = document.querySelector(".btn-text");

    if (submitBtn && btnText) {
        // Create a reusable animation for the button text
        let hoverAnimation = gsap.to(btnText, {
            y: -25, // Move the text up
            duration: 0.3,
            ease: "power2.in",
            paused: true // Don't play it immediately
        });

        submitBtn.addEventListener("mouseenter", () => {
            // When the mouse enters, play the animation forward
            hoverAnimation.play();
        });

        submitBtn.addEventListener("mouseleave", () => {
            // When the mouse leaves, reverse the animation
            hoverAnimation.reverse();
        });
    }
});