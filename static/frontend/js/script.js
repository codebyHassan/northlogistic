// ------------------------------
// Global navigation behavior
// ------------------------------
(function () {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navContent = document.getElementById('navContent');

    if (mobileToggle && navMenu && navContent) {
      // Add click event listener
      mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle('active');
        navContent.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Auto-open Services dropdown when mobile panel opens
        const servicesDropdown = navMenu.querySelector('.dropdown');
        if (servicesDropdown) {
          if (navContent.classList.contains('active')) servicesDropdown.classList.add('open');
          else servicesDropdown.classList.remove('open');
        }
      });

      // Add touch event listener for mobile
      mobileToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle('active');
        navContent.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        const servicesDropdown = navMenu.querySelector('.dropdown');
        if (servicesDropdown) {
          if (navContent.classList.contains('active')) servicesDropdown.classList.add('open');
          else servicesDropdown.classList.remove('open');
        }
      });
    }
  });
  
  // Fallback if DOMContentLoaded already fired
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navContent = document.getElementById('navContent');

  if (mobileToggle && navMenu && navContent) {
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      navMenu.classList.toggle('active');
      navContent.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      
      const servicesDropdown = navMenu.querySelector('.dropdown');
      if (servicesDropdown) {
        if (navContent.classList.contains('active')) servicesDropdown.classList.add('open');
        else servicesDropdown.classList.remove('open');
      }
    });
  }

  // Close mobile menu when clicking on links
  document.addEventListener('click', function(e) {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navContent = document.getElementById('navContent');
    
    // Close mobile menu when clicking on navigation links,
    // but DO NOT close if the click is on a dropdown toggle (so submenu stays open)
    const isLink = e.target.tagName === 'A';
    const isDropdownToggle = e.target.closest && !!e.target.closest('.dropdown-toggle');
    if (isLink && !isDropdownToggle && navContent && navContent.classList.contains('active')) {
      navContent.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('active');
      const servicesDropdown = navMenu ? navMenu.querySelector('.dropdown') : null;
      if (servicesDropdown) servicesDropdown.classList.remove('open');
    }
    
    // Close mobile menu when clicking outside
    if (navContent && navContent.classList.contains('active')) {
      if (!navContent.contains(e.target) && !mobileToggle.contains(e.target)) {
        navContent.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        const servicesDropdown = navMenu ? navMenu.querySelector('.dropdown') : null;
        if (servicesDropdown) servicesDropdown.classList.remove('open');
      }
    }
  });

  // Smooth scroll for on‑page anchors
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href') || '';
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Dropdown open (desktop or when mobile panel is not active).
  // When the mobile panel is open, a separate handler manages toggling to avoid double toggles.
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      const navContent = document.getElementById('navContent');
      const mobilePanelOpen = !!(navContent && navContent.classList.contains('active'));
      if (mobilePanelOpen) return; // let mobile-specific handler toggle once
      e.preventDefault();
      const parent = toggle.closest('.dropdown');
      if (parent) parent.classList.toggle('open');
    });
  });
})();

// ------------------------------
// Progress bar animation in logistics section
// ------------------------------
(function () {
  const logisticsSection = document.querySelector('.logistics-partner');
  if (!logisticsSection) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach((bar) => {
          const width = bar.getAttribute('data-width') || '0';
          bar.style.width = width + '%';
        });
      }
    });
  }, observerOptions);

  progressObserver.observe(logisticsSection);

  // Counter animation for logistics statistics (guarded to avoid double-run)
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.logistics-stats .stat-number');
        counters.forEach((counter) => {
          if (counter.dataset.counted === '1') return;
          const raw = counter.textContent || '';
          const target = parseInt(raw.replace(/[^\d]/g, ''), 10);
          const suffix = raw.replace(/[\d]/g, ''); // keep + and units like K/M
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 100));
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = String(target) + suffix;
              counter.dataset.counted = '1';
              clearInterval(timer);
            } else {
              counter.textContent = String(current) + suffix;
            }
          }, 20);
        });
      }
    });
  }, observerOptions);

  counterObserver.observe(logisticsSection);
})();

