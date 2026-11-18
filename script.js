document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // Preloader
  // ============================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('hidden');
  });
  setTimeout(() => preloader.classList.add('hidden'), 2000);

  // ============================================
  // Custom Cursor
  // ============================================
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .theme-btn, .menu-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  // ============================================
  // Navigation
  // ============================================
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ============================================
  // Active Nav Link on Scroll
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ============================================
  // Theme Toggle
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-sun';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'light');
    }
  });

  // ============================================
  // Typewriter Effect
  // ============================================
  const typewriter = document.getElementById('typewriter');
  const words = ['Web Application', 'Mobile Application', 'Desktop Application', 'UI/UX designs', ' with creative solutions',  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const current = words[wordIndex];

    if (isDeleting) {
      typewriter.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriter.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 300;
    }

    setTimeout(type, typingSpeed);
  }

  type();

  // ============================================
  // Scroll Reveal (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // Animated Counters
  // ============================================
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const max = parseInt(target.getAttribute('data-target'));
        animateCounter(target, max);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  function animateCounter(el, max) {
    let current = 0;
    const increment = Math.ceil(max / 60);
    const interval = setInterval(() => {
      current += increment;
      if (current >= max) {
        el.textContent = max + '+';
        clearInterval(interval);
      } else {
        el.textContent = current;
      }
    }, 25);
  }

  counters.forEach(c => counterObserver.observe(c));

  // ============================================
  // Animated Skill Bars
  // ============================================
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ============================================
  // Testimonial Slider
  // ============================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;

  if (testimonialCards.length > 0) {
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('span');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      testimonialCards.forEach(c => c.classList.remove('active'));
      dotsContainer.querySelectorAll('span').forEach(d => d.classList.remove('active'));
      testimonialCards[index].classList.add('active');
      dotsContainer.children[index].classList.add('active');
      currentSlide = index;
    }

    setInterval(() => {
      const next = (currentSlide + 1) % testimonialCards.length;
      goToSlide(next);
    }, 5000);
  }

  // ============================================
  // Contact Form
  // ============================================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');

      setTimeout(() => {
        contactForm.reset();
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });

  // ============================================
  // Toast Notification
  // ============================================
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // Keyboard Accessibility
  // ============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

});
