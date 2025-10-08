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
