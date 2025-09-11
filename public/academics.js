function toggleContent(card) {
  if (card.classList.contains("coming-soon")) return; // disable toggle for coming soon

  // Close all other cards
  document.querySelectorAll(".academic-card").forEach(c => {
    if (c !== card) c.classList.remove("active");
  });

  // Toggle clicked one
  card.classList.toggle("active");
}
function toggleContent(card) {
  // Close all other cards
  document.querySelectorAll(".academic-card").forEach(c => {
    if (c !== card) c.classList.remove("active");
  });

  // Toggle clicked one
  card.classList.toggle("active");

  // For coming-soon cards, ensure the content is visible
  if (card.classList.contains("coming-soon")) {
    const content = card.querySelector(".academic-content");
    if (content) content.style.display = "block";
  }
}
