// Invitation page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Prevent auto-scroll issues on mobile
    let isUserScrolling = false;
    let scrollTimeout;
    
    // Detect user scrolling
    window.addEventListener('scroll', function() {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 150);
    }, { passive: true });
    
    // Prevent programmatic scrolling during user interaction
    window.addEventListener('touchstart', function() {
        isUserScrolling = true;
    }, { passive: true });
    
    window.addEventListener('touchend', function() {
        setTimeout(() => {
            isUserScrolling = false;
        }, 300);
    }, { passive: true });
    // Initialize particles with better interactivity
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff9580', '#4b6cb7', '#ffd700']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: false,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 140,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Floating hearts animation
    function createFloatingHeart() {
        const heartsContainer = document.querySelector('.floating-hearts');
        if (!heartsContainer) return;

        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-20px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        
        const animationDuration = Math.random() * 3000 + 4000;
        heart.style.animation = `floatUp ${animationDuration}ms linear forwards`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, animationDuration);
    }

    // Create floating hearts periodically (less frequent on mobile)
    const heartInterval = window.innerWidth <= 768 ? 5000 : 3000;
    setInterval(createFloatingHeart, heartInterval);

    // RSVP button interactions
    document.addEventListener('DOMContentLoaded', function () {
    const rsvpForm = document.getElementById('rsvp-form');
    const notAttendingBtn = document.querySelector('.not-attending');

    // Handle form submission for "I'll be there"
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('full-name').value.trim();
        const side = document.getElementById('side').value;
        const guests = document.getElementById('guests').value;
        const rsvp = 'attending';

        if (!name || !side || !guests) {
            alert("Please fill in all fields.");
            return;
        }

        const data = {
            name,
            side,
            guests,
            rsvp
        };

        // Store in localStorage
        localStorage.setItem('rsvpData', JSON.stringify(data));

        // Send to Google Sheets
        fetch('https://script.google.com/macros/library/d/1S4mmjwW9UvO3qGkNbR4AF5_CnhEwNHktfX90t7gKhz3B4yJ7-nUVx4U8/1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(res => {
            showConfirmationPopup('attending');
            rsvpForm.reset();
        })
        .catch(err => {
            console.error('RSVP error:', err);
            alert("There was a problem submitting your RSVP.");
        });
    });

    // Handle "Can't make it"
    notAttendingBtn.addEventListener('click', function () {
        const name = document.getElementById('full-name').value.trim() || "No name";
        const side = document.getElementById('side').value || "No side";
        const guests = 0;
        const rsvp = 'not-attending';

        const data = {
            name,
            side,
            guests,
            rsvp
        };

        localStorage.setItem('rsvpData', JSON.stringify(data));

        fetch('YOUR_WEB_APP_URL_HERE', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(res => {
            showConfirmationPopup('not-attending');
            rsvpForm.reset();
        })
        .catch(err => {
            console.error('RSVP error:', err);
            alert("There was a problem submitting your RSVP.");
        });
    });

    // Confirmation Popup Function
    function showConfirmationPopup(status) {
        const feedback = document.createElement('div');
        feedback.style.position = 'fixed';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.background = 'rgba(255, 255, 255, 0.95)';
        feedback.style.padding = '20px 30px';
        feedback.style.borderRadius = '15px';
        feedback.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        feedback.style.zIndex = '10000';
        feedback.style.textAlign = 'center';
        feedback.style.fontFamily = 'Montserrat, sans-serif';

        if (status === 'attending') {
            feedback.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 10px;">🎉</div>
                <div style="font-size: 1.2rem; font-weight: 500; color: #333;">You're in!</div>
                <div style="font-size: 1rem; color: #666; margin-top: 5px;">Thank you for your RSVP.</div>
            `;
        } else {
            feedback.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 10px;">💝</div>
                <div style="font-size: 1.2rem; font-weight: 500; color: #333;">We'll miss you</div>
                <div style="font-size: 1rem; color: #666; margin-top: 5px;">Thanks for letting us know.</div>
            `;
        }

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 2500);
    }
});
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.style.animation = 'fadeOut 0.3s ease-out forwards';
                    setTimeout(() => {
                        if (feedback.parentNode) {
                            feedback.parentNode.removeChild(feedback);
                        }
                    }, 300);
                }
            }, 2500);
        });
    });

    // Photo carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    // Auto-rotate carousel every 6 seconds (reduced frequency)
    let carouselInterval = setInterval(nextSlide, 6000);
    
    // Pause auto-rotation on touch/interaction
    let touchStartTime = 0;
    carousel?.addEventListener('touchstart', function() {
        clearInterval(carouselInterval);
        touchStartTime = Date.now();
    });
    
    carousel?.addEventListener('touchend', function() {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 200) { // Quick tap
            nextSlide();
        }
        // Resume auto-rotation after 8 seconds
        setTimeout(() => {
            carouselInterval = setInterval(nextSlide, 6000);
        }, 8000);
    });

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Carousel click to advance (desktop only)
    const carousel = document.querySelector('.photo-carousel');
    if (carousel) {
        // Only add click handler for non-touch devices
        if (!('ontouchstart' in window)) {
            carousel.addEventListener('click', function() {
                nextSlide();
                
                // Create sparkle effect
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        createSparkle(this);
                    }, i * 100);
                }
            });
        }
    }

    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.fontSize = '12px';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
});

// Add additional CSS for animations
const additionalStyles = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    .rsvp-active {
        transform: scale(0.95) !important;
        opacity: 0.8 !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
