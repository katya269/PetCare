/* ==========================================
   LÓGICA DEL CARRITO DE COMPRAS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ESCUCHAR LOS CLICS EN "ADD" (En la página de productos)
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            
            const product = {
                id: card.querySelector('.card-title').textContent, 
                title: card.querySelector('.card-title').textContent,
                price: parseFloat(card.getAttribute('data-price')),
                image: card.querySelector('.card-img-top').src,
                quantity: 1
            };
            
            agregarAlCarrito(product);
        });
    });

function agregarAlCarrito(product) {
    let cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('petcare_cart', JSON.stringify(cart));
    
    // CAMBIO AQUÍ: En vez de alert(), llamamos a nuestra notificación premium
    mostrarNotificacion(product.title);
    
    actualizarBurbujaGlobal();
}

// NUEVA FUNCIÓN: Generador de ventanas emergentes estilizadas
function mostrarNotificacion(productName) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Crear el elemento de la notificación
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    
    // Le metemos un icono de bolsa de compras de FontAwesome y el texto dinámico
    toast.innerHTML = `
        <i class="fa-solid fa-bag-shopping"></i>
        <div>
            <span style="color: #8B6BFF; font-weight: bold;">Added!</span> ${productName} is in your cart.
        </div>
    `;

    // Metemos la notificación en el contenedor de la esquina
    container.appendChild(toast);

    // Programar la desaparición automática después de 3 segundos
    setTimeout(() => {
        toast.classList.add('fade-out');
        // Esperamos a que termine la animación de desvanecido para borrarlo del HTML por completo
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

    function actualizarBurbuja() {
        const cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
        const bubble = document.querySelector('.cart-count'); 
        
        if (bubble) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            bubble.textContent = totalItems;
            bubble.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    // 2. DIBUJAR LOS PRODUCTOS EN EL CARRITO
    function renderizarCarrito() {
        const container = document.getElementById('cart-items-container');
        const totalElement = document.getElementById('cart-total-price');
        
        if (!container) return; // Si no estamos en carrito.html, no hace nada
        
        let cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
        container.innerHTML = ''; 
        let totalPrice = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p style="margin-top: 20px;">Your cart is empty.</p>';
            totalElement.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            
            // AQUÍ ESTÁ TU ESTRUCTURA HTML EXACTA INYECTADA CON VARIABLES
            container.innerHTML += `
                <div class="productsCar">
                    <img src="${item.image}" alt="${item.title}">
                    
                    <div class="infoProducto">
                        <h5>${item.title}</h5>
                        <p class="precio">$${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div class="cantidad">
                        <div class="btnCant">
                            Cantidad
                        </div>
                        <div class="btnCar">
                            <span class="decrement-btn" data-id="${item.id}" style="cursor: pointer;">-</span>
                            <div>${item.quantity}</div>
                            <span class="increment-btn" data-id="${item.id}" style="cursor: pointer;">+</span>
                        </div>
                    </div>
                </div>
            `;
        });

        totalElement.textContent = `$${totalPrice.toFixed(2)}`;
        activarBotonesCantidad();
    }

    // 3. LÓGICA PARA LOS BOTONES DE + Y -
    function activarBotonesCantidad() {
        const incrementBtns = document.querySelectorAll('.increment-btn');
        const decrementBtns = document.querySelectorAll('.decrement-btn');
        let cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];

        incrementBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                if (product) product.quantity += 1;
                
                localStorage.setItem('petcare_cart', JSON.stringify(cart));
                renderizarCarrito();
                actualizarBurbuja();
            });
        });

        decrementBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const product = cart.find(item => item.id === id);
                
                if (product) {
                    product.quantity -= 1;
                    if (product.quantity <= 0) {
                        cart = cart.filter(item => item.id !== id);
                    }
                }
                
                localStorage.setItem('petcare_cart', JSON.stringify(cart));
                renderizarCarrito();
                actualizarBurbuja();
            });
        });
    }

    actualizarBurbuja();
    renderizarCarrito();
});

/* ==========================================
   Todo tu código anterior de los productos, 
   el carrito, el modo oscuro, etc. 
   ========================================== */
// ... (tu código de agregarAlCarrito) ...
// ... (tu código de renderizarCarrito) ...

/* ==========================================
   Y HASTA ABAJO, LA FUNCIÓN GLOBAL:
   ========================================== */
function actualizarBurbujaGlobal() {
    const cart = JSON.parse(localStorage.getItem('petcare_cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const bubbles = document.querySelectorAll('.cart-count, .cart-bubble, #cart-badge');
    
    bubbles.forEach(bubble => {
        bubble.textContent = totalItems;
        if (totalItems > 0) {
            bubble.style.display = 'inline-flex';
        } else {
            bubble.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', actualizarBurbujaGlobal);