(function(){
  // Reuse mobile toggle if global script not bound yet
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navContent = document.getElementById('navContent');
  if (toggle && !toggle.dataset.bound) {
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navContent.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }

  // IMPORTANT: Do not bind dropdown toggle here to avoid double‑toggle conflicts.
  // Global script.js manages `.dropdown-toggle` for both desktop and mobile.

  // Optional: highlight blocks when visible
  const blocks = document.querySelectorAll('.service-block');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){ entry.target.classList.add('visible'); }
    });
  },{threshold:0.15});
  blocks.forEach((b)=>observer.observe(b));
})(); 