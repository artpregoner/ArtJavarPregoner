function createStars() {
    const stars = document.createElement('div');
    stars.className = 'stars';
    
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 3 + Math.random() * 4;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.setProperty('--duration', `${duration}s`);
        
        stars.appendChild(star);
    }
    
    return stars;
}

document.body.innerHTML = `
    <div class="circles">
        ${Array(15).fill().map(() => '<div></div>').join('')}
    </div>
    <div class="container">
        <div class="border-glow"></div>
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
        ${document.querySelector('h1').outerHTML}
    </div>
`;

document.body.prepend(createStars());

const circles = document.querySelectorAll('.circles div');
circles.forEach((circle, index) => {
    const size = Math.random() * 150 + 50;
    const delay = index * 0.7;
    const duration = 15 + Math.random() * 10;
    
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${Math.random() * 100}%`;
    circle.style.animationDelay = `${delay}s`;
    circle.style.animationDuration = `${duration}s`;
});

const container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 40;
    const angleY = (centerX - x) / 40;
    
    container.style.transform = `
        perspective(1000px) 
        rotateX(${angleX}deg) 
        rotateY(${angleY}deg)
        scale(1.02)
    `;
});

container.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
});

document.addEventListener('DOMContentLoaded', function() {
const heading = document.querySelector('h1');

heading.addEventListener('click', function() {
const colors = [
    '#00ff00',
    '#ff00ff',
    '#00ffff',
    '#ffff00',
    '#ff3366',
    '#66ff33'
];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

heading.style.textShadow = `
    0 0 10px ${randomColor},
    0 0 20px ${randomColor},
    0 0 40px ${randomColor},
    0 0 80px ${randomColor}
`;

heading.style.animation = 'none';
heading.offsetHeight; 
heading.style.animation = 'floatText 3s ease-in-out infinite';
});

let currentX = 0;
let currentY = 0;
let aimX = 0;
let aimY = 0;

document.addEventListener('mousemove', function(e) {
aimX = (e.clientX / window.innerWidth) * 30;
aimY = (e.clientY / window.innerHeight) * 30;
});

function updatePosition() {
const diffX = aimX - currentX;
const diffY = aimY - currentY;

currentX += diffX * 0.1;
currentY += diffY * 0.1;

heading.style.transform = `translate(${currentX}px, ${currentY}px)`;
requestAnimationFrame(updatePosition);
}

updatePosition();
});