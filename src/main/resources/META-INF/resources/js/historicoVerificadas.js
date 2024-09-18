document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.back-btn').addEventListener('click', function() {
        window.location.href = '/index/fakenews';
    });

    async function loadNewsData() {
        try {
            let id = localStorage.getItem('user-name-id');
            const response = await fetch(`/api/news/listar/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar as notícias');
            }
            const newsData = await response.json();

            const tbody = document.querySelector('tbody');
            tbody.innerHTML = ''; // Limpa o conteúdo existente



            newsData.forEach((news, index) => {
                const row = document.createElement('tr');
                const statusNews = news.isFake === 1 ? "Verdadeira" : "Falsa";

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td class="news-title">${news.title || 'Título não disponível'}</td>
                    <td><span class="status-${news.isFake}">${statusNews || 'Status não disponível'}</span></td>
                    <td>${new Date(news.createdAt).toLocaleDateString('pt-BR')} ${new Date(news.createdAt).toLocaleTimeString('pt-BR')}</td>
                    <td><button class="view-btn" data-news="${news.id}">Visualizar</button></td>
                `;
                tbody.appendChild(row);

                const fullTextRow = document.createElement('tr');
                fullTextRow.classList.add('full-text');
                fullTextRow.id = `text-news-${news.id}`;
                fullTextRow.style.display = 'none';
                fullTextRow.innerHTML = `
                    <td colspan="5">
                        <p>${news.content || 'Conteúdo não disponível'}</p>
                    </td>
                `;
                tbody.appendChild(fullTextRow);
            });

        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }

    loadNewsData();

    // Evento para abrir o modal ao clicar no botão de visualizar
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-btn')) {
            const newsId = event.target.getAttribute('data-news');
            const modal = document.getElementById("newsModal");
            const modalText = document.getElementById("modalText");

            // Acessa o texto completo da notícia diretamente do HTML
            const fullTextElement = document.getElementById(`text-news-${newsId}`);
            if (fullTextElement) {
                modalText.textContent = fullTextElement.querySelector('p').textContent;
            } else {
                modalText.textContent = "Texto completo da notícia não encontrado.";
            }

            // Exibe o modal com animação
            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add('open');
            }, 10);  // Pequeno delay para aplicar a classe de animação
        }
    });

    // Evento para fechar o modal
    document.querySelectorAll(".close-btn").forEach(button => {
        button.addEventListener('click', function () {
            const modal = document.getElementById("newsModal");
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);  // Delay para fechar após a animação
        });
    });

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', function (event) {
        const modal = document.getElementById("newsModal");
        if (event.target === modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);  // Delay para fechar após a animação
        }
    });
});
