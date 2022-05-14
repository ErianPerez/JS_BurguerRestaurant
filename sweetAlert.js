
const btnCarrito = document.getElementById("btn_carrito")
btnCarrito.addEventListener("click", () => {
    if (precioTotal == 0) { //If Para no enviar comprobantes vacios 
        Swal.fire({
            title: 'Carrito',
            text: 'Total a Pagar: ' + precioTotal,
            footer: 'No hay nada en el carrito!',
            showDenyButton: true,
            denyButtonText: 'Cancelar',
        })
    } else {
        Swal.fire({
            title: 'Carrito',
            text: 'Total a Pagar: ' + precioTotal,
            footer: 'Finalizar su Compra?',
            showDenyButton: true,
            confirmButtonText: 'Pagar',
            denyButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire(
                    'Pago Acreditado',
                    'La confirmacion del pago podria demorar.',
                    'success'
                )
                pedir_email();

            } else if (result.isDenied) {
                swal.fire(
                    'Cancelado',
                    'Continue con su Compra',
                    'error'
                )
            }

        })
        function pedir_email() {
            swal.fire({
                title: 'Ingrese su correo para recibir el comprobante',
                input: 'email',
                inputLabel: 'Su casilla:',
                inputPlaceholder: 'Enter your email address'
            }).then((value) => {
                let mensaje = "Este es el comprobante de pago por su compra de " + precioTotal + "(ARS) Pesos Argentinos. Muchas gracias por comprar en MCDONALDS"
                sendMail(mensaje, value.value);
                // Se genera un Timeout, ya que si se llamara la funcion automaticamente, la api no tendria el tiempo suficiente para enviar el correo
                setTimeout(terminar_pedido, 5000);
            })

        }
    }


})

