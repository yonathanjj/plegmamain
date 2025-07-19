document.addEventListener("DOMContentLoaded", () => {
    // --- 1. DETAILED PROJECT DATA ---
    const projects = [
        { id: 1, slug: 'hopstack', image: 'https://via.placeholder.com/1200x800/333/fff?text=Hopstack', tagsTop: ['ERP', 'Logistics'], title: 'Hopstack', description: 'B2B SaaS platform for warehouse management to streamline operations.', link: '#', year: 2023, industry: 'Logistics', services: 'ERP Development', stats: [{value: '50%', label: 'Increase in Efficiency'}, {value: '4,000+', label: 'Daily Transactions'}, {value: '6', label: 'Months to Deploy'}], challenge: 'Hopstack needed a robust, scalable system capable of handling thousands of daily transactions while providing a simple user interface for warehouse staff. Their previous system was slow and prone to errors.', solution: 'We developed a custom ERP from the ground up using Flask and React. The system features real-time inventory tracking, automated order processing, and a multi-branch synchronization module that provides a complete overview of the entire operation.', images: { challenge: 'https://via.placeholder.com/800x600/eee/333?text=Old+System', solution: 'https://via.placeholder.com/800x600/f3f4f6/333?text=New+Dashboard'}},
        { id: 2, slug: 'aureon-solutions', image: 'https://via.placeholder.com/1200x800/555/fff?text=Aureon', tagsTop: ['Website', 'Finance'], title: 'Aureon Solutions', description: 'Leader in financial services, delivering tailored solutions for high-net-worth individuals.', link: '#', year: 2024, industry: 'Finance', services: 'Website Development', stats: [{value: '$500M+', label: 'Assets Managed'}, {value: '30%', label: 'Increase in Client Engagement'}, {value: '85+', label: 'Corporate Clients'}], challenge: 'Aureon\'s old website was outdated, not mobile-responsive, and failed to convey the premium, high-trust nature of their services. It was failing to attract and convert their target clientele.', solution: 'We built a high-end, modern website with a focus on brand storytelling, clear communication of their value proposition, and a sophisticated design. The site was built with SEO best practices to attract organic traffic.', images: { challenge: 'https://via.placeholder.com/800x600/eee/333?text=Cluttered+UI', solution: 'https://via.placeholder.com/800x600/f3f4f6/333?text=Clean+Homepage'}},
    ];

    // --- 2. GENERATE PROJECT CARDS ---
    const grid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.projectId = project.id;
        card.innerHTML = `<div class="card-image"><img src="${project.image}" alt="${project.title}"></div><div class="card-content"><h3>${project.title}</h3></div>`;
        grid.appendChild(card);
    });

    // --- 3. POPUP FUNCTIONALITY (REWRITTEN & FIXED) ---
    const popup = document.querySelector('.project-popup');
    const popupContainer = popup.querySelector('.popup-container');
    const popupScrollContent = popup.querySelector('.popup-scroll-content');
    const popupCloseBtn = popup.querySelector('.popup-close');
    const body = document.body;

    function populatePopup(projectId) {
        const project = projects.find(p => p.id == projectId);
        const currentIndex = projects.findIndex(p => p.id == projectId);
        const nextIndex = (currentIndex + 1) % projects.length;
        const nextProject = projects[nextIndex];
        popupScrollContent.innerHTML = `
            <header class="case-study-hero"><h1>${project.title}</h1><p>${project.description}</p><div class="project-meta"><div class="project-meta-info"><div><span>Industry</span><strong>${project.industry}</strong></div><div><span>Year</span><strong>${project.year}</strong></div><div><span>Services</span><strong>${project.services}</strong></div></div><a href="${project.link}" target="_blank" rel="noopener noreferrer">Visit Website →</a></div></header>
            <section class="hero-image-section"><img src="${project.image}" alt="${project.title} hero image"></section>
            <section class="stats-section"><h2 class="section-title">Key Metrics & Results</h2><div class="stats-grid">${project.stats.map(stat => `<div class="stat-item"><div class="stat-value">${stat.value}</div><div class="stat-label">${stat.label}</div></div>`).join('')}</div></section>
            <section class="content-section"><div class="content-block"><div class="text-col"><h3>The Challenge</h3><p>${project.challenge}</p></div><div class="image-col"><img src="${project.images.challenge}" alt="Challenge for ${project.title}"></div></div><div class="content-block"><div class="text-col"><h3>Our Solution</h3><p>${project.solution}</p></div><div class="image-col"><img src="${project.images.solution}" alt="Solution for ${project.title}"></div></div></section>
            <section class="next-project-section"><a href="#" class="next-project-link" data-next-id="${nextProject.id}"><span>Next Case Study</span><h3>${nextProject.title}</h3></a></section>
        `;
    }

    // A single, robust timeline for the popup animation
    const popupTl = gsap.timeline({
        paused: true,
        onStart: () => {
            body.classList.add('no-scroll');
            popup.classList.add('active');
        },
        onReverseComplete: () => {
            body.classList.remove('no-scroll');
            popup.classList.remove('active');
        }
    });
    popupTl.to(popup, { autoAlpha: 1, duration: 0.4, ease: 'power2.inOut' })
           .from(popupContainer, { scale: 0.9, y: 50, duration: 0.4, ease: 'power3.out' }, 0);

    function openPopup(projectId) {
        populatePopup(projectId);
        popupScrollContent.scrollTop = 0; // ALWAYS scroll to top on open
        popupTl.play();
    }

    function closePopup() {
        popupTl.reverse();
    }

    // Event listeners
    grid.addEventListener('click', e => {
        const card = e.target.closest('.project-card');
        if (card) openPopup(card.dataset.projectId);
    });

    popup.addEventListener('click', e => {
        // Close if the user clicks directly on the .project-popup (the overlay)
        if (e.target === popup) {
            closePopup();
        }
        const nextLink = e.target.closest('.next-project-link');
        if (nextLink) {
            e.preventDefault();
            const nextId = nextLink.dataset.nextId;
            gsap.to(popupScrollContent, {
                opacity: 0, duration: 0.3, onComplete: () => {
                    populatePopup(nextId);
                    popupScrollContent.scrollTop = 0;
                    gsap.fromTo(popupScrollContent, { opacity: 0 }, { opacity: 1, duration: 0.3 });
                }
            });
        }
    });
    popupCloseBtn.addEventListener('click', closePopup);
    window.addEventListener('keydown', e => { if (e.key === 'Escape' && popup.classList.contains('active')) closePopup(); });

    // --- 4. PAGE ENTRANCE ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.anim-hero-title, .anim-hero-subtitle', { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.from('.anim-title', { y: 40, opacity: 0, scrollTrigger: { trigger: '.portfolio-grid-section', start: 'top 80%' } });
    ScrollTrigger.batch(".project-card", {
        start: "top 85%",
        onEnter: batch => gsap.from(batch, { y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }),
    });
});