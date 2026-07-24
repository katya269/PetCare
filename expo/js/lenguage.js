document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('languageModal');
    const openModalBtn = document.getElementById('openLanguageModal');
    const closeModalBtn = document.getElementById('closeLanguageModal');
    const currentFlag = document.getElementById('current-flag');

    // 1. Abrir el modal al hacer clic en "Language"
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que la página salte por el href="#"
        modal.style.display = 'flex';
    });

    // 2. Cerrar el modal con la "X"
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 3. Cerrar el modal si hacen clic fuera del recuadro negro
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 4. Cambiar de idioma y actualizar la bandera de imagen en el Navbar
   // Este es el código de tu modal de idiomas actualizado
const langOptions = document.querySelectorAll('.lang-option');

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        // 1. Quitar clase activa al idioma anterior y ponerla al nuevo
        document.querySelector('.lang-option.active')?.classList.remove('active');
        option.classList.add('active');

        // 2. Capturar el código del idioma (en, es, fr) de tu botón HTML
        const selectedLang = option.getAttribute('data-lang');
        
        // 3. ¡LA MAGIA! Llamar a la función que traduce todo
        setLanguage(selectedLang);

        // 4. Cambiar la banderita en el menú superior
        const newFlagSrc = option.getAttribute('data-flag-src');
        const currentFlagImg = document.querySelector('#current-flag img');
        if (currentFlagImg && newFlagSrc) {
            currentFlagImg.src = newFlagSrc; 
        }

        // 5. Cerrar el modal
        setTimeout(() => {
            document.getElementById('languageModal').style.display = 'none';
        }, 250);
    });
});
    // Lógica del switch de Dark Mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', function() {
        if(this.checked) {
            console.log("Dark Mode: ON");
        } else {
            console.log("Dark Mode: OFF");
        }
    });
});