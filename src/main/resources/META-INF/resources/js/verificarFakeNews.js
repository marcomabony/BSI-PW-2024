document.getElementById('verifyButton').addEventListener('click', function () {
    const newsContent = document.getElementById('newsContent').value;

    if (newsContent.trim() === '') {
        alert('Por favor, insira o conteúdo da notícia.');
        return;
    }

    fetch('/api/news/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newsContent })
    })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = data.message;

            if (data.message.includes('falsa')) {
                resultDiv.classList.remove('true');
                resultDiv.classList.add('false');
            } else {
                resultDiv.classList.remove('false');
                resultDiv.classList.add('true');
            }
        })
        .catch(error => {
            console.error('Erro ao verificar a notícia:', error);
            alert('Ocorreu um erro ao verificar a notícia.');
        });
});