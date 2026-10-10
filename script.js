
/* =========================================
   1. SCROLL-TRIGGERED ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  prefersReducedMotion ||
  !("IntersectionObserver" in window)
) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Each element animates only once.
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================================
   2. ANIMATED TYPING TEXT
========================================= */

const typingElement = document.getElementById("typing-text");

const words = [
  "technology.",
  "anime.",
  "the stock market.",
  "learning new things."
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeText() {
  if (!typingElement) return;

  // Keep a static phrase when reduced motion is enabled.
  if (prefersReducedMotion) {
    typingElement.textContent = "technology.";
    return;
  }

  const currentWord = words[wordIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typingElement.textContent = currentWord.slice(
    0,
    characterIndex
  );

  let delay = deleting ? 45 : 85;

  if (!deleting && characterIndex === currentWord.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  window.setTimeout(typeText, delay);
}

if (typingElement) {
  if (prefersReducedMotion) {
    typingElement.textContent = "technology.";
  } else {
    typingElement.textContent = "";
    typeText();
  }
}


/* =========================================
   3. AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   4. HANDLE BROKEN IMAGES
========================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.style.display = "none";
    image.parentElement.classList.add("image-missing");
  });
});
