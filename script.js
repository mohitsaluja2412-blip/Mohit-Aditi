document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js with enhanced interactivity
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: ["#ff9580", "#4b6cb7", "#182848", "#ffc8c0"]
            },
            shape: {
                type: ["circle", "triangle"],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffc8c0",
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                bubble: {
                    distance: 200,
                    size: 10,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 60,
                    duration: 1.2
                },
                push: {
                    particles_nb: 6
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Set the wedding date - November 26, 2025
    const weddingDate = new Date('November 26, 2025 00:00:00').getTime();

    // Update the countdown every second
    const countdown = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results with leading zeros
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.countdown-container').innerHTML = '<h2 class="married">Just Married!</h2>';
        }
    }, 1000);
    
    // Add subtle animation to the content on scroll
    const contentContainer = document.querySelector('.content-container');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            contentContainer.style.transform = `translateY(${scrollPosition * 0.03}px)`;
            contentContainer.style.opacity = 1 - (scrollPosition * 0.003);
        } else {
            contentContainer.style.transform = 'translateY(0)';
            contentContainer.style.opacity = 1;
        }
    });
    
    // Add proper touch support for mobile
    document.addEventListener('touchmove', function(e) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        // Create a mousemove event to make particles react to touch
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touchX,
            clientY: touchY
        });
        
        document.dispatchEvent(mouseEvent);
    }, { passive: true });
    
    document.addEventListener('touchstart', function(e) {
        // Create a click event when touch starts
        const mouseEvent = new MouseEvent('click', {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        });
        
        document.dispatchEvent(mouseEvent);
    }, { passive: true });
    
    // Bee animation with glitter
    const beeIcons = document.querySelectorAll('.bee-icon');
    const glitterContainer = document.getElementById('glitter-container');
    
    // Counter to track the number of active flying bees
    let activeBees = 0;
    const MAX_BEES = 3; // Maximum number of bees allowed at a time
    
    beeIcons.forEach(bee => {
        bee.addEventListener('click', function(e) {
            // Check if we've reached the maximum number of bees
            if (activeBees >= MAX_BEES) {
                // Add a subtle shake animation to indicate the limit
                this.classList.add('shake-animation');
                setTimeout(() => {
                    this.classList.remove('shake-animation');
                }, 500);
                return;
            }
            
            // Increment active bees counter
            activeBees++;
            
            // Create a flying bee
            const flyingBee = document.createElement('div');
            flyingBee.className = 'flying-bee';
            flyingBee.innerHTML = this.innerHTML;
            
            // Position the bee at click position
            const rect = this.getBoundingClientRect();
            flyingBee.style.left = rect.left + 'px';
            flyingBee.style.top = rect.top + 'px';
            
            // Add to body
            document.body.appendChild(flyingBee);
            
            // Animate the bee randomly with realistic movement
            animateBeeRealistic(flyingBee);
            
            // Remove the bee after animation completes
            setTimeout(() => {
                // Gradual disappearance
                fadeOutBee(flyingBee);
            }, 8000);
        });
    });
    
    function fadeOutBee(bee) {
        let opacity = 1;
        const fadeInterval = setInterval(() => {
            opacity -= 0.05;
            bee.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(fadeInterval);
                document.body.removeChild(bee);
                // Decrement the active bees counter when a bee is removed
                activeBees--;
            }
        }, 50);
    }
    
    function animateBeeRealistic(bee) {
        // Screen dimensions
        const maxX = window.innerWidth - 50;
        const maxY = window.innerHeight - 50;
        
        let posX = parseFloat(bee.style.left);
        let posY = parseFloat(bee.style.top);
        let velX = (Math.random() - 0.5) * 8;
        let velY = (Math.random() - 0.5) * 8;
        let rotation = 0;
        
        // Add random acceleration changes to simulate bee behavior
        let accX = 0;
        let accY = 0;
        
        // Create glitter along the path - more frequent for more sparkle
        const glitterInterval = setInterval(() => {
            // Create 2-4 glitter particles at once for more sparkle
            const glitterCount = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < glitterCount; i++) {
                createFallingGlitter(posX + 18, posY + 18);
            }
            
            // Occasionally create a special sparkle
            if (Math.random() < 0.2) {
                createSpecialSparkle(posX + 18, posY + 18);
            }
        }, 60); // More frequent glitter creation
        
        const animate = () => {
            // Random acceleration changes (bee-like erratic movement)
            if (Math.random() < 0.1) {
                accX = (Math.random() - 0.5) * 1.2;
                accY = (Math.random() - 0.5) * 1.2;
            }
            
            // Apply acceleration
            velX += accX;
            velY += accY;
            
            // Limit velocity
            velX = Math.max(Math.min(velX, 10), -10);
            velY = Math.max(Math.min(velY, 10), -10);
            
            // Update position
            posX += velX;
            posY += velY;
            
            // Boundary checks with bounce
            if (posX < 0) {
                posX = 0;
                velX *= -0.7;
            }
            if (posX > maxX) {
                posX = maxX;
                velX *= -0.7;
            }
            if (posY < 0) {
                posY = 0;
                velY *= -0.7;
            }
            if (posY > maxY) {
                posY = maxY;
                velY *= -0.7;
            }
            
            // Calculate rotation based on movement direction
            const targetRotation = Math.atan2(velY, velX) * 180 / Math.PI;
            // Smooth rotation
            rotation = rotation + (targetRotation - rotation) * 0.1;
            
            // Add a slight wobble for wing effect
            const wobble = Math.sin(Date.now() / 50) * 3;
            
            // Apply position and rotation
            bee.style.left = posX + 'px';
            bee.style.top = posY + 'px';
            bee.style.transform = `rotate(${rotation}deg) translateY(${wobble}px)`;
            
            beeAnimationId = requestAnimationFrame(animate);
        };
        
        let beeAnimationId = requestAnimationFrame(animate);
        
        // Stop animation after set time but keep the bee visible for fadeout
        setTimeout(() => {
            cancelAnimationFrame(beeAnimationId);
            clearInterval(glitterInterval);
            
            // Final burst of sparkles when animation stops
            for (let i = 0; i < 15; i++) {
                createSpecialSparkle(posX + 18, posY + 18);
            }
        }, 7800);
    }
    
    function createFallingGlitter(x, y) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        
        // Random size
        const size = 3 + Math.random() * 5;
        glitter.style.width = size + 'px';
        glitter.style.height = size + 'px';
        
        // Random initial position near the bee
        const offsetX = (Math.random() - 0.5) * 14;
        const offsetY = (Math.random() - 0.5) * 14;
        glitter.style.left = (x + offsetX) + 'px';
        glitter.style.top = (y + offsetY) + 'px';
        
        // Random horizontal velocity
        const velX = (Math.random() - 0.5) * 2;
        
        // Add to container
        document.body.appendChild(glitter);
        
        // Animate falling
        let posY = y + offsetY;
        let posX = x + offsetX;
        let opacity = 1;
        
        const animateGlitter = () => {
            // Fall down with gravity
            posY += 2 + Math.random();
            posX += velX;
            opacity -= 0.02;
            
            glitter.style.top = posY + 'px';
            glitter.style.left = posX + 'px';
            glitter.style.opacity = opacity;
            
            if (opacity > 0 && posY < window.innerHeight) {
                requestAnimationFrame(animateGlitter);
            } else {
                document.body.removeChild(glitter);
            }
        };
        
        requestAnimationFrame(animateGlitter);
    }
    
    // Special sparkles that expand and fade
    function createSpecialSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'special-sparkle';
        
        // Random initial position near the bee
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';
        
        // Random size and color
        const size = 4 + Math.random() * 8;
        const hue = 40 + Math.random() * 20; // Gold to yellow range
        
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 75%, 1) 0%, hsla(${hue}, 100%, 60%, 0.8) 100%)`;
        
        // Add to container
        document.body.appendChild(sparkle);
        
        // Animate expansion and fade
        let scale = 0.1;
        let opacity = 1;
        
        const animateSparkle = () => {
            scale += 0.1;
            opacity -= 0.03;
            
            sparkle.style.transform = `scale(${scale})`;
            sparkle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateSparkle);
            } else {
                document.body.removeChild(sparkle);
            }
        };
        
        requestAnimationFrame(animateSparkle);
    }
}); 
