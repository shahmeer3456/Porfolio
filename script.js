// DOM Elements
const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const experienceCards = document.querySelectorAll('.experience-card');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation
const toggleNav = () => {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
};

burger.addEventListener('click', toggleNav);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        toggleNav();
    }
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    if (currentScroll === 0) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Initialize Vanilla Tilt for experience cards
if (experienceCards.length > 0) {
    VanillaTilt.init(experienceCards, {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02
    });
}

// Initialize Vanilla Tilt for project cards
if (projectCards.length > 0) {
    VanillaTilt.init(projectCards, {
        max: 3,
        speed: 400,
        glare: true,
        'max-glare': 0.1,
        scale: 1.01
    });
}

// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 1000,
    delay: 200,
    easing: 'ease',
    reset: false
});

// Reveal animations for different sections
sr.reveal('.section-title', {
    origin: 'top',
    delay: 100
});

sr.reveal('.section-subtitle', {
    origin: 'top',
    delay: 200
});

sr.reveal('.experience-card', {
    interval: 200
});

sr.reveal('.project-card', {
    interval: 150
});

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;

document.addEventListener('mousemove', function(e) {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.display = 'block';
});

const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
};

// Smooth cursor animation
function animateCursor() {
    cursorX = lerp(cursorX, pageX, 0.2);
    cursorY = lerp(cursorY, pageY, 0.2);
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .experience-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    }, 250);
});

// Add active state to current page in navigation
const setActiveLink = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const anchor = link.querySelector('a');
        if (anchor.getAttribute('href') === currentPage) {
            anchor.classList.add('active');
        }
    });
};
setActiveLink();

// Parallax effect for experience cards
if (experienceCards.length > 0) {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        experienceCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const angleX = (mouseY - cardY) / 30;
            const angleY = (mouseX - cardX) / -30;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    experienceCards.forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                toggleNav();
            }
        }
    });
});

// Skill Bar Animation
const skillProgress = document.querySelectorAll('.skill-progress');

function startProgressAnimation() {
    if (skillProgress.length > 0) {
        skillProgress.forEach(progress => {
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        });
    }
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the form data to a server
        // For this example, we'll just show a thank you message
        
        // Clear the form
        this.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerText = 'Thank you for your message! I\'ll get back to you soon.';
        successMessage.style.padding = '15px';
        successMessage.style.marginTop = '20px';
        successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        successMessage.style.color = '#10b981';
        successMessage.style.borderRadius = '8px';
        successMessage.style.textAlign = 'center';
        
        this.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
    // Set active navigation link
    setActiveLink();
    
    // Custom cursor effect
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);
    
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.cssText = `left: ${posX}px; top: ${posY}px;`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });
    
    // Add styles for custom cursor
    const style = document.createElement('style');
    style.textContent = `
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        }
        
        .cursor-outline {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            opacity: 0.5;
        }
        
        a:hover ~ .cursor-dot,
        a:hover ~ .cursor-outline,
        button:hover ~ .cursor-dot,
        button:hover ~ .cursor-outline {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: transparent;
            opacity: 0.3;
        }
    `;
    document.head.appendChild(style);
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const moveX = (mouseX - windowWidth / 2) / 25;
            const moveY = (mouseY - windowHeight / 2) / 25;
            
            const shape = document.querySelector('.shape');
            
            if (shape) {
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }
    
    // Initialize page-specific elements
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        // If on skills page, initialize IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startProgressAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }

    // Initialize tech stack card animations if on tech stack page
    const techStackPage = document.getElementById('tech-stack');
    if (techStackPage) {
        // Add floating animation to tech cards
        document.querySelectorAll('.tech-card').forEach(card => {
            setInterval(() => {
                const randomY = Math.random() * 10 - 5;
                const randomRotate = Math.random() * 5 - 2.5;
                card.style.transform = `translateY(${randomY}px) rotate(${randomRotate}deg)`;
            }, 2000);
        });
    }
}); 