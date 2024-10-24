let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function changeSlide(direction) {
    currentSlide = (currentSlide + direction);
    if(currentSlide > 4){
        currentSlide = (currentSlide + direction) - 6;
    }

    if(currentSlide < 0){
        currentSlide = (currentSlide + direction) + 6;
    }

    // Aplica a transição de deslocamento para o slide correto
    const offset = -currentSlide * 100; // Multiplicado por 100% para deslocar corretamente
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}
