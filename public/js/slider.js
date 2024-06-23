let currentIndex = 0;
const frames = document.querySelectorAll('.frame');
const totalFrames = frames.length;
const gallery = document.querySelector('.gallery');
const prevButton = document.querySelector('.left-arrow');
const nextButton = document.querySelector('.right-arrow');

// Função para mostrar o slide baseado no índice
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

    // Calcula o deslocamento baseado no tamanho de cada frame e suas margens
    const offset = -currentIndex * frameWidth;
    gallery.style.transform = `translateX(${offset}px)`;

    // Desabilita o botão de anterior se estiver na primeira imagem
    prevButton.disabled = currentIndex === 0;

    // Desabilita o botão de próximo se estiver na última imagem visível
    nextButton.disabled = currentIndex === maxIndex;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Adiciona os ouvintes de evento aos botões
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Inicializa o estado dos botões e a exibição do slide
showSlide(currentIndex);

//Slider 2
let currentIndex2 = 0;
const frames2 = document.querySelectorAll('.frame2');
const totalFrames2 = frames2.length;
const gallery2 = document.querySelector('.gallery2');
const prevButton2 = document.querySelector('.left-arrow2');
const nextButton2 = document.querySelector('.right-arrow2');

// Função para mostrar o slide baseado no índice
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

    // Calcula o deslocamento baseado no tamanho de cada frame e suas margens
    const offset2 = -currentIndex2 * frameWidth2;
    gallery2.style.transform = `translateX(${offset2}px)`;

    // Desabilita o botão de anterior se estiver na primeira imagem
    prevButton2.disabled = currentIndex2 === 0;

    // Desabilita o botão de próximo se estiver na última imagem visível
    nextButton2.disabled = currentIndex2 === maxIndex2;
}

function nextSlide2() {
    showSlide2(currentIndex2 + 1);
}

function prevSlide2() {
    showSlide2(currentIndex2 - 1);
}

// Adiciona os ouvintes de evento aos botões
nextButton2.addEventListener('click', nextSlide2);
prevButton2.addEventListener('click', prevSlide2);

// Inicializa o estado dos botões e a exibição do slide
showSlide2(currentIndex2);