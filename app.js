// Erian Perez
// Declaracion de Variables
let coleccion_pedido = new Array();
const clave_local_storage = "coleccionPedidos";
let precioTotal = 0
cargar_pedido();

// Obtencion de datos desde el Dom
let btn_crear = document.getElementById("btn_ingresar");
btn_crear.addEventListener("click", () => {

    let id = Math.random();
    const input_nombre = document.getElementById("nombre").value;
    const input_hamburguesa = document.getElementById("hamburguesa").value;
    const input_papas = document.getElementById("papas").value;
    const aderezo = document.getElementById("aderezo").checked;
    const descuento = document.getElementById("descuento").value;
    (validar_formulario(input_nombre, input_hamburguesa, input_papas) ? generarPedido(id, input_nombre, input_hamburguesa, input_papas, aderezo, descuento) : alert("Ingrese toda la informacion necesaria"))
})


function validar_formulario(input_nombre, input_hamburguesa, input_papas) {
    if (!input_nombre) {
        alert("Ingrese su nombre");
        return false;
    }

    if (!input_hamburguesa) {
        alert("Ingrese la hamburguesa a pedir");
        return false;
    }

    if (!input_papas) {
        alert("Ingrese las papas a pedir");
        return false;
    }
    return true;
}

// Se genera el pedido, se almacena en local storage, y se envian datos para generar el card

function generarPedido(id, nombre, hamburguesa, papas, aderezo, descuento) {
    const orden = new Orden(id, nombre, hamburguesa, papas, aderezo, descuento);
    coleccion_pedido.push(orden);

    localStorage.setItem(clave_local_storage, JSON.stringify(coleccion_pedido));
    generar_card_pedido(nombre, hamburguesa, papas, descuento, id);

}

// Se calcula el precio para su uso posterior
function calcular_precio(hamburguesa, papas, descuento, id) {
    let precio = 0
    // Calcular Primero la Hamburguesa
    switch (hamburguesa) {
        case 'BIG_MAC':
            precio += 900
            break;
        case 'MC_POLLO':
            precio += 700
            break;
        case 'TASTY':
            precio += 800
            break;
        case 'CUARTO_DE_LIBRA':
            precio += 850
            break;
    }
    // Luego las Papas
    switch (papas) {
        case 'CHEDDAR':
            precio += 100
            break;
        case 'PANCETA_Y_CHEDDAR':
            precio += 200
            break;
        case 'HUEVO':
            precio += 150
            break;
    }
    //   Se aplica el descuento
    switch (descuento) {
        case 'CoderHouse':
            precio *= 0.9
            console.log("Codigo Utilizado: CoderHouse")
            break;
        case 'Krusty':
            precio *= 0.75
            console.log("Codigo Utilizado: Krusty")
            break;
        default:

            break;
    }
    precioTotal += precio
    console.log("Identificador: " + id + " Precio:" + precio)
    return precio

}
// Se genera la card
function generar_card_pedido(nombre, hamburguesa, papas, descuento, id) {

    let new_div = document.createElement("div")
    let new_h2 = document.createElement("h2");
    new_h2.setAttribute('style', 'white-space: pre;');
    new_div.id = "div" + nombre;
    let precio = calcular_precio(hamburguesa, papas, descuento, id)
    new_h2.textContent = "Pedido para: " + nombre + "\r\n";
    new_h2.textContent += "Precio: $" + precio

    let new_img = document.createElement("img");
    const hamburguesasImagenes = {
        'BIG_MAC': "bigmac.jpg",
        'MC_POLLO': "mcpollo.jpg",
        'TASTY': "tasty.jpg",
        'CUARTO_DE_LIBRA': "cuartlibra.jpg"
    }
    new_img.src = hamburguesasImagenes[hamburguesa]

    new_div.appendChild(new_h2);
    new_div.appendChild(new_img);

    let contenedor = document.getElementById("datos");

    contenedor.appendChild(new_div);

    resetear_form();

}
// Se resetea el form
function resetear_form() {

    document.getElementById("nombre").value = "";
    document.getElementById("aderezo").value = "";
    document.getElementById("descuento").value = "";

}

function cargar_pedido() {

    let arreglo = localStorage.getItem(clave_local_storage);
    if (arreglo) {

        arreglo = JSON.parse(arreglo);

        coleccion_pedido = arreglo;

        for (let i = 0; i < arreglo.length; i++) {

            let pedido = arreglo[i];
            console.log(pedido.nombre);
            console.log(pedido.hamburguesa);
            generar_card_pedido(pedido.nombre, pedido.hamburguesa, pedido.papas, pedido.descuento, pedido.id);
        }

    }
//  Api para envio de Comprobantes
}
function sendMail(mensaje, email) {
    var tempParams = {
        reply_to: email,
        message: mensaje
    }
    emailjs.send('service_rdxubwq', 'template_yc4tycc', tempParams, 'Ca4UAn3Qy7UvHotXF')
        .then(function (res) {
            console.log("Comprobante enviado!", res.status)
        })
}

// Recarga la Pagina
function terminar_pedido() {
    coleccion_pedido.length = 0;
    localStorage.clear();
    document.location.reload();
    precioTotal = 0
}
