// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Scroll indicator
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
    });

    // Staggered animation for text elements
    const animateTextElements = document.querySelectorAll('.animated-text span');
    animateTextElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // FAQ accordion functionality
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Toggle content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
            
            // Rotate arrow icon
            const arrow = this.querySelector('svg');
            arrow.classList.toggle('rotate-180');
        });
    });

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.querySelector('div').style.width = `${progress}%`;
        });
    };

    // Intersection Observer for progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    // Mobile menu functionality is now handled in mobile-nav.html

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Animated counter for statistics
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Testimonial slider
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    function showSlide(n) {
        // Hide all slides
        testimonials.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
        testimonials[n].style.display = 'block';
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonials.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    // Automatic sliding
    if (testimonials.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000);
        
        // Manual navigation with dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }

    // Add dynamic date to copyright
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}); 