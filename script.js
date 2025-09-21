// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle with persistence
const themeToggle = document.getElementById('theme-toggle');
const rootHtml = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') rootHtml.classList.add('dark');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        rootHtml.classList.toggle('dark');
        const isDark = rootHtml.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        // update theme-color meta
        const metaTheme = document.getElementById('theme-color');
        if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0b1220' : '#ffffff');
    });
    // Initialize icon state
    const isDark = rootHtml.classList.contains('dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    // initial theme-color sync
    const metaTheme = document.getElementById('theme-color');
    if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0b1220' : '#ffffff');
}

// Typing effect for hero name
function typingEffect(el) {
    if (!el) return;
    const text = el.dataset.text || el.textContent || '';
    el.textContent = '';
    let i = 0;
    const tick = () => {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(tick, 120);
        }
    };
    tick();
}
typingEffect(document.querySelector('.typing-text'));

// Particles background in hero
function spawnParticles(containerId, count = 24) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = -10 + Math.random() * 20 + 'px';
        p.style.animationDelay = (Math.random() * 12).toFixed(2) + 's';
        p.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);
        container.appendChild(p);
    }
}
spawnParticles('particles', 28);

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(c => {
        const target = parseInt(c.dataset.count || '0', 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 80));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            c.textContent = current.toString();
        }, 20);
    });
}

// Skill bars animation on in-view
function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(el => {
        const w = el.getAttribute('data-width');
        el.style.width = w ? w + '%' : '0%';
    });
}

// Scroll reveal using IntersectionObserver
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('skills')) animateSkillBars();
            if (entry.target.classList.contains('hero')) animateCounters();
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('will-reveal');
    io.observe(sec);
});

// Projects filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        projects.forEach(card => {
            const show = f === 'all' || card.dataset.category === f;
            card.style.display = show ? 'block' : 'none';
        });
    });
});

// Testimonials simple slider (dots switch active card)
const dots = document.querySelectorAll('.testimonial-nav .nav-dot');
const cards = document.querySelectorAll('.testimonials-container .testimonial-card');
function activateSlide(idx) {
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}
dots.forEach(d => {
    d.addEventListener('click', () => activateSlide(parseInt(d.dataset.slide, 10)));
});
// Auto-cycle every 6s
let slideIdx = 0;
if (cards.length) {
    activateSlide(0);
    setInterval(() => {
        slideIdx = (slideIdx + 1) % cards.length;
        activateSlide(slideIdx);
    }, 6000);
}