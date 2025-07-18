document.addEventListener("DOMContentLoaded", () => {

    // --- 1. LIVE WEBGL GRADIENT (TECH VERSION) ---
    const canvas = document.getElementById('gradient-canvas');
    if (canvas) {
        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error("WebGL not supported, falling back to static background.");
            document.body.style.backgroundColor = "#00000a";
        } else {
            const vertexShaderSource = `attribute vec2 a_position; void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

            // --- NEW "TECH GRID" FRAGMENT SHADER ---
            const fragmentShaderSource = `
                precision highp float;
                uniform vec2 u_resolution;
                uniform float u_time;

                // Noise function from your example
                float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
                float noise(vec2 st) {
                    vec2 i = floor(st); vec2 f = fract(st);
                    float a = random(i); float b = random(i + vec2(1.0, 0.0));
                    float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;
                    st.x *= u_resolution.x / u_resolution.y;

                    // Create the lava lamp noise, but with higher frequency for more detail
                    float n = noise(st * 6.0 + u_time * 0.1);

                    // --- Create the digital grid ---
                    // 'fract' gives us repeating values, 'step' makes sharp lines
                    vec2 grid = step(0.02, fract(st * 30.0));
                    float grid_pattern = 1.0 - min(grid.x, grid.y); // Invert to get lines

                    // --- Define Plegma brand colors ---
                    vec3 color_black = vec3(0.0, 0.0, 0.039);   // #00000a
                    vec3 color_blue = vec3(0.0, 0.0, 1.0);       // #0000ff
                    vec3 color_white = vec3(0.867, 0.867, 1.0);  // #dddfff

                    // Mix the base noise with blue, making it dominant
                    vec3 color = mix(color_black, color_blue, smoothstep(0.3, 0.6, n));

                    // Add bright highlights for a "bloom" effect behind the grid
                    color = mix(color, color_white, smoothstep(0.7, 0.75, n));

                    // Overlay the grid. 'mix' with the grid_pattern darkens where the lines are.
                    color = mix(color, color_black, grid_pattern * 0.5);

                    gl_FragColor = vec4(color, 1.0);
                }
            `;

            // (WebGL Boilerplate - Unchanged and reliable)
            function createShader(gl, type, source) { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { console.error('Shader Error', gl.getShaderInfoLog(shader)); gl.deleteShader(shader); return null; } return shader; }
            function createProgram(gl, vs, fs) { const program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { console.error('Program Error', gl.getProgramInfoLog(program)); gl.deleteProgram(program); return null; } return program; }
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
            const program = createProgram(gl, vertexShader, fragmentShader);
            const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
            const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
            const timeUniformLocation = gl.getUniformLocation(program, "u_time");
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

            function render(time) {
                time *= 0.0005;
                if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); }
                gl.useProgram(program); gl.enableVertexAttribArray(positionAttributeLocation); gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
                gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
                gl.uniform1f(timeUniformLocation, time);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
        }
    }

    // --- 2. JAVASCRIPT-DRIVEN BUTTON FILL EFFECT ---
    const buttons = document.querySelectorAll('.btn-secondary');
    buttons.forEach(button => {
        const ripple = button.querySelector('.btn-ripple');
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Use GSAP for a smooth, high-performance animation
            gsap.set(ripple, {
                // Instantly move the ripple to the cursor's entry point
                left: x,
                top: y,
                width: size,
                height: size,
                scale: 0
            });
            gsap.to(ripple, {
                // Animate the scale to fill the button
                scale: 2,
                duration: 0.6,
                ease: "power3.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            // Animate the ripple away
            gsap.to(ripple, {
                scale: 0,
                duration: 0.4,
                ease: "power3.in"
            });
        });
    });

    // --- 3. GSAP TEXT ANIMATION ---
    gsap.to(".hero-text-wrapper", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 });
    gsap.to(".hero-buttons", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 });
});





// === APPEND THIS CODE TO YOUR home.js FILE ===

// --- 4. SCROLL-TRIGGERED ANIMATIONS ---
// First, we must register the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate the section titles as they scroll into view
gsap.utils.toArray('.anim-title').forEach(title => {
    gsap.from(title, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: title,
            start: 'top 85%', // Start animation when 85% of the viewport is hit
            toggleActions: 'play none none none',
        }
    });
});









// === APPEND THIS CODE TO YOUR home.js FILE ===

// --- 5. "WHY US" SECTION ANIMATION ---

// Create a new timeline for this specific section
const whyUsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".why-us-section",
        start: "top 60%" // Start animation a bit earlier
    }
});

// Animate the dark container into view
whyUsTl.from(".grid-container", {
    duration: 0.8,
    opacity: 0,
    scale: 0.95,
    ease: "power3.out"
});

// Animate the cross lines drawing themselves
whyUsTl.from(".grid-line.horizontal", {
    duration: 0.7,
    scaleX: 0, // Animate from scale 0 to 1
    ease: "power2.inOut"
}, "-=0.5"); // Overlap with previous animation

whyUsTl.from(".grid-line.vertical", {
    duration: 0.7,
    scaleY: 0, // Animate from scale 0 to 1
    ease: "power2.inOut"
}, "<"); // "<" means start at the same time as the previous animation

// Animate the feature items fading in with a stagger
whyUsTl.from(".anim-feature-item", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.15,
    ease: "power3.out"
}, "-=0.3"); // Overlap for a fluid feel






// REPLACE the old "Platform in Action" GSAP block with this

// --- 6. "PLATFORM IN ACTION" SECTION ANIMATION (WITH PARALLAX) ---

const showcase = document.querySelector(".image-showcase");

// Animate the initial appearance of the images
gsap.from(".showcase-img", {
    duration: 1.2,
    opacity: 0,
    y: 80,
    scale: 0.95,
    ease: 'power3.out',
    stagger: 0.2,
    scrollTrigger: {
        trigger: showcase,
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// Create the parallax scroll effect
gsap.to(".img-pc", {
    yPercent: -10, // Move PC image up slightly
    ease: "none",
    scrollTrigger: {
        trigger: showcase,
        start: "top bottom", // Start when the top of the showcase hits the bottom of the viewport
        end: "bottom top",   // End when the bottom of the showcase leaves the top
        scrub: true // Smoothly links animation progress to scroll progress
    }
});

gsap.to(".img-mobile", {
    yPercent: 10, // Move mobile image down slightly (creating parallax)
    ease: "none",
    scrollTrigger: {
        trigger: showcase,
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});






// === APPEND THIS CODE TO YOUR home.js FILE ===

// --- 7. TESTIMONIALS "WALL OF PRAISE" ANIMATION ---

// REPLACE the old Testimonials animation block with this new one

// --- 7. TESTIMONIALS HORIZONTAL SCROLL ANIMATION ---
const track = document.querySelector(".testimonial-track");
const container = document.querySelector(".testimonial-container");

if (track && container) {
    // Calculate the distance the track needs to scroll
    // This is the full width of the track minus the width of the viewport
    let scrollDistance = track.scrollWidth - container.offsetWidth;

    gsap.to(track, {
        x: -scrollDistance, // Animate the track to the left
        ease: "none", // A linear animation is essential for scrub
        scrollTrigger: {
            trigger: ".testimonials-section", // The trigger is the tall parent section
            start: "top top", // Pin starts when the top of the section hits the top of the screen
            end: () => "+=" + scrollDistance, // The scroll distance determines how long it's pinned
            pin: true, // Pin the container while scrolling
            scrub: 1, // Smoothly links the animation to the scrollbar (1 gives a slight delay)
            invalidateOnRefresh: true, // Recalculate dimensions on resize
        }
    });
}


// --- 8. CTA SECTION ANIMATION ---
gsap.from(".anim-cta", {
    duration: 1,
    opacity: 0,
    scale: 0.9,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".cta-section",
        start: "top 70%",
    }
});