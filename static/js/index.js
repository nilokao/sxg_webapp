// Função para carregar as últimas notícias
async function carregarUltimasNoticias() {
    try {
        // Carrega o conteúdo da página noticias.html
        const response = await fetch('noticias');
        
        // Verifica se o carregamento foi bem-sucedido
        if (!response.ok) {
            throw new Error(`Erro ao carregar noticias.html: ${response.statusText}`);
        }
        
        const html = await response.text();

        // Cria um elemento temporário para processar o HTML e encontrar as notícias
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Seleciona todas as divs de notícias pela classe "news"
        const noticias = Array.from(tempDiv.querySelectorAll('.news'));

        // Mapeia cada notícia para um objeto com ID e elemento, ordenando por ID (maior para menor)
        const noticiasOrdenadas = noticias
            .map(noticia => ({
                id: parseInt(noticia.id),
                elemento: noticia
            }))
            .sort((a, b) => b.id - a.id)
            .slice(0, 3); // Pega os 3 maiores IDs

        // Seleciona o elemento onde serão exibidas as últimas notícias na página inicial
        const newsList = document.getElementById('news-list');
        
        // Limpa o conteúdo de newsList antes de adicionar novos itens
        newsList.innerHTML = '';

        // Adiciona cada uma das últimas notícias na lista da página inicial
        noticiasOrdenadas.forEach(noticiaObj => {
            const noticia = noticiaObj.elemento;
            const titulo = noticia.querySelector('h1').textContent;
            const data = noticia.querySelector('h3').textContent;
            const descricao = noticia.querySelector('h2').textContent;
            const imagem = noticia.querySelector('.image img').src;

            // Cria o item da lista com o conteúdo da notícia
            const li = document.createElement('li');
            li.style.listStyleType = 'none';
            li.style.margin = '10px';
            li.innerHTML = `
                <div class="news">
                    <img class="image" src="${imagem}" alt="${titulo}">
                    <h3>${titulo}</h3>
                    <p><small>${data}</small></p>
                    <p>${descricao}</p>
                </div>
            `;
            newsList.appendChild(li);
        });
    }catch(error){
        console.error("Erro ao carregar notícias:", error);
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarUltimasNoticias);