const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpHarvghLIbtfigzN-tEyCtiiqfHXAdBjGHPZpYAydBX5W0CBe52XJAV0lxbi4C8GU/exec";

/* =========================
   JSON LOADER
========================= */
async function loadJSON(file, containerId, limit = null) {
  try {
    const res = await fetch(file);
    const data = await res.json();
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = limit ? data.slice(0, limit) : data;

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        if (item.link) {
          window.location.href = item.link;
        }
      });

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}"/>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;

      container.appendChild(card);
    });

  } catch (e) {
    console.error("JSON Load Error:", e);
  }
}

/* =========================
   MODAL CONTROLS
========================= */
function openBooking() {
  document.getElementById("bookingModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function openItinerary() {
  document.getElementById("itineraryModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.style.overflow = "auto";
}

/* =========================
   SEND TO GOOGLE SHEET
========================= */
function sendToSheet(data) {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

/* =========================
   CUSTOM POPUP
========================= */
function showPopup(message) {
  const popup = document.getElementById("customPopup");
  const messageBox = document.getElementById("popupMessage");
  if (!popup || !messageBox) return;

  messageBox.innerText = message;
  popup.style.display = "flex";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2500);
}

/* =========================
   HAMBURGER MENU
========================= */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0,0,0,0.65)";
    navbar.style.backdropFilter = "blur(15px)";
  } else {
    navbar.style.background = "rgba(0,0,0,0.45)";
    navbar.style.backdropFilter = "blur(15px)";
  }
});

/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  /* PREVENT PAST DATE SELECTION */
const travelDateInput = document.querySelector('input[name="travelDates"]');
if (travelDateInput) {
  const today = new Date().toISOString().split("T")[0];
  travelDateInput.min = today;
}

  /* LOAD BLOG DATA */
  if (document.getElementById("homeBlogs"))
    loadJSON("blogs.json", "homeBlogs", 3);

  if (document.getElementById("homeDestinations"))
    loadJSON("destinations.json", "homeDestinations", 3);

  if (document.getElementById("allBlogs"))
    loadJSON("blogs.json", "allBlogs");

  if (document.getElementById("allDestinations"))
    loadJSON("destinations.json", "allDestinations");

  /* BOOKING FORM */
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!this.agreeTerms.checked) {
        showPopup("Please acknowledge the terms before submitting.");
        return;
      }

      const data = {
        type: "booking",
        fullName: this.fullName.value,
        phone: this.phone.value,
        email: this.email.value,
        destination: this.destination.value,
        travelDates: this.travelDates.value,
        duration: this.duration.value,
        departureCity: this.departureCity.value,
        returnCity: this.returnCity.value,
        travelersCount: this.travelersCount.value,
        maleFemaleCount: this.genderSplit.value,
        tripType: this.tripType.value,
        transport: this.transport.value,
        serviceType: this.service.value,
        budget: this.budget.value,
        specialRequests: this.otherRequest.value
      };

      sendToSheet(data);
      closeModal("bookingModal");
      showPopup("Booking request sent successfully!");
    });
  }

  /* ITINERARY FORM */
  const itineraryForm = document.getElementById("itineraryForm");
  if (itineraryForm) {
    itineraryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        type: "itinerary",
        fullName: this[0].value,
        email: this[1].value,
        contact: this[2].value,
        itineraryRequested: this[3].value
      };

      sendToSheet(data);
      closeModal("itineraryModal");
      showPopup("Itinerary request sent successfully!");
    });
  }

  /* =========================
     HERO SLIDESHOW (5 sec)
  ========================= */
  const slides = document.querySelectorAll(".slide");

  if (slides.length > 0) {
    let currentSlide = 0;

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }

});