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

// Seleciona o header e os links de navegação
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');

// Define as dimensões originais e reduzidas
const originalHeight = '7vh';
const reducedHeight = '5vh';
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
