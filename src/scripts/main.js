
function initAnimaOnScroll() {
    // CORREÇÃO: Seleciona TODOS os elementos que precisam de animação.
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


// -----------------------------------------------------
// 2. FUNÇÃO DE ESTILO DO NAVBAR AO ROLAR (Transparência)
// -----------------------------------------------------

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


// -----------------------------------------------------
// 3. FUNÇÃO DE CONTROLE DO CARROSSEL (Personagens)
// -----------------------------------------------------
function initCarrossel() {
    const scrollContainer = document.querySelector('.personagens-scroll-container');
    
    // Verificação de segurança: Só inicializa o carrossel se o container existir.
    if (!scrollContainer) return; 

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Define o quanto rolar em pixels.
    const scrollAmount = 840; 

    // Rola para a DIREITA
    nextBtn.addEventListener('click', () => {
        scrollContainer.scrollLeft += scrollAmount;
    });

    // Rola para a ESQUERDA
    prevBtn.addEventListener('click', () => {
        scrollContainer.scrollLeft -= scrollAmount;
    });

    // --- EFEITO VISUAL OPCIONAL: Fade nos cards das extremidades ---
    const cards = document.querySelectorAll('.ator-card');
    
    scrollContainer.addEventListener('scroll', () => {
        const viewportStart = scrollContainer.scrollLeft;
        const viewportEnd = viewportStart + scrollContainer.clientWidth;

        cards.forEach(card => {
            const cardStart = card.offsetLeft;
            const cardEnd = cardStart + card.offsetWidth;

            // Se o card estiver quase fora da tela (a 100px do limite), aplica o efeito
            if (cardEnd < viewportStart + 100 || cardStart > viewportEnd - 100) {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.95)';
            } else {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
        });
    });
    // Dispara o evento de scroll inicial para aplicar o estilo aos cards no carregamento
    scrollContainer.dispatchEvent(new Event('scroll'));
}


// -----------------------------------------------------
// 4. INICIALIZAÇÃO ÚNICA (DOMContentLoaded)
// -----------------------------------------------------

// Garante que todas as funções rodem assim que o HTML estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initAnimaOnScroll(); 
    // Você pode comentar a linha abaixo se não quiser a barra transparente/escura
    navbarScroll(); 
    initCarrossel(); // ⬅️ Nova função do carrossel!
});