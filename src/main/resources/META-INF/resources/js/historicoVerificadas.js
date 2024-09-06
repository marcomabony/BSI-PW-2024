// HistoricoVeri.js

// Evento para abrir o modal ao clicar no botão de visualizar
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function () {
        const newsId = this.getAttribute('data-news');
        const modal = document.getElementById("newsModal");
        const modalText = document.getElementById("modalText");

        // Acessa o texto completo da notícia diretamente do HTML
        const fullTextElement = document.getElementById(`text-news-${newsId}`);
        if (fullTextElement) {
            modalText.textContent = fullTextElement.textContent;
        } else {
            modalText.textContent = "Texto completo da notícia não encontrado.";
        }

        // Exibe o modal com animação
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add('open');
        }, 10);  // Pequeno delay para aplicar a classe de animação
    });
});

// Evento para fechar o modal
document.querySelectorAll(".close-btn").forEach(button => {
    button.addEventListener('click', function () {
        const modal = document.getElementById("newsModal");
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);  // Delay para fechar após a animação
    });
});

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', function (event) {
    const modal = document.getElementById("newsModal");
    if (event.target === modal) {
        modal.classList.remove('open');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);  // Delay para fechar após a animação
    }
});
 // HistoricoVeri.js

// Evento para abrir e fechar o dropdown
document.getElementById('dropdownBtn').addEventListener('click', function (event) {
    event.stopPropagation(); // Previne que o evento de clique feche imediatamente o dropdown
    const userProfile = document.querySelector('.user-profile');
    userProfile.classList.toggle('active');
});

// Fecha o dropdown se o usuário clicar fora dele
window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.user-profile')) {
        const userProfile = document.querySelector('.user-profile');
        userProfile.classList.remove('active');
    }
});
