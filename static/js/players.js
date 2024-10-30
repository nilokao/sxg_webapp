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

    const offset = -currentSlide * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Simulação de carregamento com tempo
    setTimeout(() => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        // Esconde o loader e exibe o conteúdo
        loader.style.display = "none";
        content.style.display = "block";

        // Toca o áudio automaticamente após o carregamento
        const audio = document.getElementById("audio");
        audio.volume = 0.1;
        audio.playbackRate = 0.75;
        audio.play().catch(error => {
            console.log("O áudio não pôde ser reproduzido automaticamente:", error);
        });
    }, 1500); // 2 segundos de delay (simulação)
});
