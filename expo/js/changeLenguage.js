const translations = {
    en: {
        nav_home: "Home",
},
    es: {
        nav_home: "Inicio",
},
}

function setLanguage(lang) {
    // Buscar todos los elementos que tengan el atributo data-i18n
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n'); // Ejemplo: "nav_home"
        
        // Si la traducción existe en el diccionario, cambiamos el texto
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Guardar el idioma en la "mochila" del navegador para que no se pierda al cambiar de página
    localStorage.setItem('petcare_lang', lang);
}

// 3. Ejecutar el idioma correcto al cargar CUALQUIER página
document.addEventListener('DOMContentLoaded', () => {
    // Revisar si ya había un idioma guardado, si no, poner inglés por defecto
    const savedLang = localStorage.getItem('petcare_lang') || 'en';
    setLanguage(savedLang);
});