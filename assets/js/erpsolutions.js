// =================================================== //
//       CORRECTED ERP SOLUTIONS PAGE SCRIPT           //
// =================================================== //
if (document.querySelector('.erp-page')) {
    
    // 1. GSAP Animations
    gsap.from('.erp-hero > .container > *', {
        opacity: 0,
        y: 40,
        duration: 0.8,
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
        duration: 0.5,
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
            y: 40,
            duration: 0.6,
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
        
        // Function to toggle play/pause
        const togglePlay = () => {
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        };

        // Play/pause when the whole wrapper is clicked
        videoWrapper.addEventListener('click', togglePlay);

        // Add/remove class for showing/hiding play button
        video.addEventListener('play', () => {
            videoWrapper.classList.add('is-playing');
        });

        video.addEventListener('pause', () => {
            videoWrapper.classList.remove('is-playing');
        });
    }
}