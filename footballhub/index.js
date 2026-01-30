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

// Agregar este código en tu archivo index.js o en un nuevo archivo

class Carousel {
    constructor() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselDots = document.querySelector('.carousel-dots');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.cardsData = this.getCardsData();
        this.currentIndex = 0;
        this.cardsPerView = this.calculateCardsPerView();
        this.autoRotateInterval = null;
        this.autoRotateDelay = 4000; // 4 segundos
        
        this.init();
    }
    
    getCardsData() {
        return [
            {
                icon: "⚽",
                title: "Goleadores Líderes",
                description: "Consulta los máximos anotadores de la temporada y sus estadísticas.",
                color: "#0b1c3d"
            },
            {
                icon: "📊",
                title: "Estadísticas",
                description: "Clasificaciones, goles y rendimiento por equipo.",
                color: "#1e4fa1"
            },
            {
                icon: "🔥",
                title: "Últimos Partidos",
                description: "Marcadores y fechas recientes en tiempo real.",
                color: "#f5c400"
            },
            {
                icon: "⭐",
                title: "Jugador del Mes",
                description: "Descubre al jugador destacado del mes en la Premier League.",
                color: "#2ecc71"
            },
            {
                icon: "🏆",
                title: "Próximos Encuentros",
                description: "No te pierdas los partidos más esperados de la semana.",
                color: "#e74c3c"
            },
            {
                icon: "📈",
                title: "Equipos en Ascenso",
                description: "Conoce los equipos que mejoran su posición en la tabla.",
                color: "#9b59b6"
            }
        ];
    }
    
    calculateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        return 3;
    }
    
    init() {
        this.renderCards();
        this.renderDots();
        this.setupEventListeners();
        this.startAutoRotate();
        this.updateCarousel();
        
        // Recalcular en redimensionamiento
        window.addEventListener('resize', () => {
            this.cardsPerView = this.calculateCardsPerView();
            this.updateCarousel();
        });
    }
    
    renderCards() {
        this.carouselTrack.innerHTML = '';
        
        this.cardsData.forEach((card, index) => {
            const cardElement = document.createElement('article');
            cardElement.className = 'carousel-card';
            cardElement.dataset.index = index;
            
            cardElement.innerHTML = `
                <div class="card-icon">${card.icon}</div>
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <div class="card-footer">
                    <span class="card-badge">Destacado</span>
                </div>
            `;
            
            this.carouselTrack.appendChild(cardElement);
        });
    }
    
    renderDots() {
        this.carouselDots.innerHTML = '';
        const totalSlides = Math.ceil(this.cardsData.length / this.cardsPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.dataset.slide = i;
            dot.addEventListener('click', () => this.goToSlide(i));
            this.carouselDots.appendChild(dot);
        }
    }
    
    updateCarousel() {
        const cardWidth = this.carouselTrack.querySelector('.carousel-card').offsetWidth;
        const gap = 24; // 1.5rem en px
        const translateX = -(this.currentIndex * (cardWidth + gap) * this.cardsPerView);
        this.carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar botones
        const maxIndex = Math.ceil(this.cardsData.length / this.cardsPerView) - 1;
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === maxIndex;
        
        // Actualizar dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Resaltar carta central
        this.highlightCenterCard();
    }
    
    highlightCenterCard() {
        const cards = document.querySelectorAll('.carousel-card');
        cards.forEach(card => card.classList.remove('highlighted'));
        
        const centerIndex = this.currentIndex * this.cardsPerView + Math.floor(this.cardsPerView / 2);
        if (cards[centerIndex]) {
            cards[centerIndex].classList.add('highlighted');
        }
    }
    
    goToSlide(index) {
        const maxIndex = Math.ceil(this.cardsData.length / this.cardsPerView) - 1;
        if (index < 0 || index > maxIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoRotate();
    }
    
    nextSlide() {
        const maxIndex = Math.ceil(this.cardsData.length / this.cardsPerView) - 1;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        } else {
            this.currentIndex = 0; // Volver al inicio
            this.updateCarousel();
        }
        this.resetAutoRotate();
    }
    
    prevSlide() {
        const maxIndex = Math.ceil(this.cardsData.length / this.cardsPerView) - 1;
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        } else {
            this.currentIndex = maxIndex; // Ir al final
            this.updateCarousel();
        }
        this.resetAutoRotate();
    }
    
    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoRotateDelay);
    }
    
    resetAutoRotate() {
        clearInterval(this.autoRotateInterval);
        this.startAutoRotate();
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Pausar auto-rotación al interactuar
        this.carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(this.autoRotateInterval);
        });
        
        this.carouselTrack.addEventListener('mouseleave', () => {
            this.startAutoRotate();
        });
        
        // Swipe en móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(this.autoRotateInterval);
        });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
            this.startAutoRotate();
        });
        
        // Click en cards
        this.carouselTrack.addEventListener('click', (e) => {
            const card = e.target.closest('.carousel-card');
            if (card) {
                this.handleCardClick(card.dataset.index);
            }
        });
    }
    
    handleSwipe() {
        const minSwipeDistance = 50;
        const distance = touchStartX - touchEndX;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        if (distance > 0) {
            this.nextSlide(); // Swipe izquierda
        } else {
            this.prevSlide(); // Swipe derecha
        }
    }
    
    handleCardClick(index) {
        // Aquí puedes agregar lo que quieras que pase al hacer clic en una card
        console.log(`Card ${index} clickeada`);
        // Ejemplo: window.location.href = `/detalles/${index}`;
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});