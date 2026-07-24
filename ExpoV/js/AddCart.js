document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            if (!card) return;
            
            const product = {
                id: card.querySelector('.card-title')?.textContent.trim() || 'unknown', 
                title: card.querySelector('.card-title')?.textContent.trim() || 'Product',
                price: parseFloat(card.getAttribute('data-price')) || 0,
                image: card.querySelector('.card-img-top')?.src || '',
                quantity: 1
            };
            
            agregarAlCarrito(product);
        });
    });
});

function agregarAlCarrito(productoNuevo) {
    let cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
    const productoExistente = cart.find(item => item.id === productoNuevo.id);
    
    if (productoExistente) {
        productoExistente.quantity += 1;
    } else {
        cart.push(productoNuevo);
    }
    
    localStorage.setItem('petcare_cart', JSON.stringify(cart));
    
    // --- NOTIFICACIÓN ORIGINAL ---
    const toast = document.getElementById('toast-notificacion');
    if (toast) {
        toast.classList.add('mostrar');
        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 3000);
    }
    
    // Llama a la función del archivo anterior (cart.js) para refrescar las burbujas
    if (typeof actualizarBurbujaGlobal === 'function') {
        actualizarBurbujaGlobal();
    }
}