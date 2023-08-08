function cargarEntradasVendidasCarrito() {
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();
    let cards = "";
    let tagCards;
    let imagen = "";
    let nombrePelicula = "";

    if (calcularTotalEntradasCarrito() > 0) {
        cards += `
                <table id="carritoEntradasVendidas" class="table table-striped table-hover">                
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre Película</th>                    
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Cantidad Entradas</th>
                    <th scope="col"></th>
                    <th scope="col">Precio Total</th>
                    <th scope="col">
                        <td class="text-end">
                            <button class="btn btn-warning" onclick="vaciarCarrito()">Vaciar Carrito</button>
                        </td>
                    </th>
                    </tr>                    
                </thead>
                      
                `;

        for (entrada of entradasVendidas) {
            imagen = buscarImagenPelicula(entrada.idPelicula);
            console.log("11" + imagen);
            nombrePelicula = buscarNombrePelicula(entrada.idPelicula);
            cards += `<tbody class="table-group-divider">
                    <tr>
                        <td>
                            <img id="imgPelicula1" class="imgfilm" src="${"../recursos/cartelera/" + imagen}" alt="${nombrePelicula}" width="90">
                        </td>
                        <td colspan="8">
                            <p class="nombre-pelicula titulo-importante4 hoverTituloImportante">${nombrePelicula}</p>  
                        </td>
                        <td colspan="2">
                            <p class="nombre-pelicula titulo-importante4 hoverTituloImportante">${entrada.cantidad}</p>  
                        </td>
                        <td>
                            <p class="nombre-pelicula titulo-importante4 hoverTituloImportante fw-bolder">${entrada.precio}</p>  
                        </td>
                        <td class="text-end">
                            <button class="btn btn-warning" onclick="eliminarEntradaCarrito(${entrada.idPelicula})"><img src="./recursos/compartidos/trash.png" alt="Eliminar Entrada" width="30"></button>
                        </td>
                    </tr>                    
                    `
        }

        cards += ``;
        cards += `<tr>
                    <td colspan="11" class="text-end fw-bolder">Total a Pagar</td>
                    <td class="fw-bolder">$${calcularTotalCarrito()}</td>
                </tr>`;
        cards += `</tbody>
                  </table>`;
    }
    else {
        cards = `
                <div class="alert alert-danger text center" role="alert">
                No se encontraron entradas compradas en el carrito!
                </div>
                 `;
    }  

    //OCULTO LA SECCION DE PELICULAS EN CARTEL
    tagCards = document.getElementById("seccionPeliculasEnCartel");
    tagCards.style.display = 'none';

    //MUESTRO LA SECCION DEL CARRITO
    tagCards = document.getElementById("entradasVendidas");
    tagCards.innerHTML = cards;
    
    //calculo el alto en funcion de la cantidad de entradas vendidas
    let cantidadEntradas = calcularTotalEntradasCarrito();
    tagCards = document.getElementById("seccionEntradasVendidas");
    let alto = 225 * cantidadEntradas + 60;
    console.log(tagCards);
    console.log(cantidadEntradas);
    console.log(alto);
    tagCards.style.height = alto + 'px';
    tagCards.style.display = 'block';
}

function buscarImagenPelicula(idPelicula) {
    let peliculas = cargarPeliculasEnCartelLS();
    let pelicula = getPelicula(peliculas, idPelicula);
    return pelicula.imagen;
}

function getPelicula(peliculas, idPelicula) {
    for (const pelicula of peliculas) {
        if (pelicula.id === idPelicula)
            return pelicula;
    }
}

function buscarNombrePelicula(idPelicula) {
    let peliculas = cargarPeliculasEnCartelLS();
    let pelicula = getPelicula(peliculas, idPelicula);
    return pelicula.nombre;
}

cargarEntradasVendidasCarrito();

mostrarBotonCarrito();