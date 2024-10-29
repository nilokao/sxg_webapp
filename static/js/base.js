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