function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
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
        let inputText = textBox.innerText.trim();

        if (inputText.length > 100) {
            // Limpar a caixa de texto e iniciar a mensagem de "Aguarde"
            textBox.innerHTML = '';
            typeWriter(textBox, "Aguarde, estamos analisando essa notícia...", function() {
                // Simular análise da notícia após a mensagem ser escrita
                setTimeout(() => {
                    let resultado = inputText.length % 2 === 0 ? 'Verdadeira' : 'Falsa';
                    textBox.innerHTML = '';
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
