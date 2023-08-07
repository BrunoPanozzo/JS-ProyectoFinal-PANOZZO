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
            //imagen = buscarImagenPelicula(entrada.idPelicula);
            //nombrePelicula = buscarNombrePelicula(entrada.idPelicula);
            buscarImagenPelicula(entrada.idPelicula)
            .then ((img) => {
                imagen = img;
                console.log("1 " + img + " 2");

            })
            .catch ((error) => {
                console.log(error);
            })
            ;
            buscarNombrePelicula(entrada.idPelicula)
            .then ((nom) => {
                nombrePelicula = nom
            })
            .catch ((error) => {
                console.log(error);
            })
            console.log("1" + imagen + nombrePelicula);
            ;
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
}

async function traerPeliculasEnCartel() {
    return await fetch('../json/peliculas.json');
}

async function cargarPeliculasEnCartel() {
    const response = await traerPeliculasEnCartel();
    if (response.ok) {
        const peliculas = await response.json();
        return peliculas;
    }
    else {
        //pendiente msje con libreria tostify
    }
}

async function buscarImagenPelicula(idPelicula) {    
    await cargarPeliculasEnCartel()
        .then((peliculas) => {
            return getImagenPelicula(peliculas, idPelicula);            
        })
        .catch((error) => {
            console.log(error);
        });
}

function getImagenPelicula(peliculas, idPelicula) {
    peliculas.forEach(({id,imagen}) => {
        if (id === idPelicula)
        {
            return imagen;
        }
    });
}

async function buscarNombrePelicula(idPelicula) {
    await cargarPeliculasEnCartel()
        .then((peliculas) => {
            return getNombrePelicula(peliculas, idPelicula)
        })
        .catch((error) => {
            console.log(error);
        });
}

function getNombrePelicula(peliculas, idPelicula) {
    peliculas.forEach(({id,nombre}) => {
        if (id === idPelicula)
        {
            return nombre;
        }
    });
}

cargarEntradasVendidasCarrito();

mostrarBotonCarrito();