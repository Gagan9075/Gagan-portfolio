/* =============================
   Ultra Animated Portfolio JS
   - GSAP Animations + ScrollTrigger
   - Three.js hero
   - Particles.js init
   - Custom cursor & trail
   - Magnetic buttons
   - Project modal
   - Contact form validation + EmailJS
   ============================== */

/* ---------- EmailJS Configuration ----------
Replace the three constants with your EmailJS values:
- EMAILJS_SERVICE_ID
- EMAILJS_TEMPLATE_ID
- EMAILJS_PUBLIC_KEY
You must create a template that accepts: from_name, from_email, message, (optional) to_email
Make sure the template's receiver is gaganm9075@gmail.com (or pass it here).
------------------------------------------- */
const EMAILJS_SERVICE_ID = 'service_pp3svkg';
const EMAILJS_TEMPLATE_ID = 'template_irjpd7h';
const EMAILJS_PUBLIC_KEY = 'CxyLswlXMxpq2j9FR'; // emailjs.init key

// Initialize EmailJS SDK (will fail silently until you put your own key)
function isEmailJsConfigured(){
  return EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY &&
    !EMAILJS_SERVICE_ID.includes('YOUR_') && !EMAILJS_TEMPLATE_ID.includes('YOUR_') && !EMAILJS_PUBLIC_KEY.includes('YOUR_');
}

if (window.emailjs) {
  if(isEmailJsConfigured()){
    try{
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.info('EmailJS initialized with provided public key.');
    }catch(err){
      console.warn('EmailJS init failed:', err);
    }
  } else {
    console.warn('EmailJS not configured. Replace placeholders in script.js with your Service ID, Template ID, and Public Key from EmailJS.');
  }
} else {
  console.warn('EmailJS library not found. Make sure the CDN script is included in your HTML.');
}

/* ---------- Basic DOM ---------- */
const pageWrapper = document.getElementById('page-wrapper');
const nav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');

/* ---------- Page transition (fade-in) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  gsap.from('.page-fade', {autoAlpha:0, duration:0.9, ease:'power2.out'});
  
  // Start typing animation
  startTypingAnimation();
});

/* ---------- Typing animation for subtitle ---------- */
function startTypingAnimation(){
  const typingText = 'Building intelligent applications with Python, JavaScript, and AI technologies';
  const typeEl = document.getElementById('typing-text');
  const cursorEl = document.querySelector('.typing-cursor');
  
  if(!typeEl || !cursorEl) return;
  
  let charIndex = 0;
  
  function type(){
    if(charIndex < typingText.length){
      const char = typingText[charIndex];
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.animation = 'fadeIn 0.3s ease-out forwards';
      span.style.display = 'inline';
      
      typeEl.appendChild(span);
      charIndex++;
      setTimeout(type, 40); // Speed of typing
    } else {
      // Animation complete, add glow pulse to cursor
      cursorEl.style.animationIterationCount = 'infinite';
    }
  }
  
  type();
}

/* ---------- Smooth scroll + nav animation ---------- */
document.querySelectorAll('#main-nav a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      // calculate target Y position
      const targetY = target.getBoundingClientRect().top + window.pageYOffset;

      // Prefer native smooth scroll when available
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      } else {
        // GSAP fallback that does not require ScrollToPlugin
        const pos = { y: window.pageYOffset };
        gsap.to(pos, {
          y: targetY,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: () => window.scrollTo(0, pos.y)
        });
      }

      // Page transition micro-animation
      gsap.fromTo(target, {y:20, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.7});
    }
  });
});

