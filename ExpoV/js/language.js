document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('languageModal');
    const openModalBtn = document.getElementById('openLanguageModal');
    const closeModalBtn = document.getElementById('closeLanguageModal');

    // 1. Abrir el modal de idiomas
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            modal.style.display = 'flex';
        });
    }

    // 2. Cerrar el modal con la X
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // 3. Cerrar al hacer clic fuera del recuadro
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Cambiar idioma al hacer clic en las opciones del modal
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            document.querySelector('.lang-option.active')?.classList.remove('active');
            option.classList.add('active');

            const selectedLang = option.getAttribute('data-lang');
            
            // Validación por si changeLanguage.js aún no se termina de procesar
            if (typeof setLanguage === 'function') {
                setLanguage(selectedLang);
            } else {
                localStorage.setItem('petcare_lang', selectedLang);
            }

            // Cambiar la banderita visual del navbar
            const newFlagSrc = option.getAttribute('data-flag-src');
            const currentFlagImg = document.querySelector('#current-flag img');
            if (currentFlagImg && newFlagSrc) {
                currentFlagImg.src = newFlagSrc; 
            }

            setTimeout(() => {
                if (modal) modal.style.display = 'none';
            }, 250);
        });
    });

    // 5. Interruptor de Modo Oscuro (Dark Mode)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if(localStorage.getItem('theme') === 'dark') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});