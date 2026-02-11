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
            const status = team.dataset.status;
            
            let shouldShow = true;
            
            // Aplicar búsqueda
            if (this.searchTerm) {
                shouldShow = teamName.includes(this.searchTerm);
            }
            
            // Aplicar filtro
            if (shouldShow && this.currentFilter !== 'all') {
                switch(this.currentFilter) {
                    case 'top6':
                        // Para filtro Top 6, usar un array de equipos conocidos del Top 6
                        const top6Teams = ['arsenal', 'manchester city', 'liverpool', 'aston villa', 'tottenham hotspur', 'chelsea'];
                        shouldShow = top6Teams.includes(teamName);
                        break;
                    case 'mid-table':
                        shouldShow = status === 'mid-table';
                        break;
                    case 'relegation':
                        shouldShow = status === 'relegation';
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
        const closeBtn = document.querySelector('.modal-close');
        
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
        const teamLogo = teamCard.querySelector('.team-logo').innerHTML;
        const backgroundColor = teamCard.querySelector('.team-header').style.backgroundColor;
        
        // Datos específicos por equipo
        const teamDetails = {
            1: {
                founded: "1886",
                manager: "Mikel Arteta",
                capacity: "60,704",
                nickname: "The Gunners",
                topScorer: "Bukayo Saka (18 goles)",
                captain: "Martin Ødegaard"
            },
            2: {
                founded: "1880",
                manager: "Pep Guardiola",
                capacity: "53,400",
                nickname: "The Citizens",
                topScorer: "Erling Haaland (24 goles)",
                captain: "Kevin De Bruyne"
            },
            3: {
                founded: "1892",
                manager: "Arne Slot",
                capacity: "61,015",
                nickname: "The Reds",
                topScorer: "Mohamed Salah (20 goles)",
                captain: "Virgil van Dijk"
            },
            4: {
                founded: "1874",
                manager: "Unai Emery",
                capacity: "42,785",
                nickname: "The Villans",
                topScorer: "Ollie Watkins (15 goles)",
                captain: "John McGinn"
            },
            5: {
                founded: "1882",
                manager: "Ange Postecoglou",
                capacity: "62,850",
                nickname: "Spurs",
                topScorer: "Son Heung-min (16 goles)",
                captain: "Son Heung-min"
            },
            6: {
                founded: "1905",
                manager: "Enzo Maresca",
                capacity: "40,343",
                nickname: "The Blues",
                topScorer: "Cole Palmer (14 goles)",
                captain: "Reece James"
            },
            7: {
                founded: "1892",
                manager: "Eddie Howe",
                capacity: "52,305",
                nickname: "The Magpies",
                topScorer: "Alexander Isak (12 goles)",
                captain: "Jamaal Lascelles"
            },
            8: {
                founded: "1878",
                manager: "Erik ten Hag",
                capacity: "74,310",
                nickname: "The Red Devils",
                topScorer: "Rasmus Højlund (13 goles)",
                captain: "Bruno Fernandes"
            },
            9: {
                founded: "1895",
                manager: "Julen Lopetegui",
                capacity: "62,500",
                nickname: "The Hammers",
                topScorer: "Jarrod Bowen (11 goles)",
                captain: "Kurt Zouma"
            },
            10: {
                founded: "1905",
                manager: "Oliver Glasner",
                capacity: "25,486",
                nickname: "The Eagles",
                topScorer: "Jean-Philippe Mateta (10 goles)",
                captain: "Joachim Andersen"
            },
            11: {
                founded: "1901",
                manager: "Fabian Hürzeler",
                capacity: "31,876",
                nickname: "The Seagulls",
                topScorer: "João Pedro (9 goles)",
                captain: "Lewis Dunk"
            },
            12: {
                founded: "1899",
                manager: "Andoni Iraola",
                capacity: "11,307",
                nickname: "The Cherries",
                topScorer: "Dominic Solanke (17 goles)",
                captain: "Neto"
            },
            13: {
                founded: "1879",
                manager: "Marco Silva",
                capacity: "24,500",
                nickname: "The Cottagers",
                topScorer: "Rodrigo Muniz (8 goles)",
                captain: "Tom Cairney"
            },
            14: {
                founded: "1877",
                manager: "Gary O'Neil",
                capacity: "31,750",
                nickname: "Wolves",
                topScorer: "Matheus Cunha (9 goles)",
                captain: "Max Kilman"
            },
            15: {
                founded: "1878",
                manager: "Sean Dyche",
                capacity: "39,414",
                nickname: "The Toffees",
                topScorer: "Dominic Calvert-Lewin (7 goles)",
                captain: "Seamus Coleman"
            },
            16: {
                founded: "1889",
                manager: "Thomas Frank",
                capacity: "17,250",
                nickname: "The Bees",
                topScorer: "Ivan Toney (11 goles)",
                captain: "Christian Nørgaard"
            },
            17: {
                founded: "1865",
                manager: "Nuno Espírito Santo",
                capacity: "30,332",
                nickname: "The Reds",
                topScorer: "Chris Wood (6 goles)",
                captain: "Joe Worrall"
            },
            18: {
                founded: "1885",
                manager: "Rob Edwards",
                capacity: "11,850",
                nickname: "The Hatters",
                topScorer: "Elijah Adebayo (5 goles)",
                captain: "Tom Lockyer"
            },
            19: {
                founded: "1882",
                manager: "Vincent Kompany",
                capacity: "21,944",
                nickname: "The Clarets",
                topScorer: "Lyle Foster (4 goles)",
                captain: "Jack Cork"
            },
            20: {
                founded: "1889",
                manager: "Chris Wilder",
                capacity: "32,050",
                nickname: "The Blades",
                topScorer: "Oliver McBurnie (3 goles)",
                captain: "John Egan"
            }
        };
        
        const details = teamDetails[teamId] || {
            founded: "1900",
            manager: "Manager",
            capacity: "40,000",
            nickname: "Equipo",
            topScorer: "Jugador (0 goles)",
            captain: "Capitán"
        };
        
        // Contenido del modal
        modalBody.innerHTML = `
            <div class="team-details">
                <div class="details-header" style="background: ${backgroundColor}">
                    <div class="details-logo">
                        ${teamLogo}
                    </div>
                    <h2>${teamName}</h2>
                    <p>${teamStadium} • ${teamCity}</p>
                </div>
                <div class="details-content">
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Fundación</span>
                            <span class="detail-value">${details.founded}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Entrenador</span>
                            <span class="detail-value">${details.manager}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Capacidad</span>
                            <span class="detail-value">${details.capacity}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Apodo</span>
                            <span class="detail-value">${details.nickname}</span>
                        </div>
                    </div>
                    
                    <div class="player-highlight">
                        <h3>Estadísticas 2025/2026</h3>
                        <p><strong>Máximo goleador:</strong> ${details.topScorer}</p>
                        <p><strong>Capitán:</strong> ${details.captain}</p>
                        <p><strong>Última actualización:</strong> 1 de febrero de 2026</p>
                    </div>
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
