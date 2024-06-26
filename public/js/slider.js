document.addEventListener('DOMContentLoaded', () => {
    // Slider 1
    let currentIndex = 0;
    const frames = document.querySelectorAll('.frame');
    const totalFrames = frames.length;
    const gallery = document.querySelector('.gallery');
    const prevButton = document.querySelector('.left-arrow');
    const nextButton = document.querySelector('.right-arrow');

    function showSlide(index) {
        const frameWidth = frames[0].clientWidth + parseInt(getComputedStyle(frames[0]).marginLeft) + parseInt(getComputedStyle(frames[0]).marginRight);
        const framesPerView = Math.floor(gallery.clientWidth / frameWidth);
        const maxIndex = totalFrames - framesPerView;

        if (index < 0) {
            currentIndex = 0;
        } else if (index > maxIndex) {
            currentIndex = maxIndex;
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * frameWidth;
        gallery.style.transform = `translateX(${offset}px)`;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    showSlide(currentIndex);

    // Slider 2
    let currentIndex2 = 0;
    const frames2 = document.querySelectorAll('.frame2');
    const totalFrames2 = frames2.length;
    const gallery2 = document.querySelector('.gallery2');
    const prevButton2 = document.querySelector('.left-arrow2');
    const nextButton2 = document.querySelector('.right-arrow2');

    function showSlide2(index) {
        const frameWidth2 = frames2[0].clientWidth + parseInt(getComputedStyle(frames2[0]).marginLeft) + parseInt(getComputedStyle(frames2[0]).marginRight);
        const framesPerView2 = Math.floor(gallery2.clientWidth / frameWidth2);
        const maxIndex2 = totalFrames2 - framesPerView2;

        if (index < 0) {
            currentIndex2 = 0;
        } else if (index > maxIndex2) {
            currentIndex2 = maxIndex2;
        } else {
            currentIndex2 = index;
        }

        const offset2 = -currentIndex2 * frameWidth2;
        gallery2.style.transform = `translateX(${offset2}px)`;

        prevButton2.disabled = currentIndex2 === 0;
        nextButton2.disabled = currentIndex2 === maxIndex2;
    }

    function nextSlide2() {
        showSlide2(currentIndex2 + 1);
    }

    function prevSlide2() {
        showSlide2(currentIndex2 - 1);
    }

    nextButton2.addEventListener('click', nextSlide2);
    prevButton2.addEventListener('click', prevSlide2);
    showSlide2(currentIndex2);

    // Slider 3
    let currentIndex3 = 0;
    const frames3 = document.querySelectorAll('.frame3');
    const totalFrames3 = frames3.length;
    const gallery3 = document.querySelector('.gallery3');
    const prevButton3 = document.querySelector('.left-arrow3');
    const nextButton3 = document.querySelector('.right-arrow3');

    function showSlide3(index) {
        const frameWidth3 = frames3[0].clientWidth + parseInt(getComputedStyle(frames3[0]).marginLeft) + parseInt(getComputedStyle(frames3[0]).marginRight);
        const framesPerView3 = Math.floor(gallery3.clientWidth / frameWidth3);
        const maxIndex3 = totalFrames3 - framesPerView3;

        if (index < 0) {
            currentIndex3 = 0;
        } else if (index > maxIndex3) {
            currentIndex3 = maxIndex3;
        } else {
            currentIndex3 = index;
        }

        const offset3 = -currentIndex3 * frameWidth3;
        gallery3.style.transform = `translateX(${offset3}px)`;

        prevButton3.disabled = currentIndex3 === 0;
        nextButton3.disabled = currentIndex3 === maxIndex3;
    }

    function nextSlide3() {
        showSlide3(currentIndex3 + 1);
    }

    function prevSlide3() {
        showSlide3(currentIndex3 - 1);
    }

    nextButton3.addEventListener('click', nextSlide3);
    prevButton3.addEventListener('click', prevSlide3);
    showSlide3(currentIndex3);
});



