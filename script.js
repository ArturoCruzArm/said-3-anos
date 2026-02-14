/**
 * LOS 3 AÑOS DE SAID - JavaScript Mágico
 * Animaciones con Anime.js + Efectos especiales
 */

// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================
const CONFIG = {
    particleCount: 50,
    balloonCount: 8,
    confettiCount: 100,
    animationDelay: 500
};

// ========================================
// LOADER Y INICIO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initBalloons();

    // Simular carga y comenzar animaciones
    setTimeout(() => {
        hideLoader();
        setTimeout(() => {
            initHeroAnimations();
            initScrollAnimations();
            launchConfetti();
        }, 300);
    }, 2500);
});

function hideLoader() {
    const loader = document.getElementById('magic-loader');
    loader.classList.add('hidden');

    // Marcar foto como cargada
    setTimeout(() => {
        document.querySelector('.photo-frame-container').classList.add('loaded');
    }, 500);
}

// ========================================
// PARTÍCULAS DE FONDO MÁGICAS
// ========================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#d4a855' : '#f5c6d6';
            this.pulse = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += 0.02;
            this.currentOpacity = this.opacity * (0.5 + Math.sin(this.pulse) * 0.5);

            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.currentOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Crear partículas
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// ========================================
// GLOBOS FLOTANTES
// ========================================
function initBalloons() {
    const container = document.getElementById('balloons-container');
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎁', '⭐', '🎀'];

    for (let i = 0; i < CONFIG.balloonCount; i++) {
        createBalloon(container, balloonEmojis, i);
    }
}

function createBalloon(container, emojis, index) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDelay = `${index * 2}s`;
    balloon.style.animationDuration = `${12 + Math.random() * 8}s`;
    container.appendChild(balloon);
}

// ========================================
// CONFETTI EXPLOSION
// ========================================
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#d4a855', '#f5c6d6', '#e8a4b8', '#f0d496', '#ffffff', '#ff6b6b'];
    const shapes = ['square', 'circle', 'triangle'];

    for (let i = 0; i < CONFIG.confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(container, colors, shapes);
        }, i * 30);
    }
}

function createConfettiPiece(container, colors, shapes) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 10 + 5;
    const startX = Math.random() * window.innerWidth;

    confetti.style.cssText = `
        left: ${startX}px;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        ${shape === 'circle' ? 'border-radius: 50%;' : ''}
        ${shape === 'triangle' ? `
            width: 0;
            height: 0;
            background: transparent;
            border-left: ${size/2}px solid transparent;
            border-right: ${size/2}px solid transparent;
            border-bottom: ${size}px solid ${color};
        ` : ''}
    `;

    container.appendChild(confetti);

    // Animar con Anime.js
    anime({
        targets: confetti,
        translateY: window.innerHeight + 100,
        translateX: () => anime.random(-200, 200),
        rotate: () => anime.random(0, 720),
        opacity: [1, 0],
        duration: () => anime.random(3000, 5000),
        easing: 'easeOutQuad',
        complete: () => confetti.remove()
    });
}

// ========================================
// ANIMACIONES DEL HERO
// ========================================
function initHeroAnimations() {
    // Timeline principal
    const tl = anime.timeline({
        easing: 'easeOutExpo'
    });

    // Palabras del título
    tl.add({
        targets: '.title-line .word',
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(150)
    });

    // Número grande "3"
    tl.add({
        targets: '.big-number',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, 0.5)'
    }, '-=600');

    // Nombre "Said"
    tl.add({
        targets: '.name-said',
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        duration: 1000
    }, '-=800');

    // Marco de la foto
    tl.add({
        targets: '.photo-frame',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutQuart'
    }, '-=600');

    // Efecto 3D en hover de la foto
    initPhotoHoverEffect();
}

function initPhotoHoverEffect() {
    const photoFrame = document.querySelector('.photo-frame');
    const container = document.querySelector('.photo-frame-container');

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        photoFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        anime({
            targets: photoFrame,
            rotateX: 0,
            rotateY: 0,
            duration: 500,
            easing: 'easeOutQuart'
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                animateSection(section);
                observer.unobserve(section);
            }
        });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll('#message, #video, #wishes').forEach(section => {
        observer.observe(section);
    });
}

