document.addEventListener('DOMContentLoaded', () => {
    // 1. Variables para "recordar" el estado actual de los filtros
    let currentFilters = {
        category: 'all',
        availability: 'all'
    };
    let currentSort = 'default';

    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    // Contenedor principal de tus productos (necesario para poder reordenarlos)
    // Asegúrate de que tu contenedor <div class="row"> tenga un ID, por ejemplo id="products-grid"
    const gridPadre = document.querySelector('.row'); // Ajusta esto si tu grid tiene otra clase o ID

    // 2. Función maestra que filtra y luego ordena
    function applyFiltersAndSort() {
        // Obtenemos todos los productos y los convertimos en un "Array" real para poder ordenarlos
        let products = Array.from(document.querySelectorAll('.product-card'));

        // PASO A: FILTRAR
        products.forEach(product => {
            const cat = product.getAttribute('data-category');
            const avail = product.getAttribute('data-availability');

            // Verificamos si el producto cumple con ambos filtros
            const matchesCategory = (currentFilters.category === 'all' || currentFilters.category === cat);
            const matchesAvailability = (currentFilters.availability === 'all' || currentFilters.availability === avail);

            if (matchesCategory && matchesAvailability) {
                product.style.display = ''; // Lo mostramos
            } else {
                product.style.display = 'none'; // Lo ocultamos
            }
        });

        // PASO B: ORDENAR
        if (currentSort !== 'default') {
            products.sort((a, b) => {
                // Sacamos el precio de los data-attributes y lo convertimos a número decimal (parseFloat)
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));

                if (currentSort === 'low-high') {
                    return priceA - priceB; // Menor a mayor
                } else if (currentSort === 'high-low') {
                    return priceB - priceA; // Mayor a menor
                }
            });
        }

        // Volvemos a inyectar las tarjetas en el HTML en su nuevo orden
        products.forEach(product => {
            gridPadre.appendChild(product); 
        });
    }

    // 3. Escuchar los clics en los botones de Filtrado (Category / Availability)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-type'); // 'category' o 'availability'
            const value = btn.getAttribute('data-value'); // 'toys', 'in-stock', etc.
            
            // Actualizamos la memoria
            currentFilters[type] = value;
            
            // Opcional: Cambiar el texto del botón padre para mostrar qué seleccionaste
            // ... tu código visual aquí ...

            applyFiltersAndSort();
        });
    });

    // 4. Escuchar los clics en los botones de Ordenamiento (Price)
    sortBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentSort = btn.getAttribute('data-sort'); // 'low-high' o 'high-low'
            
            applyFiltersAndSort();
        });
    });
});