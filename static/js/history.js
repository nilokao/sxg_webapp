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


document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');
    const content = document.getElementById('content');

// Expande a navbar ao passar o mouse
    navbar.addEventListener('mouseenter', () => {
        navbar.classList.add('navbar-expanded');
        header.classList.add('content-shifted');
        content.classList.add('content-shifted');
    });

    // Recolhe a navbar ao sair com o mouse
    navbar.addEventListener('mouseleave', () => {
        navbar.classList.remove('navbar-expanded');
        header.classList.remove('content-shifted');
        content.classList.remove('content-shifted');
    });
});