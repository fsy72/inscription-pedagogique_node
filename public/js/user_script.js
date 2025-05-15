// Gestion du menu et du contenu
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    // Fonction pour basculer l'état de la barre latérale
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

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

    // Gestion du formulaire d'inscription
    const inscriptionForm = document.getElementById('inscription-form');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Formulaire soumis avec succès !');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logofsy');
    
    // Positions initiales des points (basées sur l'image du logo)
    const dotPositions = [
        { x: 50, y: 43 },
        { x: 85, y: 43 },
        { x: 85, y: 5 },
        { x: 120, y: 43 },
        { x: 155, y: 5 },
        { x: 190, y: 43 },
        { x: 190, y: 5 }
    ];
    
    const dots = [];
    
    // Créer les points
    dotPositions.forEach((pos, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.id = `dot-${index}`;
        dot.style.left = `${pos.x}px`;
        dot.style.top = `${pos.y}px`;
        logoContainer.appendChild(dot);
        dots.push(dot);
    });
    
    // Animation des points
    function animateDots() {
        dots.forEach((dot, index) => {
            // Créer un mouvement orbital autour de la position d'origine
            const time = Date.now() / 1000;

            // Faire briller les points de manière séquentielle
            const sequence = Math.floor(time * 2) % dots.length;
            if (index === sequence) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        requestAnimationFrame(animateDots);
    }
    
    // Démarrer l'animation
    animateDots();
});