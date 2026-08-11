document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navPanel = document.querySelector('.nav-panel');

  if (mobileMenuToggle && navPanel) {
    navPanel.setAttribute('aria-hidden', 'true');

    function setMenuState(isOpen) {
      mobileMenuToggle.classList.toggle('active', isOpen);
      navPanel.classList.toggle('active', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navPanel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    mobileMenuToggle.addEventListener('click', () => {
      setMenuState(!mobileMenuToggle.classList.contains('active'));
    });

    document.querySelectorAll('.nav-links a, .nav-meta a').forEach((link) => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.nav-dropdown-toggle').forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
        });
        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenuToggle.classList.contains('active')) {
        setMenuState(false);
      }
    });

    document.addEventListener('click', (event) => {
      if (
        mobileMenuToggle.classList.contains('active') &&
        !navPanel.contains(event.target) &&
        !mobileMenuToggle.contains(event.target)
      ) {
        setMenuState(false);
      }
    });
  }

  const requestButtons = document.querySelectorAll('[data-request-button]');
  const requestCards = document.querySelectorAll('[data-request-card]');
  const requestInput = document.querySelector('input[name="request_type_selection"]');
  const requestLabel = document.querySelector('[data-request-selection]');
  const formSection = document.getElementById('contact-form');

  function getTranslationText(key, fallback) {
    const [section, subkey] = key.split('.');
    if (
      typeof translations !== 'undefined' &&
      translations[section] &&
      translations[section][currentLang] &&
      translations[section][currentLang][subkey]
    ) {
      return translations[section][currentLang][subkey];
    }
    return fallback;
  }

  function applyRequestType(type, shouldScroll) {
    if (!type) {
      return;
    }

    requestCards.forEach((card) => {
      card.classList.toggle('selected', card.getAttribute('data-request-card') === type);
    });

    if (requestInput) {
      requestInput.value = type;
    }

    if (requestLabel) {
      requestLabel.textContent = type === 'quote'
        ? getTranslationText('contactPage.selectionQuote', 'Quote request selected')
        : getTranslationText('contactPage.selectionSupport', 'Support request selected');
    }

    if (shouldScroll && formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  requestButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyRequestType(button.getAttribute('data-request-button'), true);
    });
  });

  const requestTypeFromQuery = new URLSearchParams(window.location.search).get('request');
  if (requestTypeFromQuery === 'quote' || requestTypeFromQuery === 'support') {
    applyRequestType(requestTypeFromQuery, false);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.02,
      rootMargin: '0px 0px -20px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });

  // Fallback: if any reveal blocks never intersect (short pages, edge viewport sizes),
  // make sure they still become visible instead of staying hidden.
  window.setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => {
      element.classList.add('is-visible');
      observer.unobserve(element);
    });
  }, 900);

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Urgency banner dismiss
  const urgencyBanner = document.getElementById('urgency-banner');
  const urgencyDismiss = document.getElementById('urgency-banner-dismiss');
  if (urgencyBanner && urgencyDismiss) {
    if (localStorage.getItem('bannerDismissed') === '1') {
      urgencyBanner.style.display = 'none';
    }
    urgencyDismiss.addEventListener('click', () => {
      urgencyBanner.style.display = 'none';
      localStorage.setItem('bannerDismissed', '1');
    });
  }

  // Services carousel
  const carousel = document.getElementById('services-carousel');
  if (carousel) {
    const cards = Array.from(carousel.querySelectorAll('.service-scope-card'));
    const prevButton = carousel.querySelector('.carousel-arrow-prev');
    const nextButton = carousel.querySelector('.carousel-arrow-next');
    let activeIndex = 0;
    let autoAdvanceTimer = null;

    function showCard(index) {
      cards[activeIndex].classList.remove('carousel-active');
      activeIndex = (index + cards.length) % cards.length;
      cards[activeIndex].classList.add('carousel-active');
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      autoAdvanceTimer = window.setInterval(() => {
        showCard(activeIndex + 1);
      }, 6000);
    }

    function stopAutoAdvance() {
      if (autoAdvanceTimer) {
        window.clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
      }
    }

    if (cards.length > 0) {
      cards[activeIndex].classList.add('carousel-active');
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        showCard(activeIndex - 1);
        startAutoAdvance();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        showCard(activeIndex + 1);
        startAutoAdvance();
      });
    }

    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    carousel.addEventListener('focusin', stopAutoAdvance);
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) {
        startAutoAdvance();
      }
    });

    startAutoAdvance();
  }
});
