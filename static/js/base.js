window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const topButton = document.getElementById("topButton");
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        topButton.style.opacity = 1;
    } else {
        topButton.style.opacity = 0;
    }
}

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    const topButton = document.getElementById("topButton");
}