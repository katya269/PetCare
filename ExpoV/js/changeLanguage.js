const translations = {
    en: {
        nav_home: "Home",
        nav_products: "Products",
        nav_contact: "Contact",
        aboutus: "About Us",
        nav_settings: "Settings",
        nav_language: "Language",
        nav_accessibility: "Accessibility"
    },
    es: {
        nav_home: "Inicio",
        nav_products: "Productos",
        nav_contact: "Contacto",
        aboutus: "Quiénes Somos",
        nav_settings: "Configuración",
        nav_language: "Idioma",
        nav_accessibility: "Accesibilidad"
    }
};

function setLanguage(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    localStorage.setItem('petcare_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('petcare_lang') || 'en';
    setLanguage(savedLang);
});