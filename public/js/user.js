document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Gestion des sections
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Active l'élément du menu
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Affiche la section correspondante
            const sectionId = this.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
});

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const menuToggleRepli = document.querySelector('.menu-toggle-repli');
const sidebar = document.querySelector('.sidebar');

if(menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    menuToggleRepli.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
    
    // Close sidebar when clicking outside on mobile
    // document.addEventListener('click', (e) => {
    //     if (window.innerWidth < 900) {
    //         if (!sidebar.contains(e.target) && e.target !== menuToggle) {
    //             sidebar.classList.remove('active');
    //         }
    //     }
    // });
}

// Notification dropdown functionality
const notificationBtn = document.querySelector('.notification-btn');

if(notificationBtn) {
    // Create dropdown element
    const notificationDropdown = document.createElement('div');
    notificationDropdown.className = 'notification-dropdown';
    notificationDropdown.style.position = 'absolute';
    notificationDropdown.style.top = '50px';
    notificationDropdown.style.right = '0';
    notificationDropdown.style.width = '300px';
    notificationDropdown.style.backgroundColor = 'var(--card-bg)';
    notificationDropdown.style.borderRadius = 'var(--border-radius)';
    notificationDropdown.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    notificationDropdown.style.padding = '1rem';
    notificationDropdown.style.zIndex = '200';
    notificationDropdown.style.display = 'none';
    
    // Add notification content
    notificationDropdown.innerHTML = `
        <h3 style="margin-bottom: 1rem; font-size: 1rem; font-weight: 600;">Notifications</h3>
        <div class="notification-item" style="padding: 0.75rem 0; border-bottom: 1px solid rgba(0, 0, 0, 0.05);">
            <div style="font-weight: 500; margin-bottom: 0.25rem;">Nouveau message reçu</div>
            <div style="font-size: 0.8rem; color: var(--text-light);">Il y a 30 minutes</div>
        </div>
        <div class="notification-item" style="padding: 0.75rem 0; border-bottom: 1px solid rgba(0, 0, 0, 0.05);">
            <div style="font-weight: 500; margin-bottom: 0.25rem;">Mise à jour disponible</div>
            <div style="font-size: 0.8rem; color: var(--text-light);">Il y a 2 heures</div>
        </div>
        <div class="notification-item" style="padding: 0.75rem 0;">
            <div style="font-weight: 500; margin-bottom: 0.25rem;">Rappel: Rendez-vous demain</div>
            <div style="font-size: 0.8rem; color: var(--text-light);">Il y a 1 jour</div>
        </div>
        <a onclick="document.querySelector('a[data-section="notification"]').click()"
            style="
                display: block; 
                text-align: center; 
                margin-top: 0.75rem; 
                color: var(--primary-color); 
                font-size: 0.9rem; 
                text-decoration: none; 
                cursor: pointer;
                font-weight: 500;">
            Voir toutes les notifications
        </a>
    `;
    
    // Add dropdown to the DOM
    document.body.appendChild(notificationDropdown);
    
    // Toggle dropdown on click
    let isDropdownOpen = false;
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            const rect = notificationBtn.getBoundingClientRect();
            notificationDropdown.style.display = 'block';
            notificationDropdown.style.top = (rect.bottom + window.scrollY) + 'px';
            notificationDropdown.style.right = (window.innerWidth - rect.right) + 'px';
        } else {
            notificationDropdown.style.display = 'none';
        }
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', () => {
        if (isDropdownOpen) {
            notificationDropdown.style.display = 'none';
            isDropdownOpen = false;
        }
    });
}

