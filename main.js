/* ============================================================
   PORTFOLIO — main.js  |  Full Pro Version
   ============================================================ */
'use strict';

// ─── Navbar scroll shadow ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── Mobile nav toggle ───────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ─── Scroll Reveal ───────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.timeline-card, .project-card, .skill-category, .about-terminal-wrapper, .about-avatar-col, .contact-info, .contact-form-wrapper'
).forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });

// ─── Active nav link ─────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      links.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => sectionObserver.observe(s));

// ─── Contact form ────────────────────────────────────────────
const sendBtn    = document.getElementById('sendBtn');
const formStatus = document.getElementById('formStatus');
const formName   = document.getElementById('formName');
const formEmail  = document.getElementById('formEmail');
const formMsg    = document.getElementById('formMessage');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name  = formName?.value.trim();
    const email = formEmail?.value.trim();
    const msg   = formMsg?.value.trim();
    if (!name || !email || !msg) {
      formStatus.style.color = 'var(--red)';
      formStatus.textContent = '// Error: todos los campos son requeridos.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.style.color = 'var(--red)';
      formStatus.textContent = '// Error: email inválido.';
      return;
    }
    const FORM_ENDPOINT = "https://formspree.io/f/mvzwerjd";
    sendBtn.disabled = true;
    sendBtn.textContent = '// Enviando...';
    formStatus.style.color = 'var(--text-muted)';
    formStatus.textContent = '// Connecting to server...';
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message: msg }),
    })
      .then(res => {
        if (res.ok) {
          formStatus.style.color = 'var(--accent)';
          formStatus.textContent = '// ✓ Mensaje enviado. ¡Gracias!';
          formName.value = formEmail.value = formMsg.value = '';
        } else throw new Error();
      })
      .catch(() => {
        formStatus.style.color = 'var(--red)';
        formStatus.textContent = '// Error de conexión. Intenta de nuevo.';
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = '▶ Run Script';
      });
  });
}

// ─── Smooth scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── Skill pills hover ───────────────────────────────────────
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('mouseenter', () => pill.style.letterSpacing = '0.15em');
  pill.addEventListener('mouseleave', () => pill.style.letterSpacing = '');
});

// ─── Typewriter navbar ───────────────────────────────────────
const keyText  = document.getElementById('typewriter-keyword');
const keywords = ['STABLE','V2.5.0','SYSTEM_ON','RUNNING','READY','PORTFOLIO.EXE','HELLO_WORLD','FULLSTACK','DEVELOPER',"LET'S_CODE"];
let kIdx = 0, cIdx = 0, isDel = false;
function typeKeywords() {
  if (!keyText) return;
  const current = keywords[kIdx];
  cIdx += isDel ? -1 : 1;
  keyText.textContent = current.substring(0, cIdx);
  let speed = isDel ? 50 : 150;
  if (!isDel && cIdx === current.length) { isDel = true; speed = 2500; }
  else if (isDel && cIdx === 0) { isDel = false; kIdx = (kIdx + 1) % keywords.length; speed = 500; }
  setTimeout(typeKeywords, speed);
}
document.addEventListener('DOMContentLoaded', typeKeywords);

console.log('%c> Portfolio loaded. Welcome! 🚀', 'color:#00d4aa; font-family:monospace; font-size:14px;');

/* ============================================================
   SKILLS GLOBE 3D — Full Pro
   ============================================================ */
