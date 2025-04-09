// Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animateParticles();

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .cta-button, .project-btn, .more-btn').forEach(element => {
    element.addEventListener('mouseover', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(0, 255, 255, 0.8)';
    });
    element.addEventListener('mouseout', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(0, 255, 255, 0.5)';
    });
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleClass: 'visible',
            once: true
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission (Simulated)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('https://api.example.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully! I’ll contact you soon.');
        this.reset();
    })
    .catch(error => {
        alert('Oops! Something went wrong. Please try again.');
    });
});

// Project Modals
document.querySelectorAll('.project-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Project details would appear in a modal here. Contact ThurZ for more info!');
    });
});
