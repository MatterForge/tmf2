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
    const particleCount = 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const isCircle = i % 2 === 0;
        const isSpecial = i === 2 || i === 7;
        
        if (isCircle) {
            particle.style.borderRadius = '50%';
        } else {
            particle.style.transform = 'rotate(45deg)';
        }
        
        const size = Math.floor(Math.random() * 30) + 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const left = Math.floor(Math.random() * 90) + 5;
        const top = Math.floor(Math.random() * 90) + 5;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.position = 'absolute';
        
        particle.style.background = 'transparent';
        
        if (isSpecial) {
            particle.style.background = 'rgba(235, 71, 60, 0.07)';
            particle.style.border = 'none';
        } else {
            particle.style.border = '1px solid rgba(235, 71, 60, 0.15)';
        }
        
        const animation = i % 2 === 0 ? 'float-a' : 'float-b';
        particle.style.animation = `${animation} ${Math.random() * 13 + 9}s ease-in-out infinite`;
        particle.style.animationDelay = `-${Math.random() * 15}s`;
        
        heroParticles.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', initHeroParticles);
