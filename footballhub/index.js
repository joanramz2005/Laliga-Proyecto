document.addEventListener("DOMContentLoaded", () => {
    let lastScroll = 0;
    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        // arriba del todo → siempre visible
        if (currentScroll <= 0) {
            header.classList.remove("hide");
            lastScroll = 0;
            return;
        }

        // bajando
        if (currentScroll > lastScroll) {
            header.classList.add("hide");
        } 
        // subiendo
        else {
            header.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });
});

/*DESTACADO*/

// Agregar este código en tu archivo index.js

class RotatingCarousel {
    constructor() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselDots = document.querySelector('.carousel-dots');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentPosition = document.querySelector('.current-position');
        this.totalSlides = document.querySelector('.total-slides');
        
        this.cards = Array.from(document.querySelectorAll('.carousel-card'));
        this.currentIndex = 0;
        this.cardsPerView = this.calculateCardsPerView();
        this.totalSlidesCount = 0;
        this.autoRotateInterval = null;
        this.autoRotateDelay = 5000; // 5 segundos
        
        this.init();
    }
    
    calculateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        return 3;
    }
    
    init() {
        this.updateTotalSlides();
        this.renderDots();
        this.setupEventListeners();
        this.startAutoRotate();
        this.updateCarousel();
        
        // Recalcular en redimensionamiento
        window.addEventListener('resize', () => {
            this.cardsPerView = this.calculateCardsPerView();
            this.updateTotalSlides();
            this.renderDots();
            this.updateCarousel();
        });
    }
    
    updateTotalSlides() {
        this.totalSlidesCount = Math.ceil(this.cards.length / this.cardsPerView);
        if (this.totalSlides) {
            this.totalSlides.textContent = this.totalSlidesCount;
        }
    }
    
    renderDots() {
        this.carouselDots.innerHTML = '';
        
        for (let i = 0; i < this.totalSlidesCount; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.dataset.slide = i;
            dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.carouselDots.appendChild(dot);
        }
    }
    
    updateCarousel() {
        const cardWidth = this.cards[0]?.offsetWidth || 300;
        const gap = 24; // 1.5rem en px
        const translateX = -(this.currentIndex * (cardWidth + gap) * this.cardsPerView);
        this.carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar botones
        const maxIndex = this.totalSlidesCount - 1;
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === maxIndex;
        
        // Actualizar dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar posición
        if (this.currentPosition) {
            this.currentPosition.textContent = this.currentIndex + 1;
        }
        
        // Agregar animación a las cards visibles
        this.animateVisibleCards();
    }
    
    animateVisibleCards() {
        // Remover animación anterior
        this.cards.forEach(card => card.classList.remove('active-card'));
        
        // Calcular índices de cards visibles
        const startIndex = this.currentIndex * this.cardsPerView;
        const endIndex = startIndex + this.cardsPerView;
        
        // Aplicar animación a cards visibles
        this.cards.slice(startIndex, endIndex).forEach(card => {
            card.classList.add('active-card');
        });
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.totalSlidesCount) return;
        
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    nextSlide() {
        if (this.currentIndex < this.totalSlidesCount - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Volver al inicio
        }
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.totalSlidesCount - 1; // Ir al final
        }
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    startAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
        
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoRotateDelay);
    }
    
    resetAutoRotate() {
        this.startAutoRotate();
    }
    
    setupEventListeners() {
        // Controles de navegación
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Pausar auto-rotación al interactuar
        this.carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(this.autoRotateInterval);
        });
        
        this.carouselTrack.addEventListener('mouseleave', () => {
            this.startAutoRotate();
        });
        
        // Swipe para móviles
        this.setupSwipe();
        
        // Click en cards
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const cardId = card.dataset.cardId;
                this.handleCardClick(cardId);
            });
        });
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    setupSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(this.autoRotateInterval);
        }, { passive: true });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipeGesture(touchStartX, touchEndX);
            this.startAutoRotate();
        }, { passive: true });
    }
    
    handleSwipeGesture(startX, endX) {
        const minSwipeDistance = 50;
        const distance = startX - endX;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        if (distance > 0) {
            this.nextSlide(); // Swipe izquierda
        } else {
            this.prevSlide(); // Swipe derecha
        }
    }
    
    handleCardClick(cardId) {
        // Aquí puedes redirigir o mostrar más información
        console.log(`Card ${cardId} clickeada`);
        
        // Ejemplo: Mostrar mensaje según la card
        const messages = {
            '1': 'Redirigiendo a Goleadores...',
            '2': 'Redirigiendo a Estadísticas...',
            '3': 'Redirigiendo a Partidos...',
            '4': 'Redirigiendo a Jugador del Mes...',
            '5': 'Redirigiendo a Calendario...',
            '6': 'Redirigiendo a Equipos en Ascenso...'
        };
        
        alert(messages[cardId] || 'Más información disponible próximamente');
        
        // O redirigir a una página específica
        // window.location.href = `/destacados/${cardId}`;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrusel
    new RotatingCarousel();
    
    // También mantener tu código existente del header si lo necesitas
    let lastScroll = 0;
    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                header.classList.remove("hide");
                lastScroll = 0;
                return;
            }

            if (currentScroll > lastScroll) {
                header.classList.add("hide");
            } else {
                header.classList.remove("hide");
            }

            lastScroll = currentScroll;
        });
    }
});