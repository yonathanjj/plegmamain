// =================================================== //
//                ABOUT PAGE ANIMATIONS                //
// =================================================== //
if (document.querySelector('.about-hero')) {
    
    // 1. About Hero Animation
    gsap.from('.about-hero > .container > *', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // 2. Mission & Vision Cards
    gsap.utils.toArray('.mv-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            scale: 0.98,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // 3. "What We Stand For" Values
    gsap.from('.value-item', {
        scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'ease.out'
    });

    // 4. "Our Presence" Maps
    gsap.utils.toArray('.location-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'expo.out'
        });
    });
}