// ------------------------------
// Testimonials basic rotation
// ------------------------------
(function () {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const testimonials = [
    {
      text:
        "Northern Star Logistics Inc has completely transformed the way we handle our shipments. From pickup to delivery, everything is tracked, timely, and well-managed. We've been able to cut costs and reduce delays across the board",
      author: 'Matt Henry',
      position: 'Supply Chain Manager',
      image: '/placeholder.svg?height=60&width=60'
    },
    {
      text:
        'Working with Northern Star Logistics Inc has been a game-changer for our business. Their dedicated lanes program gave us the consistency we needed to grow our operations.',
      author: 'Sarah Johnson',
      position: 'Fleet Manager',
      image: '/placeholder.svg?height=60&width=60'
    },
    {
      text:
        'The team at Northern Star Logistics Inc goes above and beyond. Their support with TWIC cards and insurance made getting started so much easier than we expected.',
      author: 'Mike Rodriguez',
      position: 'Owner-Operator',
      image: '/placeholder.svg?height=60&width=60'
    }
  ];

  let current = 0;

  function updateTestimonial() {
    const data = testimonials[current];
    const testimonialText = document.querySelector('.testimonial-text h3');
    const authorName = document.querySelector('.author-info strong');
    const authorPosition = document.querySelector('.author-info span');
    const authorImage = document.querySelector('.author-image img');

    if (testimonialText) testimonialText.textContent = data.text;
    if (authorName) authorName.textContent = `— ${data.author}`;
    if (authorPosition) authorPosition.textContent = data.position;
    if (authorImage) authorImage.setAttribute('src', data.image);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = current === 0 ? testimonials.length - 1 : current - 1;
      updateTestimonial();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = current === testimonials.length - 1 ? 0 : current + 1;
      updateTestimonial();
    });
  }

  setInterval(() => {
    current = current === testimonials.length - 1 ? 0 : current + 1;
    updateTestimonial();
  }, 5000);
})();

// Testimonials carousel logic (next/prev + auto-advance)
(function(){
  const carousel = document.getElementById('testimonialCarousel');
  if(!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.testimonial-card'));
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  let index = 0;
  let timer;

  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[i].classList.add('active');
  }

  function go(delta){
    index = (index + delta + slides.length) % slides.length;
    show(index);
    restart();
  }

  function restart(){
    if(timer) clearInterval(timer);
    timer = setInterval(()=>go(1), 3000); // 3s
  }

  if(prev) prev.addEventListener('click', ()=>go(-1));
  if(next) next.addEventListener('click', ()=>go(1));

  // init
  show(index);
  restart();
})();

// ------------------------------
// Navbar elevation on scroll
// ------------------------------
(function () {
  const navbarInner = document.querySelector('.navbar .container');
  if (!navbarInner) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) navbarInner.classList.add('elevated');
    else navbarInner.classList.remove('elevated');
  });
})();

// ------------------------------
// Lazy load images with data-src
// ------------------------------
(function () {
  const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) img.setAttribute('src', src);
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  });

  const lazyImgs = document.querySelectorAll('img[data-src]');
  lazyImgs.forEach((img) => imageObserver.observe(img));
})();

// ------------------------------
// Scroll-to-top button
// ------------------------------
(function () {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = [
    'position:fixed',
    'bottom:20px',
    'right:20px',
    'width:50px',
    'height:50px',
    'border-radius:50%','background:#1e3a8a','color:#fff','border:none',
    'font-size:20px','cursor:pointer','opacity:0','transition:opacity .3s','z-index:1000'
  ].join(';');

  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    button.style.opacity = window.scrollY > 500 ? '1' : '0';
  });
})();

// Safety binder to ensure mobile navbar works on every page
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const toggle = document.getElementById('mobileToggle');
    const navContent = document.getElementById('navContent');
    const navMenu = document.getElementById('navMenu');
    if(!toggle || !navContent || !navMenu) return;
    if(toggle.dataset.bound === '1') return;
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', function(){
      navContent.classList.toggle('active');
      navMenu.classList.toggle('active');
      toggle.classList.toggle('active');
      const servicesDropdown = navMenu.querySelector('.dropdown');
      if (servicesDropdown) {
        if (navContent.classList.contains('active')) servicesDropdown.classList.add('open');
        else servicesDropdown.classList.remove('open');
      }
    });
    // Close menu when any link is clicked (works for hashes and normal links)
    navMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(e){
        // keep menu open if the link is the Services dropdown toggle
        if (a.classList.contains('dropdown-toggle')) return;
        navContent.classList.remove('active');
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        const servicesDropdown = navMenu.querySelector('.dropdown');
        if (servicesDropdown) servicesDropdown.classList.remove('open');
      });
    });
    // Toggle Services dropdown on tap
    var serviceToggle = navMenu.querySelector('.dropdown-toggle');
    var serviceDropdown = serviceToggle ? serviceToggle.closest('.dropdown') : null;
    if(serviceToggle && serviceDropdown){
      serviceToggle.addEventListener('click', function(e){
        // Only prevent default/toggle when mobile menu is open
        if(navContent.classList.contains('active')){
          e.preventDefault();
          e.stopPropagation();
          serviceDropdown.classList.toggle('open');
        }
      });
    }
  }, { once: true });
})();

