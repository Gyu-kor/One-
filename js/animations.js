// Advanced Animations JavaScript

// Animation Controller
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.parallaxElements = [];
        this.tiltElements = [];
        this.typingElements = [];
        this.infiniteScrollEnabled = false;
        this.lastScrollY = 0;
        this.ticking = false;
        
        this.init();
    }

    init() {
        this.initScrollObserver();
        this.initParallaxScrolling();
        this.init3DTilt();
        this.initTypingEffect();
        this.initInfiniteScroll();

        this.initMicroInteractions();
        this.bindEvents();
    }

    // Scroll-based Animations Observer
    initScrollObserver() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const animationType = target.dataset.animation || 'fade-in';
                    
                    this.triggerAnimation(target, animationType);
                    
                    // Unobserve after animation
                    if (!target.classList.contains('repeat-animation')) {
                        scrollObserver.unobserve(target);
                    }
                }
            });
        }, observerOptions);

        this.observers.set('scroll', scrollObserver);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.scroll-reveal, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, .scale-in, .rotate-in'
        );
        
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    // Trigger specific animations
    triggerAnimation(element, type) {
        switch(type) {
            case 'fade-in':
                element.classList.add('visible');
                break;
            case 'scale-in':
                element.classList.add('visible');
                break;
            case 'slide-in':
                element.classList.add('visible');
                break;
            case 'elastic':
                element.classList.add('elastic');
                break;
            case 'bounce':
                element.classList.add('bounce');
                setTimeout(() => element.classList.remove('bounce'), 1000);
                break;
            default:
                element.classList.add('visible');
        }
    }

    // Parallax Scrolling
    initParallaxScrolling() {
        this.parallaxElements = document.querySelectorAll('.parallax-element, .parallax-bg');
        
        if (this.parallaxElements.length > 0) {
            window.addEventListener('scroll', () => this.handleParallaxScroll(), { passive: true });
        }
    }

    handleParallaxScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
                
                this.parallaxElements.forEach((element, index) => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrollY * speed);
                    
                    if (element.classList.contains('parallax-bg')) {
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    } else {
                        const rect = element.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                        }
                    }
                });
                
                this.lastScrollY = scrollY;
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    // 3D Tilt Effect
    init3DTilt() {
        this.tiltElements = document.querySelectorAll('.tilt-card');
        
        this.tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleTiltMove(e, element));
            element.addEventListener('mouseleave', () => this.handleTiltLeave(element));
        });
    }

    handleTiltMove(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateX = deltaY * -10; // Max 10 degrees
        const rotateY = deltaX * 10;
        
        element.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(20px)
        `;
    }

    handleTiltLeave(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // Typing Effect
    initTypingEffect() {
        this.typingElements = document.querySelectorAll('.typing-text');
        
        this.typingElements.forEach((element, index) => {
            const text = element.dataset.text || element.textContent;
            element.textContent = '';
            element.style.borderRight = '3px solid var(--accent-color, #333)';
            
            // Start typing with delay
            setTimeout(() => {
                this.typeText(element, text);
            }, index * 500);
        });
    }

    typeText(element, text) {
        let index = 0;
        const speed = 50; // milliseconds per character
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    // Infinite Scroll
    initInfiniteScroll() {
        const infiniteScrollSections = document.querySelectorAll('.infinite-scroll-section');
        
        infiniteScrollSections.forEach(section => {
            const sentinel = document.createElement('div');
            sentinel.className = 'scroll-sentinel';
            section.appendChild(sentinel);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.infiniteScrollEnabled) {
                        this.loadMoreContent(section);
                    }
                });
            }, { rootMargin: '100px' });
            
            observer.observe(sentinel);
        });
    }

    async loadMoreContent(section) {
        this.infiniteScrollEnabled = true;
        const loadingIndicator = section.querySelector('.loading-indicator');
        
        if (loadingIndicator) {
            loadingIndicator.classList.add('active');
        }
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load more portfolio items if available
        if (typeof loadMorePortfolio === 'function') {
            loadMorePortfolio();
        }
        
        if (loadingIndicator) {
            loadingIndicator.classList.remove('active');
        }
        
        this.infiniteScrollEnabled = false;
    }

    // Theme Toggle


    createRipple(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: var(--accent-color);
            opacity: 0.3;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Micro Interactions
    initMicroInteractions() {
        const microElements = document.querySelectorAll('.micro-interaction');
        
        microElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
            
            element.addEventListener('click', (e) => {
                this.createClickEffect(e, element);
            });
        });
    }

    createClickEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            pointer-events: none;
            animation: clickEffect 0.5s ease-out;
        `;
        
        element.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 500);
    }

    // Magnetic Effect
    initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Smooth Scroll to Element
    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Staggered Animation
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }

    // Page Transition
    initPageTransition() {
        document.body.classList.add('page-transition');
        
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    // Bind Events
    bindEvents() {
        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Scroll handler for various effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        }, { passive: true });
        
        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    handleResize() {
        // Recalculate positions for animations
        this.tiltElements.forEach(element => {
            element.style.transform = 'none';
        });
    }

    handleScroll() {
        // Additional scroll-based effects can be added here
        this.updateScrollProgress();
    }

    updateScrollProgress() {
        const scrollProgress = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    // Destroy animations (cleanup)
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        window.removeEventListener('scroll', this.handleParallaxScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Performance optimized animation utilities
class PerformanceUtils {
    static requestAnimationFrame(callback) {
        return window.requestAnimationFrame(callback);
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Global animation controller instance
let animationController;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    animationController = new AnimationController();
    
    // Add CSS for dynamic animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes clickEffect {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
                transform: translate(-50%, -50%);
            }
        }
        
        .scroll-sentinel {
            height: 1px;
            width: 100%;
            position: absolute;
            bottom: 100px;
            pointer-events: none;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: var(--accent-color);
            opacity: 0.3;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});

// Export for global use
window.AnimationController = AnimationController;
window.PerformanceUtils = PerformanceUtils;
window.animationController = animationController;

// Additional utility functions
function addGlitchEffect(element, text) {
    element.setAttribute('data-text', text);
    element.classList.add('glitch');
}

function addHoverLift(element) {
    element.classList.add('hover-lift');
}

function addMagneticEffect(element) {
    element.classList.add('magnetic');
    if (animationController) {
        animationController.initMagneticEffect();
    }
}

function triggerElasticAnimation(element) {
    element.classList.add('elastic');
    setTimeout(() => {
        element.classList.remove('elastic');
    }, 800);
}

function triggerWobbleAnimation(element) {
    element.classList.add('wobble');
    setTimeout(() => {
        element.classList.remove('wobble');
    }, 800);
}

// Export utility functions
window.animationUtils = {
    addGlitchEffect,
    addHoverLift,
    addMagneticEffect,
    triggerElasticAnimation,
    triggerWobbleAnimation
}; 