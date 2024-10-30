document.addEventListener("DOMContentLoaded", function() {
    // Simulação de carregamento com tempo
    setTimeout(() => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        // Esconde o loader e exibe o conteúdo
        loader.style.display = "none";
        content.style.display = "block";

        // Adiciona a animação de fade-in à primeira seção
        const firstSection = document.getElementById("comeco");
        firstSection.classList.add("fade-in-up");
    }, 1500); // 2 segundos de delay (simulação)
});


// Função para aplicar a animação de aparecer ao rolar a página
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 250) {
            element.classList.add('appear');
        }
    });
}

// Adiciona um evento de rolagem
window.addEventListener('scroll', revealOnScroll);

// Chama a função na carga inicial para mostrar os elementos visíveis
document.addEventListener('DOMContentLoaded', revealOnScroll);

document.addEventListener("DOMContentLoaded", function() {
    // Simulação de carregamento com tempo
    setTimeout(() => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        // Esconde o loader e exibe o conteúdo
        loader.style.display = "none";
        content.style.display = "block";
    }, 1500); // 2 segundos de delay (simulação)
});
