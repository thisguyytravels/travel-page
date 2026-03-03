// SWIPER
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  // LOAD BLOGS
  fetch('blogs.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("blogContainer");
    data.forEach(blog => {
      container.innerHTML += `
        <div class="swiper-slide">
          <div class="blog-card">
            <img src="${blog.image}">
            <div class="blog-content">
              <h3>${blog.title}</h3>
              <p>${blog.description}</p>
            </div>
          </div>
        </div>
      `;
    });
  });
  
  // MODAL
  function openModal() {
    document.getElementById("modal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }