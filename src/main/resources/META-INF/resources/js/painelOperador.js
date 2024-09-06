document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('user-table-body');
    const errorModal = document.getElementById('error-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const exclusionReason = document.getElementById('exclusion-reason');
    let usersData = [];

    // Seleciona os elementos
    const usuariosLink = document.getElementById('usuarios');
    const requisicoesLink = document.getElementById('requisicoes');

    const uiUsuario = document.getElementById('ui-usuario');
    const uiRequests = document.getElementById('ui-requests');

    // Função para alternar a classe "active"
    function toggleActive(event) {
        // Evita o comportamento padrão do link

        // Remove a classe "active" de todos os links
        usuariosLink.classList.remove('active');


        // Adiciona a classe "active" ao link clicado

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


    async function loadUserData() {
        try {
            const response = await fetch('/usuario/listar');
            if (!response.ok) {
                throw new Error('Erro ao carregar os usuários');
            }
            usersData = await response.json();
            console.log("Usuários carregados:", usersData);
            renderTable(usersData);
        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }

    function usuarios() {

    }

    function requisicoes() {

    }

    function renderTable(users) {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const newRow = document.createElement('tr');
            const statusClass = user["active"] ? "status-active" : "status-inactive";

            newRow.innerHTML = `
                <td>${user["nome"]}</td>
                <td>${user["email"]}</td>
                <td>${user["roles"][0]}</td>
                <td class="${statusClass}">${user["active"] ? 'Ativada' : 'Inativa'}</td>
                <td>
                    <div class="header-buttons">
                        <button class="delete-btn">${user["active"] ? 'Desativar' : 'Ativar'}</button>
                    </div>
                </td>
            `;
            userTableBody.appendChild(newRow);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDeleteClick);
        });
    }

    function handleDeleteClick(event) {
        console.log("Botão de exclusão clicado");
        exclusionReason.value = '';
        errorModal.classList.remove('hidden');
        console.log("Modal exibido");
    }

    cancelBtn.addEventListener('click', () => {
        errorModal.classList.add('hidden');
    });

    loadUserData();
});

function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    window.location.href = '/login';
}
