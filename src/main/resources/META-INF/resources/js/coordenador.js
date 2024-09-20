document.addEventListener("DOMContentLoaded", function() {
    carregarNoticias();
    exibirSaudacao();
    attachEventListeners();
});

function carregarNoticias() {
    fetch('/api/news/listar')
        .then(response => response.json())
        .then(noticias => {
            const newsTableBody = document.getElementById('news-table-body');
            newsTableBody.innerHTML = '';
            noticias.forEach((noticia, index) => {
                const createdAtFormatted = formatDate(noticia.createdAt);
                const updatedAtFormatted = formatDate(noticia.updatedAt);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td class="news-title">${noticia.content.substring(0, 50)}...</td>
                    <td>${noticia.createdUser}</td>
                    <td>
                        <select class="status-select" data-news-id="${noticia.id}">
                            <option value="false" ${noticia.isFake ? '' : 'selected'}>Falso</option>
                            <option value="true" ${noticia.isFake ? 'selected' : ''}>Verdadeiro</option>
                        </select>
                    </td>
                    <td>${updatedAtFormatted}</td>
                    <td>${createdAtFormatted}</td>
                    <td class="action-buttons">
                        <button class="action-btn view" title="Visualizar" data-news-id="${noticia.id}">
                            <img src="../img/search.png" alt="Search Icon" class="search-icon">
                        </button>
                        <button class="action-btn delete" title="Excluir" data-news-id="${noticia.id}">
                            <img src="../img/delete.png" alt="Delete Icon" class="delete-icon">
                        </button>
                    </td>
                `;
                newsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar notícias:', error));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function exibirSaudacao() {
    const greetingElement = document.querySelector(".saudacao");
    const currentHour = new Date().getHours();
    let saudacao = currentHour < 12 ? "Bom dia!" : currentHour < 18 ? "Boa tarde!" : "Boa noite!";
    greetingElement.textContent = saudacao;
}

function attachEventListeners() {
    document.querySelector('.logout-btn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/login';
    });

    document.addEventListener('change', function(event) {
        if (event.target.classList.contains('status-select')) {
            const newsId = event.target.getAttribute('data-news-id');
            const isFake = event.target.value;
            fetch(`/api/news/atualizar-status/${newsId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isFake })
            })
                .then(response => response.ok ? alert('Status atualizado com sucesso!') : alert('Erro ao atualizar status.'))
                .catch(error => console.error('Erro:', error));
        }
    });

    // Usar event delegation para os botões de visualizar e excluir
    const newsTableBody = document.getElementById('news-table-body');

    newsTableBody.addEventListener('click', function(event) {
        if (event.target.closest('.action-btn.view')) {
            const newsId = event.target.closest('.action-btn.view').getAttribute('data-news-id');
            abrirModal(newsId);
        }

        if (event.target.closest('.action-btn.delete')) {
            const newsId = event.target.closest('.action-btn.delete').getAttribute('data-news-id');
            excluirNoticia(newsId);
        }
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function () {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    window.addEventListener('click', function(event) {
        const newsModal = document.getElementById("newsModal");
        const deleteModal = document.getElementById("deleteModal");
        if (event.target === newsModal || event.target === deleteModal) {
            newsModal.style.display = "none";
            deleteModal.style.display = "none";
        }
    });
}


function abrirModal(newsId) {
    fetch(`/api/news/${newsId}`)
        .then(response => response.json())
        .then(noticia => {
            const modal = document.getElementById("newsModal");
            const modalText = document.getElementById("modalText");
            modalText.textContent = noticia.content;
            modal.style.display = "flex";
        })
        .catch(error => console.error('Erro ao carregar notícia:', error));
}

function excluirNoticia(newsId) {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
        fetch(`/api/news/excluir/${newsId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Notícia excluída com sucesso.');
                    carregarNoticias();
                } else {
                    alert('Erro ao excluir notícia.');
                }
            });
    }
}