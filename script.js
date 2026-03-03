// 🔥 IMPORTANT: ADD YOUR APPS SCRIPT URL HERE
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpHarvghLIbtfigzN-tEyCtiiqfHXAdBjGHPZpYAydBX5W0CBe52XJAV0lxbi4C8GU/exec";


// Swiper
new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    }
  }
});


// Modal Controls
function openBooking() {
  document.getElementById("bookingModal").style.display = "flex";
}

function openItinerary() {
  document.getElementById("itineraryModal").style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}


// Booking Form Submit
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    type: "booking",
    name: this[0].value,
    email: this[1].value,
    phone: this[2].value,
    destination: this[3].value,
    date: this[4].value
  };

  sendToSheet(data);
  closeModal("bookingModal");
  alert("Booking Request Sent!");
});


// Itinerary Form Submit
document.getElementById("itineraryForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    type: "itinerary",
    name: this[0].value,
    email: this[1].value,
    destination: this[2].value
  };

  sendToSheet(data);
  closeModal("itineraryModal");
  alert("Itinerary Request Sent!");
});


// Send to Apps Script
function sendToSheet(data) {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(res => res.text())
  .then(res => console.log(res))
  .catch(err => console.error(err));
}