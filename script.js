// 🔥 ADD YOUR APPS SCRIPT URL HERE
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpHarvghLIbtfigzN-tEyCtiiqfHXAdBjGHPZpYAydBX5W0CBe52XJAV0lxbi4C8GU/exec";


// ===============================
// BLOG + DESTINATION JSON LOADER
// ===============================

async function loadJSON(file, containerId, limit = null) {
  try {
    const response = await fetch(file);
    const data = await response.json();
    const container = document.getElementById(containerId);

    if (!container) return;

    const items = limit ? data.slice(0, limit) : data;

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
        <img src="${item.image}" />
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("JSON Load Error:", error);
  }
}

// Only JSON loading is inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("homeBlogs")) {
    loadJSON("blogs.json", "homeBlogs", 3);
  }

  if (document.getElementById("homeDestinations")) {
    loadJSON("destinations.json", "homeDestinations", 3);
  }

  if (document.getElementById("allBlogs")) {
    loadJSON("blogs.json", "allBlogs");
  }

  if (document.getElementById("allDestinations")) {
    loadJSON("destinations.json", "allDestinations");
  }

});


// ===============================
// ORIGINAL MODAL CONTROLS
// ===============================

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


// ===============================
// ORIGINAL BOOKING SUBMIT
// ===============================

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, textarea");

  const data = {
    type: "booking",
    fullName: inputs[0].value,
    email: inputs[1].value,
    phone: inputs[2].value,
    destination: inputs[3].value,
    travelDates: inputs[4].value,
    duration: inputs[5].value,
    departureCity: inputs[6].value,
    returnCity: inputs[7].value,
    travelersCount: inputs[8].value,
    genderSplit: inputs[9].value,
    tripType: inputs[10].value,
    transport: inputs[11].value,
    serviceType: inputs[12].value,
    budget: inputs[13].value,
    specialRequests: inputs[14].value,
    feeAgreement: inputs[15].checked,
    flightAgreement: inputs[16].checked
  };

  sendToSheet(data);
  closeModal("bookingModal");
  showPopup("Booking request sent successfully!");});


// ===============================
// ORIGINAL ITINERARY SUBMIT
// ===============================

document.getElementById("itineraryForm").addEventListener("submit", function(e) {
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
  showPopup("Itinerary request sent successfully!");});


// ===============================
// ORIGINAL SEND FUNCTION
// ===============================

function sendToSheet(data) {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(res => res.text())
  .then(res => console.log(res))
  .catch(err => console.error(err));
}

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.6)";
    navbar.style.backdropFilter = "blur(15px)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.15)";
    navbar.style.backdropFilter = "blur(12px)";
  }
});

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