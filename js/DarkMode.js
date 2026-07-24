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
    }}
)