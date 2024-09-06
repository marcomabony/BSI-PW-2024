function criarObjetoNewsDTO(newsText) {
    return {
        news: newsText
    };
}

async function verificarNoticia(newsDTO) {
    try {
        const response = await fetch('/api/news/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsDTO)
        });

        if (!response.ok) {
            throw new Error('Erro ao verificar a notícia');
        }

        const result = await response.json();
        exibirResultado(result.message);
    } catch (error) {
        console.error('Erro:', error);
        exibirErro('Erro ao verificar a notícia. Tente novamente.');
    }
}

function exibirResultado(mensagem) {
    document.getElementById('result').innerText = mensagem;
}

function exibirErro(mensagem) {
    document.getElementById('result').innerText = mensagem;
}

document.getElementById('verifierForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newsText = document.getElementById('newsInput').value;
    const newsDTO = criarObjetoNewsDTO(newsText);
    verificarNoticia(newsDTO);
});