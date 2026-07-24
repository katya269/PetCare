document.addEventListener('DOMContentLoaded', () => {


    const darkToggle = document.getElementById('darkModeToggle');
    const themeIcon = document.querySelector('#theme-toggle-btn i');

    const applyDarkMode = (on) => {
        document.body.classList.toggle('dark-mode', on);
        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon', !on);
            themeIcon.classList.toggle('fa-sun', on);
        }
    };

    if (darkToggle) {
        darkToggle.addEventListener('change', () => {
            applyDarkMode(darkToggle.checked);
            showToast(darkToggle.checked ? 'Modo oscuro activado' : 'Modo claro activado', 'fa-solid fa-circle-check');
        });
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            darkToggle.checked = !darkToggle.checked;
            applyDarkMode(darkToggle.checked);
        });
    }

    const openLangBtn = document.getElementById('openLanguageModal');
    const langModal = document.getElementById('languageModal');
    const closeLangBtn = document.getElementById('closeLanguageModal');
    const currentFlag = document.getElementById('current-flag');
    const langOptions = document.querySelectorAll('.lang-option');

    if (openLangBtn) {
        openLangBtn.addEventListener('click', (e) => {
            e.preventDefault();
            langModal.style.display = 'flex';
        });
    }
    if (closeLangBtn) {
        closeLangBtn.addEventListener('click', () => {
            langModal.style.display = 'none';
        });
    }
    if (langModal) {
        langModal.addEventListener('click', (e) => {
            if (e.target === langModal) langModal.style.display = 'none';
        });
    }

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            langOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const flagUrl = opt.getAttribute('data-flag');
            if (currentFlag && flagUrl) {
                currentFlag.innerHTML = `<img src="${flagUrl}" alt="flag" class="nav-flag-img">`;
            }
            langModal.style.display = 'none';
            showToast('Idioma actualizado', 'fa-solid fa-language');
        });
    });

    function showToast(message, icon = 'fa-solid fa-circle-check') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

});

