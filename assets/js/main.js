/**
 * Script principal para o site CWS.
 * Contém a lógica para:
 * 1. Navegação híbrida (SPA na home, multi-página em outras).
 * 2. Acordeão de FAQ.
 * 3. Formulário de contato com redirecionamento para o WhatsApp.
 */
document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('main > section');

    // --- 1. LÓGICA DE NAVEGAÇÃO E LINK ATIVO ---

    // Função unificada para atualizar qual link do menu está ativo.
    // Funciona tanto para âncoras (#hero) quanto para páginas (blog.html).
    function updateActiveLink(activeHref) {
        navLinks.forEach(link => {
            // Compara o href do link com o href ativo.
            // Para a home, também removemos o '#' para comparar com o targetId.
            if (link.getAttribute('href') === activeHref || link.getAttribute('href') === '#' + activeHref) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }

    // Função para mostrar uma seção específica na página principal.
    function showSection(sectionId) {
        const targetId = sectionId.substring(1); // Remove o '#' (ex: '#hero' -> 'hero')
        
        sections.forEach(section => {
            // Compara o ID da seção com o ID alvo.
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        updateActiveLink(sectionId); // Atualiza o link ativo no menu.
    }

    // Adiciona o listener de clique a cada link do menu.
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetHref = this.getAttribute('href');

            // Se o link for uma âncora interna, use a lógica de SPA.
            if (targetHref && targetHref.startsWith('#')) {
                event.preventDefault(); // Impede o comportamento padrão do link.
                showSection(targetHref);
            }
            // Se for um link para outra página (ex: "blog.html"), o navegador seguirá normalmente.
        });
    });

    // --- LÓGICA DE INICIALIZAÇÃO DA PÁGINA ---

    const currentPagePath = window.location.pathname;
    const isHomePage = currentPagePath.endsWith('/') || currentPagePath.endsWith('index.html');

    if (isHomePage) {
        // Na página inicial, mostra a primeira seção por padrão.
        showSection('#hero');
    } else {
        // Em outras páginas, encontra o link correspondente à página atual e o ativa.
        const currentPageFile = currentPagePath.split('/').pop(); // ex: "blog.html"
        updateActiveLink(currentPageFile);
    }


    // --- 2. LÓGICA DO ACORDEÃO (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        // É melhor adicionar o evento ao cabeçalho, que é o alvo do clique.
        const header = item.querySelector('h3');
        if (!header) return; // Pula se o item não tiver um h3.

        header.addEventListener('click', () => {
            // Fecha todos os outros itens abertos para funcionar como um acordeão clássico.
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherContent = otherItem.querySelector('p');
                    if (otherContent) otherContent.style.maxHeight = null;
                }
            });

            // Abre ou fecha o item clicado.
            const content = item.querySelector('p');
            if (item.classList.toggle('open')) {
                // Se abriu, define o maxHeight para o tamanho do conteúdo.
                if (content) content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Se fechou, reseta o maxHeight.
                if (content) content.style.maxHeight = null;
            }
        });
    });


    // --- 3. LÓGICA DO FORMULÁRIO DE CONTATO (WHATSAPP) ---
    const contactForm = document.getElementById("contact-form"); // Use o ID do form.
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário.

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !mensagem) {
                alert("Por favor, preencha todos os campos do formulário!");
                return;
            }

            const telefone = "5543984471575"; // Seu número de telefone.
            const texto = `Olá! Meu nome é ${nome} (Email: ${email}).\n\nMensagem: ${mensagem}`;
            const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;
            
            window.open(url, "_blank"); // Abre o WhatsApp em uma nova aba.
        });
    }
});
