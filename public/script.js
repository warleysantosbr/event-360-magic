/* ============================================
   PLATAFORMA 360° - LANDING PAGE SCRIPTS
   Vanilla JavaScript - No Dependencies
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  /* ============================================
     RANDOMIZE REELS VIDEOS
     ============================================ */
  const reelsContainer = document.getElementById('reelsContainer');
  const videoSources = [
    '/videos/video1.mp4',
    '/videos/video2.mp4',
    '/videos/video3.mp4',
    '/videos/video4.mp4',
    '/videos/video5.mp4',
    '/videos/video6.mp4',
    '/videos/video7.mp4',
    '/videos/video8.mp4',
    '/videos/video9.mp4'
  ];
  
  // Shuffle array function
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  // Create reel card HTML
  function createReelCard(videoSrc) {
    return `
      <div class="reel-card">
        <video class="reel-video" autoplay loop muted playsinline>
          <source src="${videoSrc}" type="video/mp4">
        </video>
        <div class="reel-overlay"></div>
        <div class="reel-ui">
          <div class="reel-actions">
            <div class="reel-action like-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <div class="reel-action">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div class="reel-action">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Populate reels with randomized videos
  if (reelsContainer) {
    const shuffledVideos = shuffleArray(videoSources);
    reelsContainer.innerHTML = shuffledVideos.map(createReelCard).join('');
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(function(otherItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  /* ============================================
     SCROLL ANIMATIONS - INSTANT
     ============================================ */
  const animatedElements = document.querySelectorAll('.requirement-card, .benefit-card, .step-card, .pricing-card');
  
  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.95;
    
    animatedElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Set initial state - INSTANT transitions
  animatedElements.forEach(function(element, index) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    element.style.transition = 'opacity 0.12s ease ' + (index * 0.02) + 's, transform 0.12s ease ' + (index * 0.02) + 's';
  });
  
  // Check on scroll and load
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('load', checkVisibility);
  // Run immediately
  requestAnimationFrame(checkVisibility);

  /* ============================================
     REELS LIKE ANIMATION
     ============================================ */
  const likeButtons = document.querySelectorAll('.reel-action.like-btn');
  
  likeButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('liked');
      
      // Update SVG fill
      const svg = this.querySelector('svg');
      if (this.classList.contains('liked')) {
        svg.setAttribute('fill', '#ff3040');
      } else {
        svg.setAttribute('fill', 'currentColor');
      }
    });
  });

  /* ============================================
     REELS GALLERY DRAG SCROLL
     ============================================ */
  const reelsContainer = document.querySelector('.reels-container');
  
  if (reelsContainer) {
    let isScrolling = false;
    let startX;
    let scrollLeft;
    
    reelsContainer.addEventListener('mousedown', function(e) {
      isScrolling = true;
      startX = e.pageX - reelsContainer.offsetLeft;
      scrollLeft = reelsContainer.scrollLeft;
      reelsContainer.style.cursor = 'grabbing';
    });
    
    reelsContainer.addEventListener('mouseleave', function() {
      isScrolling = false;
      reelsContainer.style.cursor = 'grab';
    });
    
    reelsContainer.addEventListener('mouseup', function() {
      isScrolling = false;
      reelsContainer.style.cursor = 'grab';
    });
    
    reelsContainer.addEventListener('mousemove', function(e) {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.pageX - reelsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      reelsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Set initial cursor
    reelsContainer.style.cursor = 'grab';
  }

  /* ============================================
     BUTTON RIPPLE EFFECT
     ============================================ */
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = 'position: absolute; background: rgba(255,255,255,0.3); border-radius: 50%; transform: scale(0); animation: ripple 0.6s linear; pointer-events: none;';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = '100px';
      ripple.style.marginLeft = ripple.style.marginTop = '-50px';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });

  /* ============================================
     HEADER SCROLL EFFECT (if header exists)
     ============================================ */
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ============================================
     INTERSECTION OBSERVER FOR SECTIONS
     ============================================ */
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px'
    });
    
    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  /* ============================================
     THEME TOGGLE (Optional)
     Uncomment to enable light/dark toggle
     ============================================ */
  /*
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '☀️';
  themeToggle.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%; border: none; background: #1a1a1a; font-size: 24px; cursor: pointer; z-index: 9999; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';
  document.body.appendChild(themeToggle);
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    this.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
  });
  */

  /* ============================================
     WHATSAPP TRACKING (Optional)
     Add analytics tracking for WhatsApp clicks
     ============================================ */
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  
  whatsappLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Google Analytics 4 event (if available)
      if (typeof gtag === 'function') {
        gtag('event', 'click', {
          'event_category': 'WhatsApp',
          'event_label': 'CTA Click',
          'value': 1
        });
      }
      
      // Facebook Pixel event (if available)
      if (typeof fbq === 'function') {
        fbq('track', 'Contact');
      }
      
      console.log('WhatsApp CTA clicked');
    });
  });

});

/* ============================================
   RIPPLE ANIMATION KEYFRAMES
   (Injected via JavaScript for portability)
   ============================================ */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(rippleStyle);
