const header = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');

let lastScrollY = window.scrollY;
let ticking = false;

function onScroll() {
    const currentScrollY = window.scrollY;

    // Condense or expand nav
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('condensed');
    } else if (currentScrollY < lastScrollY) {
        header.classList.remove('condensed');
    }

    lastScrollY = currentScrollY;

    // Highlight nav links
    const fromTop = currentScrollY + 100;
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass, .dark-glass').forEach(card => {
    observer.observe(card);
});

// 🧭 Toggle button for menu nav behavior
menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);

    if (!expanded) {
        header.classList.remove('condensed');
    } else {
        header.classList.add('condensed');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function loadSection(containerId, file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            lucide.createIcons(); // Refresh icons
            document.querySelectorAll(`#${containerId} .glass, #${containerId} .dark-glass`).forEach(card => {
                observer.observe(card);
            });
        })
        .catch(err => console.error(`Failed to load ${file}:`, err));
}

loadSection('projects-container', 'projects.html');
loadSection('skills-container', 'skills.html');
loadSection('education-container', 'education.html');
loadSection('contact-container', 'contact.html');

