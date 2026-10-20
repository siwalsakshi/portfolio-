// Modern Portfolio JavaScript - Sakshi Siwal

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
      themeIcon.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  // 2. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // 3. Typing Animation Effect in Hero
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Mobile App Developer (Flutter & React Native)',
      'Software Developer (SDE)',
      'Full-Stack Developer (Node.js & Supabase)',
      'AI & Workflow Automation Enthusiast',
      'Problem Solver (1000+ CodeChef / 250+ LeetCode)'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const eraseSpeed = 40;
    const delayBetween = 1800;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? eraseSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = delayBetween;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(type, timeout);
    }

    type();
  }

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. ScrollSpy for Navbar Active Item
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  // 6. Copy Email with Toast Feedback
  window.copyEmail = function(email) {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(`Copied ${email} to clipboard!`);
    });
  };

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