/* ---------- Mobile Nav Toggle ---------- */
if(navToggle){
  navToggle.addEventListener('click', (e)=>{
    e.stopPropagation();
    nav.classList.toggle('nav-open');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e)=>{
  if(!nav.contains(e.target) && nav.classList.contains('nav-open')){
    nav.classList.remove('nav-open');
  }
});

/* ---------- Smooth scroll + nav animation ---------- */
document.querySelectorAll('#main-nav a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    
    // Close mobile nav after clicking
    if(nav.classList.contains('nav-open')){
      nav.classList.remove('nav-open');
    }
    
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      // calculate target Y position
      const targetY = target.getBoundingClientRect().top + window.pageYOffset;

      // Prefer native smooth scroll when available
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      } else {
        // GSAP fallback that does not require ScrollToPlugin
        const pos = { y: window.pageYOffset };
        gsap.to(pos, {
          y: targetY,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: () => window.scrollTo(0, pos.y)
        });
      }

      // Page transition micro-animation
      gsap.fromTo(target, {y:20, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.7});
    }
  });
});

/* ---------- Scroll animations with Intersection Observer ---------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and key elements
document.querySelectorAll('.panel, .section-title, .project-card, .skill, .education-item').forEach(el => {
  observer.observe(el);
});

// Animate skill bars on scroll
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const barFill = entry.target.querySelector('.bar-fill');
      if (barFill) {
        const width = barFill.parentElement.parentElement.querySelector('.skill-head span:last-child').textContent;
        barFill.style.width = width;
      }
      skillBarObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.3});

document.querySelectorAll('.skill').forEach(skill => {
  skillBarObserver.observe(skill);
});

/* ---------- Magnetic buttons ---------- */
function magneticEffect(el){
  el.addEventListener('mousemove', (e)=>{
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const centerX = rect.width/2, centerY = rect.height/2;
    const deltaX = (relX - centerX) / centerX * 10;
    const deltaY = (relY - centerY) / centerY * 8;
    gsap.to(el, {x: deltaX, y: deltaY, duration:0.3, ease:'power3.out'});
  });
  el.addEventListener('mouseleave', ()=> gsap.to(el, {x:0, y:0, duration:0.6, ease:'elastic.out(1,0.6)'}));
}
document.querySelectorAll('.magnetic, .mag').forEach(magneticEffect);

/* ---------- Certificate Cards Hover Animations ---------- */
document.querySelectorAll('.certificate-card').forEach((card, index) => {
  // Initial scroll-in animation
  gsap.from(card, {
    y: 30,
    autoAlpha: 0,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 80%'
    }
  });

  // Hover animations
  card.addEventListener('mouseenter', () => {
    // Icon scale and glow
    gsap.to(card.querySelector('.cert-icon'), {
      scale: 1.2,
      duration: 0.3,
      ease: 'elastic.out(1,0.6)'
    });
    
    // Title color change
    gsap.to(card.querySelector('h4'), {
      color: '#00e6ff',
      duration: 0.3
    });
    
    // Card background glow
    gsap.to(card, {
      boxShadow: '0 16px 40px rgba(0,230,255,0.25)',
      duration: 0.3
    });
    
    // Button animation
    gsap.to(card.querySelector('.cert-btn'), {
      background: '#00e6ff',
      color: '#0b1220',
      duration: 0.3
    });
  });

  card.addEventListener('mouseleave', () => {
    // Reset icon
    gsap.to(card.querySelector('.cert-icon'), {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    // Reset title
    gsap.to(card.querySelector('h4'), {
      color: '#ffffff',
      duration: 0.3
    });
    
    // Reset glow
    gsap.to(card, {
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      duration: 0.3
    });
    
    // Reset button
    gsap.to(card.querySelector('.cert-btn'), {
      background: 'transparent',
      color: '#00e6ff',
      duration: 0.3
    });
  });

  // Click ripple effect
  card.addEventListener('click', () => {
    const certPath = card.dataset.cert;
    const certTitle = card.dataset.title;
    if (certPath) {
      openCertificateModal(certPath, certTitle);
    }
    gsap.fromTo(card, 
      { scale: 1 },
      { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }
    );
  });
});

/* ---------- Certificate Modal Handler ---------- */
const certModal = document.getElementById('cert-modal');
const certIframe = document.getElementById('cert-iframe');
const certModalTitle = document.getElementById('cert-modal-title');
const certDownloadBtn = document.getElementById('cert-download-btn');
const closeCertModal = document.querySelector('.close-cert-modal');

function openCertificateModal(certPath, certTitle) {
  certModalTitle.textContent = certTitle;
  certIframe.src = certPath;
  certDownloadBtn.href = certPath;
  
  certModal.classList.add('open');
  gsap.fromTo(certModal, 
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'power2.out' }
  );
  
  // Animate content in
  gsap.fromTo(certModal.querySelector('.cert-modal-content'), 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }
  );
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  gsap.to(certModal, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      certModal.classList.remove('open');
      certIframe.src = '';
      document.body.style.overflow = 'auto';
    }
  });
}

