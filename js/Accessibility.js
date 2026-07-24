// HABILITAR NAVEGACIÓN CON FLECHAS EN LOS PRODUCTOS
document.addEventListener('keydown', (e) => {
    // Verificamos si presionaron alguna de las 4 flechas
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        
        // 1. Obtenemos TODOS los botones "Add" que estén VISIBLES en pantalla
        const buttons = Array.from(document.querySelectorAll('.add-to-cart-btn')).filter(btn => {
            // Este truco revisa si la tarjeta padre no está oculta por los filtros
            return btn.closest('.product-card').style.display !== 'none';
        });

        if (buttons.length === 0) return; // Si no hay productos, no hace nada

        // 2. Averiguamos dónde está el "foco" actualmente
        const currentIndex = buttons.indexOf(document.activeElement);
        let nextIndex = 0; // Por defecto, si no hay nada seleccionado, irá al primero

        // 3. Calculamos a qué botón debe saltar
        if (currentIndex !== -1) {
            e.preventDefault(); // Evita que la pantalla baje o suba de golpe

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                // Avanza al siguiente (si llega al final, vuelve al inicio)
                nextIndex = (currentIndex + 1) % buttons.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                // Retrocede al anterior (si está en el inicio, va al final)
                nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            }
        }

        // 4. ¡Movemos la selección visual al nuevo producto!
        buttons[nextIndex].focus();
    }
});

// ==========================================
// NAVEGACIÓN CON FLECHAS EN EL HEADER (V2)
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        
        // 1. Ampliamos la búsqueda. Busca la etiqueta header, nav, o las clases comunes
        const header = document.querySelector('header') || document.querySelector('nav') || document.querySelector('.navbar'); 
        
        if (!header) return; // Si de plano no encuentra el menú, no hace nada
        
        // 2. Buscamos los elementos interactivos
        const focusables = Array.from(header.querySelectorAll('a, button, input'))
            .filter(el => el.offsetWidth > 0 && el.offsetHeight > 0); 
            
        if (focusables.length === 0) return;

        // 3. Verificamos dónde está el usuario
        const isInsideHeader = header.contains(document.activeElement);

        if (isInsideHeader) {
            // Si YA ESTÁ en el menú, navega normalmente
            e.preventDefault();
            const currentIndex = focusables.indexOf(document.activeElement);
            let nextIndex = e.key === 'ArrowRight' 
                ? (currentIndex + 1) % focusables.length 
                : (currentIndex - 1 + focusables.length) % focusables.length;
            
            focusables[nextIndex].focus();
            
        } else if (document.activeElement === document.body) {
            // Si NO HAY NADA seleccionado, lo metemos a la fuerza al primer elemento del menú
            e.preventDefault();
            focusables[0].focus();
        }
    }
});