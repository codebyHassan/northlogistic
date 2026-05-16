// Reuse mobile nav toggle
(function(){
  const toggle=document.getElementById('mobileToggle');
  const navMenu=document.getElementById('navMenu');
  const navContent=document.getElementById('navContent');
  if(toggle){toggle.addEventListener('click',()=>{navMenu.classList.toggle('active');navContent.classList.toggle('active');toggle.classList.toggle('active');});}
  const dropdownToggles=document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach((t)=>{t.addEventListener('click',(e)=>{e.preventDefault();t.closest('.dropdown').classList.toggle('open');});});
})();

// Simple reveal on scroll
(function () {
  const els = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  els.forEach((el) => obs.observe(el));
})(); 