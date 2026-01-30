// teams.js - Filtros y búsqueda para la página de equipos

class TeamsManager {
    constructor() {
        this.teamsContainer = document.getElementById('teams-container');
        this.noResults = document.getElementById('no-results');
        this.searchInput = document.getElementById('team-search');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.initialize();
    }
    
    initialize() {
        this.setupEventListeners();
        this.setupModal();
    }
    
    setupEventListeners() {
        // Búsqueda
        this.searchInput.addEventListener('input', () => {
            this.searchTerm = this.searchInput.value.trim().toLowerCase();
            this.filterTeams();
        });
        
        // Botón de búsqueda
        document.querySelector('.search-btn').addEventListener('click', () => {
            this.searchTerm = this.searchInput.value.trim().toLowerCase();
            this.filterTeams();
        });
        
        // Filtros
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Actualizar botones activos
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Aplicar filtro
                this.currentFilter = btn.dataset.filter;
                this.filterTeams();
            });
        });
        
        // Tecla Enter en búsqueda
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchTerm = this.searchInput.value.trim().toLowerCase();
                this.filterTeams();
            }
        });
    }
    
    filterTeams() {
        const teams = document.querySelectorAll('.team-card');
        let visibleCount = 0;
        
        teams.forEach(team => {
            const teamName = team.querySelector('.team-name').textContent.toLowerCase();
            const position = parseInt(team.dataset.position);
            const status = team.dataset.status;
            const points = parseInt(team.dataset.points);
            
            let shouldShow = true;
            
            // Aplicar búsqueda
            if (this.searchTerm) {
                shouldShow = teamName.includes(this.searchTerm);
            }
            
            // Aplicar filtro
            if (shouldShow && this.currentFilter !== 'all') {
                switch(this.currentFilter) {
                    case 'top6':
                        shouldShow = position <= 6;
                        break;
                    case 'mid-table':
                        shouldShow = position > 6 && position <= 16;
                        break;
                    case 'relegation':
                        shouldShow = position >= 17;
                        break;
                    case 'europe':
                        shouldShow = status === 'champions-league' || status === 'europa';
                        break;
                }
            }
            
            // Mostrar/ocultar
            team.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) visibleCount++;
        });
        
        // Mostrar mensaje si no hay resultados
        this.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    
    setupModal() {
        const modal = document.getElementById('team-modal');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.querySelector('.modal-close');
        
        // Datos detallados de los equipos (podrías mover esto a HTML también)
        const teamDetails = {
            1: {
                name: "Arsenal",
                founded: 1886,
                manager: "Mikel Arteta",
                stadium: "Emirates Stadium",
                capacity: "60,704",
                city: "Londres",
                wins: 26,
                draws: 6,
                losses: 6,
                goalsFor: 88,
                goalsAgainst: 43
            },
            2: {
                name: "Manchester City",
                founded: 1880,
                manager: "Pep Guardiola",
                stadium: "Etihad Stadium",
                capacity: "53,400",
                city: "Mánchester",
                wins: 28,
                draws: 7,
                losses: 3,
                goalsFor: 96,
                goalsAgainst: 34
            },
            3: {
                name: "Liverpool",
                founded: 1892,
                manager: "Jürgen Klopp",
                stadium: "Anfield",
                capacity: "61,015",
                city: "Liverpool",
                wins: 24,
                draws: 10,
                losses: 4,
                goalsFor: 86,
                goalsAgainst: 41
            }
            // Agrega los demás equipos aquí...
        };
        
        // Abrir modal al hacer click en botón "Ver Detalles"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details-btn')) {
                const teamId = e.target.dataset.teamId;
                this.showTeamDetails(teamId);
            }
        });
        
        // Abrir modal al hacer click en la card completa
        document.addEventListener('click', (e) => {
            const teamCard = e.target.closest('.team-card');
            if (teamCard && !e.target.classList.contains('view-details-btn')) {
                const teamId = teamCard.dataset.teamId;
                this.showTeamDetails(teamId);
            }
        });
        
        // Cerrar modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Cerrar al hacer click fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    }
    
    showTeamDetails(teamId) {
        const modal = document.getElementById('team-modal');
        const modalBody = document.getElementById('modal-body');
        
        // Buscar la card del equipo para obtener datos
        const teamCard = document.querySelector(`[data-team-id="${teamId}"]`);
        const teamName = teamCard.querySelector('.team-name').textContent;
        const teamStadium = teamCard.querySelector('.team-stadium').textContent;
        const teamCity = teamCard.querySelector('.team-city').textContent;
        const position = teamCard.dataset.position;
        const points = teamCard.dataset.points;
        
        // Datos de ejemplo (en un proyecto real estos vendrían de una base de datos)
        const teamInfo = {
            founded: "1886",
            manager: "Manager Ejemplo",
            capacity: "60,000",
            nickname: "The Gunners",
            topScorer: "Bukayo Saka (16 goles)",
            captain: "Martin Ødegaard"
        };
        
        // Contenido del modal
        modalBody.innerHTML = `
            <div class="team-details">
                <div class="details-header" style="${teamCard.querySelector('.team-header').style.cssText}">
                    <div class="details-logo">
                        ${teamCard.querySelector('.team-logo').innerHTML}
                    </div>
                    <h2>${teamName}</h2>
                    <p>${teamStadium} • ${teamCity}</p>
                </div>
                <div class="details-content">
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Posición</span>
                            <span class="detail-value">${position}°</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Puntos</span>
                            <span class="detail-value">${points}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Fundación</span>
                            <span class="detail-value">${teamInfo.founded}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Entrenador</span>
                            <span class="detail-value">${teamInfo.manager}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Capacidad</span>
                            <span class="detail-value">${teamInfo.capacity}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Apodo</span>
                            <span class="detail-value">${teamInfo.nickname}</span>
                        </div>
                    </div>
                    
                    <div class="player-highlight">
                        <h3>Jugador Destacado</h3>
                        <p>${teamInfo.topScorer}</p>
                        <p><strong>Capitán:</strong> ${teamInfo.captain}</p>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn primary" onclick="alert('Ver más información de ${teamName}')">
                            Ver Plantilla Completa
                        </button>
                        <button class="btn secondary" onclick="alert('Ver próximos partidos de ${teamName}')">
                            Ver Partidos
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TeamsManager();
});