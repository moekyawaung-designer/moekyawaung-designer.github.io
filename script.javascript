// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Typing effect
const typingElement = document.getElementById("typingText");
const typingWords = [
  "web development",
  "Android apps",
  "backend systems",
  "DevOps workflows"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = typingWords[wordIndex];
  const currentText = currentWord.substring(0, charIndex);
  typingElement.textContent = currentText;

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      charIndex = 0;
    }
  }

  const speed = isDeleting ? 50 : 90;
  setTimeout(typeEffect, speed);
}

typeEffect();

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

function setActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

// Auto-close mobile menu on click
navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});
