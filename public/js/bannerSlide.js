let currentIndex3 = 0;
const images = document.querySelectorAll('.banner-image');
const totalImages = images.length;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function nextImage() {
  currentIndex3 = (currentIndex3 + 1) % totalImages;
  showImage(currentIndex3);
}

setInterval(nextImage, 5000);

// Initial display
showImage(currentIndex3);