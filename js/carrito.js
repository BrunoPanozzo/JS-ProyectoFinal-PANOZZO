const precioEntrada = 700;  //precio unico para todas las entradas

function guardarEntradasVendidasEnCarritoLS(entradas) {
    localStorage.setItem("carrito", JSON.stringify(entradas));
}

function cargarEntradasVendidasDeCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");    
    cargarEntradasVendidasCarrito();
    mostrarBotonCarrito();  
}

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
    //DE EXISTIR ACTUALIZA LA ENTRADA, CASO CONTRARIO CREA EL OBJETO Y LO INCORPORA AL ARREGLO
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

    //falta msje de producto agregado con exito al carrito
}

function eliminarEntradaCarrito(idPelicula) {
    const carrito = cargarEntradasVendidasDeCarritoLS();
    const entradas = carrito.filter(item => item.idPelicula !== idPelicula);
    guardarEntradasVendidasEnCarritoLS(entradas);
    cargarEntradasVendidasCarrito();
    mostrarBotonCarrito();  
}

function calcularTotalEntradasCarrito() {
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();
    return entradasVendidas.length;
}

function calcularTotalCarrito() {
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();
    return entradasVendidas.reduce((acc,entrada) => acc + entrada.precio, 0);
}

function mostrarBotonCarrito() {    
    let tagCarrito = document.getElementById("carrito");
    tagCarrito.innerText = calcularTotalEntradasCarrito();
}           