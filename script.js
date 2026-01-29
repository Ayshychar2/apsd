const heroSlider = document.querySelector('[data-slider="hero"]');

const initSlider = (root, options = {}) => {
  if (!root) return null;
  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  const dotsContainer = root.querySelector('.hero-dots');
  let current = 0;
  let timer;

  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.addEventListener('click', () => goTo(index));
      dotsContainer.appendChild(dot);
    });
  }

  const update = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === current);
    });
    if (dotsContainer) {
      const dots = Array.from(dotsContainer.children);
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === current));
    }
  };

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;
    update();
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const start = () => {
    clearInterval(timer);
    timer = setInterval(next, options.interval || 5000);
  };

  const prevButton = root.querySelector('[data-hero-prev]');
  const nextButton = root.querySelector('[data-hero-next]');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prev();
      start();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      next();
      start();
    });
  }

  update();
  start();

  return { next, goTo, start };
};

const hero = initSlider(heroSlider, { interval: 5200 });

const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach((item) => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    accordionItems.forEach((el) => el.classList.remove('is-open'));
    if (!isOpen) item.classList.add('is-open');
  });
});
