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
