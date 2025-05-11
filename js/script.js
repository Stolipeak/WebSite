// Initialisation des carrousels Swiper
function initSwipers() {
    // Carrousel des commentaires écrits
    const commentsSwiper = new Swiper('.commentsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
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
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Carrousel des témoignages vidéos
    const videoTestimonialsSwiper = new Swiper('.videoTestimonialsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        }
    });
}

// Animation au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-scroll]');
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + windowTop;
        const elementBottom = elementTop + element.offsetHeight;

        // Vérifie si l'élément est dans la fenêtre visible
        if (elementBottom >= windowTop && elementTop <= windowBottom) {
            element.setAttribute('data-scroll', 'in');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des carrousels
    initSwipers();

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        this.setAttribute(
            'aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Détection du clic en dehors du menu mobile pour le fermer
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Initialisation des animations au scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
});