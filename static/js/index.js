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

// CALENDÁRIO
const calendar = document.getElementById('calendar');
const daysContainer = document.getElementById('days');
const monthYearDisplay = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const clearModeButton = document.getElementById('clearModeButton');
const eventModal = document.getElementById('eventModal');
const closeModalButton = document.getElementById('closeModal'); // Botão de fechar o modal de adicionar eventos
const viewEventsModal = document.getElementById('viewEventsModal');
const closeViewModal = document.getElementById('closeViewModal');
const eventList = document.getElementById('eventList');
const eventInput = document.getElementById('eventInput');
const addEventButton = document.getElementById('addEventButton');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = JSON.parse(localStorage.getItem('events')) || {};  
let isClearMode = false;

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function renderCalendar(month, year) {
    daysContainer.innerHTML = '';
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthYearDisplay.innerText = `${new Date(year, month).toLocaleString('pt-BR', { month: 'long' })} ${year}`;

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        daysContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        dayCell.classList.add('day');

        const dateKey = `${year}-${month + 1}-${day}`;
        if (events[dateKey]) {
            dayCell.classList.add('highlight');
            dayCell.title = events[dateKey].join('\n');
            dayCell.addEventListener('click', () => isClearMode ? showEvents(dateKey) : openEventModal(day, month, year));
        } else {
            dayCell.addEventListener('click', () => openEventModal(day, month, year));
        }
        
        daysContainer.appendChild(dayCell);
    }
}

function openEventModal(day, month, year) {
    if (!isClearMode) {
        eventModal.style.display = 'flex';
        eventInput.setAttribute('data-date', `${year}-${month + 1}-${day}`);
    }
}

function closeEventModal() {
    eventModal.style.display = 'none';
    eventInput.value = '';
}

function addEvent() {
    const dateKey = eventInput.getAttribute('data-date');
    const eventText = eventInput.value.trim();

    if (eventText !== '') {
        if (!events[dateKey]) {
            events[dateKey] = [];
        }
        events[dateKey].push(eventText);
        saveEvents();
        renderCalendar(currentMonth, currentYear);
        closeEventModal();
    }
}

function showEvents(dateKey) {
    eventList.innerHTML = '';
    events[dateKey].forEach((event, index) => {
        const eventItem = document.createElement('li');
        eventItem.innerText = event;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
        deleteButton.addEventListener('click', () => removeEvent(dateKey, index));
        
        eventItem.appendChild(deleteButton);
        eventList.appendChild(eventItem);
    });
    viewEventsModal.style.display = 'flex';
}

function removeEvent(dateKey, index) {
    events[dateKey].splice(index, 1);
    if (events[dateKey].length === 0) delete events[dateKey];
    saveEvents();
    renderCalendar(currentMonth, currentYear);
    showEvents(dateKey);
}

function toggleClearMode() {
    isClearMode = !isClearMode;
    clearModeButton.innerText = isClearMode ? 'Desativar Modo de Limpeza' : 'Limpar Eventos';
}

clearModeButton.addEventListener('click', toggleClearMode);
closeModalButton.addEventListener('click', closeEventModal); // Corrigido: botão fechar modal de adicionar evento
closeViewModal.addEventListener('click', () => viewEventsModal.style.display = 'none');
addEventButton.addEventListener('click', addEvent);
prevMonthButton.addEventListener('click', () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});
nextMonthButton.addEventListener('click', () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});

window.addEventListener('click', (e) => e.target === eventModal ? closeEventModal() : false);

renderCalendar(currentMonth, currentYear);
