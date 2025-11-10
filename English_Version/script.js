// ============================================
// Initialize after page load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initMobileMenu();
    initCurrentYear();
    initProjectModals();
    initImageModal();
});

// ============================================
// Navigation Bar Functionality
// ============================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll to anchor
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Subtract navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close menu on mobile
                const navMenu = document.getElementById('navMenu');
                const navToggle = document.getElementById('navToggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Highlight current navigation item based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero, .footer');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    // If scrolled to top, highlight home link
    if (window.scrollY < 100) {
        current = 'header';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current || (href === '#header' && current === 'header')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Scroll Animation Effects
// ============================================
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add delay animation for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add delay animation for project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// ============================================
// Set Current Year
// ============================================
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// Project Modals (Optional Feature)
// ============================================
function initProjectModals() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        // Interaction when clicking project card
        item.addEventListener('click', function(e) {
            // If clicking a link, don't prevent default behavior
            if (e.target.closest('.project-link')) {
                return;
            }
            
            // Add logic to open project details here
            // For example: open modal, navigate to details page, etc.
            const projectTitle = item.querySelector('.project-title').textContent;
            console.log('View project:', projectTitle);
            
            // Example: Add modal functionality here
            // showProjectModal(projectTitle);
        });
    });
}

// ============================================
// Avatar Load Error Handling
// ============================================
const avatar = document.getElementById('avatar');
if (avatar) {
    avatar.addEventListener('error', function() {
        // If avatar fails to load, use SVG placeholder
        this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%234A90E2\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial, sans-serif\' font-size=\'48\' fill=\'white\'%3EAvatar%3C/text%3E%3C/svg%3E';
        this.alt = 'Avatar failed to load';
    });
}

// ============================================
// Smooth Scroll Enhancement (Compatibility Handling)
// ============================================
if (!CSS.supports('scroll-behavior', 'smooth')) {
    // If CSS smooth scroll is not supported, use JavaScript implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 70;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// Performance Optimization: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listener
const optimizedScrollHandler = debounce(function() {
    updateActiveNavLink();
    
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// Image Modal Functionality
// ============================================
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const certificateThumbnails = document.querySelectorAll('.certificate-thumbnail');
    
    // Add click event to all certificate thumbnails
    certificateThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const fullImageSrc = this.getAttribute('data-full-image') || this.src;
            const altText = this.getAttribute('alt') || 'Certificate Image';
            
            modalImg.src = fullImageSrc;
            modalCaption.textContent = altText;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal when clicking background
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%cWelcome to My Portfolio Website!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cIf you have any suggestions or questions, feel free to contact me!', 'color: #64748b; font-size: 14px;');

