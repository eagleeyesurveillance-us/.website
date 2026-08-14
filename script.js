const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current >= target) {
                stat.textContent = target;
            } else {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(update);
            }
        };

        update();
    });
}

const heroSection = document.querySelector('.hero');
const counterObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
        }
    },
    { threshold: 0.5 }
);

if (heroSection) counterObserver.observe(heroSection);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--mouse-x', `${x}px`);
        btn.style.setProperty('--mouse-y', `${y}px`);
    });
});

const sendEmailBtn = document.getElementById('sendEmailBtn');

if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const mailtoLink = sendEmailBtn.getAttribute('href');
        const gmailFallback = sendEmailBtn.getAttribute('data-gmail-fallback');

        sendEmailBtn.innerHTML = '<i class="fas fa-check"></i> Opening your email app...';


        let mailAppOpened = false;
        const onBlur = () => { mailAppOpened = true; };
        window.addEventListener('blur', onBlur);


        window.location.href = mailtoLink;

        setTimeout(() => {
            window.removeEventListener('blur', onBlur);
            if (!mailAppOpened && gmailFallback) {
                window.open(gmailFallback, '_blank', 'noopener,noreferrer');
            }
            sendEmailBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Email via Gmail';
        }, 1000);
    });
}

document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.5;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

document.querySelectorAll('.card, .about-card, .feature-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
