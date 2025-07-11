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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous messages
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    formResponse.textContent = '';

    // Get form values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    let isValid = true;

    // Name validation
    if (name.length < 5) {
      showError('nameError', 'Name must be at least 5 characters.');
      isValid = false;
    }

    // Email validation
    if (!email.includes('@') || email.length < 6) {
      showError('emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      showError('phoneError', 'Phone number must be 10 digits.');
      isValid = false;
    }

    // Message validation
    if (message.length < 40) {
      showError('messageError', 'Message must be at least 40 characters.');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      formResponse.textContent = 'Thank you for contacting us! We will get back to you soon.';
      form.reset();
    }
  });

  function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
});


  // Hide all contents on page load
  window.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.academic-card');

    cards.forEach(card => {
      const content = card.querySelector('.academic-content');
      content.style.display = 'none'; // hide all initially

      card.addEventListener('click', () => {
        // Toggle only the clicked card
        const isVisible = content.style.display === 'block';

        // First hide all
        document.querySelectorAll('.academic-content').forEach(c => c.style.display = 'none');

        // Then toggle the clicked one
        content.style.display = isVisible ? 'none' : 'block';
      });
    });
  });

  const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});








