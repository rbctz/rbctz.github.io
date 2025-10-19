// Theme (dark mode) toggle
// (theme toggle initialized earlier)

// Loading bar progress
(() => {
  const bar = document.querySelector(".loading-bar");
  if (!bar) return;

  let loadedImages = 0;
  const images = document.querySelectorAll("img");

  // Set initial progress on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    bar.style.width = "30%";
  });

  // Track image loading
  images.forEach((img) => {
    img.addEventListener("load", () => {
      loadedImages++;
      const progress = 30 + (loadedImages / images.length) * 70;
      bar.style.width = progress + "%";
    });
    img.addEventListener("error", () => {
      loadedImages++;
      const progress = 30 + (loadedImages / images.length) * 70;
      bar.style.width = progress + "%";
    });
  });

  // Complete on window load
  window.addEventListener("load", () => {
    bar.style.width = "100%";
    setTimeout(() => {
      bar.style.opacity = "0";
      setTimeout(() => {
        bar.style.display = "none";
      }, 500);
    }, 300);
  });
})();

// Page load animations
window.addEventListener("load", () => {
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("visible");
  });
});

// Theme (dark mode) toggle
(() => {
  const storageKey = "theme-preference";
  const toggleCheckbox = document.getElementById("theme-switch");

  if (!toggleCheckbox) return; // no switch in DOM

  function applyTheme(theme) {
    console.log(`Applying theme: ${theme}`);
    document.documentElement.className = theme;
    toggleCheckbox.checked = theme === "dark";
    toggleCheckbox.setAttribute("aria-checked", String(theme === "dark"));
  }

  // Initialize: default to light unless user saved a preference
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyTheme(saved);
    } else {
      applyTheme("light");
    }
  } catch (e) {
    // If localStorage isn't available, default to light
    applyTheme("light");
  }

  // Use the checkbox change event for toggling
  toggleCheckbox.addEventListener("change", () => {
    const newTheme = toggleCheckbox.checked ? "dark" : "light";
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      // ignore storage errors
    }
    applyTheme(newTheme);
  });

  // Removed OS preference syncing — site will always default to light on first load
})();

// Section show-up animation on scroll
(() => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
})();

// Page load animations
window.addEventListener("load", () => {
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("visible");
  });
});

// Smooth scrolling with Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Back to top button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  lenis.scrollTo(0, { duration: 1.5 });
});

// Scroll to tech section on arrow click
const arrow = document.querySelector(".arrow");
arrow.addEventListener("click", () => {
  lenis.scrollTo(".tech-showcase", { duration: 1.5 });
});

// Sequential video loading after page load
window.addEventListener("load", () => {
  const videos = document.querySelectorAll("video");
  let i = 0;
  function loadNext() {
    if (i >= videos.length) return;
    const v = videos[i];
    v.load();
    v.play().catch(() => {}); // Attempt to play; catch errors if autoplay fails
    i++;
    setTimeout(loadNext, 500); // Space out loading by 0.5s
  }
  loadNext();
});

// Staggered video loading after page load
window.addEventListener("load", () => {
  const videos = document.querySelectorAll("video");
  let delay = 0;
  videos.forEach((v) => {
    setTimeout(() => {
      v.load();
      v.play().catch(() => {}); // Attempt to play; catch errors if autoplay fails
    }, delay);
    delay += 400; // Load each video 0.4s apart
  });
});
