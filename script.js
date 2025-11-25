// Counter animation function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer to trigger animation when section is visible
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });

            // Unobserve after animation starts (only animate once)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});