document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('user-table-body');
    let usersData = [];

    // Seleciona os elementos
    const usuariosLink = document.getElementById('usuarios');
    const requisicoesLink = document.getElementById('requisicoes');

    const uiUsuario = document.getElementById('ui-usuario');
    const uiRequests = document.getElementById('ui-requests');

    const newsTableBody = document.getElementById('news-table-body');
    const newsModal = document.getElementById('news-modal');
    const modalContent = document.getElementById('full-news-content');
    const modalTitle = document.getElementById('modal-news-title');
    const closeModal = document.getElementById('close-modal');

    const userNameElement = document.querySelector('.user-name');

    userNameElement.textContent = 'Usuario';

    if (localStorage.key('user-name')) {
        console.log('userName ::', localStorage.getItem('user-name'));
        userNameElement.textContent = localStorage.getItem('user-name');
    }

    usuariosLink.addEventListener('click', () => {
        event.preventDefault();
        requisicoesLink.classList.remove('active');
        usuariosLink.classList.remove('active');

        usuariosLink.classList.add('active');

        uiRequests.classList.add('hidden');
        uiUsuario.classList.remove('hidden');
    });
    requisicoesLink.addEventListener('click', () => {
        event.preventDefault();

        usuariosLink.classList.remove('active');
        requisicoesLink.classList.remove('active');

        requisicoesLink.classList.add('active');

        uiRequests.classList.remove('hidden');
        uiUsuario.classList.add('hidden');
    });

    // Atualizando evento para a aba de Requisições
    requisicoesLink.addEventListener('click', async (event) => {
        event.preventDefault();

        usuariosLink.classList.remove('active');
        requisicoesLink.classList.remove('active');

        requisicoesLink.classList.add('active');

        uiRequests.classList.remove('hidden');
        uiUsuario.classList.add('hidden');

        // Carrega as notícias
        await loadNewsData();
    });

    async function loadUserData() {
        try {
            const response = await fetch('/usuario/listar');
            if (!response.ok) {
                throw new Error('Erro ao carregar os usuários');
            }
            usersData = await response.json();
            renderTable(usersData);
        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }

    function renderNewsTable(news) {
        newsTableBody.innerHTML = '';

        news.forEach(newsItem => {
            const newRow = document.createElement('tr');
            const truncatedContent = newsItem.content.length > 10 ? newsItem.content.substring(0, 10) + '...' : newsItem.content;

            const statusNews = newsItem.isFake === 1 ? "Verdadeira" : "Falsa";


            newRow.innerHTML = `
                <td>${newsItem.id}</td>
                <td>${truncatedContent}</td>   
                <td>${statusNews}</td>
                <td>
                    <button class="view-details" data-id="${newsItem.id}" data-content="${newsItem.content}">Ver Detalhes</button>
                </td>
            `;
            newsTableBody.appendChild(newRow);
        });

        const viewButtons = document.querySelectorAll('.view-details');
        viewButtons.forEach(button => {
            button.addEventListener('click', handleViewDetailsClick);
        });
    }

    function handleViewDetailsClick(event) {
        console.log('Botão de detalhes clicado'); // Adicione esta linha
        const content = event.target.getAttribute('data-content');
        const title = `Notícia ID ${event.target.getAttribute('data-id')}`;

        if (modalTitle) {
            modalTitle.textContent = title;
        }
        if (modalContent) {
            modalContent.textContent = content;
        }
        if (newsModal) {
            newsModal.style.display = 'block';
        }
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (newsModal) {
                newsModal.style.display = 'none';
            }
        });
    }

    window.onclick = function (event) {
        if (event.target === newsModal) {
            if (newsModal) {
                newsModal.style.display = 'none';
            }
        }
    };


    // Carregue os dados
    async function loadNewsData() {
        try {
            const response = await fetch('/api/news/listar');
            if (!response.ok) {
                throw new Error('Erro ao carregar as notícias');
            }
            const newsData = await response.json();
            renderNewsTable(newsData);
        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }


    function renderTable(users) {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const newRow = document.createElement('tr');
            const statusClass = user["active"] ? "status-active" : "status-inactive";
            const currentRole = user["roles"][0];

            newRow.innerHTML = `
            <td>${user["nome"]}</td>
            <td>${user["email"]}</td>
            <td>
                <select class="role-select" data-id="${user["id"]}">
                    <option value="ADMINISTRADOR" ${currentRole === 'ADMINISTRADOR' ? 'selected' : ''}>ADMINISTRADOR</option>
                    <option value="JORNALISTA" ${currentRole === 'JORNALISTA' ? 'selected' : ''}>JORNALISTA</option>
                    <option value="COORDENADOR" ${currentRole === 'COORDENADOR' ? 'selected' : ''}>COORDENADOR</option>
                </select>
            </td>
            <td class="${statusClass}">${user["active"] ? 'Ativada' : 'Inativa'}</td>
            <td>
                <div class="header-buttons">
                    <button class="status-btn" data-id="${user["id"]}">
                        ${user["active"] ? 'Desativar' : 'Ativar'}
                    </button>
                </div>
            </td>
        `;
            userTableBody.appendChild(newRow);
        });

        const statusButtons = document.querySelectorAll('.status-btn');
        statusButtons.forEach(button => {
            button.addEventListener('click', handleStatusClick);
        });

        const roleSelects = document.querySelectorAll('.role-select');
        roleSelects.forEach(select => {
            select.addEventListener('change', handleRoleChange);
        });
    }

    `x`

    async function handleRoleChange(event) {
        const userId = event.target.getAttribute('data-id');
        const newRole = event.target.value;

        try {
            const response = await fetch(`/usuario/alterarRole/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({role: newRole})
            });

            if (!response.ok) {
                throw new Error('Erro ao alterar a role do usuário');
            }

            const result = await response.json();
            if (result.success) {
                alert(result.message); // Exibe uma mensagem de sucesso
            } else {
                alert('Erro: ' + result.message);
            }
        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }


    async function handleStatusClick(event) {
        const userId = event.target.getAttribute('data-id'); // Obtém o ID do usuário a partir do botão
        try {
            const response = await fetch(`/usuario/atualizar/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar o status do usuário');
            }
            const result = await response.json();
            if (result.success) {
                alert(result.message); // Exibe uma mensagem de sucesso
                await loadUserData();  // Recarrega os dados da tabela
            } else {
                alert('Erro: ' + result.message);
            }
        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }

    loadUserData();
});

function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    localStorage.clear();

    window.location.href = '/login';
}
