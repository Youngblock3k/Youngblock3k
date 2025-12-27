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
    
    // Set active section based on hash
    if (window.location.hash) {
        showSection(window.location.hash.substring(1));
    }
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
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
        });
    });
}

// Mobile Menu Toggle
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

// Show Section
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
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Smooth Scrolling for Anchor Links
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

// Animated Skill Bars
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
                    percentText.textContent = `${skillPercent}%`;
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillCards.forEach(card => observer.observe(card));
}

// Experience Counter Animation
function initCounters() {
    const expCounter = document.querySelector('.exp-counter');
    if (!expCounter) return;
    
    const targetCount = parseInt(expCounter.getAttribute('data-count'));
    let currentCount = 0;
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps
    
    const updateCounter = () => {
        currentCount += increment;
        if (currentCount < targetCount) {
            expCounter.textContent = Math.floor(currentCount);
            requestAnimationFrame(updateCounter);
        } else {
            expCounter.textContent = targetCount;
        }
    };
    
    // Start counter when section is visible
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

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Section Entrance Animations
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

// Interactive Code Window
document.querySelectorAll('.js-code').forEach(codeBlock => {
    const keywords = ['const', 'function', 'return'];
    const strings = ['Youngblock2k', 'Full Stack Developer', 'Clean code & Modern UI', 'Turning ideas into reality', 'Awesome digital experience'];
    
    let code = codeBlock.textContent;
    
    // Highlight keywords
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        code = code.replace(regex, `<span class="js-keyword">${keyword}</span>`);
    });
    
    // Highlight strings
    strings.forEach(str => {
        const regex = new RegExp(`"${str}"`, 'g');
        code = code.replace(regex, `<span class="js-string">"${str}"</span>`);
    });
    
    // Highlight function names
    code = code.replace(/(\w+)\(/g, '<span class="js-function">$1</span>(');
    
    codeBlock.innerHTML = code;
});

// Typing Effect for Title (Optional)
function initTypingEffect() {
    const title = document.querySelector('.title');
    if (!title) return;
    
    const originalText = title.textContent;
    const words = ['Full Stack Developer', 'Java Specialist', 'Skript Expert', 'Web Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            title.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            title.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(type, 1000);
}

// Initialize typing effect
initTypingEffect();

// Particle Effect for Background
function createParticles() {
    const container = document.querySelector('.animated-bg');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(108, 99, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        container.appendChild(particle);
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create particles
createParticles();

// Add keyboard navigation
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
    }
});

// Add theme toggle (optional)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.top = '1rem';
    themeToggle.style.right = '1rem';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--primary)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '40px';
    themeToggle.style.height = '40px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            document.body.style.setProperty('--dark', '#f5f5f7');
            document.body.style.setProperty('--darker', '#ffffff');
            document.body.style.setProperty('--light', '#1a1a2e');
            document.body.style.setProperty('--gray', '#666666');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.body.style.setProperty('--dark', '#1a1a2e');
            document.body.style.setProperty('--darker', '#0f0f1a');
            document.body.style.setProperty('--light', '#f5f5f7');
            document.body.style.setProperty('--gray', '#8a8aa0');
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Uncomment to enable theme toggle
// initThemeToggle();
