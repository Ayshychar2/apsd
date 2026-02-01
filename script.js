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

const reelCards = document.querySelectorAll('.reel-card');
reelCards.forEach((card) => {
  const video = card.querySelector('video');
  const button = card.querySelector('.reel-audio');
  if (!video || !button) return;
  button.classList.add('is-muted');
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const isMuted = video.muted;
    if (isMuted) {
      reelCards.forEach((otherCard) => {
        const otherVideo = otherCard.querySelector('video');
        const otherButton = otherCard.querySelector('.reel-audio');
        if (!otherVideo || !otherButton || otherVideo === video) return;
        otherVideo.muted = true;
        otherVideo.setAttribute('muted', '');
        otherButton.classList.add('is-muted');
        otherButton.setAttribute('aria-pressed', 'false');
        otherButton.setAttribute('aria-label', 'Listen to reel');
      });
      video.muted = false;
      video.removeAttribute('muted');
      video.volume = 1;
      button.classList.remove('is-muted');
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', 'Mute reel');
      video.play();
    } else {
      video.muted = true;
      video.setAttribute('muted', '');
      button.classList.add('is-muted');
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', 'Listen to reel');
    }
  });
});

const scrollButtons = document.querySelectorAll('[data-scroll-target]');
scrollButtons.forEach((button) => {
  const targetId = button.getAttribute('data-scroll-target');
  const direction = button.getAttribute('data-direction');
  const container = document.getElementById(targetId);
  if (!container) return;
  button.addEventListener('click', () => {
    const firstItem = container.firstElementChild;
    const styles = window.getComputedStyle(container);
    const gapValue = styles.columnGap || styles.gap || '0';
    const gap = Number.parseFloat(gapValue) || 0;
    const itemWidth = firstItem ? firstItem.getBoundingClientRect().width : container.clientWidth * 0.8;
    const scrollAmount = itemWidth + gap;
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  });
});
