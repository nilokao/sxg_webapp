// Função para abrir o modal com os detalhes da notícia
function openModal(title, date, resume, image, authorPic, authorName) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDate").innerText = date;
    document.getElementById("modalResume").innerText = resume;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalAuthorPic").src = authorPic;
    document.getElementById("modalAuthor").innerText = authorName;
    
    // Mostrar o modal
    document.getElementById("newsModal").style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("newsModal").style.display = "none";
}

// Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("newsModal");
    if (event.target === modal) {
        closeModal();
    }
}