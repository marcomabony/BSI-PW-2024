document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('user-table-body');
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
            renderTable(usersData);
        } catch (error) {
            console.error('Erro ao consumir a API:', error);
        }
    }


    function renderTable(users) {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const newRow = document.createElement('tr');  // Criando a nova linha
            const statusClass = user["active"] ? "status-active" : "status-inactive";
            const currentRole = user["roles"][0]; // Supondo que está usando apenas uma role

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
    }`x`

    async function handleRoleChange(event) {
        const userId = event.target.getAttribute('data-id');
        const newRole = event.target.value;

        try {
            const response = await fetch(`/usuario/alterarRole/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
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
    window.location.href = '/login';
}
