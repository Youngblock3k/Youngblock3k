// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initSkillBars();
    initContactForm();
    initBackToTop();
    initCounters();
    initMobileMenu();
    initSectionAnimations();
    initCodeHighlighting();
    initFloatingElements();
    
    // Set active section based on hash
    if (window.location.hash) {
        showSection(window.location.hash.substring(1));
    }
});

// Navigation Functions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            handleNavClick(sectionId, e);
        });
    });
}

function handleNavClick(sectionId, event) {
    if (event) event.preventDefault();
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active nav link
    navLinks.forEach(l => l.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show section
    showSection(sectionId);
    
    // Update URL
    history.pushState(null, null, `#${sectionId}`);
    
    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of section
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillPercent = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress');
                const percentText = entry.target.querySelector('.skill-percent');
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = `${skillPercent}%`;
                    if (percentText) {
                        percentText.textContent = `${skillPercent}%`;
                    }
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillCards.forEach(card => observer.observe(card));
}

// Experience Counter
function initCounters() {
    const expCounter = document.querySelector('.exp-counter');
    if (!expCounter) return;
    
    const targetCount = parseInt(expCounter.getAttribute('data-count'));
    let currentCount = 0;
    const duration = 2000;
    const increment = targetCount / (duration / 16);
    
    const updateCounter = () => {
        currentCount += increment;
        if (currentCount < targetCount) {
            expCounter.textContent = Math.floor(currentCount);
            requestAnimationFrame(updateCounter);
        } else {
            expCounter.textContent = targetCount;
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(entries[0].target);
        }
    });
    
    observer.observe(expCounter);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Simulate form submission
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
        
        // In a real application, you would send the data to a server here
        setTimeout(() => {
            // Show success message
            alert('Message sent successfully! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
        }, 1500);
    });
}

// Back to Top
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Section Animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

// Code Highlighting
function initCodeHighlighting() {
    document.querySelectorAll('.js-code').forEach(codeBlock => {
        const keywords = ['const', 'function', 'return', 'if', 'else', 'for', 'while'];
        const strings = ['"BGSI Website"', '"Zarnix Bot"', '"CloudNetwork"', '"Egg Database"', '"Pet Values"', '"Probability Calculator"', '"Moderation"', '"Tickets"', '"Utilities"', '"Coming Soon"', '"Custom Plugins"', '"Economy"', '"Unique Features"'];
        
        let code = codeBlock.textContent;
        
        // Highlight keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            code = code.replace(regex, `<span class="js-keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        strings.forEach(str => {
            const regex = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            code = code.replace(regex, `<span class="js-string">${str}</span>`);
        });
        
        // Highlight numbers
        code = code.replace(/(\d+)/g, '<span class="js-number">$1</span>');
        
        // Highlight function names
        code = code.replace(/(\w+)\(/g, '<span class="js-function">$1</span>(');
        
        codeBlock.innerHTML = code;
    });
}

// Run Code Button
function runCode() {
    const runBtn = document.querySelector('.run-btn');
    const originalText = runBtn.textContent;
    
    runBtn.textContent = 'Running...';
    runBtn.disabled = true;
    
    // Simulate code running
    setTimeout(() => {
        // Show the contact section (as per the code's function)
        showSection('contact');
        
        // Add success effect
        runBtn.textContent = 'Success!';
        runBtn.style.background = 'var(--success)';
        
        // Reset after delay
        setTimeout(() => {
            runBtn.textContent = originalText;
            runBtn.style.background = '';
            runBtn.disabled = false;
        }, 2000);
    }, 1000);
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const originalText = event.target.closest('.info-card').querySelector('p').textContent;
        event.target.closest('.info-card').querySelector('p').textContent = 'Copied!';
        event.target.closest('.info-card').style.background = 'rgba(54, 211, 153, 0.1)';
        
        setTimeout(() => {
            event.target.closest('.info-card').querySelector('p').textContent = originalText;
            event.target.closest('.info-card').style.background = '';
        }, 2000);
    });
}

