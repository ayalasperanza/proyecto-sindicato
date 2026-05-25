/* ===========================
   SICONAP/S — Scripts
   =========================== */

// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Cerrar al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Animaciones al scroll (Intersection Observer)
const animTargets = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animTargets.forEach(el => observer.observe(el));

// ── Formulario — envío simulado con toast
const form = document.getElementById('asociate-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulación de envío (reemplazar con fetch real cuando haya backend)
  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    form.reset();
    showToast('¡Solicitud enviada! Nos comunicaremos pronto con vos.');
  }, 1400);
});

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// ── Canvas — partículas río Paraná
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 30 : 90;
  const particles = [];

  class Particle {
    constructor() { this.init(true); }
    init(randomY = false) {
      this.x  = Math.random() * canvas.width;
      this.y  = randomY ? Math.random() * canvas.height : canvas.width + 10;
      this.r  = Math.random() * 2.2 + 0.4;
      this.vx = -(Math.random() * 0.6 + 0.15);
      this.vy = (Math.random() - 0.5) * 0.25;
      this.a  = Math.random() * 0.45 + 0.08;
      this.green = Math.random() > 0.65;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10) this.init();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.green
        ? `rgba(26,107,60,${this.a})`
        : `rgba(180,230,200,${this.a * 0.6})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(26,107,60,${0.07 * (1 - d / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── 3D Tilt en tarjetas (solo desktop)
const hasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
if (!hasTouch) document.querySelectorAll('.directiva-card, .testimonio-card, .cobertura-card, .noticia-card').forEach(card => {
  card.classList.add('tilt-card');
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    const cx = r.width  / 2;
    const cy = r.height / 2;
    const rx =  (y - cy) / 14;
    const ry = -(x - cx) / 14;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}); // cierre del if (!hasTouch)

// ── Scroll spy — navlink activo
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('nav-active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('nav-active');
    }
  });
}, { rootMargin: '-50% 0px -45% 0px' });

sections.forEach(s => spyObserver.observe(s));

// ── Contadores animados
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.floor(easeOut(progress) * target).toLocaleString('es');
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString('es');
      el.classList.add('done');
    }
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.counters-section').forEach(el => counterObserver.observe(el));

// ── FAQ acordeón
document.querySelectorAll('.faq-pregunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item     = btn.parentElement;
    const respuesta = item.querySelector('.faq-respuesta');
    const isOpen   = btn.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.faq-pregunta.open').forEach(b => {
      b.classList.remove('open');
      b.parentElement.querySelector('.faq-respuesta').classList.remove('open');
    });

    // Abrir el clickeado si estaba cerrado
    if (!isOpen) {
      btn.classList.add('open');
      respuesta.classList.add('open');
    }
  });
});

// ══════════════════════════════════════════════════════
// ── GALERÍA JSON-DRIVEN ──────────────────────────────
// Para agregar/cambiar fotos: editá assets/galeria/galeria.json
// NO hace falta tocar index.html ni este script
// ══════════════════════════════════════════════════════

const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxTitulo = document.getElementById('lightboxTitulo');
const lightboxDesc   = document.getElementById('lightboxDesc');
const lightboxClose  = document.getElementById('lightboxClose');

function construirItemGaleria(item) {
  const grande  = item.grande ? ' grande' : '';
  const imgHTML = item.archivo
    ? `<div class="galeria-img" style="background-image:url('assets/galeria/${item.archivo}');background-size:cover;background-position:center top;"></div>`
    : `<div class="galeria-img ${item.placeholder || 'gi-1'}"></div>`;

  const div = document.createElement('div');
  div.className = `galeria-item${grande}`;
  div.dataset.categoria = item.categoria;
  div.dataset.titulo    = item.titulo;
  div.dataset.desc      = item.desc;
  div.dataset.archivo   = item.archivo || '';
  div.innerHTML = `${imgHTML}<div class="galeria-overlay"><span>${item.etiqueta}</span></div>`;
  return div;
}

function iniciarEventosGaleria() {
  // Filtros
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filtro = btn.dataset.filtro;
      document.querySelectorAll('.galeria-item').forEach(item => {
        item.classList.toggle('oculto', filtro !== 'todos' && item.dataset.categoria !== filtro);
      });
    });
  });

  // Lightbox
  document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', () => {
      const archivo = item.dataset.archivo;
      if (archivo) {
        lightboxImg.style.background = `url('assets/galeria/${archivo}') center/cover no-repeat`;
      } else {
        const imgEl = item.querySelector('.galeria-img');
        lightboxImg.style.background = getComputedStyle(imgEl).background;
      }
      lightboxTitulo.textContent = item.dataset.titulo;
      lightboxDesc.textContent   = item.dataset.desc;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

async function cargarGaleria() {
  const grid = document.getElementById('galeriaGrid');
  if (!grid) return;

  try {
    const res = await fetch('assets/galeria/galeria.json?v=' + Date.now());
    if (!res.ok) throw new Error('galeria.json no disponible');
    const items = await res.json();

    // Limpiar grid y renderizar desde JSON
    grid.innerHTML = '';
    items.forEach(item => grid.appendChild(construirItemGaleria(item)));
    iniciarEventosGaleria();

  } catch (err) {
    // Fallback: el HTML ya tiene items estáticos
    console.info('Galería: usando items estáticos del HTML.', err.message);
    iniciarEventosGaleria();
  }
}

cargarGaleria();

// Cerrar lightbox
lightboxClose.addEventListener('click', cerrarLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) cerrarLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarLightbox(); });

function cerrarLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
