document.addEventListener("DOMContentLoaded", () => {
    // Populate profile information
    if (document.getElementById("name"))
        document.getElementById("name").textContent = DATA.profile.name;

    if (document.getElementById("role"))
        document.getElementById("role").textContent = DATA.profile.role;

    if (document.getElementById("bio"))
        document.getElementById("bio").textContent = DATA.profile.bio;

    if (document.getElementById("location"))
        document.getElementById("location").textContent = DATA.profile.location;

    // Populate projects dynamically
    const projectsContainer = document.getElementById("projectsContainer");
    if (projectsContainer && DATA.projects) {
        projectsContainer.innerHTML = DATA.projects.map(project => `
            <div class="project-card ${project.theme}-theme">
                <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.style.display='none'">
                <div class="project-content">
                    <div class="project-icon">
                        <i class="fas fa-${project.theme === 'dark' ? 'gamepad' : project.theme === 'purple' ? 'network-wired' : 'discord'}"></i>
                    </div>
                    <h3>${project.title}</h3>
                    <p class="project-subtitle">${project.description.split(' ')[0]} Project</p>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.discord}" target="_blank" class="project-discord-btn">
                        <i class="fab fa-discord"></i> Join Discord
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Work tabs functionality
    const workTabButtons = document.querySelectorAll('.work-tab-btn');
    const workPanels = document.querySelectorAll('.work-panel');

    workTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            workTabButtons.forEach(btn => btn.classList.remove('active'));
            workPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const activePanel = document.getElementById(`${tabName}-panel`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default if it's a navigation link, not a Discord link
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation to elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .skill-item, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});
