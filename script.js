// Basic helpers and initialization
document.getElementById('year').textContent = new Date().getFullYear();

// THEME TOGGLE (Feature #1)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', (e) => {
  document.body.classList.toggle('dark', e.target.checked);
});

// SMOOTH SCROLL + ACTIVE NAV HIGHLIGHT (UX improvement)
const navLinks = document.querySelectorAll('#navmenu .nav-link');
function onScroll() {
  const scrollPos = window.scrollY + 120;
  navLinks.forEach(link => {
    try {
      const section = document.querySelector(link.getAttribute('href'));
      if (!section) return;
      if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        link.classList.add('active');
      } else link.classList.remove('active');
    } catch (e){/* ignore */}
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

// IntersectionObserver animations (Feature #2: scroll animation)
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, {threshold: 0.15});

document.querySelectorAll('.card, .hero-section, h2, .lead').forEach(el => io.observe(el));

// PROJECT FILTER (Feature #3)
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-item').forEach(item => {
      const tags = item.dataset.tags ? item.dataset.tags.split(' ') : [];
      if (filter === 'all' || tags.includes(filter)) item.style.display = '';
      else item.style.display = 'none';
    });
  });
});

// LIGHTBOX (Feature #4: lightbox modal)
const lightboxModalEl = document.getElementById('lightboxModal');
const lightboxModal = new bootstrap.Modal(lightboxModalEl);
document.querySelectorAll('.view-project').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const img = btn.dataset.img;
    const title = btn.dataset.title || '';
    document.getElementById('lightboxImage').src = img;
    document.getElementById('lightboxTitle').textContent = title;
    lightboxModal.show();
  });
});

// CONTACT FORM VALIDATION (front-end)
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let ok = true;
  [name, email, message].forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      ok = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });

  // simple email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailPattern.test(email.value)) {
    email.classList.add('is-invalid');
    ok = false;
  }

  if (!ok) {
    contactStatus.innerHTML = '<div class="text-danger">Vui lòng sửa các trường bắt buộc.</div>';
    return;
  }

  // Simulate submission (no backend)
  contactStatus.innerHTML = `<div class="text-success">Cảm ơn ${escapeHtml(name.value)}! Tin nhắn đã được gửi (demo).</div>`;
  contactForm.reset();
});

// simple text escape
function escapeHtml(s){return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