(function () {

  /* ── Skills data ───────────────────────────────────────────
     Cada skill tiene: name, color, url, category, level (0-100),
     since (año), description, projects
  ─────────────────────────────────────────────────────────── */
  const skills = [
    {
      name: 'React', color: '#61DAFB', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      level: 92, since: 2021, projects: 12,
      description: 'Biblioteca UI de Meta para construir interfaces declarativas con componentes reutilizables y estado reactivo.'
    },
    {
      name: 'Next.js', color: '#ffffff', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      level: 85, since: 2022, projects: 8,
      description: 'Framework React con SSR, SSG, App Router y optimización automática de imágenes y fuentes.'
    },
    {
      name: 'TypeScript', color: '#3178C6', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      level: 88, since: 2021, projects: 15,
      description: 'Superset tipado de JavaScript que detecta errores en tiempo de compilación y mejora la DX.'
    },
    {
      name: 'JavaScript', color: '#F7DF1E', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      level: 95, since: 2020, projects: 20,
      description: 'Lenguaje de la web. Motor de V8, asincronía con Promises/async-await, y ecosistema npm.'
    },
    {
      name: 'Vue.js', color: '#42B883', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      level: 75, since: 2022, projects: 5,
      description: 'Framework progresivo con Composition API, reactividad fina y curva de aprendizaje suave.'
    },
    {
      name: 'HTML5', color: '#E34F26', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      level: 98, since: 2019, projects: 25,
      description: 'Estándar de marcado semántico. Canvas, WebGL, Web Components, accesibilidad y SEO.'
    },
    {
      name: 'CSS3', color: '#1572B6', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      level: 90, since: 2019, projects: 25,
      description: 'Grid, Flexbox, animaciones, variables CSS, container queries y diseño responsive moderno.'
    },
    {
      name: 'Tailwind', color: '#06B6D4', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      level: 87, since: 2022, projects: 10,
      description: 'Framework utility-first que acelera el diseño directamente en el markup sin salir del HTML.'
    },
    {
      name: 'Node.js', color: '#339933', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      level: 88, since: 2021, projects: 14,
      description: 'Runtime JS en servidor basado en V8. APIs REST, WebSockets, streams y microservicios.'
    },
    {
      name: 'Python', color: '#3776AB', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      level: 82, since: 2020, projects: 9,
      description: 'Lenguaje versátil para scripting, APIs, data science, automatización y machine learning.'
    },
    {
      name: 'Django', color: '#44B78B', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      level: 78, since: 2021, projects: 6,
      description: 'Framework Python "batteries included": ORM, admin, auth, migraciones y sistema de templates.'
    },
    {
      name: 'Java', color: '#ED8B00', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      level: 80, since: 2020, projects: 7,
      description: 'Lenguaje tipado, orientado a objetos y multiplataforma. Base de Spring y ecosistema empresarial.'
    },
    {
      name: 'Spring', color: '#6DB33F', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      level: 72, since: 2021, projects: 5,
      description: 'Framework Java para microservicios, inyección de dependencias, Spring Boot y Spring Security.'
    },
    {
      name: 'GraphQL', color: '#E10098', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      level: 70, since: 2022, projects: 4,
      description: 'Lenguaje de consulta para APIs que permite pedir exactamente los datos necesarios, nada más.'
    },
    {
      name: 'Redux', color: '#764ABC', category: 'frontend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      level: 80, since: 2021, projects: 8,
      description: 'Gestor de estado predecible con store centralizado, actions, reducers y middleware.'
    },
    {
      name: 'AWS', color: '#FF9900', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
      level: 75, since: 2022, projects: 6,
      description: 'Plataforma cloud líder: EC2, S3, Lambda, RDS, CloudFront y más de 200 servicios gestionados.'
    },
    {
      name: 'Docker', color: '#2496ED', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      level: 85, since: 2021, projects: 11,
      description: 'Contenedores que empaquetan la app con sus dependencias. Dockerfile, Compose y registries.'
    },
    {
      name: 'Kubernetes', color: '#326CE5', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      level: 65, since: 2023, projects: 3,
      description: 'Orquestador de contenedores: pods, deployments, services, ingress y auto-scaling.'
    },
    {
      name: 'Terraform', color: '#7B42BC', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      level: 68, since: 2023, projects: 3,
      description: 'Infrastructure as Code de HashiCorp. Provisiona nube con archivos HCL declarativos.'
    },
    {
      name: 'Git', color: '#F05032', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      level: 93, since: 2019, projects: 25,
      description: 'Control de versiones distribuido. Branching, merging, rebase, hooks y flujos GitFlow/trunk.'
    },
    {
      name: 'Linux', color: '#FCC624', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      level: 82, since: 2020, projects: 18,
      description: 'Sistema operativo open-source. Shell scripting, permisos, systemd, redes y administración.'
    },
    {
      name: 'Nginx', color: '#009639', category: 'devops',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      level: 72, since: 2022, projects: 7,
      description: 'Servidor web de alto rendimiento y reverse proxy. Load balancing y SSL termination.'
    },
    {
      name: 'PostgreSQL', color: '#4169E1', category: 'database',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      level: 85, since: 2021, projects: 10,
      description: 'Base de datos relacional avanzada. JSONB, índices parciales, window functions y extensiones.'
    },
    {
      name: 'MongoDB', color: '#47A248', category: 'database',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      level: 78, since: 2021, projects: 8,
      description: 'Base de datos NoSQL orientada a documentos. Agregaciones, índices geoespaciales y Atlas.'
    },
    {
      name: 'MySQL', color: '#4479A1', category: 'database',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      level: 80, since: 2020, projects: 9,
      description: 'Motor relacional más popular del mundo. Transacciones ACID, replicación y optimización.'
    },
    {
      name: 'Redis', color: '#DC382D', category: 'database',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      level: 73, since: 2022, projects: 6,
      description: 'Store en memoria ultrarrápido. Caché, pub/sub, sesiones, rate limiting y colas de tareas.'
    },
    {
      name: 'Firebase', color: '#FFCA28', category: 'database',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      level: 76, since: 2022, projects: 5,
      description: 'Plataforma Google BaaS: Firestore, Auth, Storage, Hosting y funciones en tiempo real.'
    },
    {
      name: 'Figma', color: '#F24E1E', category: 'tools',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      level: 70, since: 2022, projects: 12,
      description: 'Herramienta de diseño UI/UX colaborativo. Componentes, auto-layout, prototipos y handoff.'
    },
    {
      name: 'Golang', color: '#00ACD7', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      level: 62, since: 2023, projects: 2,
      description: 'Lenguaje compilado de Google. Goroutines, canales, rendimiento nativo y binarios pequeños.'
    },
    {
      name: 'Rust', color: '#DEA584', category: 'backend',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
      level: 45, since: 2024, projects: 1,
      description: 'Lenguaje de sistemas sin GC. Ownership, borrowing y seguridad de memoria en tiempo de compilación.'
    },
  ];

  /* ── Categorías para filtros ──────────────────────────────── */
  const CATEGORIES = [
    { id: 'all',      label: 'All',      color: '#00d4aa' },
    { id: 'frontend', label: 'Frontend', color: '#0096ff' },
    { id: 'backend',  label: 'Backend',  color: '#a855f7' },
    { id: 'devops',   label: 'DevOps',   color: '#f59e0b' },
    { id: 'database', label: 'Database', color: '#10b981' },
    { id: 'tools',    label: 'Tools',    color: '#f43f5e' },
  ];

  /* ── Estado global ────────────────────────────────────────── */
  let activeFilter   = 'all';
  let selectedSkill  = null;
  let globePaused    = false;
  let hoveredSprite  = null;

  /* ── Inyectar UI extra (filtros, tooltip, panel) ─────────── */
  function buildUI() {
    const section = document.querySelector('#skills');
    if (!section) return;

    /* Filtros */
    const filterBar = document.createElement('div');
    filterBar.className = 'globe-filters';
    filterBar.innerHTML = CATEGORIES.map(c =>
      `<button class="globe-filter-btn ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}" style="--cat-color:${c.color}">${c.label}</button>`
    ).join('');
    const wrapper = section.querySelector('.skills-globe-wrapper');
    if (wrapper) wrapper.insertBefore(filterBar, wrapper.firstChild);

    filterBar.querySelectorAll('.globe-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.globe-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.cat;
        updateSpritesVisibility();
        closePanel();
      });
    });

    /* Tooltip */
    const tooltip = document.createElement('div');
    tooltip.id = 'globe-tooltip';
    tooltip.className = 'globe-tooltip';
    document.body.appendChild(tooltip);

    /* Panel izquierdo */
    const panelLeft = document.createElement('div');
    panelLeft.id = 'skill-panel-left';
    panelLeft.className = 'skill-panel skill-panel--left';
    panelLeft.innerHTML = panelHTML();
    section.appendChild(panelLeft);

    /* Panel derecho */
    const panelRight = document.createElement('div');
    panelRight.id = 'skill-panel-right';
    panelRight.className = 'skill-panel skill-panel--right';
    panelRight.innerHTML = panelHTML();
    section.appendChild(panelRight);

    /* Cerrar panel al hacer click fuera */
    document.addEventListener('click', e => {
      if (!e.target.closest('.skill-panel') && !e.target.closest('#globeWrapper')) {
        closePanel();
      }
    });

    /* Botones cerrar */
    document.querySelectorAll('.skill-panel-close').forEach(btn => {
      btn.addEventListener('click', closePanel);
    });
  }

  function panelHTML() {
    return `
      <button class="skill-panel-close" aria-label="Cerrar">✕</button>
      <div class="skill-panel-logo">
        <img class="sp-logo" src="" alt="" />
      </div>
      <div class="sp-cat-badge"></div>
      <h3 class="sp-name"></h3>
      <p class="sp-desc"></p>
      <div class="sp-meta">
        <div class="sp-meta-row">
          <span class="sp-meta-key">// desde</span>
          <span class="sp-meta-val sp-since"></span>
        </div>
        <div class="sp-meta-row">
          <span class="sp-meta-key">// proyectos</span>
          <span class="sp-meta-val sp-projects"></span>
        </div>
      </div>
      <div class="sp-level-wrap">
        <div class="sp-level-header">
          <span class="sp-level-label">Nivel</span>
          <span class="sp-level-pct"></span>
        </div>
        <div class="sp-level-track">
          <div class="sp-level-bar"></div>
        </div>
        <div class="sp-level-tags">
          <span class="sp-level-tag" data-min="0">Beginner</span>
          <span class="sp-level-tag" data-min="40">Intermediate</span>
          <span class="sp-level-tag" data-min="70">Advanced</span>
          <span class="sp-level-tag" data-min="90">Expert</span>
        </div>
      </div>
    `;
  }

  function openPanel(skill, spriteWorldX) {
    selectedSkill = skill;
    globePaused   = true;

    const panelL = document.getElementById('skill-panel-left');
    const panelR = document.getElementById('skill-panel-right');

    // Elegir lado según posición del sprite en la pantalla
    const useLeft = spriteWorldX > 0; // sprite en lado derecho → panel izquierdo
    const panel   = useLeft ? panelL : panelR;
    const other   = useLeft ? panelR : panelL;

    other.classList.remove('open');
    fillPanel(panel, skill);

    requestAnimationFrame(() => {
      panel.classList.add('open');
    });
  }

  function fillPanel(panel, skill) {
    const catInfo = CATEGORIES.find(c => c.id === skill.category) || CATEGORIES[0];
    const levelLabel = skill.level >= 90 ? 'Expert'
      : skill.level >= 70 ? 'Advanced'
      : skill.level >= 40 ? 'Intermediate'
      : 'Beginner';

    panel.querySelector('.sp-logo').src = skill.url;
    panel.querySelector('.sp-logo').alt = skill.name;
    panel.querySelector('.sp-cat-badge').textContent = catInfo.label;
    panel.querySelector('.sp-cat-badge').style.background = catInfo.color + '22';
    panel.querySelector('.sp-cat-badge').style.color = catInfo.color;
    panel.querySelector('.sp-cat-badge').style.borderColor = catInfo.color + '55';
    panel.querySelector('.sp-name').textContent = skill.name;
    panel.querySelector('.sp-desc').textContent = skill.description;
    panel.querySelector('.sp-since').textContent = skill.since + ' · ' + (2025 - skill.since) + ' años';
    panel.querySelector('.sp-projects').textContent = skill.projects + ' proyectos';
    panel.querySelector('.sp-level-pct').textContent = skill.level + '%';
    panel.querySelector('.sp-level-pct').style.color = skill.color;

    // Barra de nivel animada
    const bar = panel.querySelector('.sp-level-bar');
    bar.style.width = '0%';
    bar.style.background = `linear-gradient(90deg, ${skill.color}88, ${skill.color})`;
    setTimeout(() => { bar.style.width = skill.level + '%'; }, 80);

    // Tags de nivel
    panel.querySelectorAll('.sp-level-tag').forEach(tag => {
      const min = parseInt(tag.dataset.min);
      const next = min === 90 ? 101 : min + 30;
      tag.classList.toggle('active', skill.level >= min && skill.level < next);
    });
  }

  function closePanel() {
    selectedSkill = null;
    globePaused   = false;
    document.getElementById('skill-panel-left')?.classList.remove('open');
    document.getElementById('skill-panel-right')?.classList.remove('open');
  }

  function showTooltip(skill, x, y) {
    const tooltip = document.getElementById('globe-tooltip');
    if (!tooltip) return;
    tooltip.textContent = skill.name;
    tooltip.style.left  = (x + 16) + 'px';
    tooltip.style.top   = (y - 8) + 'px';
    tooltip.style.color = skill.color;
    tooltip.style.borderColor = skill.color + '66';
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    document.getElementById('globe-tooltip')?.classList.remove('visible');
  }

  /* ── Inicializar Three.js ─────────────────────────────────── */
  function initGlobe() {
    const wrapper = document.getElementById('globeWrapper');
    if (!wrapper || typeof THREE === 'undefined') {
      if (typeof THREE === 'undefined') setTimeout(initGlobe, 100);
      return;
    }

    buildUI();

    const W = wrapper.clientWidth  || 820;
    const H = wrapper.clientHeight || 540;

    /* Renderer transparente */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    wrapper.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, W / H, 0.1, 1000);
    camera.position.z = 4.0;

    const RADIUS = 1.15;
    const globe  = new THREE.Group();
    scene.add(globe);

    /* ── Partículas de fondo (nebulosa) ────────────────────── */
    const particleCount = 280;
    const pPositions    = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.8 + Math.random() * 2.2;
      pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00d4aa, size: 0.018, transparent: true, opacity: 0.35
    });
    scene.add(new THREE.Points(pGeo, pMat)); // las partículas no rotan con el globo

    /* ── Malla de la esfera (color del portfolio: cian) ─────── */
    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(RADIUS, 4),
      new THREE.MeshBasicMaterial({
        color: 0x00d4aa,       // --accent del portfolio
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    );
    globe.add(wireMesh);

    /* ── Glow en capas (cian/verde, match portfolio) ─────────── */
    [
      { r: RADIUS * 1.04, op: 0.06, col: 0x00d4aa },
      { r: RADIUS * 1.12, op: 0.035, col: 0x0096ff },
      { r: RADIUS * 1.24, op: 0.015, col: 0x00d4aa },
    ].forEach(({ r, op, col }) => {
      globe.add(new THREE.Mesh(
        new THREE.SphereGeometry(r, 32, 32),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: THREE.BackSide })
      ));
    });

    /* ── Posiciones Fibonacci ─────────────────────────────────── */
    const PHI = Math.PI * (1 + Math.sqrt(5));
    const positions = skills.map((_, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / skills.length);
      const theta = PHI * i;
      const r     = RADIUS * 1.20;
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    });

    /* ── Sprites: logo puro + nombre ─────────────────────────── */
    const spriteData = [];

    skills.forEach((skill, i) => {
      const cvs  = document.createElement('canvas');
      cvs.width  = 128;
      cvs.height = 160;
      const ctx  = cvs.getContext('2d');
      const tex  = new THREE.CanvasTexture(cvs);

      function draw(img) {
        ctx.clearRect(0, 0, 128, 160);
        if (img) {
          ctx.drawImage(img, 14, 6, 100, 100);
        } else {
          ctx.fillStyle = skill.color;
          ctx.font = 'bold 36px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(skill.name.slice(0, 2).toUpperCase(), 64, 56);
        }
        ctx.shadowColor = 'rgba(0,0,0,0.95)';
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = 'rgba(220, 235, 245, 0.95)';
        ctx.font        = '500 14px monospace';
        ctx.textAlign   = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(skill.name, 64, 114);
        ctx.shadowBlur  = 0;
        tex.needsUpdate = true;
      }

      draw(null);

      const mat    = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
      const sprite = new THREE.Sprite(mat);
      sprite.position.copy(positions[i]);
      sprite.scale.set(0.28, 0.35, 1);
      globe.add(sprite);
      spriteData.push({ sprite, skill, tex, draw });

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => draw(img);
      img.src = skill.url;
    });

    /* ── Función para actualizar visibilidad por filtro ──────── */
    function updateSpritesVisibility() {
      spriteData.forEach(({ sprite, skill }) => {
        const visible = activeFilter === 'all' || skill.category === activeFilter;
        sprite.material.opacity = visible ? 1 : 0.08;
      });
    }
    // Exponer globalmente para los filtros
    window.updateSpritesVisibility = updateSpritesVisibility;

    /* ── Raycasting para hover y click ───────────────────────── */
    const raycaster  = new THREE.Raycaster();
    const mouse      = new THREE.Vector2();
    const spriteObjs = spriteData.map(d => d.sprite);

    function getMouseNDC(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    }

    renderer.domElement.addEventListener('mousemove', e => {
      getMouseNDC(e);
      raycaster.setFromCamera(mouse, camera);

      // Solo sprites visibles por filtro
      const visible = spriteObjs.filter((_, i) => {
        const { skill } = spriteData[i];
        return activeFilter === 'all' || skill.category === activeFilter;
      });

      const hits = raycaster.intersectObjects(visible);
      if (hits.length > 0) {
        const hit    = hits[0].object;
        const idx    = spriteObjs.indexOf(hit);
        const { skill } = spriteData[idx];
        renderer.domElement.style.cursor = 'pointer';
        if (hoveredSprite !== hit) {
          hoveredSprite = hit;
          showTooltip(skill, e.clientX, e.clientY);
        } else {
          // Mover tooltip
          const tooltip = document.getElementById('globe-tooltip');
          if (tooltip) {
            tooltip.style.left = (e.clientX + 16) + 'px';
            tooltip.style.top  = (e.clientY - 8) + 'px';
          }
        }
      } else {
        renderer.domElement.style.cursor = 'grab';
        hoveredSprite = null;
        hideTooltip();
      }
    });

    renderer.domElement.addEventListener('click', e => {
      getMouseNDC(e);
      raycaster.setFromCamera(mouse, camera);

      const visible = spriteObjs.filter((_, i) => {
        const { skill } = spriteData[i];
        return activeFilter === 'all' || skill.category === activeFilter;
      });

      const hits = raycaster.intersectObjects(visible);
      if (hits.length > 0) {
        const hit = hits[0].object;
        const idx = spriteObjs.indexOf(hit);
        const { skill } = spriteData[idx];

        // Posición en pantalla del sprite para decidir panel izq/der
        const worldPos = hit.position.clone().applyEuler(globe.rotation);
        // Proyectar a NDC
        const projected = worldPos.clone().project(camera);
        openPanel(skill, projected.x); // positivo = lado derecho de cámara → panel izquierdo
        e.stopPropagation();
      }
    });

    renderer.domElement.addEventListener('mouseleave', () => {
      hoveredSprite = null;
      hideTooltip();
    });

    /* ── Drag: solo eje Y (horizontal) ───────────────────────── */
    let isDragging = false, prevX = 0;
    let velY = 0.0004; // arranque muy lento

    renderer.domElement.style.cursor = 'grab';

    renderer.domElement.addEventListener('mousedown', e => {
      if (globePaused) return;
      isDragging = true; prevX = e.clientX;
      velY = 0;
      renderer.domElement.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging || globePaused) return;
      const dx = e.clientX - prevX;
      velY = dx * 0.003;
      globe.rotation.y += velY;
      prevX = e.clientX;
    });

    renderer.domElement.addEventListener('touchstart', e => {
      if (globePaused) return;
      isDragging = true; prevX = e.touches[0].clientX; velY = 0;
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', e => {
      if (!isDragging || globePaused) return;
      const dx = e.touches[0].clientX - prevX;
      velY = dx * 0.003;
      globe.rotation.y += velY;
      prevX = e.touches[0].clientX;
    }, { passive: true });

    /* ── Resize ───────────────────────────────────────────────── */
    window.addEventListener('resize', () => {
      const W2 = wrapper.clientWidth, H2 = wrapper.clientHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    });

    /* ── Render loop ──────────────────────────────────────────── */
    function animate() {
      requestAnimationFrame(animate);

      if (!isDragging && !globePaused) {
        // Solo rotación horizontal (eje Y)
        globe.rotation.y += velY;
        velY = velY * 0.996 + 0.00004; // decaimiento + impulso mínimo constante
        // NO tocamos globe.rotation.x → siempre horizontal
      }

      /* Escala y opacidad por profundidad (Z) */
      spriteData.forEach(({ sprite, skill }) => {
        const wp = sprite.position.clone().applyEuler(globe.rotation);
        const d  = (wp.z / (RADIUS * 1.20) + 1) / 2; // 0=atrás, 1=frente

        const isFiltered = activeFilter === 'all' || skill.category === activeFilter;
        const isSelected = selectedSkill && selectedSkill.name === skill.name;

        const baseS = 0.20 + d * 0.28;
        const s     = isSelected ? baseS * 1.3 : baseS;
        sprite.scale.set(s, s * 1.25, 1);
q
        if (!isFiltered) {
          sprite.material.opacity = 0.07;
        } else if (isSelected) {
          sprite.material.opacity = 1.0;
        } else {
          sprite.material.opacity = 0.18 + d * 0.82;
        }
      });

      // Partículas rotan lentamente (independiente del globo)
      pGeo.getAttribute('position').needsUpdate = false; // estáticas, solo la cámara cambia

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ── Cargar Three.js si no está ──────────────────────────── */
  if (typeof THREE === 'undefined') {
    const s = document.createElement('script');
    s.src   = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = initGlobe;
    document.head.appendChild(s);
  } else {
    initGlobe();
  }

})();