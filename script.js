document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.main-nav');
  const backdrop = document.querySelector('.backdrop');
  const links = document.querySelectorAll('.main-nav a');

  const closeMenu = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    backdrop.classList.toggle('visible', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach((item) => observer.observe(item));
  } else {
    reveal.forEach((item) => item.classList.add('visible'));
  }

  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'ধন্যবাদ। আপনার বার্তাটি প্রস্তুত হয়েছে। Backend সংযোগ করা হলে এটি পাঠানো যাবে।';
    form.reset();
  });
});
