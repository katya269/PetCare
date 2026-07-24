document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarBurbujaGlobal();
});

function actualizarBurbujaGlobal() {
    const cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const bubbles = document.querySelectorAll('.cart-count');
    
    bubbles.forEach(bubble => {
        bubble.textContent = totalItems;
        bubble.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    });
}

function renderizarCarrito() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-price');
    if (!container) return; 
    
    let cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
    container.innerHTML = ''; 
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="margin-top: 20px;">Tu carrito está vacío.</p>';
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        container.innerHTML += `
            <div class="productsCar">
                <img src="${item.image}" alt="${item.title}">
                <div class="infoProducto">
                    <h5>${item.title}</h5>
                    <p class="precio">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cantidad">
                    <div class="btnCant">Cantidad</div>
                    <div class="btnCar">
                        <span class="decrement-btn" style="cursor: pointer;" onclick="cambiarCantidad('${item.id}', -1)">-</span>
                        <div>${item.quantity}</div>
                        <span class="increment-btn" style="cursor: pointer;" onclick="cambiarCantidad('${item.id}', 1)">+</span>
                    </div>
                </div>
            </div>`;
    });

    if (totalElement) totalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function cambiarCantidad(id, cambio) {
    let cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity += cambio;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    localStorage.setItem('petcare_cart', JSON.stringify(cart));
    renderizarCarrito();
    actualizarBurbujaGlobal();
}