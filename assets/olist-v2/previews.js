(() => {
    const images = Array.from(document.querySelectorAll('[data-dashboard-preview]'));
    const buttons = Array.from(document.querySelectorAll('[data-preview-toggle]'));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationsVisible = false;

    function setAnimationsVisible(visible) {
        animationsVisible = visible;
        images.forEach(img => {
            const message = img.parentElement.querySelector('[data-preview-message]');
            if (visible) {
                img.src = img.dataset.src;
            } else {
                // Unload GIFs instead of leaving invisible animations running.
                img.removeAttribute('src');
            }
            img.hidden = !visible;
            message.hidden = visible;
        });
        buttons.forEach(button => {
            button.hidden = false;
            button.textContent = visible ? 'Ocultar animações' : 'Mostrar animações';
            button.setAttribute('aria-pressed', String(visible));
        });
    }

    images.forEach(img => {
        img.addEventListener('error', () => {
            if (!animationsVisible) return;
            img.hidden = true;
            const message = img.parentElement.querySelector('[data-preview-message]');
            message.textContent = 'Não foi possível carregar a prévia. Você pode abrir o relatório no Power BI.';
            message.hidden = false;
        });
    });
    buttons.forEach(button => {
        button.addEventListener('click', () => setAnimationsVisible(!animationsVisible));
    });
    motion.addEventListener('change', event => {
        if (event.matches) setAnimationsVisible(false);
    });
    setAnimationsVisible(!motion.matches);
})();
