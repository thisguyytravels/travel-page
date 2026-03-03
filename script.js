const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpHarvghLIbtfigzN-tEyCtiiqfHXAdBjGHPZpYAydBX5W0CBe52XJAV0lxbi4C8GU/exec";

/* ===== JSON LOADER ===== */
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
      card.innerHTML = `<img src="${item.image}"/><h3>${item.title}</h3><p>${item.description}</p>`;
      container.appendChild(card);
    });
  } catch (e) {
    console.error("JSON Load Error:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("homeBlogs")) loadJSON("blogs.json", "homeBlogs", 3);
  if (document.getElementById("homeDestinations")) loadJSON("destinations.json", "homeDestinations", 3);
  if (document.getElementById("allBlogs")) loadJSON("blogs.json", "allBlogs");
  if (document.getElementById("allDestinations")) loadJSON("destinations.json", "allDestinations");
});

/* ===== MODAL CONTROLS ===== */
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

/* ===== BOOKING FORM SUBMISSION ===== */
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;

  // Ensure terms are acknowledged
  if (!form.agreeTerms.checked) {
    showPopup("Please acknowledge the terms before submitting.");
    return;
  }

  const data = {
    type: "booking",
    fullName: form.fullName.value,
    phone: form.phone.value,
    email: form.email.value,
    destination: form.destination.value,
    travelDates: form.travelDates.value,
    duration: form.duration.value,
    departureCity: form.departureCity.value,
    returnCity: form.returnCity.value,
    travelersCount: form.travelersCount.value,
    maleFemaleCount: form.genderSplit.value,
    tripType: form.tripType.value,
    transport: form.transport.value,
    serviceType: form.service.value,
    budget: form.budget.value,
    specialRequests: form.otherRequest.value
  };

  sendToSheet(data);
  closeModal("bookingModal");
  showPopup("Booking request sent successfully!");
});

/* ===== ITINERARY FORM SUBMISSION ===== */
document.getElementById("itineraryForm").addEventListener("submit", function (e) {
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

/* ===== SEND TO GOOGLE SHEET ===== */
function sendToSheet(data) {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

/* ===== NAVBAR SCROLL EFFECT ===== */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0,0,0,0.6)";
    navbar.style.backdropFilter = "blur(15px)";
  } else {
    navbar.style.background = "rgba(255,255,255,0.15)";
    navbar.style.backdropFilter = "blur(12px)";
  }
});

/* ===== CUSTOM POPUP ===== */
function showPopup(message) {
  const popup = document.getElementById("customPopup");
  const messageBox = document.getElementById("popupMessage");
  if (!popup || !messageBox) return;
  messageBox.innerText = message;
  popup.style.display = "flex";
  setTimeout(() => { popup.style.display = "none"; }, 2500);
}

/* ===== HAMBURGER MENU ===== */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
items.forEach(item => {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.innerHTML = `
    <a href="${item.link}">
      <img src="${item.image}" alt="${item.title}"/>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </a>
  `;
  container.appendChild(card);
});

/* ===== JSON LOADER ===== */
async function loadJSON(file, containerId, limit = null) {
  try {
    const res = await fetch(file);
    const data = await res.json();
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = limit ? data.slice(0, limit) : data;

    items.forEach(item => {
      // Create the blog card
      const card = document.createElement("div");
      card.className = "blog-card";

      // Make the card clickable
      card.addEventListener("click", () => {
        window.location.href = item.link;
      });

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}"/>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;

      // Optional: change cursor on hover
      card.style.cursor = "pointer";

      container.appendChild(card);
    });
  } catch (e) {
    console.error("JSON Load Error:", e);
  }
}

// Load blogs when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("homeBlogs")) loadJSON("blogs.json", "homeBlogs", 3);
  if (document.getElementById("homeDestinations")) loadJSON("destinations.json", "homeDestinations", 3);
  if (document.getElementById("allBlogs")) loadJSON("blogs.json", "allBlogs");  // This loads blogs.html cards
  if (document.getElementById("allDestinations")) loadJSON("destinations.json", "allDestinations");
});