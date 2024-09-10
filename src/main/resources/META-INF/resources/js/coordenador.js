document.addEventListener("DOMContentLoaded", function() {

    function carregarNoticias() {
        fetch('/api/news/listar')
            .then(response => response.json())  // Converte a resposta em JSON
            .then(noticias => {
                const newsTableBody = document.getElementById('news-table-body');
                newsTableBody.innerHTML = '';  // Limpa o corpo da tabela antes de preencher

                noticias.forEach((noticia, index) => {
                    // Cria uma linha da tabela para cada notícia
                    const row = document.createElement('tr');
                    row.classList.add('news-row');

                    // Formata as datas
                    const createdAtFormatted = formatDate(noticia.createdAt);
                    const updatedAtFormatted = formatDate(noticia.updatedAt);

                    // Insere as colunas
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td class="news-title">${noticia.content.substring(0, 50)}...</td>
                        <td>${noticia.createdUser}</td>
                        <td>
                            <select class="status-select" data-news-id="${noticia.id}">
                                <option value="1" ${noticia.isFake === false ? 'selected' : ''}>Verdadeiro</option>
                                <option value="0" ${noticia.isFake === true ? 'selected' : ''}>Falso</option>
                            </select>
                        </td>
                        <td>${updatedAtFormatted}</td>
                        <td>${createdAtFormatted}</td>
                        <td class="action-buttons">
                            <button class="action-btn view" title="Visualizar" data-news-id="${noticia.id}"><img src="../img/search.png" alt="Search Icon" class="search-icon"></button>
                            <button class="action-btn delete" title="Excluir" data-news="${noticia.id}"><img src="../img/delete.png" alt="Delete Icon" class="delete-icon"></button>
                        </td>
                    `;

                    // Adiciona a linha na tabela
                    newsTableBody.appendChild(row);
                });

                // Adiciona o evento de clique ao botão "Visualizar"
                document.querySelectorAll('.action-btn.view').forEach(button => {
                    button.addEventListener('click', function () {
                        const newsId = this.getAttribute('data-news-id');
                        abrirModal(newsId);
                    });
                });

                // Adiciona eventos para os botões de exclusão
                document.querySelectorAll('.delete').forEach(button => {
                    button.addEventListener('click', function() {
                        const newsId = this.getAttribute('data-news');
                        excluirNoticia(newsId);
                    });
                });

            })
            .catch(error => {
                console.error('Erro ao carregar notícias:', error);
            });
    }

    // Função para abrir o modal e carregar o conteúdo da notícia
    function abrirModal(newsId) {
        // Aqui você faria uma requisição para obter o texto completo da notícia com base no ID
        fetch(`/api/news/${newsId}`)
            .then(response => response.json())
            .then(noticia => {
                const modal = document.getElementById("newsModal");
                const modalText = document.getElementById("modalText");

                // Atualiza o conteúdo do modal com o texto da notícia
                modalText.textContent = noticia.content;

                // Exibe o modal
                modal.style.display = "flex";
            })
            .catch(error => console.error('Erro ao carregar notícia:', error));
    }

    // Evento para fechar o modal quando o botão "X" é clicado
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.getElementById("newsModal").style.display = "none";
    });

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        const newsModal = document.getElementById("newsModal");
        if (event.target === newsModal) {
            newsModal.style.display = "none";
        }
    });

    // Função para atualizar o status da notícia
    document.addEventListener('change', function(event) {
        if (event.target.classList.contains('status-select')) {
            const newsId = event.target.getAttribute('data-news-id'); // Obtém o ID da notícia
            const isFake = event.target.value; // Verifica se o status selecionado é 'FAKE'
            console.log(":: isFake :: ", isFake);
            // Faz a requisição para atualizar o status da notícia
            fetch(`/api/news/atualizar-status/${newsId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isFake: isFake }) // Envia o novo status como JSON
            })
                .then(response => {
                    if (response.ok) {
                        alert('Status atualizado com sucesso!');
                    } else {
                        alert('Erro ao atualizar status.');
                    }
                })
                .catch(error => console.error('Erro:', error));
        }
    });


    function exibirSaudacao() {
        const greetingElement = document.querySelector(".saudacao");
        const currentHour = new Date().getHours();

        let saudacao = "";

        if (currentHour >= 6 && currentHour < 12) {
            saudacao = "Bom dia!";
        } else if (currentHour >= 12 && currentHour < 18) {
            saudacao = "Boa tarde!";
        } else {
            saudacao = "Boa noite!";
        }

        greetingElement.textContent = saudacao;
    }

    // Chama a função para exibir a saudação assim que a página for carregada
    exibirSaudacao();

    // Função para formatar as datas no formato DD/MM/YYYY HH:mm
    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) return 'Data inválida';

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Mês é 0-indexado
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    // Função para excluir uma notícia
    function excluirNoticia(newsId) {
        if (confirm("Tem certeza que deseja excluir esta notícia?")) {
            fetch(`/api/news/excluir/${newsId}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    alert('Notícia excluída com sucesso.');
                    carregarNoticias();  // Recarrega as notícias após exclusão
                } else {
                    alert('Erro ao excluir notícia.');
                }
            });
        }
    }

    // Chama a função para carregar as notícias ao iniciar a página
    carregarNoticias();
});

// Evento para exibir detalhes da notícia, separado do clique no seletor de status
document.querySelectorAll('.news-row').forEach(row => {
    row.addEventListener('click', function (event) {
        // Verificar se o clique foi no seletor de status para não abrir o histórico
        if (event.target.classList.contains('status-select')) return;

        const detailsRow = this.nextElementSibling;
        if (detailsRow.style.display === 'none' || detailsRow.style.display === '') {
            detailsRow.style.display = 'table-row';
        } else {
            detailsRow.style.display = 'none';
        }
    });
});

// Evento para selecionar o status da notícia e aplicar cores
document.querySelectorAll('.status-select').forEach(selectElement => {
    selectElement.addEventListener('change', function () {
        const status = this.value;
        if (status === "FATO") {
            this.classList.remove('status-fake', 'status-imprecisa');
            this.classList.add('status-fato');
        } else if (status === "FAKE") {
            this.classList.remove('status-fato', 'status-imprecisa');
            this.classList.add('status-fake');
        } else if (status === "IMPRECISA") {
            this.classList.remove('status-fato', 'status-fake');
            this.classList.add('status-imprecisa');
        }
        console.log(`Status alterado para: ${status}`);
        // Aqui você pode adicionar a lógica para salvar a alteração de status
    });

    // Aplicar a cor correta quando a página carrega, de acordo com o valor selecionado
    const statusInicial = selectElement.value;
    if (statusInicial === "FATO") {
        selectElement.classList.add('status-fato');
    } else if (statusInicial === "FAKE") {
        selectElement.classList.add('status-fake');
    } else if (statusInicial === "IMPRECISA") {
        selectElement.classList.add('status-imprecisa');
    }
});

// Evento para abrir o modal ao clicar no olho
document.querySelectorAll('.action-btn.view').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Previne que o evento clique se propague para a linha
        const newsId = this.getAttribute('data-news');
        const modal = document.getElementById("newsModal");
        const modalText = document.getElementById("modalText");

        // Aqui você pode adicionar diferentes textos com base no ID da notícia
        if (newsId === "1") {
            modalText.textContent = "Este é o texto completo da notícia sobre a circulação de um comunicado. Aqui está um exemplo de como o texto completo da notícia pode aparecer.";
        }
        // Adicione mais condicionais para outras notícias se necessário

        modal.style.display = "flex";
    });
});

// Evento para abrir o modal de exclusão ao clicar no botão de excluir
document.querySelectorAll('.action-btn.delete').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Previne que o evento clique se propague para a linha
        const modal = document.getElementById("deleteModal");
        modal.style.display = "flex";
    });
});

// Evento para fechar os modais
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function () {
        document.getElementById("newsModal").style.display = "none";
        document.getElementById("deleteModal").style.display = "none";
    });
});

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', function (event) {
    const newsModal = document.getElementById("newsModal");
    const deleteModal = document.getElementById("deleteModal");
    if (event.target === newsModal) {
        newsModal.style.display = "none";
    }
    if (event.target === deleteModal) {
        deleteModal.style.display = "none";
    }
});

document.querySelector('.logout-btn').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = '/login' ;
});
