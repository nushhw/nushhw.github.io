
// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add typing effect to the name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const nameText = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < nameText.length) {
                nameElement.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add particle effect to background (optional enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(102, 126, 234, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0px)', opacity: 0 },
        { transform: 'translateY(-100px)', opacity: 1 },
        { transform: 'translateY(-' + (window.innerHeight + 100) + 'px)', opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 300);
