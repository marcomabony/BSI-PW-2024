// Carrega os dados da primeira etapa do localStorage
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

if (!userInfo) {
    alert('Por favor, complete a primeira etapa do cadastro.');
    window.location.href = '/usuario/cadastro';
}

// Função para validar o e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Função para validar o formulário
function validateForm() {
    const emailValidade = document.getElementById('email').value;
    const passwordValidade = document.getElementById('password').value;
    const confirmPasswordValidade = document.getElementById('confirmPassword').value;

    if (!validateEmail(emailValidade)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return false;
    }

    if (passwordValidade !== confirmPasswordValidade) {
        alert('As senhas não coincidem.');
        return false;
    }

    return true;
}

// Event listener para o formulário de cadastro
document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateForm()) {
        // Coleta os dados da segunda etapa
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        // Dados finais do usuário combinando as duas etapas
        const finalUserData = {
            ...userInfo,
            email,
            senha
        };

        // Envia os dados para o backend
        fetch('/usuario/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalUserData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuário cadastrado com sucesso!');
                window.location.href = '/login';
            } else {
                alert('Erro ao cadastrar usuário: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário.');
        });
    }
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    window.location.href = '/novoUsuarioCadastro'; // Redireciona para a página novoUsuarioCadastro
});

// Função para exibir/ocultar o menu de usuário
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
