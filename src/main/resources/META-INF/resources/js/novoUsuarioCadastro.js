
document.getElementById('cep').addEventListener('blur', function() {
    let cep = this.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico do CEP

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) { // Se não houver erro no retorno da API
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP.');
            });
    } else {
        alert('CEP inválido. Por favor, insira um CEP válido.');
    }
});


// Event listener para o botão "Avançar"
document.getElementById('next-step').addEventListener('click', function(event) {
    event.preventDefault();

    // Coleta os dados da primeira etapa
    const nome = document.getElementById('nome').value;
    const apelido = document.getElementById('apelido').value;
    const telefone = document.getElementById('telefone').value;
    const celular = document.getElementById('celular').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const estadoCivil = document.getElementById('estadoCivil').value;
    const genero = document.getElementById('genero').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const cep = document.getElementById('cep').value;

    // Armazena os dados no localStorage para a próxima etapa
    localStorage.setItem('userInfo', JSON.stringify({
        nome,
        apelido,
        telefone,
        celular,
        dataNascimento,
        estadoCivil,
        genero,
        nacionalidade,
        endereco,
        cidade,
        estado,
        cep
    }));

    window.location.href = '/loginNovoUsuario';
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    window.location.href = '/login'; // Redireciona para a página novoUsuarioCadastro
});

// Função para exibir/ocultar o menu de usuário
function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}