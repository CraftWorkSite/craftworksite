document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA DE NAVEGAÇÃO POR ABAS E MENU ATIVO ---
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('main > section');

    function showSection(sectionId) {
        // Esconde todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostra a seção alvo
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Atualiza o link ativo no menu
        navLinks.forEach(link => {
            // Remove a classe de todos os links
            link.classList.remove('active-link');
            // Adiciona a classe apenas ao link que corresponde à seção ativa
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active-link');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                showSection(targetId);
            }
        });
    });

    // Mostra a primeira seção ('#hero') e ativa o primeiro link por padrão
    showSection('#hero');


    // --- 2. LÓGICA DO ACORDEÃO (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('h3');
        const content = item.querySelector('p');

        item.addEventListener('click', () => { // Evento de clique no item inteiro
            const isOpen = item.classList.toggle('open');
            
            if (isOpen) {
                content.style.display = "block";
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + "px";
                }, 10);
            } else {
                content.style.maxHeight = '0';
                content.addEventListener('transitionend', () => {
                    if (!item.classList.contains('open')) {
                        content.style.display = 'none';
                    }
                }, { once: true });
            }
        });
    });


    // --- 3. LÓGICA DO FORMULÁRIO DE CONTATO (WHATSAPP) ---
    const sendButton = document.getElementById("enviar");
    if (sendButton) {
        sendButton.addEventListener("click", function (event) {
            event.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !mensagem) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const telefone = "5543984471575";
            const texto = `Olá, meu nome é ${nome}, meu email é ${email}. Gostaria de enviar a seguinte mensagem: ${mensagem}`;
            const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
            window.open(url, "_blank");
        });
    }

});