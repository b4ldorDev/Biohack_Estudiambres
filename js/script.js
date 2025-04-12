document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    let currentIndex = 0;

    function updateCarousel() {
        const width = images[0].clientWidth;
        carouselImages.style.transform = `translateX(${-currentIndex * width}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
});
