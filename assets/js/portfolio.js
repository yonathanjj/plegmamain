document.addEventListener("DOMContentLoaded", () => {
    // --- 1. PROJECT DATA ---
    const projects = [
        { id: 1, image: 'https://via.placeholder.com/800x600/333/fff?text=Hopstack', tagsTop: ['ERP', 'Logistics'], title: 'Hopstack', description: 'B2B SaaS platform for warehouse management to streamline and digitize warehouse operations.', tagsBottom: ['B2B SaaS', 'Logistics', 'Fulfillment'], link: '#' },
        { id: 2, image: 'https://via.placeholder.com/800x600/555/fff?text=Aureon', tagsTop: ['Website', 'Finance'], title: 'Aureon Solutions', description: 'Leader in financial services, delivering tailored solutions like investment advisory, wealth migration, real estate insights, and M&A.', tagsBottom: ['Financial Services', 'Wealth Management', 'M&A'], link: '#' },
        { id: 3, image: 'https://via.placeholder.com/800x600/777/fff?text=GoFIGR', tagsTop: ['ERP', 'HR Tech'], title: 'GoFIGR', description: 'Helps companies find, inspire, grow and retain their best talent. Connects the skills and aspirations of employees to existing opportunities.', tagsBottom: ['AI', 'HR Tech', 'B2B SaaS'], link: '#' },
        { id: 4, image: 'https://via.placeholder.com/800x600/999/fff?text=SliceInn', tagsTop: ['Website', 'API'], title: 'SliceInn', description: 'Hospitality platform that offers thoughtfully curated stays by combining comfort, style, and a personal touch.', tagsBottom: ['Hospitality', 'Real Estate'], link: '#' },
        { id: 5, image: 'https://via.placeholder.com/800x600/BBB/333?text=EthioCommerce', tagsTop: ['Website', 'E-commerce'], title: 'EthioCommerce', description: 'A multi-vendor e-commerce platform designed for the Ethiopian market, featuring local payment gateway integrations.', tagsBottom: ['E-commerce', 'Stripe', 'Local'], link: '#' },
        { id: 6, image: 'https://via.placeholder.com/800x600/DDD/333?text=Kigali+Movers', tagsTop: ['ERP', 'Logistics'], title: 'Kigali Movers', description: 'A complete operational dashboard for a leading logistics company in Rwanda, tracking fleet, deliveries, and staff.', tagsBottom: ['Logistics', 'Fleet Management', 'Rwanda'], link: '#' },
    ];

    // --- 2. GENERATE PROJECT CARDS ---
    const grid = document.querySelector('.projects-grid');
    if (grid) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.projectId = project.id; // Link card to data
            card.innerHTML = `
                <div class="card-image"><img src="${project.image}" alt="${project.title}"></div>
                <div class="card-content">
                    <div class="card-tags-top">${project.tagsTop.map(tag => `<span>${tag}</span>`).join('')}</div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="card-tags-bottom">${project.tagsBottom.map(tag => `<span>${tag}</span>`).join('')}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // --- 3. POPUP FUNCTIONALITY ---
    const popup = document.querySelector('.project-popup');
    const popupContent = popup.querySelector('.popup-content');
    const popupOverlay = popup.querySelector('.popup-overlay');
    const popupCloseBtn = popup.querySelector('.popup-close');
    const body = document.body;

    // Populate popup with data
    function populatePopup(projectId) {
        const project = projects.find(p => p.id == projectId);
        popup.querySelector('.popup-image').src = project.image;
        popup.querySelector('.popup-title').textContent = project.title;
        popup.querySelector('.popup-description').textContent = project.description;
        popup.querySelector('.popup-link').href = project.link;
        popup.querySelector('.popup-tags').innerHTML = project.tagsBottom.map(tag => `<span>${tag}</span>`).join('');
    }

    // GSAP Timelines for smooth open/close
    const openTl = gsap.timeline({ paused: true });
    openTl.to(popup, { autoAlpha: 1, duration: 0.4, ease: 'power2.inOut' })
          .from(popupContent, { y: 50, scale: 0.95, opacity: 0, duration: 0.4, ease: 'power3.out' }, "-=0.2");

    function openPopup(projectId) {
        populatePopup(projectId);
        body.classList.add('no-scroll');
        openTl.play();
    }

    function closePopup() {
        openTl.reverse().then(() => body.classList.remove('no-scroll'));
    }

    // Event listeners
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) openPopup(card.dataset.projectId);
    });

    popupCloseBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.visibility === 'visible') closePopup();
    });

    // --- 4. ENTRANCE ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.anim-hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.from('.anim-hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });

    gsap.from('.anim-title', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.portfolio-grid-section', start: 'top 80%' }
    });

    ScrollTrigger.batch(".project-card", {
        start: "top 85%",
        onEnter: batch => gsap.from(batch, { y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }),
    });
});