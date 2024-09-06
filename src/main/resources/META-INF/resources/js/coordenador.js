// script.js

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
