// =================================================== //
//             ERP SOLUTIONS PAGE SCRIPT               //
// =================================================== //
if (document.querySelector('.erp-page')) {
    
    // 1. GSAP Animations
    gsap.from('.erp-hero > .container > *', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.features-list li', {
        scrollTrigger: {
            trigger: '.features-list',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'ease.out'
    });

    gsap.utils.toArray('.workflow-step').forEach(step => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    gsap.from('.video-wrapper', {
        scrollTrigger: {
            trigger: '.video-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'expo.out'
    });

    // 2. Video Player Logic
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        const video = videoWrapper.querySelector('.erp-video');
        const playButton = videoWrapper.querySelector('.play-button-overlay');

        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            }
        });

        video.addEventListener('play', () => {
            videoWrapper.classList.add('is-playing');
        });

        video.addEventListener('pause', () => {
            videoWrapper.classList.remove('is-playing');
        });

        // Optional: allow clicking the video itself to pause
        video.addEventListener('click', () => {
            if (!video.paused) {
                video.pause();
            }
        });
    }
}