const faqHeaders = document.querySelectorAll('.faq h3');

faqHeaders.forEach(header => {
    header.addEventListener('mouseenter', () => {
        const content = header.nextElementSibling;
        if (!content.classList.contains('open')) {
            content.style.display = "block";
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });

    header.addEventListener('mouseleave', () => {
        const content = header.nextElementSibling;
        if (!content.classList.contains('open')) {
            content.style.maxHeight = 0;
            setTimeout(() => {
                content.style.display = "none";
            }, 300);
        }
    });

    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        if (content.classList.contains('open')) {
            content.classList.remove('open');
            content.style.maxHeight = 0;
            setTimeout(() => {
                content.style.display = "none";
            }, 300);
        } else {
            content.classList.add('open');
            content.style.display = "block";
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
document.getElementById("enviar").addEventListener("click", function (event) {
    // Prevenir o comportamento padrão do botão submit
    event.preventDefault();

    // Capturar os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Verificar se os campos estão preenchidos
    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Número de telefone do WhatsApp
    const telefone = "5543984471575";

    // Criar a URL do WhatsApp
    const texto = `Olá, meu nome é ${nome}, meu email é ${email}. Gostaria de enviar a seguinte mensagem: ${mensagem}`;
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

    // Abrir o WhatsApp
    window.open(url, "_blank");
});
