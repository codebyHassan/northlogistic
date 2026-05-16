
document.addEventListener('DOMContentLoaded', function () {
  const step = parseInt(document.body.dataset.step || '1');
  document.querySelectorAll('.stepper-item').forEach((el, idx) => {
    if (idx + 1 <= step) el.classList.add('active');
    else el.classList.remove('active');
  });
});

