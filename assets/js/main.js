document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA DE NAVEGAÇÃO HÍBRIDA (SPA + MÚLTIPLAS PÁGINAS) ---
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('main > section');

    // Função para mostrar seções na página principal (index.html)
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active-link');
            }
        });
    }

    // Adiciona o listener de clique a cada link do menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetHref = this.getAttribute('href');

            // VERIFICAÇÃO PRINCIPAL:
            // Se o link for uma âncora interna (começa com #), use a lógica de SPA.
            if (targetHref && targetHref.startsWith('#')) {
                event.preventDefault(); // Impede o "pulo" da página
                showSection(targetHref);
            }
            // Se for um link para outra página (ex: "blog.html"), NÃO FAÇA NADA.
            // Apenas deixe o navegador seguir o link normalmente.
        });
    });

    // Lógica para a página inicial (index.html)
    const isHomePage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
    if (isHomePage) {
        // Mostra a primeira seção ('#hero') por padrão
        showSection('#hero');
    }


    // --- 2. LÓGICA DO ACORDEÃO (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('h3');
        const content = item.querySelector('p');

        item.addEventListener('click', () => {
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


    // --- 4. LÓGICA PARA ATIVAR LINK DO MENU EM PÁGINAS DIFERENTES (EX: BLOG) ---
    const currentPage = window.location.pathname.split('/').pop(); // Pega o nome do arquivo atual (ex: "blog.html")
    
    if (currentPage && !isHomePage) {
         navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }
});
