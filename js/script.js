function initSwipers() {
    // 1. Carrousel des commentaires (inchangé)
    const commentsSwiper = new Swiper('.commentsSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

// 2. Carrousel des témoignages vidéos (sans autoplay)
const videoTestimonialsSwiper = new Swiper('.videoTestimonialsSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    watchOverflow: true,
    preventClicks: true,
    preventClicksPropagation: true,
    touchEventsTarget: 'wrapper',
    breakpoints: {
        768: {
            slidesPerView: 1,
            spaceBetween: 30
        }
    }
});

}

// Gestion du menu mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.setAttribute(
            'aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Smooth scroll pour les ancres
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Compensation pour le header fixe
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fermer le menu en cliquant à l'extérieur
function handleClickOutsideMenu() {
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Animation au scroll
function setupScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-scroll]');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                element.setAttribute('data-scroll', 'in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
}

// Gestion de la FAQ
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fermer les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer l'item actuel
            item.classList.toggle('active');
            
            // Accessibilité - gestion du focus
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                answer.setAttribute('aria-hidden', 'false');
                question.setAttribute('aria-expanded', 'true');
            } else {
                answer.setAttribute('aria-hidden', 'true');
                question.setAttribute('aria-expanded', 'false');
            }
        });

        // Accessibilité - navigation au clavier
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
    initSwipers();
    setupMobileMenu();
    setupSmoothScroll();
    handleClickOutsideMenu();
    setupScrollAnimations();
    setupFAQ();
    
    // Optimisation des performances
    if ('IntersectionObserver' in window) {
        setupLazyLoading();
    }
});

// Chargement différé pour les images/iframes
function setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[loading="lazy"]');
    
    if (lazyElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                    }
                    if (element.dataset.srcset) {
                        element.srcset = element.dataset.srcset;
                    }
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '200px 0px' // Charge 200px avant d'entrer dans la vue
        });

        lazyElements.forEach(element => {
            observer.observe(element);
        });
    }
}
