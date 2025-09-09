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

// Toggle button for menu nav behavior
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

        document.documentElement.classList.remove('pre-scroll-lock');
        document.body.classList.remove('pre-scroll-lock');

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }, 10);
        }
    });
});

function setupSkillsObserver(container) {
    const categories = Array.from(container.querySelectorAll('.skills-category'));
    const dividers = Array.from(container.querySelectorAll('.category-divider'));
    const animationQueue = [];
    let animating = false;

    function animateNext() {
        if (animationQueue.length === 0) {
            animating = false;
            return;
        }

        animating = true;
        const index = animationQueue.shift();

        const category = categories[index];
        const divider = dividers[index];

        category.classList.add('visible');
        if (divider) divider.classList.add('visible');

        setTimeout(() => {
            animateNext();
        }, 500);
    }

    const categoryObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const index = categories.indexOf(entry.target);

            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                animationQueue.push(index);

                if (!animating) {
                    animateNext();
                }
            }
        });
    }, { threshold: 0.7 });

    categories.forEach(category => categoryObserver.observe(category));
}

function safeCreateIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        try {
            lucide.createIcons({
                attrs: {
                    class: "lucide"
                }
            });
        } catch (e) {
            console.warn('Error creating icons:', e);
            try {
                lucide.createIcons();
            } catch (e) {
                console.error('Failed to create icons:', e);
            }
        }
    }
}

function loadSection(containerId, file) {
    return fetch(file)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById(containerId);
            container.innerHTML = html;
            safeCreateIcons();

            document.querySelectorAll(`#${containerId} .glass, #${containerId} .dark-glass`).forEach(card => {
                observer.observe(card);
            });

            if (containerId === 'skills-container') {
                setupSkillsObserver(container);
            }

            if (containerId === 'contact-container') {
                const contactForm = container.querySelector('.contact-form');
                if (contactForm) {
                    contactForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        safeCreateIcons();

                        const sendLabel = contactForm.querySelector('.send-label');
                        const dots = contactForm.querySelector('.sending-dots');
                        const sendButton = contactForm.querySelector('.glass-submit');
                        const email = contactForm.email.value.trim();
                        const message = contactForm.message.value.trim();

                        if (!email || !message) {
                            alert('Fill both fields');
                            return;
                        }

                        // Step 1: Start Sending...
                        sendLabel.textContent = 'Sending';
                        dots.classList.remove('hidden');

                        let resultIcon = 'check-circle';
                        let resultText = 'Message Sent!';

                        try {
                            const response = await fetch('https://czerny1728-github-io.onrender.com/api/contact', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, message }),
                            });

                            if (!response.ok) {
                                resultIcon = 'alert-triangle';
                                resultText = 'Sending Failed';
                            }
                        } catch (error) {
                            resultIcon = 'wifi-off';
                            resultText = 'Network Error';
                        }

                        // Step 2: Implode dots and label
                        sendLabel.classList.add('implode');
                        dots.classList.add('hidden');

                        // Step 3: Explode final message after short delay
                        setTimeout(() => {
                            sendButton.classList.add('explode');
                            sendButton.innerHTML = `<i data-lucide="${resultIcon}"></i> ${resultText}`;
                            safeCreateIcons();
                        }, 300);

                        // Step 4: Reset form after another delay
                        setTimeout(() => {
                            sendButton.classList.remove('explode');
                            sendButton.innerHTML = `
                            <i data-lucide="send" class="send-icon"></i>
                            <span class="send-label">Send</span>
                            <span class="sending-dots hidden">
                                <span class="dot">.</span>
                                <span class="dot">.</span>
                                <span class="dot">.</span>
                            </span>
                            `;
                            safeCreateIcons();
                            contactForm.reset();
                        }, 2500);
                    });
                }
            }
        })
        .catch(err => console.error(`Failed to load ${file}:`, err));
}


const sectionPromises = [
    loadSection('projects-container', 'projects.html'),
    loadSection('skills-container', 'skills.html'),
    loadSection('education-container', 'education.html'),
    loadSection('contact-container', 'contact.html')
];


function initPage() {
    document.querySelector('.profile-pic').classList.add('animate-in');
    document.querySelector('.top-nav').classList.add('animate-in');
    document.querySelector('.social-links').classList.add('animate-in');
    document.querySelector('.intro-heading').classList.add('animate-in');
    document.querySelector('.intro-subtext').classList.add('animate-in');

    Promise.all(sectionPromises).then(() => {
        const savedScrollY = parseInt(sessionStorage.getItem('scrollY'), 10);
        if (!isNaN(savedScrollY)) {
            window.scrollTo(0, savedScrollY);
        }

        requestAnimationFrame(() => {
            onScroll();
            document.documentElement.classList.remove('pre-scroll-lock');
            document.body.classList.remove('pre-scroll-lock');
        });
        
        safeCreateIcons();
    });
}

let iconLibsReady = false;
let pageLoaded = false;

document.addEventListener('iconLibsReady', () => {
    iconLibsReady = true;
    if (pageLoaded) {
        initPage();
    }
});

window.addEventListener('load', () => {
    pageLoaded = true;
    
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('pre-scroll-lock');
        document.body.classList.remove('pre-scroll-lock');
    });
    
    if (iconLibsReady) {
        initPage();
    } else {
        document.querySelector('.profile-pic').classList.add('animate-in');
        document.querySelector('.top-nav').classList.add('animate-in');
        document.querySelector('.social-links').classList.add('animate-in');
        document.querySelector('.intro-heading').classList.add('animate-in');
        document.querySelector('.intro-subtext').classList.add('animate-in');
    }
});

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollY', window.scrollY);
});
