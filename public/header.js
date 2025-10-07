const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('nav-bar');
const navLinks = document.querySelectorAll('#nav-bar .nav-list li a');

// Toggle hamburger and nav menu
hamburger.addEventListener('click', () => {
  navBar.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Close hamburger menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navBar.classList.remove('active');
    hamburger.classList.remove('open');
  });
});
