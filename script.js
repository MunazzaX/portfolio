/* ══════════════════════════════════════
   SHAIKH MUNAZZA — PORTFOLIO SCRIPT
   All animations, interactions & effects
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     1. PRELOADER
  ───────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  });

  /* ─────────────────────────────────────
     2. AOS INIT
  ───────────────────────────────────── */
  AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  /* ─────────────────────────────────────
     3. CUSTOM CURSOR
  ───────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* ─────────────────────────────────────
     4. SCROLL PROGRESS
  ───────────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
  });

  /* ─────────────────────────────────────
     5. NAVBAR: scrolled state + active
  ───────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  /* ─────────────────────────────────────
     6. HAMBURGER MENU
  ───────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  /* ─────────────────────────────────────
     7. TYPING EFFECT
  ───────────────────────────────────── */
  const roles = [
    'UI/UX Designer',
    'Graphic Designer',
    'Visual Storyteller',
    'Brand Designer',
    'Web Designer',
  ];
  const typedEl = document.getElementById('typed-text');
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 1000);

  /* ─────────────────────────────────────
     8. PARTICLES CANVAS
  ───────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.r     = Math.random() * 3 + 1;
      this.alpha = Math.random() * 0.4 + 0.05;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = (Math.random() - 0.5) * 0.4;
      this.color = Math.random() > 0.5 ? '#e7c4b6' : '#c9987f';
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(201,152,127,' + (0.08 * (1 - dist / 100)) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ─────────────────────────────────────
     9. SKILL BARS + COUNTER
  ───────────────────────────────────── */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillPcts  = document.querySelectorAll('.skill-pct');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;
    const section = document.getElementById('skills');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      skillsAnimated = true;
      skillFills.forEach((fill, i) => {
        const w = fill.dataset.width;
        fill.style.width = w + '%';
        // counter
        const pct = skillPcts[i];
        let count = 0;
        const target = parseInt(pct.dataset.pct);
        const step = target / 60;
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          pct.textContent = Math.round(count) + '%';
          if (count >= target) clearInterval(interval);
        }, 20);
      });
    }
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  /* ─────────────────────────────────────
     10. STATS COUNTER
  ───────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const section = document.getElementById('about');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      statsAnimated = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.count);
        let count = 0;
        const step = Math.max(target / 60, 1);
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = Math.round(count);
          if (count >= target) clearInterval(interval);
        }, 25);
      });
    }
  }
  window.addEventListener('scroll', animateStats);
  animateStats();

  /* ─────────────────────────────────────
     11. RESUME MODAL
  ───────────────────────────────────── */
  const modal      = document.getElementById('resumeModal');
  const viewBtn    = document.getElementById('viewResumeBtn');
  const closeModal = document.getElementById('modalClose');

  viewBtn && viewBtn.addEventListener('click', () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  closeModal && closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });
  modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ─────────────────────────────────────
     12. CONTACT FORM
  ───────────────────────────────────── */
  const sendBtn = document.getElementById('sendBtn');
  const toast   = document.getElementById('toast');

  sendBtn && sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
      // Shake animation on empty fields
      [document.getElementById('fname'), document.getElementById('femail'), document.getElementById('fmessage')]
        .forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#e07070';
            field.style.animation = 'shake 0.35s ease';
            setTimeout(() => {
              field.style.borderColor = '';
              field.style.animation = '';
            }, 500);
          }
        });
      return;
    }

    // Simulate send
    sendBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 0.7s linear infinite"></i> Sending…';
    setTimeout(() => {
      sendBtn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3200);
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fsubject').value = '';
      document.getElementById('fmessage').value = '';
    }, 1500);
  });

  /* ─────────────────────────────────────
     13. BACK TO TOP
  ───────────────────────────────────── */
  const backTop = document.getElementById('back-to-top');
  backTop && backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────
     14. MAGNETIC BUTTONS
  ───────────────────────────────────── */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width  / 2);
      const dy = e.clientY - (rect.top  + rect.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ─────────────────────────────────────
     15. MOUSE PARALLAX ON HERO
  ───────────────────────────────────── */
  const blobs = document.querySelectorAll('#hero .blob');
  document.getElementById('hero').addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    blobs.forEach((b, i) => {
      const factor = (i + 1) * 12;
      b.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });

  /* ─────────────────────────────────────
     16. TILT ON PROJECT CARDS
  ───────────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
    });
  });

  /* ─────────────────────────────────────
     17. SMOOTH SCROLL FOR NAV LINKS
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────
     18. INJECT EXTRA KEYFRAMES
  ───────────────────────────────────── */
  const extraStyles = document.createElement('style');
  extraStyles.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-6px); }
      75% { transform: translateX(6px); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(extraStyles);

  /* ─────────────────────────────────────
     19. INTERSECTION OBSERVER: TIMELINE
  ───────────────────────────────────── */
  const tlItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.2 });

  tlItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    item.style.transform = item.classList.contains('right') ? 'translateX(40px)' : 'translateX(-40px)';
    tlObserver.observe(item);
  });

  /* ─────────────────────────────────────
     20. HOVER GLOW ON CONTACT CARDS
  ───────────────────────────────────── */
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 8px 32px rgba(201,152,127,0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

}); // END DOMContentLoaded