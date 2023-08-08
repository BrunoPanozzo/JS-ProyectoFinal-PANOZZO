function cargarEntradasVendidasCarrito() {
    const entradasVendidas = cargarEntradasVendidasDeCarritoLS();
    let cards = "";
    let tagCards;
    let imagen = "";
    let nombrePelicula = "";

    if (calcularTotalEntradasCarrito() > 0) {
        cards += `
                <table class="table">
                <tr>
                    <td colspan="5" class="text-end">
                        <button class="btn btn-warning" onclick="vaciarCarrito()">Vaciar Carrito</button>
                    </td>
                </tr>        
                `;

        for (entrada of entradasVendidas) {
            imagen = buscarImagenPelicula(entrada.idPelicula);
            console.log("11"+ imagen);
            nombrePelicula = buscarNombrePelicula(entrada.idPelicula);           
            cards += `
                    <tr>
                        <td>
                            <img id="imgPelicula1" class="imgfilm" src="${"../recursos/cartelera/" + imagen}" alt="${nombrePelicula}" width="90">
                        </td>
                        <td>
                            <p class="nombre-pelicula titulo-importante4 hoverTituloImportante">${nombrePelicula}</p>  
                        </td>
                        <td>
                            <p class="nombre-pelicula titulo-importante4 hoverTituloImportante">${entrada.cantidad}</p>  
                        </td>
                        <td>
                            <p class="nombre-pelicula titulo-importante4 hoverTituloImportante">${entrada.precio}</p>  
                        </td>
                        <td class="text-end" >
                            <button class="btn btn-warning" onclick="eliminarEntradaCarrito(${entrada.idPelicula})"><img src="./recursos/compartidos/trash.png" alt="Eliminar Entrada" width="30"></button>
                        </td>
                    </tr>                    
                    `
        }

        cards += `<tr>
                    <td colspan="3" class="text-end">Total a Pagar</td>
                    <td>$${calcularTotalCarrito()}</td>
                </tr>`;
        cards += `</table>`;
    }
    else {
        cards = `
                <div class="alert alert-danger text center" role="alert">
                No se encontraron entradas compradas en el carrito!
                </div>
                 `;
    }
    tagCards = document.getElementById("entradasVendidas");
    tagCards.innerHTML = cards;

    //debo ocultar las peliculas en cartel
    tagCards = document.getElementById("seccionPeliculasEnCartel");
    tagCards.style.display = 'none';
    tagCards = document.getElementById("seccionEntradasVendidas");
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