// Close modal button
if (closeCertModal) {
  closeCertModal.addEventListener('click', closeCertificateModal);
}

// Close modal on background click
certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    closeCertificateModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) {
    closeCertificateModal();
  }
});

/* ---------- Project card enhanced hover effect ---------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      duration: 0.4,
      ease: 'power3.out'
    });
    // Animate content
    gsap.to(card.querySelectorAll('h3, p'), {
      color: 'rgba(255,255,255,1)',
      duration: 0.3,
      stagger: 0.05
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card.querySelectorAll('h3, p'), {
      color: 'inherit',
      duration: 0.3
    });
  });
  
  // Add tilt effect on mouse move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: 'elastic.out(1,0.6)'
    });
  });
});

/* ---------- GSAP ScrollReveal & skills animation ---------- */
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.panel').forEach((panel, i)=>{
  gsap.from(panel, {
    y: 30, autoAlpha:0, duration:0.9, delay: 0.05,
    scrollTrigger: {trigger: panel, start: 'top 80%'}
  });
});

/* Animate skill bars when they come into view */
document.querySelectorAll('.bar-fill').forEach(el=>{
  const fill = el.dataset.fill;
  gsap.to(el, {
    width: fill + '%',
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {trigger: el, start: 'top 80%'}
  });
});

/* ---------- Highlight skills when visible (and fallback) ---------- */
if (window.gsap && window.ScrollTrigger) {
  gsap.utils.toArray('.skill').forEach(skill => {
    ScrollTrigger.create({
      trigger: skill,
      start: 'top 80%',
      onEnter: () => skill.classList.add('highlight'),
      onLeave: () => skill.classList.remove('highlight'),
      onLeaveBack: () => skill.classList.remove('highlight')
    });
  });
} else if ('IntersectionObserver' in window) {
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('highlight');
      else entry.target.classList.remove('highlight');
    });
  }, { threshold: 0.45 });

  document.querySelectorAll('.skill').forEach(s => skillIO.observe(s));
}

/* ---------- Projects modal ---------- */
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');

document.querySelectorAll('.project-card .open-modal').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    const card = e.target.closest('.project-card');
    // populate
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalTech.textContent = 'Tech: ' + card.dataset.tech;
    // remember previously focused element
    modal._previouslyFocused = document.activeElement;
    // show modal
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    // animate in
    gsap.fromTo(modal.querySelector('.modal-content'), {y:40, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.45, ease:'power2.out'});
    // focus first focusable inside modal (close button)
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) closeBtn.focus();
    // trap focus: simple implementation
    document.addEventListener('focus', trapFocus, true);
  });
});
document.querySelectorAll('.close-modal, #project-modal').forEach(el=>{
  el.addEventListener('click',(e)=>{
    if(e.target === el || e.target.classList.contains('close-modal')){
      gsap.to(modal.querySelector('.modal-content'), {y:20, autoAlpha:0, duration:0.35, onComplete:()=>{
        modal.style.display='none';
        modal.setAttribute('aria-hidden','true');
        // restore focus
        if(modal._previouslyFocused && typeof modal._previouslyFocused.focus === 'function'){
          modal._previouslyFocused.focus();
        }
        // remove focus trap
        document.removeEventListener('focus', trapFocus, true);
      }})
    }
  });
});

