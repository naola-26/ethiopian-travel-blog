/* -----------------------
   YEAR AUTO-UPDATE
------------------------ */
const yearElements = document.querySelectorAll("[id^='year']");
yearElements.forEach(el => {
  el.textContent = new Date().getFullYear();
});


/* -----------------------
   MOBILE NAV TOGGLE
------------------------ */
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

// Function to close the mobile menu
function closeMobileNav() {
  if (navToggle && navList) {
    navToggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("open");
  }
}

// Function to toggle the mobile menu
function toggleMobileNav() {
  if (navToggle && navList) {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("open");
  }
}

if (navToggle) {
  // Toggle menu on button click
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });

  // Close menu when clicking on a nav link
  if (navList) {
    const navLinks = navList.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navList.classList.contains("open")) {
        // Check if click is outside the nav
        if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
          closeMobileNav();
        }
      }
    });
  }
}


/* -----------------------
   READ MORE TOGGLE
------------------------ */
const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) return;

    const isHidden = target.classList.contains("visually-hidden");
    target.classList.toggle("visually-hidden");
    
    // Smooth scroll to content when expanding
    if (isHidden) {
      btn.textContent = "Show less";
      // Small delay to ensure content is visible before scrolling
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    } else {
      btn.textContent = "Read more";
    }
  });
});


/* -----------------------
   SUBSCRIBE FORM (index)
------------------------ */
const subscribeForm = document.getElementById("subscribe-form");

if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("sub-email");
    const msg = subscribeForm.querySelector(".form-msg");

    if (!email.value.trim() || !email.value.includes("@")) {
      msg.textContent = "Please enter a valid email address.";
      msg.style.color = "#d00000";
      return;
    }

    msg.textContent = "Subscribed successfully! Thank you for joining GoHabesha.";
    msg.style.color = "#2d8659"; // Ethiopian green
    email.value = "";
    
    // Reset message after 5 seconds
    setTimeout(() => {
      msg.textContent = "";
    }, 5000);
  });
}


/* -----------------------
   CONTACT FORM VALIDATION
------------------------ */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const msgField = document.getElementById("message");

    const nameError = nameField.nextElementSibling;
    const emailError = emailField.nextElementSibling;
    const messageError = msgField.nextElementSibling;

    // reset errors
    [nameError, emailError, messageError].forEach(err => err.textContent = "");

    // validate name
    if (!nameField.value.trim()) {
      nameError.textContent = "Name is required.";
      valid = false;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // validate message
    if (msgField.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      valid = false;
    }

    if (!valid) return;

    // success msg
    const formMsg = contactForm.querySelector(".form-msg");
    formMsg.textContent = "Message sent successfully! We'll get back to you soon.";
    formMsg.style.color = "#2d8659"; // Ethiopian green

    // clear inputs
    nameField.value = "";
    emailField.value = "";
    msgField.value = "";
    
    // Reset message after 5 seconds
    setTimeout(() => {
      formMsg.textContent = "";
    }, 5000);
  });
}


/* -----------------------
   DYNAMIC GALLERY WITH FILTERING
------------------------ */
const galleryGrid = document.getElementById("gallery-grid");

