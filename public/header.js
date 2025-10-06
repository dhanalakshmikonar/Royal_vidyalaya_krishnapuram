document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Function to toggle menu
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent closing immediately when clicking button
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  };

  // Hamburger click
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside nav or hamburger
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Reset menu when resizing window
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});
