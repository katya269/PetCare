/* =========================================================
   PETCARE — DESCRIPCIÓN DEL PEDIDO
========================================================= */


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-right'
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add('show');

            } else {

                /*
                 * Se elimina al salir de pantalla.
                 * Así la animación vuelve a ejecutarse
                 * cuando el usuario sube o baja.
                 */

                entry.target.classList.remove('show');

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});



/* =========================================================
   MÉTODO DE ENVÍO
========================================================= */

const shippingOptions =
    document.querySelectorAll('.shipping-option');

const shippingInputs =
    document.querySelectorAll('input[name="shipping"]');


function updateShipping() {

    shippingOptions.forEach((option) => {

        const radio =
            option.querySelector('input[type="radio"]');

        if (radio.checked) {

            option.classList.add('active');

        } else {

            option.classList.remove('active');

        }

    });


    /* Actualizar precio del resumen */

    const selected =
        document.querySelector(
            'input[name="shipping"]:checked'
        );

    const shippingSummary =
        document.getElementById('shipping-summary');

    const totalSummary =
        document.getElementById('total-summary');


    if (!selected) return;


    let shippingPrice = 0;


    if (selected.value === 'standard') {

        shippingPrice = 5;

    }

    else if (selected.value === 'express') {

        shippingPrice = 15;

    }

    else if (selected.value === 'custom') {

        shippingPrice = 18.50;

    }


    const subtotal = 37.32;

    const total =
        subtotal + shippingPrice;


    shippingSummary.textContent =
        `$${shippingPrice.toFixed(2)}`;


    totalSummary.textContent =
        `$${total.toFixed(2)}`;

}


/* Cada vez que cambia el radio */

shippingInputs.forEach((input) => {

    input.addEventListener(
        'change',
        updateShipping
    );

});


/* Estado inicial */

updateShipping();



/* =========================================================
   FORMULARIOS
========================================================= */

const forms =
    document.querySelectorAll('.checkout-form');


forms.forEach((form) => {

    form.addEventListener('submit', function (event) {

        /*
         * Evita que la página se recargue.
         */

        event.preventDefault();


        /*
         * Verifica que los campos required
         * estén completos.
         */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        /*
         * Busca el botón.
         */

        const button =
            form.querySelector('.btn-form-submit');


        if (!button) return;


        /*
         * Guardamos el contenido original.
         */

        const originalHTML =
            button.innerHTML;


        /*
         * Cambiamos temporalmente el botón.
         */

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> ¡Guardado correctamente!';


        button.classList.add('success');


        /*
         * Después de unos segundos
         * vuelve al estado normal.
         */

        setTimeout(() => {

            button.innerHTML =
                originalHTML;

            button.classList.remove('success');

        }, 2200);

    });

});



/* =========================================================
   BOTÓN FINALIZAR COMPRA
========================================================= */

const finalButton =
    document.querySelector('.btn-finalizar');


if (finalButton) {

    finalButton.addEventListener('click', () => {

        finalButton.innerHTML =
            '<i class="fa-solid fa-check"></i> ¡Pedido preparado!';


        finalButton.classList.add('success');


        setTimeout(() => {

            finalButton.innerHTML =
                '<i class="fa-solid fa-lock"></i> Finalizar compra';

            finalButton.classList.remove('success');

        }, 2500);

    });

}