// focus trap handler: keep focus within modal while it's open
function trapFocus(e){
  if(!modal || modal.getAttribute('aria-hidden') === 'true') return;
  if(!modal.contains(e.target)){
    e.stopPropagation();
    // move focus back to close button
    const cb = modal.querySelector('.close-modal');
    if(cb) cb.focus();
  }
}

/* Prevent clicks inside modal-content from closing */
document.querySelector('.modal .modal-content').addEventListener('click', (e)=>e.stopPropagation());

/* ---------- Animated Navbar on scroll ---------- */
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) {
    gsap.to(nav, {y:-90, duration:0.3});
  } else {
    gsap.to(nav, {y:0, duration:0.45});
  }
  lastScroll = current;
});

/* ---------- Theme toggle ---------- */
themeToggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.classList.toggle('dark');
  // Animate toggle
  gsap.fromTo(themeToggle, {scale:0.9}, {scale:1.08, duration:0.22, yoyo:true, repeat:1});
  // Simple theme inversion (for demo)
  if(isDark){
    gsap.to('body', {background: 'radial-gradient(1200px 600px at 10% 10%, rgba(58,0,255,0.12), transparent 10%), radial-gradient(800px 400px at 90% 90%, rgba(0,210,255,0.08), transparent 10%), var(--bg)', duration:0.6})
  } else {
    gsap.to('body', {background: 'linear-gradient(180deg,#f5f7ff,#e3f0ff)', color:'#0b1220', duration:0.6})
  }
});

/* ---------- Contact Form with validation and EmailJS ---------- */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const sendBtn = document.getElementById('send-btn');

function showStatus(message, type='info'){
  formStatus.textContent = message;
  // small animated feedback
  if(type === 'success'){
    gsap.fromTo(formStatus, {autoAlpha:0, y:6}, {autoAlpha:1, y:0, color:'#7CFC00', duration:0.4});
  } else if(type === 'error'){
    gsap.fromTo(formStatus, {autoAlpha:0, y:6}, {autoAlpha:1, y:0, color:'#FF6B6B', duration:0.4});
  } else {
    gsap.fromTo(formStatus, {autoAlpha:0, y:6}, {autoAlpha:1, y:0, color:'var(--muted)', duration:0.4});
  }
}

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault(); // prevent reload

  // Simple front-end validation
  const name = contactForm.querySelector('#name').value.trim();
  const email = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  if(!name || !email || !message){
    showStatus('Please fill in all fields.', 'error');
    return;
  }
  // Basic email format check
  if(!/^\S+@\S+\.\S+$/.test(email)){
    showStatus('Please enter a valid email.', 'error');
    return;
  }

  // Prepare template params (match your EmailJS template variables)
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'gaganm9075@gmail.com' // ensure your template or service accepts this or set in dashboard
  };

  // Feedback while sending
  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending...';

  // Send via EmailJS (preferred) or fallback to mailto
  if (window.emailjs && isEmailJsConfigured()) {
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((response) => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
        contactForm.reset();
        showStatus('Message sent! Thanks — I will reply soon 🙌', 'success');
        gsap.fromTo('#form-status', {scale:0.95}, {scale:1, duration:0.3, ease:'elastic.out(1,0.5)'});
        console.info('EmailJS response:', response);
      })
      .catch((err) => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
        showStatus('Oops — failed to send via EmailJS. See console for details.', 'error');
        console.error('EmailJS send error:', err);
      });
  } else {
    // Helpful guidance + mailto fallback so messages still reach your Gmail
    showStatus('EmailJS is not configured. Opening your mail client to send the message manually.', 'error');
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send Message';

    // Construct a mailto link as a fallback (percent-encode content)
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    // Use user's target email
    const mailto = `mailto:gaganm9075@gmail.com?subject=${subject}&body=${body}`;
    // open mail client in new tab/window
    window.location.href = mailto;
    console.warn('EmailJS not configured — opened mailto fallback. Replace placeholders in script.js with your EmailJS keys.');
  }
});

/* ---------- Small accessibility & keyboard support ---------- */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal.style.display === 'flex'){
    document.querySelector('.close-modal').click();
  }
});