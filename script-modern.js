// Modern Portfolio JavaScript - Optimized for performance and accessibility

(function() {
  'use strict';

  // Utility functions
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  
  // Debounce function for performance
  function debounce(func, wait) {
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

  // Mobile menu functionality
  function initMobileMenu() {
    const menuBtn = $('#mobile-menu-btn');
    const menu = $('#mobile-menu');
    
    if (!menuBtn || !menu) return;

    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('show');
      
      // Focus management
      if (!isExpanded) {
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('show')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
        menuBtn.focus();
      }
    });
  }

  // Typing animation with better performance
  function initTypingAnimation() {
    const elements = $$('[id$="-typed"]');
    
    elements.forEach(el => {
      const text = el.dataset.text || el.textContent;
      if (!text) return;
      
      el.textContent = '';
      el.setAttribute('aria-live', 'polite');
      
      let i = 0;
      const type = () => {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          const delay = text[i-1] === ',' ? 100 : 50;
          setTimeout(type, delay);
        }
      };
      
      // Start typing after a short delay
      setTimeout(type, 300);
    });
  }

  // Video loading and playback
  function initVideoHandling() {
    const videos = $$('video');
    
    videos.forEach(video => {
      // Handle video loading
      video.addEventListener('loadstart', () => {
        video.parentElement.classList.add('loading');
      });
      
      video.addEventListener('canplay', () => {
        video.parentElement.classList.remove('loading');
        video.parentElement.classList.add('loaded');
      });
      
      video.addEventListener('error', (e) => {
        console.warn('Video failed to load:', e);
        video.parentElement.classList.remove('loading');
        // Show fallback content
        const fallback = video.parentElement.querySelector('.video-fallback');
        if (fallback) fallback.style.display = 'block';
      });
      
      // Ensure video plays when in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && video.autoplay) {
            video.play().catch(e => {
              console.log('Autoplay prevented:', e);
              // Show play button if autoplay fails
              const playButton = video.parentElement.querySelector('.play-button');
              if (playButton) playButton.style.display = 'flex';
            });
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(video);
    });
  }

  // Lazy loading for images and iframes
  function initLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.tagName === 'IFRAME' && element.dataset.src) {
            element.src = element.dataset.src;
            element.classList.add('loaded');
          }
          
          observer.unobserve(element);
        }
      });
    }, { rootMargin: '50px' });

    // Observe iframes with data-src
    $$('iframe[data-src]').forEach(el => {
      observer.observe(el);
    });
  }

  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = $(href);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
      });
    });
  }

  // Search functionality for projects
  function initProjectSearch() {
    const searchInput = $('#project-search');
    const filterChips = $$('.filter-chip');
    const projectCards = $$('#project-grid > a');
    
    if (!searchInput || !projectCards.length) return;

    const filterProjects = debounce(() => {
      const query = searchInput.value.toLowerCase().trim();
      const activeFilter = $('.filter-chip[aria-pressed="true"]')?.dataset.filter || 'all';
      
      projectCards.forEach(card => {
        const tags = (card.dataset.tags || '').toLowerCase();
        const text = card.textContent.toLowerCase();
        const matchesQuery = !query || text.includes(query);
        const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
        
        const visible = matchesQuery && matchesFilter;
        card.style.display = visible ? '' : 'none';
        card.setAttribute('aria-hidden', !visible);
      });
    }, 150);

    searchInput.addEventListener('input', filterProjects);
    
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        filterProjects();
      });
    });
  }

  // 3D model viewer functionality
  function init3DViewer() {
    const toggleBtn = $('#eink-3d-toggle');
    const wrapper = $('#eink-3d-wrapper');
    const viewer = $('#eink-model-viewer');
    const statusEl = $('#eink-3d-status');
    
    if (!toggleBtn || !wrapper || !viewer) return;

    let initialized = false;

    toggleBtn.addEventListener('click', async () => {
      const isHidden = wrapper.classList.contains('hidden');
      wrapper.classList.toggle('hidden');
      toggleBtn.textContent = isHidden ? 'Hide 3D model' : 'View 3D model';
      
      if (!isHidden && !initialized) {
        await initViewer();
        initialized = true;
      }
      
      if (!isHidden && statusEl) {
        statusEl.textContent = 'Loading model…';
      }
    });

    async function initViewer() {
      const modelUrl = '../assets/E-ink_full_model.glb';
      
      try {
        const response = await fetch(modelUrl, { method: 'HEAD' });
        if (!response.ok) {
          if (statusEl) statusEl.textContent = 'Model file not found.';
          return;
        }
      } catch (error) {
        if (statusEl) statusEl.textContent = 'Failed to load model.';
        return;
      }

      viewer.addEventListener('load', () => {
        if (statusEl) statusEl.textContent = 'Loaded.';
      });
      
      viewer.addEventListener('error', () => {
        if (statusEl) statusEl.textContent = 'Failed to load model.';
      });
    }
  }

  // Accordion functionality for skills
  function initAccordions() {
    const accordions = $$('.skill-acc');
    
    accordions.forEach(accordion => {
      const button = accordion.querySelector('.skill-acc__toggle');
      const panel = accordion.querySelector('.skill-acc__panel');
      
      if (!button || !panel) return;

      button.addEventListener('click', () => {
        const isOpen = accordion.classList.contains('open');
        
        // Close all other accordions
        accordions.forEach(acc => {
          if (acc !== accordion) {
            acc.classList.remove('open');
            const otherButton = acc.querySelector('.skill-acc__toggle');
            const otherPanel = acc.querySelector('.skill-acc__panel');
            if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0px';
          }
        });
        
        // Toggle current accordion
        accordion.classList.toggle('open', !isOpen);
        button.setAttribute('aria-expanded', !isOpen);
        
        if (!isOpen) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          panel.style.maxHeight = '0px';
        }
      });
    });
  }

  // Performance monitoring
  function initPerformanceMonitoring() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
          }
        }, 0);
      });
    }
  }

  // Initialize everything when DOM is ready
  function init() {
    // Core functionality
    initMobileMenu();
    initTypingAnimation();
    initVideoHandling();
    initLazyLoading();
    initSmoothScrolling();
    initProjectSearch();
    init3DViewer();
    initAccordions();
    initPerformanceMonitoring();

    // Set current year
    const yearEl = $('#year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Add loaded class to body
    document.body.classList.add('loaded');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
