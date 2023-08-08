const precioEntrada = 700;  //precio unico para todas las entradas

//guardo en el localstorage el carrito de entradas vendidas
function guardarEntradasVendidasEnCarritoLS(entradas) {
    localStorage.setItem("carrito", JSON.stringify(entradas));
}

//recupero del localstorage el carrito actual de entradas vendidas
function cargarEntradasVendidasDeCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//borro todas las entradas del carrito
function vaciarCarrito() {
    Swal.fire({
        title: 'Está seguro de vaciar el carrito de entradas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar.',
        cancelButtonText: 'Cancelar.'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Carrito vaciado!',
                icon: 'success',
                text: 'Se han borrado todas la compras de entradas.'
            })
            localStorage.removeItem("carrito");
            cargarEntradasVendidasCarrito();
            mostrarBotonCarrito();
        }
    })
}

//agrego a mi carrito actual una compra realizada
function agregarAlCarrito(e, idPelicula, cantidadEntradas) {
    //variables para el manejo de datos tipo DATE
    let miFecha;
    let dia;
    let mes;
    let año;
    let hora;
    let minutos;
    let sFecha = "";
    let sHora = "";

    //DETERMINO LA HORA Y FECHA DEL MOMENTO DE EFECTUADA LA COMPRA
    miFecha = new Date();
    dia = miFecha.getDate();
    mes = miFecha.getMonth() + 1;
    año = miFecha.getFullYear();
    hora = miFecha.getHours();
    minutos = miFecha.getMinutes();
    sFecha = `${dia}-${mes}-${año}`;
    sHora = `${hora}:${minutos}`;

    e.preventDefault(); //evito el refresque

    let nuevaEntradaVendida;
    let entradaExistente;
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();

    //VERIFICO SI EXISTEN ENTRADAS PARA LA PELICULA ELEGIDA
    //DE EXISTIR ACTUALIZA LA ENTRADA, CASO CONTRARIO CREA EL OBJETO Y LO INCORPORA AL CARRITO
    existe = entradasVendidas.some(entrada => entrada.idPelicula == idPelicula);
    if (!existe) {
        nuevaEntradaVendida = new Entrada(idPelicula, sFecha, sHora, cantidadEntradas);
        entradasVendidas.push(nuevaEntradaVendida);
    }
    else {
        entradaExistente = entradasVendidas.find(entrada => entrada.idPelicula === idPelicula);
        entradaExistente.cantidad = entradaExistente.cantidad + cantidadEntradas;
        entradaExistente.precio = precioEntrada * entradaExistente.cantidad;
        //entradaExistente.ActualizarPrecio(entradaExistente.cantidad);
    }

    guardarEntradasVendidasEnCarritoLS(entradasVendidas);
    mostrarBotonCarrito();

    let nombrePelicula = buscarNombrePelicula(idPelicula);
    Toastify({
        text: "Se agregó con éxito la compra de " + cantidadEntradas + " entradas para la película " + nombrePelicula + ".",        
        duration: 2000,
        gravity: 'top',  
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        offset: {
          x: 10, 
          y: 10 
        },
        }).showToast();
}


//elimina una entrada determinada del carrito
function eliminarEntradaCarrito(idPelicula) {
    let nombrePelicula = buscarNombrePelicula(entrada.idPelicula);
    Swal.fire({
        title: 'Está seguro de eliminar la compra de entradas para ' + nombrePelicula + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmo.',
        cancelButtonText: 'No, no quiero.'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'La compra de entradas para ' + nombrePelicula + ' ha sido borrada.'
            })
            const carrito = cargarEntradasVendidasDeCarritoLS();
            const entradas = carrito.filter(item => item.idPelicula !== idPelicula);
            guardarEntradasVendidasEnCarritoLS(entradas);
            cargarEntradasVendidasCarrito();
            mostrarBotonCarrito();
        }
    })
}

//calcula el total de entradas de mi carrito
function calcularTotalEntradasCarrito() {
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();
    return entradasVendidas.length;
}

//calcula el total de la compra que incluye todas las entradas de todas las peliculas
function calcularTotalCarrito() {
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();
    return entradasVendidas.reduce((acc, entrada) => acc + entrada.precio, 0);
}

//muestra sobre la imagen del carrito un número identificando la cantidad de entradas de mi carrito
function mostrarBotonCarrito() {
    let tagCarrito = document.getElementById("carrito");
    tagCarrito.innerText = calcularTotalEntradasCarrito();
}           