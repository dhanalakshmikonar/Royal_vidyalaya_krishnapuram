// Add animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });
});




const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const links = navLinks.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Hide the nav menu when a link is clicked
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});