// Generic counter animation for any .stat-number on the page (e.g., landing stats)
(function(){
  const nodes = document.querySelectorAll('.stat-number');
  if(!nodes.length) return;

  function formatCompact(value){
    if(value >= 1_000_000) return { text: (value/1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + 'M', raw: value };
    if(value >= 1_000) return { text: (value/1_000).toFixed(value % 1_000 === 0 ? 0 : 1) + 'K', raw: value };
    return { text: String(value), raw: value };
  }

  function easeOutQuad(t){ return t*(2-t); }

  function animate(el){
    const targetAttr = el.getAttribute('data-target');
    const compactAttr = el.getAttribute('data-compact');
    const suffixAttr = el.getAttribute('data-suffix') || '';

    const rawText = el.textContent || '';
    const fallbackTarget = parseInt(rawText.replace(/[^\d]/g, ''), 10) || 0;

    const target = targetAttr ? parseInt(targetAttr, 10) : fallbackTarget;
    const compact = compactAttr === 'true';
    const duration = 1200; // ms
    const start = performance.now();

    if (el.__counterRAF) cancelAnimationFrame(el.__counterRAF);

    function tick(now){
      const elapsed = Math.min(1, (now - start)/duration);
      const eased = easeOutQuad(elapsed);
      const current = Math.round(target * eased);
      let text;
      if(compact){
        text = formatCompact(current).text;
      } else {
        text = current.toLocaleString();
      }
      el.textContent = text + suffixAttr;
      if(elapsed < 1) {
        el.__counterRAF = requestAnimationFrame(tick);
      } else {
        const finalText = compact ? formatCompact(target).text : target.toLocaleString();
        el.textContent = finalText + suffixAttr;
        el.__counterRAF = 0;
      }
    }

    el.__counterRAF = requestAnimationFrame(tick);
  }

  function reset(el){
    const suffixAttr = el.getAttribute('data-suffix') || '';
    if (el.__counterRAF) cancelAnimationFrame(el.__counterRAF);
    el.__counterRAF = 0;
    el.textContent = '0' + suffixAttr;
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      const el = entry.target;
      if(entry.isIntersecting){
        if (el.__inView) return; // prevent multiple triggers while visible
        el.__inView = true;
        animate(el);
      } else {
        el.__inView = false;
        reset(el);
      }
    });
  },{threshold:0.5, rootMargin:'0px 0px -10% 0px'});

  nodes.forEach(n=>io.observe(n));
})();

// Flag page loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Prevent immediate continuous floating animation on page load
  let hasUserInteracted = false;
  let continuousAnimationStarted = false;
  
  // Track user interaction
  const trackInteraction = () => {
    hasUserInteracted = true;
  };
  
  ['scroll', 'mousemove', 'click', 'touchstart'].forEach(event => {
    document.addEventListener(event, trackInteraction, { once: true });
  });
  
  // Add continuous floating animation only after user interaction or significant delay
  const startContinuousAnimation = () => {
    if (continuousAnimationStarted) return;
    continuousAnimationStarted = true;
    
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('loaded');
        // Stagger the continuous animation start
        element.style.animationDelay = `${index * 0.5}s`;
      }, index * 300);
    });
  };
  
  // Start animation either after user interaction + delay or after long delay
  setTimeout(() => {
    if (hasUserInteracted) {
      setTimeout(startContinuousAnimation, 3000); // 3 seconds after interaction
    } else {
      setTimeout(startContinuousAnimation, 8000); // 8 seconds if no interaction
    }
  }, 4000); // Wait for initial animations to complete
});

