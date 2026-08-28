// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

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

// ============================================
// HIGHLIGHT ACTIVE NAV LINK
// ============================================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input, textarea');
        const formData = {};
        
        inputs.forEach(input => {
            if (input.value.trim()) {
                formData[input.placeholder] = input.value;
            }
        });

        console.log('Form Data:', formData);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        this.reset();
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// ANIMATION STYLES FOR NOTIFICATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-link.active {
        opacity: 1;
        border-bottom: 2px solid white;
        padding-bottom: 0.3rem;
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
};

// Call on page load
window.addEventListener('load', revealOnScroll);

// ============================================
// MAKE CARDS WITH LINKS CLICKABLE
// ============================================

function makeCardsClickable() {
    document.querySelectorAll('[data-link]').forEach(card => {
        card.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link && link !== '#') {
                window.open(link, '_blank');
            }
        });
    });
}

makeCardsClickable();

// ============================================
// ADD SOME INTERACTIVITY TO SKILL CARDS
// ============================================

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.style.color = 'white';
        this.querySelector('h3').style.color = 'white';
        this.querySelectorAll('p').forEach(p => p.style.color = 'rgba(255, 255, 255, 0.9)');
    });
    
    card.addEventListener('mouseleave', function () {
        this.style.background = '';
        this.style.color = '';
        this.querySelector('h3').style.color = '';
        this.querySelectorAll('p').forEach(p => p.style.color = '');
    });
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully!');
    // Add any additional initialization here
});
const toggle = document.getElementById('darkmode');

if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
}

if (toggle) {
        toggle.addEventListener('click', () => {
                const isDarkMode = document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
                toggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        });
}
