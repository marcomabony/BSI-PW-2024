document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.querySelector('.user-name');

    userNameElement.textContent = 'Usuario';

    if (localStorage.key('user-name')) {
        console.log('userName ::', localStorage.getItem('user-name'));
        userNameElement.textContent = localStorage.getItem('user-name');
    }
});


function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

async function salvarNoticia(newsDTO) {
    try {
        const response = await fetch('/api/news/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsDTO)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar a notícia');
        }

        const result = await response;
        console.log("result ::", result)
    } catch (error) {
        console.error('Erro:', error);
    }
}

document.addEventListener('click', function(event) {
    const userBox = document.querySelector('.user-box');
    const menu = document.getElementById('dropdown-menu');
    if (!userBox.contains(event.target)) {
        menu.style.display = 'none';
    }
});

document.getElementById('textbox').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevenir nova linha ao pressionar Enter
        let textBox = document.getElementById('textbox');
        let content = textBox.innerText.trim();

        if (content.length > 100) {
            // Limpar a caixa de texto e iniciar a mensagem de "Aguarde"
            textBox.innerHTML = '';
            typeWriter(textBox, "Aguarde, estamos analisando essa notícia...", function() {
                // Simular análise da notícia após a mensagem ser escrita
                setTimeout(() => {
                    let resultado = content.length % 2 === 0 ? 'Verdadeira' : 'Falsa';
                    let isFake = content.length % 2 === 0 ? 1 : 0;
                    textBox.innerHTML = '';
                    let createdUser = localStorage.getItem('user-name');
                    salvarNoticia({
                     isFake,
                     content,
                     createdUser
                    });
                    typeWriter(textBox, `Notícia analisada. Resultado: ${resultado}`);
                }, 1000); // Simula um delay de 1 segundo após a mensagem de aguarde
            });
        } else {
            textBox.innerHTML = `<p>Por favor, insira uma notícia com mais de 100 caracteres.</p>`;
        }
    }
});


// Função para simular efeito de digitação
function typeWriter(element, text, callback) {
    let i = 0;
    let speed = 50; // Velocidade de digitação (milissegundos por caractere)

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// Voltar ao estágio inicial ao clicar fora da caixa de texto
document.getElementById('textbox').addEventListener('blur', function() {
    let textBox = document.getElementById('textbox');
    textBox.innerHTML = ''; // Limpar a caixa de texto
});

function logout() {
    localStorage.clear();
    window.location.href = '/login';
}

function historico() {
    window.location.href = '/historicoVerificadas';
}