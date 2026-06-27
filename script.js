/* ══════════════════════════════════════
   SHAIKH MUNAZZA — PORTFOLIO SCRIPT
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     1. PRELOADER
  ───────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2200);
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
     3. CUSTOM CURSOR — Diamond style
  ───────────────────────────────────── */
  const curDot   = document.getElementById('cur-dot');
  const curRing  = document.getElementById('cur-ring');
  const curTrail = document.getElementById('cur-trail');

  if (curDot && curRing && curTrail) {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let tx = 0, ty = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      curDot.style.left = mx + 'px';
      curDot.style.top  = my + 'px';
    });

    function animateCursor() {
      // ring follows with lag
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      curRing.style.left = rx + 'px';
      curRing.style.top  = ry + 'px';
      // trail follows with more lag
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      curTrail.style.left = tx + 'px';
      curTrail.style.top  = ty + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state
    document.querySelectorAll('a, button, .project-card, .stat-card, .edu-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
    });
  }

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
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  /* ─────────────────────────────────────
     6. HAMBURGER MENU
  ───────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
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
    'Creative Thinker',
  ];
  const typedEl = document.getElementById('typed-text');
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    typedEl.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;

    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length) { delay = 1800; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  }
  setTimeout(type, 1000);

  /* ─────────────────────────────────────
     8. PARTICLES CANVAS
  ───────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');

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
      this.r     = Math.random() * 2.5 + 0.5;
      this.alpha = Math.random() * 0.35 + 0.05;
      this.vx    = (Math.random() - 0.5) * 0.35;
      this.vy    = (Math.random() - 0.5) * 0.35;
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
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
  }

  const particles = Array.from({ length: 60 }, () => new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201,152,127,${0.07 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.8;
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
  let skillsAnimated = false;
  const skillFills   = document.querySelectorAll('.skill-fill');
  const skillPcts    = document.querySelectorAll('.skill-pct');

  function animateSkills() {
    if (skillsAnimated) return;
    const sec = document.getElementById('skills');
    if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.85) {
      skillsAnimated = true;
      skillFills.forEach((fill, i) => {
        fill.style.width = fill.dataset.width + '%';
        const pct = skillPcts[i];
        let count = 0;
        const target = parseInt(pct.dataset.pct);
        const interval = setInterval(() => {
          count = Math.min(count + target / 60, target);
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
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    const sec = document.getElementById('about');
    if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.85) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num').forEach(el => {
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
  const modal     = document.getElementById('resumeModal');
  const viewBtn   = document.getElementById('viewResumeBtn');
  const closeModal = document.getElementById('modalClose');

  viewBtn?.addEventListener('click', () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  closeModal?.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  });

  /* ─────────────────────────────────────
     12. CONTACT FORM — Web3Forms API
  ───────────────────────────────────── */
  const sendBtn  = document.getElementById('sendBtn');
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function showToast(msg, success = true) {
    toastMsg.textContent = msg;
    toast.querySelector('i').className = success ? 'ri-checkbox-circle-line' : 'ri-error-warning-line';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  sendBtn?.addEventListener('click', async () => {
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    // Validation
    const fields = [
      { el: document.getElementById('fname'), val: name },
      { el: document.getElementById('femail'), val: email },
      { el: document.getElementById('fmessage'), val: message },
    ];
    let hasError = false;
    fields.forEach(({ el, val }) => {
      if (!val) {
        el.style.borderColor = '#e07070';
        el.style.animation = 'shake 0.35s ease';
        setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 600);
        hasError = true;
      }
    });
    if (hasError) return;

    // Loading state
    sendBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 0.7s linear infinite"></i> Sending…';
    sendBtn.disabled = true;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '16e40b32-ff84-4fdb-b9a7-bbdae5960467',
          name,
          email,
          subject: subject || 'Portfolio Contact Form',
          message,
          from_name: 'Munazza Portfolio',
        }),
      });
      const data = await res.json();

      if (data.success) {
        showToast('Message sent! I\'ll get back to you soon 🎉', true);
        ['fname','femail','fsubject','fmessage'].forEach(id => {
          document.getElementById(id).value = '';
        });
      } else {
        showToast('Oops! Something went wrong. Please try again.', false);
      }
    } catch {
      showToast('Network error. Please try again.', false);
    } finally {
      sendBtn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';
      sendBtn.disabled = false;
    }
  });

  /* ─────────────────────────────────────
     13. BACK TO TOP
  ───────────────────────────────────── */
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────
     14. MAGNETIC BUTTONS
  ───────────────────────────────────── */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ─────────────────────────────────────
     15. PARALLAX BLOBS ON HERO
  ───────────────────────────────────── */
  const heroEl = document.getElementById('hero');
  const blobs  = document.querySelectorAll('#hero .blob');
  heroEl?.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
    blobs.forEach((b, i) => {
      const f = (i + 1) * 12;
      b.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
    });
  });

  /* ─────────────────────────────────────
     16. TILT ON PROJECT CARDS
  ───────────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
    });
  });

  /* ─────────────────────────────────────
     17. SMOOTH SCROLL
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────
     18. TIMELINE OBSERVER
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
     19. EXTRA KEYFRAMES
  ───────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake { 0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)} }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────
     20. HERO-IMAGE WRAP: mouse parallax 3D
  ───────────────────────────────────── */
  const heroImgWrap = document.querySelector('.hero-image-wrap');
  heroEl?.addEventListener('mousemove', (e) => {
    if (!heroImgWrap) return;
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx * 6;
    const dy = (e.clientY - cy) / cy * 4;
    heroImgWrap.style.transform = `perspective(800px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
  });
  heroEl?.addEventListener('mouseleave', () => {
    if (heroImgWrap) heroImgWrap.style.transform = '';
  });

});
