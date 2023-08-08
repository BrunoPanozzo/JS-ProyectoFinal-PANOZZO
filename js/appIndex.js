async function traerPeliculasEnCartel() {
    return await fetch('../json/peliculas.json');
}

async function cargarPeliculasEnCartel() {
    const response = await traerPeliculasEnCartel();
    if (response.ok) {
        const peliculas = await response.json(); ///convierto los objetos de json a objetos javascript
        dibujarGrillaPeliculas(peliculas);
        seteoEventosEnBotonesComprar();
        guardarPeliculasLS(peliculas);
    } else {
        dibujarGrillaPeliculas([]);
        Toastify({
            text: "No se pudo descargar el catálogo de películas. Intente nuevamente en un rato...",        
            duration: 2000,
            gravity: 'top',  
            backgroundColor: "linear-gradient(to right, #290101, #510101, #790101, #a10101)",
            offset: {
              x: 10, 
              y: 10 
            },
            }).showToast();
    }
}

function dibujarGrillaPeliculas(peliculas) {
    let cards = "";
    let tagCards;
    let index = 0;

    peliculas.forEach(({ nombre, genero, sinopsis, imagen }) => {
        index++;
        cards += `
                <div>
                    <div class="card border-0">
                        <article class="film film${index}">
                            <img id="imgPelicula1" class="imgfilm" src="../recursos/cartelera/` + imagen + `" alt="` + nombre + `">
                            <div class="info-pelicula" id="pelicula1">
                                <p class="nombre-pelicula titulo-importante4 hoverTituloImportante">` + nombre + `</p>
                                <p class="genero-pelicula">` + genero + `</p>
                                <p class="resumen-pelicula">`+ sinopsis + `</p>
                            </div>

                            <div class="card-body border border-info bg-info-subtle">
                                        <label class="card-title" for="cantidadEntradas">Ingrese cantidad de Entradas</label>
                                        <input type="text" id="cantidadEntradas${index}" size="5">                                    
                                        <button id="comprarEntradas${index}" class="btn btn-primary">Comprar Entradas</button>                                        
                            </div>                                
                        </article>
                    </div>
                </div>
                `
    });

    tagCards = document.getElementById("peliculasEnCartel");
    tagCards.innerHTML = cards;

    //OCULTO LA SECCION DEL CARRITO
    tagCards = document.getElementById("seccionEntradasVendidas");
    tagCards.style.display = 'none';

    //MUESTRO LA SECCION DE PELICULAS EN CARTEL
    tagCards = document.getElementById("seccionPeliculasEnCartel");
    tagCards.style.height = '1800px';
    tagCards.style.display = 'block';
}

function seteoEventosEnBotonesComprar() {
    let tag1 = document.getElementById("comprarEntradas1");
    let tagInput1 = document.getElementById("cantidadEntradas1");
    tag1.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 1, +tagInput1.value));

    let tag2 = document.getElementById('comprarEntradas2');
    let tagInput2 = document.getElementById('cantidadEntradas2');
    tag2.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 2, +tagInput2.value));

    let tag3 = document.getElementById('comprarEntradas3');
    let tagInput3 = document.getElementById('cantidadEntradas3');
    tag3.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 3, +tagInput3.value));

    let tag4 = document.getElementById('comprarEntradas4');
    let tagInput4 = document.getElementById('cantidadEntradas4');
    tag4.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 4, +tagInput4.value));

    let tag5 = document.getElementById('comprarEntradas5');
    let tagInput5 = document.getElementById('cantidadEntradas5');
    tag5.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 5, +tagInput5.value));

    let tag6 = document.getElementById('comprarEntradas6');
    let tagInput6 = document.getElementById('cantidadEntradas6');
    tag6.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 6, +tagInput6.value));

    let tag7 = document.getElementById('comprarEntradas7');
    let tagInput7 = document.getElementById('cantidadEntradas7');
    tag7.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 7, +tagInput7.value));

    let tag8 = document.getElementById('comprarEntradas8');
    let tagInput8 = document.getElementById('cantidadEntradas8');
    tag8.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 8, +tagInput8.value));

    let tag9 = document.getElementById('comprarEntradas9');
    let tagInput9 = document.getElementById('cantidadEntradas9');
    tag9.addEventListener('click', (e) => validar_E_IngresarAlCarrito(e, 9, +tagInput9.value));
}

cargarPeliculasEnCartel();

mostrarBotonCarrito();

function validar_E_IngresarAlCarrito(e, idPelicula, cantidadEntradas) {
    esEnteroPositivo(cantidadEntradas) ? agregarAlCarrito(e, idPelicula, cantidadEntradas) : informarEntradaNoVAlida();
}

function informarEntradaNoVAlida() {
    Toastify({
        text: "Ingresó un valor inválido. Debe ingresar un número positivo.",        
        duration: 2000,
        gravity: 'top',  
        backgroundColor: "linear-gradient(to right, #290101, #510101, #790101, #a10101)",
        offset: {
          x: 10, 
          y: 10 
        },
        }).showToast();
}

//DETERMINA SI UN VALOR PASADO COMO PARÁMETRO ES UN ENTERO VÁLIDO
function esEnteroPositivo(valor) {
    return (!isNaN(valor) && (valor > 0));
}

//para no volver a pedir las peliculas a la API, las guardo en el local storage
function guardarPeliculasLS(peliculas) {
    localStorage.setItem("peliculasEnCartel", JSON.stringify(peliculas));
}

function cargarPeliculasEnCartelLS() {
    return JSON.parse(localStorage.getItem("peliculasEnCartel")) || [];
}