// Project Details Modal
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const projectDetails = {
        bgsi: {
            title: 'BGSI - Bubble Gum Simulator Infinity',
            content: `
                <h3>Complete Roblox Game Database</h3>
                <p>This website serves as a comprehensive database for the popular Roblox game "Bubble Gum Simulator Infinity".</p>
                
                <h4>Features:</h4>
                <ul>
                    <li>Complete egg database with probabilities</li>
                    <li>Real-time pet value tracking</li>
                    <li>Game statistics and analytics</li>
                    <li>Automation tools and macros</li>
                    <li>Responsive design for all devices</li>
                </ul>
                
                <h4>Technologies Used:</h4>
                <div class="tech-tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">HTML/CSS</span>
                    <span class="tag">Roblox API</span>
                    <span class="tag">Node.js</span>
                </div>
                
                <div style="margin-top: 2rem;">
                    <a href="https://bgsi.ascyt.com" target="_blank" class="btn primary-btn" style="display: inline-block;">
                        Visit Website
                    </a>
                </div>
            `
        },
        zarnix: {
            title: 'Zarnix Discord Bot',
            content: `
                <h3>Multi-functional Discord Bot</h3>
                <p>A feature-rich Discord bot designed for gaming communities and server management.</p>
                
                <h4>Features:</h4>
                <ul>
                    <li>Advanced moderation tools (kick, ban, mute, warn)</li>
                    <li>Ticket system for user support</li>
                    <li>Utility commands (weather, time, calculator)</li>
                    <li>Fun commands and games</li>
                    <li>Custom command creation</li>
                    <li>Leveling and economy system</li>
                </ul>
                
                <h4>Technologies Used:</h4>
                <div class="tech-tags">
                    <span class="tag">Discord.js</span>
                    <span class="tag">Node.js</span>
                    <span class="tag">JavaScript</span>
                    <span class="tag">MongoDB</span>
                </div>
                
                <div style="margin-top: 2rem;">
                    <a href="https://discord.gg/GDnvhpea" target="_blank" class="btn primary-btn" style="display: inline-block;">
                        Join Discord
                    </a>
                </div>
            `
        },
        cloudnetwork: {
            title: 'CloudNetwork Minecraft Server',
            content: `
                <h3>Upcoming Minecraft Server</h3>
                <p>A custom Minecraft server with unique gameplay features and community-focused design.</p>
                
                <h4>Planned Features:</h4>
                <ul>
                    <li>Custom economy system with unique currencies</li>
                    <li>Original plugins developed from scratch</li>
                    <li>Unique gameplay mechanics</li>
                    <li>Player housing and land claim system</li>
                    <li>Custom mobs and bosses</li>
                    <li>Integrated Discord bot for cross-platform features</li>
                </ul>
                
                <h4>Technologies Used:</h4>
                <div class="tech-tags">
                    <span class="tag">Java</span>
                    <span class="tag">Skript</span>
                    <span class="tag">Spigot API</span>
                    <span class="tag">MySQL</span>
                </div>
                
                <div style="margin-top: 2rem;">
                    <a href="https://discord.gg/p8EZa5t4ng" target="_blank" class="btn primary-btn" style="display: inline-block;">
                        Join Discord for Updates
                    </a>
                </div>
            `
        }
    };
    
    if (projectDetails[projectId]) {
        modalTitle.textContent = projectDetails[projectId].title;
        modalContent.innerHTML = projectDetails[projectId].content;
        modal.style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Invite Bot Function
function inviteBot() {
    alert('Bot invite functionality would be added here. For now, join our Discord server!');
    window.open('https://discord.gg/GDnvhpea', '_blank');
}

// Floating Elements Animation
function initFloatingElements() {
    // Add floating animation to elements with the class
    const floatElements = document.querySelectorAll('.floating-element');
    floatElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

// Download Resume (placeholder)
function downloadResume() {
    alert('Resume download functionality would be added here. For now, please contact me directly!');
    showSection('contact');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentHash = window.location.hash.substring(1);
    const currentIndex = sections.indexOf(currentHash);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        const nextSection = sections[nextIndex];
        document.querySelector(`[href="#${nextSection}"]`).click();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        const prevSection = sections[prevIndex];
        document.querySelector(`[href="#${prevSection}"]`).click();
    } else if (e.key === 'Escape') {
        closeModal();
    }
});

// Add CSS for modal tech tags
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .tech-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin: 1rem 0;
    }
    
    .modal-content h3 {
        color: var(--primary);
        margin-bottom: 1rem;
    }
    
    .modal-content h4 {
        color: var(--light);
        margin: 1.5rem 0 0.5rem 0;
    }
    
    .modal-content ul {
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .modal-content li {
        margin-bottom: 0.5rem;
        color: var(--gray);
    }
`;
document.head.appendChild(modalStyle);
