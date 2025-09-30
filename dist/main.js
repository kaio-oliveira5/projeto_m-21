
function initAnimaOnScroll() {
    
    const targets = document.querySelectorAll('.ator-card, .filme-card'); 
    const animationClass = 'is-visible';

    const observerOptions = { 
        root: null, 
        rootMargin: '0px', 
        threshold: 0.1 
    }; 

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                // Parar de observar para rodar apenas uma vez
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    targets.forEach(item => {
        observer.observe(item);
    });
}



function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    });
}


function initCarrossel() {
    const scrollContainer = document.querySelector('.personagens-scroll-container');
    
    if (!scrollContainer) return; 

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    
    const scrollAmount = 840; 

    nextBtn.addEventListener('click', () => {
        scrollContainer.scrollLeft += scrollAmount;
    });

    prevBtn.addEventListener('click', () => {
        scrollContainer.scrollLeft -= scrollAmount;
    });

    const cards = document.querySelectorAll('.ator-card');
    
    scrollContainer.addEventListener('scroll', () => {
        const viewportStart = scrollContainer.scrollLeft;
        const viewportEnd = viewportStart + scrollContainer.clientWidth;

        cards.forEach(card => {
            const cardStart = card.offsetLeft;
            const cardEnd = cardStart + card.offsetWidth;

            if (cardEnd < viewportStart + 100 || cardStart > viewportEnd - 100) {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.95)';
            } else {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
        });
    });

    scrollContainer.dispatchEvent(new Event('scroll'));
}


document.addEventListener('DOMContentLoaded', () => {
    initAnimaOnScroll(); 
    navbarScroll(); 
    initCarrossel(); 
});