// Add charts for visualization
// Create and append a canvas element for the chart
const dashboardGrid = document.querySelector('.dashboard-grid');
if (dashboardGrid) {
    // Add a chart card
    const chartCard = document.createElement('div');
    chartCard.className = 'card';
    chartCard.style.gridColumn = '1 / -1';
    chartCard.innerHTML = `
        <div class="card-header">
            <h2 class="card-title">Aperçu des dépenses</h2>
            <div>
                <select id="chartPeriod" style="padding: 0.3rem 0.5rem; border-radius: var(--border-radius); border: 1px solid #e2e8f0;">
                    <option value="week">Cette semaine</option>
                    <option value="month" selected>Ce mois</option>
                    <option value="year">Cette année</option>
                </select>
            </div>
        </div>
        <div style="height: 300px; margin-top: 1rem;">
            <canvas id="expenseChart"></canvas>
        </div>
    `;
    
    // Insert chart card after dashboard stats
    dashboardGrid.insertAdjacentElement('afterend', chartCard);
    
    // Load Chart.js from CDN
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    document.head.appendChild(chartScript);
    
    // Initialize chart when script is loaded
    chartScript.onload = function() {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        
        // Sample data
        const chartData = {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [{
                label: 'Dépenses',
                data: [1200, 1900, 1500, 2200, 1800, 2400],
                backgroundColor: 'rgba(67, 97, 238, 0.2)',
                borderColor: 'rgba(67, 97, 238, 1)',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: 'rgba(67, 97, 238, 1)',
            }]
        };
        
        // Chart options
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                    }
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        };
        
        // Create chart
        const expenseChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
        
        // Update chart based on period selection
        const chartPeriod = document.getElementById('chartPeriod');
        chartPeriod.addEventListener('change', function() {
            let newLabels = [];
            let newData = [];
            
            switch(this.value) {
                case 'week':
                    newLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
                    newData = [320, 450, 280, 550, 490, 680, 420];
                    break;
                case 'month':
                    newLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
                    newData = [1200, 1900, 1500, 2200, 1800, 2400];
                    break;
                case 'year':
                    newLabels = ['2024', '2025'];
                    newData = [12500, 15800];
                    break;
            }
            
            expenseChart.data.labels = newLabels;
            expenseChart.data.datasets[0].data = newData;
            expenseChart.update();
        });
    };
}

// Add upcoming events section
const activityFeed = document.querySelector('.activity-feed');
if (activityFeed) {
    const eventsSection = document.createElement('div');
    eventsSection.className = 'activity-feed';
    eventsSection.style.marginTop = '2rem';
    
    eventsSection.innerHTML = `
        <div class="card-header">
            <h2 class="card-title">Événements à venir</h2>
            <a class="view-all">Gérer le calendrier</a>
        </div>
        <div class="events-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div class="event-card" style="background-color: rgba(67, 97, 238, 0.1); border-left: 4px solid var(--primary-color); padding: 1rem; border-radius: var(--border-radius);">
                <div style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem;">30 Avril 2025 • 10:00</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Réunion d'équipe</h4>
                <div style="display: flex; align-items: center; font-size: 0.9rem; color: var(--text-light);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Salle de conférence
                </div>
            </div>
            <div class="event-card" style="background-color: rgba(76, 201, 240, 0.1); border-left: 4px solid var(--accent-color); padding: 1rem; border-radius: var(--border-radius);">
                <div style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 0.5rem;">2 Mai 2025 • 14:30</div>
                <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Rendez-vous médical</h4>
                <div style="display: flex; align-items: center; font-size: 0.9rem; color: var(--text-light);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Centre médical
                </div>
            </div>
        </div>
    `;
    
    // Insert events section after activity feed
    activityFeed.insertAdjacentElement('afterend', eventsSection);
}

// Add loading animation (for demonstration)
window.addEventListener('load', function() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.transition = 'opacity 0.5s ease';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.border = '4px solid rgba(67, 97, 238, 0.1)';
    spinner.style.borderTopColor = 'var(--primary-color)';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Add keyframes for spinner animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleElement);
    
    loadingOverlay.appendChild(spinner);
    document.body.appendChild(loadingOverlay);
    
    // Hide loading overlay after 800ms
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }, 800);
});