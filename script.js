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
        
        const isFilled = Math.random() > 100 ? false : (Math.random() > 0.5); // Logic preserved from original
        // Note: The original code had a logic check for isFilled, I will keep the structure but fix the viewport height issue.
        
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

document.addEventListener('DOMContentLoaded', initHeroParticles);
