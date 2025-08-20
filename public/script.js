gsap.registerPlugin(ScrollTrigger);

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeParticles = document.getElementById('themeParticles');
    const idCard = document.getElementById('idCard');
    let currentTheme = 'dark';

    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', currentTheme);
      
      createThemeParticles();
      updateThemeIcon();
      localStorage.setItem('theme', currentTheme);
    });

    let mouseX = 0, mouseY = 0;
    let cardX = 0, cardY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCard() {
      const rect = idCard.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const deltaX = (mouseX - cardCenterX) * 0.02;
      const deltaY = (mouseY - cardCenterY) * 0.02;
      
      cardX += (deltaX - cardX) * 0.1;
      cardY += (deltaY - cardY) * 0.1;
      
      const maxMovement = 15;
      cardX = Math.max(-maxMovement, Math.min(maxMovement, cardX));
      cardY = Math.max(-maxMovement, Math.min(maxMovement, cardY));
      
      const rotateX = cardY * -0.5;
      const rotateY = cardX * 0.5;
      
      idCard.style.transform = `translate(${cardX}px, ${cardY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      requestAnimationFrame(animateCard);
    }

    animateCard();

    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      currentTheme = savedTheme;
      document.body.setAttribute('data-theme', currentTheme);
      updateThemeIcon();
    }

    function updateThemeIcon() {
      const sunPath = "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z";
      const moonPath = "M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z";
      
      themeIcon.innerHTML = `<path d="${currentTheme === 'dark' ? sunPath : moonPath}"/>`;
      
      gsap.fromTo(themeIcon, 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }

    function createThemeParticles() {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'theme-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        themeParticles.appendChild(particle);
        
        gsap.fromTo(particle,
          { scale: 0, opacity: 1 },
          {
            scale: Math.random() * 2 + 1,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => particle.remove()
          }
        );
      }
    }

    function createParticles() {
      const container = document.getElementById('particles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        container.appendChild(particle);
        
        gsap.to(particle, {
          y: Math.random() * 200 - 100,
          x: Math.random() * 200 - 100,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }

    function initMatrix() {
      const canvas = document.getElementById('matrix-canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
      const matrixArray = matrix.split("");

      const fontSize = 16;
      const columns = canvas.width / fontSize;

      const drops = [];
      for(let x = 0; x < columns; x++) {
        drops[x] = 1;
      }

      function drawMatrix() {
        const bgAlpha = document.body.getAttribute('data-theme') === 'light' ? 0.08 : 0.04;
        const textAlpha = document.body.getAttribute('data-theme') === 'light' ? 0.2 : 0.3;
        
        ctx.fillStyle = `rgba(${document.body.getAttribute('data-theme') === 'light' ? '248, 249, 250' : '13, 17, 23'}, ${bgAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = `rgba(0, 166, 90, ${textAlpha})`;
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < drops.length; i++) {
          const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      setInterval(drawMatrix, 100);

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    }

    function initTypewriter() {
      const nameElement = document.querySelector('.typewriter-name');
      if (!nameElement) return;
      
      const originalText = nameElement.textContent;
      nameElement.textContent = '';
      
      let i = 0;
      function typeWriter() {
        if (i < originalText.length) {
          nameElement.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }
      
      setTimeout(typeWriter, 2000);
    }

    function initContactForm() {
      const form = document.getElementById('contactForm');
      const sendBtn = document.getElementById('sendBtn');
      const formMessage = document.getElementById('formMessage');

      if (!form || !sendBtn) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        sendBtn.classList.add('loading');
        sendBtn.disabled = true;
        formMessage.classList.remove('show');

        const formData = new FormData(form);
        const data = {
          name: formData.get('name')?.trim(),
          email: formData.get('email')?.trim(),
          message: formData.get('message')?.trim()
        };

        if (!validateFormData(data)) {
          sendBtn.classList.remove('loading');
          sendBtn.disabled = false;
          return;
        }

        // Simulate form submission
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          showFormMessage('🚀 Message sent successfully! I\'ll get back to you within 24-48 hours.', 'success');
          form.reset();
          
          form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.style.borderColor = 'var(--glass-border)';
          });
          
          createSuccessParticles();
        } catch (error) {
          showFormMessage('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
          sendBtn.classList.remove('loading');
          sendBtn.disabled = false;
        }
      });
    }

    function validateFormData(data) {
      const errors = [];
      
      if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
      
      if (data.name && data.name.length > 100) {
        errors.push('Name must be less than 100 characters');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
      }
      
      if (!data.message || data.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
      }
      
      if (data.message && data.message.length > 1000) {
        errors.push('Message must be less than 1000 characters');
      }
      
      if (errors.length > 0) {
        showFormMessage('Please fix the following errors:\n• ' + errors.join('\n• '), 'error');
        return false;
      }
      
      return true;
    }

    function createSuccessParticles() {
      const form = document.getElementById('contactForm');
      const rect = form.getBoundingClientRect();
      
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--primary-green);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
          x: Math.random() * 400 - 200,
          y: Math.random() * 400 - 200,
          opacity: 0,
          scale: Math.random() * 2 + 0.5,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => particle.remove()
        });
      }
    }

    function showFormMessage(message, type) {
      const formMessage = document.getElementById('formMessage');
      if (!formMessage) return;
      
      formMessage.innerHTML = message.replace(/\n/g, '<br>');
      formMessage.className = `form-message ${type}`;
      
      setTimeout(() => {
        formMessage.classList.add('show');
      }, 100);

      const hideDelay = type === 'success' ? 7000 : 10000;
      setTimeout(() => {
        formMessage.classList.remove('show');
      }, hideDelay);
    }

    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      createParticles();
      initMatrix();
      initTypewriter();
      initContactForm();

      // Navbar scroll effect
      const navbar = document.getElementById('navbar');
      if (navbar) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        });
      }

      // Scroll indicator
      const scrollIndicator = document.getElementById('scrollIndicator');
      if (scrollIndicator) {
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = scrollTop / docHeight;
          scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
        });
      }

      // Smooth scrolling for navigation links
      document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Button hover effects
      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Tech item interactions
      document.querySelectorAll('.tech-item').forEach((item, index) => {
        item.addEventListener('click', () => {
          gsap.to(item, {
            scale: 1.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
          
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 255, 135, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: -1;
          `;
          
          item.style.position = 'relative';
          item.appendChild(ripple);
          
          gsap.to(ripple, {
            width: 100,
            height: 100,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove()
          });
        });
      });

      // Mouse parallax for shapes
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        gsap.to('.shape-1', {
          x: mouseX * 30,
          y: mouseY * 30,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to('.shape-2', {
          x: mouseX * -20,
          y: mouseY * -20,
          duration: 1.2,
          ease: "power2.out"
        });
        
        gsap.to('.shape-4', {
          x: mouseX * 15,
          y: mouseY * 15,
          duration: 0.8,
          ease: "power2.out"
        });
      });

      // Glass card hover effects
      document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / centerY * -2;
          const rotateY = (x - centerX) / centerX * 2;
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      });

      // GSAP ScrollTrigger animations
      gsap.utils.toArray('.glass-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2
        });
      });

      // Timeline animations
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.2
        });
      });

      // Timeline header animations
      gsap.utils.toArray('.timeline-header').forEach((header, i) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          y: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1
        });
      });

      gsap.utils.toArray('.skill-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1
        });
      });

      gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.1
        });
      });

      // Contact form animations
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
        gsap.from('.contact-form', {
          scrollTrigger: {
            trigger: '.contact-form',
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          x: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });

        gsap.from('.form-group', {
          scrollTrigger: {
            trigger: '.contact-form',
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out"
        });
      }

      // Enhanced cursor trail
      const cursor = document.createElement('div');
      cursor.className = 'cursor-trail';
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-green) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(cursor);

      let cursorX = 0, cursorY = 0;

      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      let cursorTimeout;
      document.addEventListener('mousemove', () => {
        cursor.style.opacity = '0.6';
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
          cursor.style.opacity = '0';
        }, 3000);
      });

      // Form input interactions
      const inputs = document.querySelectorAll('.form-input, .form-textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        input.addEventListener('input', () => {
          let isValid = true;
          
          if (input.name === 'name') {
            isValid = input.value.trim().length >= 2;
          } else if (input.name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(input.value.trim());
          } else if (input.name === 'message') {
            isValid = input.value.trim().length >= 10;
          }
          
          if (input.value.length > 0) {
            input.style.borderColor = isValid ? 'var(--primary-green)' : '#ff4444';
          } else {
            input.style.borderColor = 'var(--glass-border)';
          }
        });
      });

      window.addEventListener('online', () => {
        showFormMessage('Connection restored. You can now send messages.', 'success');
      });

      window.addEventListener('offline', () => {
        showFormMessage('You\'re offline. Please check your connection.', 'error');
      });
    });