if (galleryGrid) {
  // Define all gallery images with their locations
  const galleryImages = [
    // Addis Ababa
    { path: "Images/addis/addis_main.jpg", location: "Addis Ababa", alt: "Addis Ababa city skyline" },
    { path: "Images/addis/addis1.jpg", location: "Addis Ababa", alt: "Addis Ababa street scene" },
    { path: "Images/addis/addis2.jpg", location: "Addis Ababa", alt: "Addis Ababa urban landscape" },
    { path: "Images/addis/addis3.jpg", location: "Addis Ababa", alt: "Addis Ababa city view" },
    { path: "Images/addis/addis4.jpg", location: "Addis Ababa", alt: "Addis Ababa architecture" },
    { path: "Images/addis/addis5.jpg", location: "Addis Ababa", alt: "Addis Ababa landmarks" },
    { path: "Images/addis/addis6.jpg", location: "Addis Ababa", alt: "Addis Ababa culture" },
    { path: "Images/addis/addis7.jpg", location: "Addis Ababa", alt: "Addis Ababa scenes" },
    { path: "Images/addis/addis8.jpg", location: "Addis Ababa", alt: "Addis Ababa highlights" },
    
    // Lalibela
    { path: "Images/lalibela/lalibela_main.jpg", location: "Lalibela", alt: "Rock-hewn churches of Lalibela" },
    { path: "Images/lalibela/lalibela1.jpg", location: "Lalibela", alt: "Lalibela church architecture" },
    { path: "Images/lalibela/lalibela2.jpg", location: "Lalibela", alt: "Lalibela stone churches" },
    { path: "Images/lalibela/lalibela3.jpg", location: "Lalibela", alt: "Lalibela religious site" },
    { path: "Images/lalibela/lalibela4.jpg", location: "Lalibela", alt: "Lalibela heritage" },
    { path: "Images/lalibela/lalibela5.jpg", location: "Lalibela", alt: "Lalibela monuments" },
    
    // Gondar
    { path: "Images/gondar/gondar_main.jpg", location: "Gondar", alt: "Fasil Ghebbi castle complex in Gondar" },
    { path: "Images/gondar/gondar1.jpg", location: "Gondar", alt: "Gondar castle architecture" },
    { path: "Images/gondar/gondar2.jpg", location: "Gondar", alt: "Gondar historical site" },
    { path: "Images/gondar/gondar3.jpg", location: "Gondar", alt: "Gondar royal enclosure" },
    { path: "Images/gondar/gondar4.jpg", location: "Gondar", alt: "Gondar fortress" },
    
    // Axum
    { path: "Images/axum/axum_main.jpg", location: "Axum", alt: "Ancient obelisks and stelae of Axum" },
    { path: "Images/axum/axum1.jpg", location: "Axum", alt: "Axum obelisks" },
    { path: "Images/axum/axum2.jpg", location: "Axum", alt: "Axum ancient monuments" },
    { path: "Images/axum/axum3.jpg", location: "Axum", alt: "Axum historical site" },
    { path: "Images/axum/axum5.jpg", location: "Axum", alt: "Axum heritage" },
    
    // Hawassa
    { path: "Images/hawassa/hawassa_main.jpg", location: "Hawassa", alt: "Lake Hawassa in the Great Rift Valley" },
    { path: "Images/hawassa/hawassa1.jpg", location: "Hawassa", alt: "Hawassa lake view" },
    { path: "Images/hawassa/hawassa2.jpg", location: "Hawassa", alt: "Hawassa wildlife" },
    { path: "Images/hawassa/hawassa3.jpg", location: "Hawassa", alt: "Hawassa nature" },
    { path: "Images/hawassa/hawassa4.jpg", location: "Hawassa", alt: "Hawassa lake scene" },
    { path: "Images/hawassa/hawassa5.jpg", location: "Hawassa", alt: "Hawassa pelicans" },
    { path: "Images/hawassa/hawassa6.jpg", location: "Hawassa", alt: "Hawassa landscape" },
    { path: "Images/hawassa/hawassa7.jpg", location: "Hawassa", alt: "Hawassa views" },
    { path: "Images/hawassa/hawassa8.jpg", location: "Hawassa", alt: "Hawassa highlights" },
    
    // Bale
    { path: "Images/bale/bale_main.jpg", location: "Bale", alt: "Bale Mountains National Park" },
    { path: "Images/bale/bale1.jpg", location: "Bale", alt: "Bale Mountains landscape" },
    { path: "Images/bale/bale2.jpg", location: "Bale", alt: "Bale Mountains nature" },
    { path: "Images/bale/bale3.jpg", location: "Bale", alt: "Bale Mountains wildlife" },
    { path: "Images/bale/bale4.jpg", location: "Bale", alt: "Bale Mountains scenery" },
    { path: "Images/bale/bale5.jpg", location: "Bale", alt: "Bale Mountains park" },
    { path: "Images/bale/bale6.jpg", location: "Bale", alt: "Bale Mountains views" },
    { path: "Images/bale/bale7.jpg", location: "Bale", alt: "Bale Mountains highlights" }
  ];

  // Function to shuffle array randomly
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Shuffle images randomly
  const shuffledImages = shuffleArray(galleryImages);

  // Create and insert image elements
  shuffledImages.forEach((imageData, index) => {
    const img = document.createElement("img");
    img.src = imageData.path;
    img.alt = imageData.alt;
    img.className = "gallery-img";
    img.setAttribute("data-location", imageData.location);
    galleryGrid.appendChild(img);
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const location = btn.getAttribute("data-location");
      
      // Update active state
      filterButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      
      // Filter images
      const images = galleryGrid.querySelectorAll(".gallery-img");
      images.forEach(img => {
        const imgLocation = img.getAttribute("data-location");
        if (location === "all" || imgLocation === location) {
          img.classList.remove("hidden");
        } else {
          img.classList.add("hidden");
        }
      });
    });
  });
}

/* -----------------------
   GALLERY LIGHTBOX
------------------------ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");

function closeLightboxFn() {
  if (lightbox) {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

if (galleryGrid && lightbox && lightboxImg) {
  galleryGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("gallery-img")) {
      lightboxImg.src = e.target.src;
      lightboxImg.alt = e.target.alt || "Gallery image";
      lightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  });
}

if (closeLightbox) {
  closeLightbox.addEventListener("click", closeLightboxFn);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightboxFn();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightboxFn();
    }
  });
}


/* -----------------------
   CARD EXPANDABLE TOGGLE
------------------------ */
const cardToggles = document.querySelectorAll(".card-toggle");

cardToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Prefer the expandable inside the same card as the toggle so
    // toggling only affects the clicked card.
    const card = toggle.closest(".card");
    if (!card) return;

    const targetId = toggle.getAttribute("aria-controls") || toggle.dataset.target;
    if (!targetId) return;

    // Only toggle the expandable inside this card (no global fallback),
    // so one card can never affect another card.
    const target = card.querySelector(`#${targetId}`);

    if (!target) return;

    const isExpanded = target.classList.contains("expanded");
    target.classList.toggle("expanded");
    toggle.textContent = isExpanded ? "Read more" : "Show less";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    target.setAttribute("aria-hidden", String(isExpanded));
  });
});
