document.addEventListener('DOMContentLoaded', () => {
    let currentFilters = {
        category: 'all',
        availability: 'all'
    };
    let currentSort = 'default';

    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    // ATENCIÓN: Asegúrate de que .row sea el contenedor directo de tus product-card
    const gridPadre = document.querySelector('.row'); 
    
    // Capturamos todos los productos
    let products = Array.from(document.querySelectorAll('.product-card'));

    // EL TRUCO PARA EL DEFAULT: Le ponemos un número de índice a cada tarjeta apenas carga la página
    products.forEach((product, index) => {
        product.setAttribute('data-index', index);
    });

    function applyFiltersAndSort() {
        let visibleCount = 0; // Creamos un contador desde cero

        // PASO A: FILTRAR
        products.forEach(product => {
            const cat = product.getAttribute('data-category') || 'all';
            const avail = product.getAttribute('data-availability') || 'all';

            const matchesCategory = (currentFilters.category === 'all' || currentFilters.category === cat);
            const matchesAvailability = (currentFilters.availability === 'all' || currentFilters.availability === avail);

            if (matchesCategory && matchesAvailability) {
                product.style.display = ''; 
                visibleCount++; // Si el producto coincide, sumamos 1 al contador
            } else {
                product.style.display = 'none'; 
            }
        });

        // LÓGICA NUEVA: MOSTRAR U OCULTAR EL MENSAJE
        const noResultsMsg = document.getElementById('no-results-msg');
        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.style.display = 'block'; // Mostrar mensaje si hay 0 productos
            } else {
                noResultsMsg.style.display = 'none'; // Ocultar si hay al menos 1
            }
        }

        // PASO B: ORDENAR
        products.sort((a, b) => {
            if (currentSort === 'low-high') {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                return priceA - priceB;
            } else if (currentSort === 'high-low') {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                return priceB - priceA;
            } else {
                const indexA = parseInt(a.getAttribute('data-index'));
                const indexB = parseInt(b.getAttribute('data-index'));
                return indexA - indexB;
            }
        });

        // PASO C: VOLVER A PINTARLOS EN PANTALLA
        products.forEach(product => {
            gridPadre.appendChild(product); 
        });
    }

    // Escuchando clics en Categorías y Disponibilidad
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-type'); 
            const value = btn.getAttribute('data-value'); 
            
            currentFilters[type] = value;
            
            // Opcional: Para cambiar el texto del botón y saber qué elegiste
            // (Si tus botones principales tienen un ID específico, lo puedes conectar aquí)
            
            applyFiltersAndSort();
        });
    });

    // Escuchando clics en el Precio (Ordenar)
    sortBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentSort = btn.getAttribute('data-sort'); 
            applyFiltersAndSort();
        });
    });
});