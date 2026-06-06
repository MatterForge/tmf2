// Empty file - no specific functionality requested

function initHeroParticles() {
    const hero = document.getElementById('hero');
    const heroParticles = document.createElement('div');
    heroParticles.id = 'hero-particles';
    heroParticles.style.position = 'absolute';
    heroParticles.style.inset = '0';
    heroParticles.style.pointerEvents = 'none';
    heroParticles.style.overflow = 'hidden';
    heroParticles.style.zIndex = '0';
    
    hero.insertBefore(heroParticles, hero.firstChild);
    
    const particles = [];
    const particleCount = 30;
    const initialViewportHeight = window.innerHeight;
    
    const shapes = ['circle', 'circle', 'circle', 'circle', 'square', 'square', 'square', 'rectangle'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (shape === 'circle') {
            particle.style.borderRadius = '50%';
        } else if (shape === 'square') {
            particle.style.borderRadius = '0';
        } else if (shape === 'rectangle') {
            const aspectRatio = Math.random() > 0.5 ? Math.random() * 1.5 + 0.8 : Math.random() * 0.8 + 0.6;
            const size = Math.floor(Math.random() * 28) + 12;
            particle.style.width = `${size}px`;
            particle.style.height = `${size * aspectRatio}px`;
            particle.style.borderRadius = '0';
        }
        
        const size = Math.floor(Math.random() * 28) + 12;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const left = Math.floor(Math.random() * 90) + 5;
        const top = Math.floor(Math.random() * 90) + 5;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.position = 'absolute';
        
        if (Math.random() > 0.5) {
            particle.style.background = 'rgba(235, 71, 60, 0.08)';
            particle.style.border = 'none';
        } else {
            particle.style.background = 'transparent';
            particle.style.border = '1px solid rgba(235, 71, 60, 0.4)';
        }
        
        const isSpecial = i === 2 || i === 7;
        if (isSpecial) {
            particle.style.background = 'rgba(235, 71, 60, 0.15)';
            particle.style.border = 'none';
        } else {
            particle.style.border = '1px solid rgba(235, 71, 60, 0.4)';
        }
        
        const animation = i % 2 === 0 ? 'float-a' : 'float-b';
        particle.style.animation = `${animation} ${Math.random() * 13 + 9}s ease-in-out infinite`;
        particle.style.animationDelay = `-${Math.random() * 15}s`;
        
        const depth = (Math.random() * 0.3 + 0.05).toFixed(2);
        particle.setAttribute('data-depth', depth);
        
        heroParticles.appendChild(particle);
        particles.push(particle);
    }
    
    let lastScrollY = window.scrollY;
    let rafId = null;
    
    function onScroll() {
        lastScrollY = window.scrollY;
        
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            
            if (scrollY < initialViewportHeight) {
                particles.forEach(particle => {
                    const depth = parseFloat(particle.getAttribute('data-depth'));
                    const translateY = scrollY * depth * -1;
                    
                    if (particle.style.transform.includes('rotate')) {
                        particle.style.transform = `rotate(45deg) translateY(${translateY}px)`;
                    } else {
                        particle.style.transform = `translateY(${translateY}px)`;
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger icon animation
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.click();
            }
        });
    });

    // Handle window resize to reset mobile menu on desktop view
    let timeoutId;
    window.addEventListener('resize', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        }, 250);
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroParticles();
    initMobileMenu();
});
