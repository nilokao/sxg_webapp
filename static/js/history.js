document.addEventListener("DOMContentLoaded", function() {
    // Simulação de carregamento com tempo
    setTimeout(() => {
        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        // Esconde o loader e exibe o conteúdo
        loader.style.display = "none";
        content.style.display = "block";

        // Aplica fade-in na primeira seção
        const firstSection = document.getElementById("comeco");
        firstSection.classList.add("fade-in-up");
    }, 1500); // Delay simulado de 1,5 segundos
});

// Função para aplicar as animações de aparecer e desaparecer ao rolar a página
function revealOnScroll() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    fadeInElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBot = element.getBoundingClientRect().bottom;
        if (elementTop < windowHeight - 100 && elementBot > 150) {
            // Aplica fade-in quando o elemento entra na tela
            element.classList.add('appear');
        }
        else {
            element.classList.remove('appear');
        }
    });
}

// Escuta o evento de rolagem para ativar as animações
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
    const footer = document.querySelector('footer');
    const section = document.querySelectorAll("section");
    const links = document.querySelectorAll(".navbar-item");
    const content = document.getElementById("content");
    const navLinks = document.querySelectorAll('header nav a');
    const originalHeight = '7vh';
    const reducedHeight = '4vh';
    const originalFontSize = '2vw';
    const reducedFontSize = '1.5vw'; // ajuste conforme necessário
    const scrollLimit = 250; // ajuste conforme necessário
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollLimit) {
            // Reduz altura do header e tamanho da fonte
            header.style.height = reducedHeight;
            header.style.transition = 'height 0.3s ease';
            
            navLinks.forEach(link => {
                link.style.fontSize = reducedFontSize;
                link.style.transition = 'font-size 0.3s ease';
            });
        } else {
            // Restaura altura do header e tamanho da fonte
            header.style.height = originalHeight;
            
            navLinks.forEach(link => {
                link.style.fontSize = originalFontSize;
            });
        }
    });
    

// Expande a navbar ao passar o mouse
    navbar.addEventListener('mouseenter', () => {
        navbar.classList.add('navbar-expanded');
        header.classList.add('content-shifted');
        footer.classList.add('content-shifted');
        content.classList.add('content-shifted');
        content.style.marginLeft = "0vw";
        content.style.maxWidth = "100vw";

        section.forEach(section =>{
            section.classList.add("content-shifted");
        });

        links.forEach(link =>{
            link.style.display = "block";
        });
    });

    // Recolhe a navbar ao sair com o mouse
    navbar.addEventListener('mouseleave', () => {
        navbar.classList.remove('navbar-expanded');
        header.classList.remove('content-shifted');
        footer.classList.remove('content-shifted');
        content.classList.remove('content-shifted');
        content.style.marginLeft = "3vw";
        content.style.maxWidth = "97vw";

        section.forEach(section =>{
            section.classList.remove("content-shifted");
        });
        
        links.forEach(link =>{
            link.style.display = "none";
        });
    });
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const topButton = document.getElementById("topButton");
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
}

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}