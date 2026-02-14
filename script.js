// Navigation active state management
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });

    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = window.innerWidth <= 768 ? 60 : 0;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Project click interaction
const projects = document.querySelectorAll('.project');
projects.forEach(project => {
    project.addEventListener('click', function() {
        // Add your project detail logic here
        // For example, you could open a modal with more details
        // or navigate to a project detail page
        console.log('Project clicked:', this.querySelector('.project-title').textContent);
        
        // Optional: You can add a visual feedback
        this.style.transform = 'translateX(8px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateX(8px)';
        }, 100);
    });
});

// Skill tag interaction - optional enhancement
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
        e.stopPropagation();
        // You could add functionality to filter projects by skill
        console.log('Skill clicked:', this.textContent);
    });
});

// Intersection Observer for fade-in animations (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all projects for animation on scroll
projects.forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(project);
});
