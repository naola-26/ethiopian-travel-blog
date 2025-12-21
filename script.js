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

function closeMobileNav() {
  if (navToggle && navList) {
    navToggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("open");
  }
}

function toggleMobileNav() {
  if (navToggle && navList) {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("open");
  }
}

if (navToggle && navList) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });

  // Close menu when clicking on a nav link
  const navLinks = navList.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navList.classList.contains("open")) {
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    }
  });
}


/* -----------------------
   UNIFIED EXPANDABLE CONTENT TOGGLE
   Handles both .read-more and .card-toggle buttons
------------------------ */
function handleExpandableToggle(toggle) {
  const targetId = toggle.dataset.target || toggle.getAttribute("aria-controls");
  if (!targetId) return;

  // For card toggles, find target within the same card
  const card = toggle.closest(".card");
  const target = card 
    ? card.querySelector(`#${targetId}`)
    : document.getElementById(targetId);

  if (!target) return;

  // Determine which toggle style based on target element class
  const isFullPost = target.classList.contains("full-post");
  
  if (isFullPost) {
    // .read-more style (uses visually-hidden)
    const isHidden = target.classList.contains("visually-hidden");
    target.classList.toggle("visually-hidden");
    toggle.textContent = isHidden ? "Show less" : "Read more";
    
    // Smooth scroll when expanding
    if (isHidden) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  } else {
    // .card-toggle style (uses expanded)
    const isExpanded = target.classList.contains("expanded");
    target.classList.toggle("expanded");
    toggle.textContent = isExpanded ? "Read more" : "Show less";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    target.setAttribute("aria-hidden", String(isExpanded));
  }
}

// Handle .read-more buttons
document.querySelectorAll(".read-more").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    handleExpandableToggle(btn);
  });
});

// Handle .card-toggle buttons
document.querySelectorAll(".card-toggle").forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleExpandableToggle(toggle);
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