// ------------------------------
// Hero floating elements interactive effects
// ------------------------------
(function() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach(element => {
    // Add subtle parallax effect on mouse move
    element.addEventListener('mouseenter', () => {
      element.style.animationPlayState = 'paused';
      element.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.animationPlayState = 'running';
      element.style.transform = '';
    });
  });

  // Parallax effect on hero section
  const hero = document.querySelector('.hero');
  const heroFloatingElements = document.querySelector('.hero-floating-elements');
  
  if (hero && heroFloatingElements) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.3;
      
      if (scrolled < hero.offsetHeight) {
        heroFloatingElements.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }
})();

// Animate hero progress bars on view
(function(){
  const hero = document.querySelector('.secondary-hero');
  if(!hero) return;
  const fills = hero.querySelectorAll('.hero-progress .progress-fill');
  if(!fills.length) return;

  const activate = () => {
    fills.forEach((el)=>{
      const width = parseInt(el.getAttribute('data-width') || '100', 10);
      // cap between 0 and 100
      const safe = Math.max(0, Math.min(100, width));
      el.style.width = safe + '%';
    });
  };

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        activate();
        observer.disconnect();
      }
    })
  }, { threshold: 0.3 });

  observer.observe(hero);
})();

// ------------------------------
// Fade-in effect for headings (replaces typewriter)
// ------------------------------
(function(){
  const headings = [
    document.getElementById('heroTitle'),
    document.getElementById('servicesHeading'),
    ...Array.from(document.querySelectorAll('h2.fade-on-view'))
  ].filter(Boolean);

  if(!headings.length) return;

  headings.forEach(h => h.classList.add('fade-in-start'));

  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.classList.add('fade-in-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.6, rootMargin: '0px 0px -10% 0px' });

  headings.forEach(h=>io.observe(h));
})();

// ------------------------------
// Anti-copy & basic content protection (deterrent only)
// ------------------------------
(function(){
  if (window.__antiCopyBound) return; // avoid double-binding
  window.__antiCopyBound = true;

  function isEditable(target){
    if(!target) return false;
    const tag = (target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return true;
    if (target.isContentEditable) return true;
    // allow inside editable ancestors
    let node = target;
    while (node) {
      if (node.isContentEditable) return true;
      node = node.parentElement;
    }
    return false;
  }

  // Add a class to body to enable CSS-based selection/drag disable
  function applyNoCopyClass(){
    document.documentElement.classList.add('no-copy-root');
    document.body && document.body.classList.add('no-copy');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNoCopyClass, { once: true });
  } else {
    applyNoCopyClass();
  }

  // Disable context menu (right click) outside editable fields
  document.addEventListener('contextmenu', function(e){
    if (!isEditable(e.target)) {
      e.preventDefault();
    }
  });

  // Block common copy shortcuts outside editable fields
  document.addEventListener('keydown', function(e){
    const key = e.key.toLowerCase();
    const ctrlOrMeta = e.ctrlKey || e.metaKey;
    const isDevtools = ctrlOrMeta && (key === 'i' || key === 'j' || key === 'u');
    const isCopyOps = ctrlOrMeta && (key === 'c' || key === 'x' || key === 's' || key === 'p');
    const isSelectAll = ctrlOrMeta && key === 'a';

    if (!isEditable(e.target)) {
      if (isCopyOps || isSelectAll) {
        e.preventDefault();
      }
      // prevent saving/printing shortcuts as a deterrent
      if (key === 's' && ctrlOrMeta) {
        e.preventDefault();
      }
      if (key === 'p' && ctrlOrMeta) {
        e.preventDefault();
      }
    }

    // mild deterrent for opening devtools / view-source
    if (isDevtools) {
      // no-op preventDefault to avoid breaking legitimate power users too much
      // e.preventDefault();
    }
  }, true);

  // Disable selection/drag outside editable fields
  document.addEventListener('selectstart', function(e){
    if (!isEditable(e.target)) e.preventDefault();
  });
  document.addEventListener('dragstart', function(e){
    if (!isEditable(e.target)) e.preventDefault();
  });

  // Watermark in DevTools console
  try {
    const msg = [
      '%cNorthern Star Logistics Inc',
      'font-weight:700;font-size:14px;color:#0b3760;',
      '\nContent is protected by terms of use. Please contact us for licensing.'
    ];
    // Split styling and message to keep it simple across browsers
    console.log(msg[0], msg[1]);
    console.log(msg[2]);
  } catch(_){}
})();