document.addEventListener('DOMContentLoaded', () => {
  // Parallax Effect following mouse
  const parallaxContent = document.getElementById('parallax-content');
  const bgGlows = document.querySelectorAll('.bg-glow');
  const codeSymbols = document.querySelectorAll('.code-symbol');

  // Check if system prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && parallaxContent) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Hero Content Parallax (Max 8px movement)
      const percentX = (mouseX / windowWidth - 0.5) * 2; // -1 to 1
      const percentY = (mouseY / windowHeight - 0.5) * 2;
      
      parallaxContent.style.transform = `translate(${percentX * 8}px, ${percentY * 8}px)`;

      // Background elements depth parallax
      bgGlows.forEach((glow) => {
        const speed = parseFloat(glow.getAttribute('data-speed')) || 0;
        glow.style.transform = `translate(${percentX * 15 * speed}px, ${percentY * 15 * speed}px)`;
      });

      codeSymbols.forEach((symbol) => {
        const speed = parseFloat(symbol.getAttribute('data-speed')) || 0;
        symbol.style.transform = `translate(${percentX * 25 * speed}px, ${percentY * 25 * speed}px) rotate(${percentX * 10}deg)`;
      });
    });
  }

  // Footer Workflow Sequence Highlighting (Animate arrows/steps left-to-right every 4 seconds)
  const steps = [
    document.getElementById('step-edit'),
    document.getElementById('arr-1'),
    document.getElementById('step-commit'),
    document.getElementById('arr-2'),
    document.getElementById('step-push'),
    document.getElementById('arr-3'),
    document.getElementById('step-deploy')
  ];

  function runWorkflowAnimation() {
    if (prefersReducedMotion) return;
    
    let currentIdx = 0;
    
    function highlightNext() {
      // Clear previous highlight
      steps.forEach(el => {
        if (el) el.classList.remove('highlight');
      });

      if (currentIdx < steps.length) {
        if (steps[currentIdx]) {
          steps[currentIdx].classList.add('highlight');
        }
        currentIdx++;
        // Stagger steps sequence delay
        setTimeout(highlightNext, 300);
      } else {
        // Final clear
        setTimeout(() => {
          steps.forEach(el => {
            if (el) el.classList.remove('highlight');
          });
        }, 1000);
      }
    }

    highlightNext();
  }

  // Run immediately then repeat every 4 seconds
  runWorkflowAnimation();
  setInterval(runWorkflowAnimation, 4500);

  // Intersection Observer scroll reveal setup
  const revealElements = document.querySelectorAll('.status-card, .footer, .hero-section');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // Fallback if Intersection Observer isn't supported
    revealElements.forEach(el => el.classList.add('active'));
  }
});
