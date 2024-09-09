document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    fetch('/login/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, senha: senha })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert(data.message);
                localStorage.setItem('user-name', data.userName);
                if (data.roles.includes('ADMINISTRADOR')) {
                    window.location.href = '/paginaOperador';
                } else if (data.roles.includes('COORDENADOR')) {
                    window.location.href = '/coordenador';
                } else if (data.roles.includes('JORNALISTA')) {
                    window.location.href = '/index/fakenews';
                }
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login. Tente novamente.');
        });
});

document.getElementById('btn-cadastrar').addEventListener('click', function() {
    window.location.href = '/novoUsuarioCadastro';
});

document.getElementById('voltar-pagina-inicial').addEventListener('click', function() {
    window.location.href = '/pagina/inicial';
});

function togglePassword() {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
}