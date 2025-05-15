const btn = document.getElementById('notifBtn');
const btn_text = document.querySelector('.notification-text');
let timeout;

btn.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    btn.classList.add('expanded');
    // btn_text.style.display = 'block';
});

btn.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
        btn.classList.remove('expanded');
        // btn_text.style.display = 'none';
    }, 1000); // Délai de 1 seconde avant repli
});


const socket = io();

// logo animation
document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logofsy');
    
    // Positions initiales des points (basées sur l'image du logo)
    const dotPositions = [
        { x: 50, y: 75 },  // Première ligne
        { x: 90, y: 75 },
        { x: 90, y: 30 },
        { x: 130, y: 75 }, // Deuxième ligne
        { x: 170, y: 30 },
        { x: 210, y: 75 },
        { x: 210, y: 30 }  // Troisième ligne
    ];
    
    const dots = [];
    const lines = [];
    
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
    
    // Créer les lignes entre les points
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const line = document.createElement('div');
            line.className = 'line';
            line.id = `line-${i}-${j}`;
            logoContainer.appendChild(line);
            lines.push({
                element: line,
                from: i,
                to: j
            });
        }
    }
    
    // Fonction pour mettre à jour les lignes entre les points
    function updateLines() {
        lines.forEach(line => {
            const dot1 = dots[line.from].getBoundingClientRect();
            const dot2 = dots[line.to].getBoundingClientRect();
            const logoRect = logoContainer.getBoundingClientRect();
            
            const x1 = dot1.left - logoRect.left + dot1.width/2;
            const y1 = dot1.top - logoRect.top + dot1.height/2;
            const x2 = dot2.left - logoRect.left + dot2.width/2;
            const y2 = dot2.top - logoRect.top + dot2.height/2;
            
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            line.element.style.width = `${distance}px`;
            line.element.style.height = '1px';
            line.element.style.left = `${x1}px`;
            line.element.style.top = `${y1}px`;
            line.element.style.transform = `rotate(${angle}deg)`;
            
            // Afficher la ligne seulement si les points sont proches
            if (distance < 60) {
                line.element.classList.add('active');
            } else {
                line.element.classList.remove('active');
            }
        });
    }
    
    // Animation des points
    function animateDots() {
        dots.forEach((dot, index) => {
            const originalX = dotPositions[index].x;
            const originalY = dotPositions[index].y;
            
            // Créer un mouvement orbital autour de la position d'origine
            const time = Date.now() / 1000;
            const radius = 15; // rayon de l'orbite
            const speed = 0.5 + (index * 0.2); // vitesse différente pour chaque point
            
            const offsetX = radius * Math.cos(time * speed + index);
            const offsetY = radius * Math.sin(time * speed + index);
            
            dot.style.left = `${originalX + offsetX}px`;
            dot.style.top = `${originalY + offsetY}px`;
            
            // Faire briller les points de manière séquentielle
            const sequence = Math.floor(time * 2) % dots.length;
            if (index === sequence) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        updateLines();
        requestAnimationFrame(animateDots);
    }
    
    // Démarrer l'animation
    animateDots();
});