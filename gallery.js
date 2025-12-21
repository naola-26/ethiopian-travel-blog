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

  // Shuffle array randomly (Fisher-Yates algorithm)
  const shuffledImages = [...galleryImages];
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }

  // Create and insert image elements
  shuffledImages.forEach((imageData) => {
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
  // Open lightbox on image click
  galleryGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("gallery-img")) {
      lightboxImg.src = e.target.src;
      lightboxImg.alt = e.target.alt || "Gallery image";
      lightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  });

  // Close lightbox handlers
  if (closeLightbox) {
    closeLightbox.addEventListener("click", closeLightboxFn);
  }

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

