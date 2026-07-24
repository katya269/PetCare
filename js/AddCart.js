function agregarAlCarrito(productoNuevo) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === productoNuevo.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push(productoNuevo);
    }
    
    guardarCarrito(carrito);
    
    // --- LÓGICA DE LA NOTIFICACIÓN ---
    const toast = document.getElementById('toast-notificacion');
    if (toast) {
        toast.classList.add('mostrar'); // Saca el cartelito
        
        // Lo esconde automáticamente después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 3000);
    }
}