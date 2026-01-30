/**
 * Main Portfolio JavaScript
 * Handles navigation, active states, and global animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
});

/**
 * Navigation logic
 */
function initNavigation() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Header scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu on link click
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (navToggle) navToggle.innerHTML = '☰';
        });
    });

    // Set active link based on current page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";
    
    links.forEach(link => {
        if (link.getAttribute('href') === pageName) {
            link.classList.add('active');
        }
    });
}

/**
 * Subtle scroll animations
 */
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // Styles for revealed elements
    const style = document.createElement('style');
    style.textContent = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Helper to render project cards
 */
function renderProjectCards(containerSelector, filterFeatured = false, limit = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let projectsToRender = filterFeatured 
        ? portfolioData.projects.filter(p => p.featured) 
        : portfolioData.projects;

    if (limit) {
        projectsToRender = projectsToRender.slice(0, limit);
    }

    container.innerHTML = projectsToRender.map(project => `
        <div class="card project-card">
        <div class="project-card-img" style="height: 220px; border-radius: 12px; margin-bottom: 25px; overflow: hidden; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.05);">
            ${project.image && !project.image.includes('placeholder') && !project.image.includes('cover.jpg') ? 
                `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` :
                `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.2); font-weight: 600; font-size: 0.9rem;">${project.title} Preview</div>`
            }
        </div>
            <span class="text-accent" style="font-size: 0.8rem; font-weight: 600;">${project.category}</span>
            <h3 style="margin: 10px 0;">${project.title}</h3>
            <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 15px;">${project.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                ${project.tech.map(t => `<span style="font-size: 0.7rem; background: #333; padding: 4px 10px; border-radius: 4px;">${t}</span>`).join('')}
            </div>
            <a href="projects/${project.id}.html" class="btn btn-outline" style="width: 100%; text-align: center; padding: 10px;">View Details</a>
        </div>
    `).join('');
}
