// Seleciona todos os títulos de perguntas
const faqHeaders = document.querySelectorAll('.faq h2');

// Adiciona um evento de clique a cada título
faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // Alterna a exibição do parágrafo com animação
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
            content.style.maxHeight = content.scrollHeight + "px"; // Para animação suave
        } else {
            content.style.maxHeight = 0;
            setTimeout(() => {
                content.style.display = "none";
            }, 1); // Tempo da animação antes de ocultar completamente
        }
    });
});