function animateSection(section) {
    switch (section.id) {
        case 'message':
            animateMessageSection();
            break;
        case 'video':
            animateVideoSection();
            break;
        case 'wishes':
            animateWishesSection();
            break;
    }
}

function animateMessageSection() {
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
        targets: '.decorative-line',
        scaleY: [0, 1],
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 800
    });

    tl.add({
        targets: '.message-title',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=400');

    tl.add({
        targets: '.message-text',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(200)
    }, '-=400');

    tl.add({
        targets: '.heart-divider',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutElastic(1, 0.5)'
    }, '-=200');

    tl.add({
        targets: '.message-blessing',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
    }, '-=300');
}

function animateVideoSection() {
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
        targets: '.video-title',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    });

    tl.add({
        targets: '.video-description',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
    }, '-=400');

    tl.add({
        targets: '.video-frame',
        translateY: [40, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 1000
    }, '-=400');
}

// Fallback: si después de 5s el video sigue invisible, forzar visibilidad
setTimeout(() => {
    const videoFrame = document.querySelector('.video-frame');
    const videoTitle = document.querySelector('.video-title');
    const videoDesc = document.querySelector('.video-description');
    if (videoFrame && getComputedStyle(videoFrame).opacity === '0') {
        videoFrame.style.opacity = '1';
        videoFrame.style.transform = 'none';
    }
    if (videoTitle && getComputedStyle(videoTitle).opacity === '0') {
        videoTitle.style.opacity = '1';
        videoTitle.style.transform = 'none';
    }
    if (videoDesc && getComputedStyle(videoDesc).opacity === '0') {
        videoDesc.style.opacity = '1';
        videoDesc.style.transform = 'none';
    }
}, 5000);

function animateWishesSection() {
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
        targets: '.cake-icon',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, 0.5)'
    });

    tl.add({
        targets: '.wishes-title',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=400');

    tl.add({
        targets: '.wishes-name',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800
    }, '-=400');

    tl.add({
        targets: '.wishes-message p',
        opacity: [0, 1],
        duration: 600
    }, '-=200');

    tl.add({
        targets: '.wish-word',
        translateY: [20, 0],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(150)
    }, '-=300');

    tl.add({
        targets: '.final-hearts span',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(150),
        easing: 'easeOutElastic(1, 0.5)',
        complete: () => {
            document.querySelectorAll('.final-hearts span').forEach(heart => {
                heart.classList.add('animate');
            });
        }
    }, '-=200');

    tl.add({
        targets: '.champion-text',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=300');

    // Lanzar más confetti al llegar a wishes
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfettiPiece(
                    document.getElementById('confetti-container'),
                    ['#d4a855', '#f5c6d6', '#e8a4b8', '#f0d496', '#ffffff'],
                    ['square', 'circle']
                );
            }, i * 50);
        }
    }, 1000);
}

// ========================================
// MÚSICA DE FONDO
// ========================================
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });
}

// ========================================
// EFECTOS ADICIONALES
// ========================================

// Parallax suave en scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelectorAll('.float-star, .float-heart');

            floatingElements.forEach((el) => {
                const speed = el.dataset.speed || 1;
                el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });

            ticking = false;
        });
        ticking = true;
    }
});

// Efecto de brillo en highlights al hover
document.querySelectorAll('.highlight').forEach(el => {
    el.addEventListener('mouseenter', () => {
        anime({
            targets: el,
            scale: [1, 1.05, 1],
            duration: 400,
            easing: 'easeOutElastic(1, 0.5)'
        });
    });
});

// Crear más globos periódicamente
setInterval(() => {
    if (document.querySelectorAll('.balloon').length < 15) {
        createBalloon(
            document.getElementById('balloons-container'),
            ['🎈', '🎈', '⭐', '🎀', '🎁'],
            0
        );
    }
}, 5000);

// Limpiar globos que ya subieron
setInterval(() => {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        const rect = balloon.getBoundingClientRect();
        if (rect.bottom < -100) {
            balloon.remove();
        }
    });
}, 3000);

console.log('🎂 ¡Felices 3 Años Said! 🎈');
