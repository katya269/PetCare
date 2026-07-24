/* ==========================================
   SISTEMA DE TRADUCCIÓN (MULTILENGUAJE)
   ========================================== */

// 1. El Diccionario
const translations = {
    en: {
        nav_home: "Home",
        nav_products: "Products",
        nav_contact: "Contact",
        nav_aboutus: "About Us",
        nav_settings: "Settings",
        nav_language: "Language",
        nav_darkmode: "Dark Mode",
        nav_accessibility: "Accessibility",
        products_title: "Products",
        products_text: "At PetCare, we know your pets are family. That's why we've handpicked the best nutrition, the most entertaining toys, and the safest accessories to support them through every stage of life. Explore our collection and give your furry friend the premium quality they deserve.",
        products_filter: "Filter By",
        filter_category: "Category",
        filter_all: "All",
        filter_food: "Food",
        filter_accessories: "Accesories",
        filter_walk: "Walk",
        filter_bed: "Bed",
        filter_toys: "Toys",
        filter_luggage: "Luggage",
        filter_hygiene: "Hygiene",
        filter_Availability: "Availability",
        filter_inStock: "In Stock",
        filter_outStock: "Out Stock",
        filter_Price: "Price",
        filter_default: "Default",
        filter_LowHigh: "Low to High",
        filter_HighLow: "High to Low",
        GreatNews: "Great News!",
        NewsProducts: "All of our products are currently in stock and ready for your pet."
    },
    es: {
        nav_home: "Inicio",
        nav_products: "Productos",
        nav_contact: "Contacto",
        nav_aboutus: "Nosotros",
        nav_settings: "Ajustes",
        nav_language: "Idioma",
        nav_darkmode: "Modo Oscuro",
        nav_accessibility: "Accesibilidad",
        products_title: "Productos",
        products_text: "En PetCare, sabemos que tus mascotas son familia. Por eso, hemos seleccionado cuidadosamente la mejor nutrición, los juguetes más entretenidos y los accesorios más seguros para acompañarlos en cada etapa de su vida. Explora nuestra colección y dale a tu peludo la calidad premium que se merece",
        products_filter: "Filtrar por",
        filter_category: "Categoria",
        filter_all: "Todo",
        filter_food: "Comida",
        filter_accessories: "Accesorios",
        filter_walk: "Paseo",
        filter_bed: "Camas",
        filter_toys: "Juguetes",
        filter_luggage: "Equipaje",
        filter_hygiene: "Higiene",
        filter_Availability: "Disponibilidad",
        filter_inStock: "En Stock",
        filter_outStock: "Sin stock",
        filter_Price: "Precio",
        filter_default: "Defecto",
        filter_LowHigh: "De Bajo a Alto",
        filter_HighLow: "De Alto a Bajo",
        GreatNews: "Buenas Noticias",
        NewsProducts: "Todos nuestros productos están disponibles y listos para tu mascota."
    },
    fr: {
        nav_home: "Accueil",
        nav_products: "Produits",
        nav_contact: "Contact",
        nav_aboutus: "À propos",
    }
};

// 2. La función que cambia los textos
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