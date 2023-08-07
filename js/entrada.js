//DEFINICIÓN DE CLASES
class Entrada {

    constructor(idPelicula, fecha, hora, cantidad) {
        this.idPelicula = idPelicula;
        this.fecha = fecha;
        this.hora = hora;
        this.cantidad = cantidad;
        this.precio = precioEntrada * this.cantidad;
    }

    ActualizarPrecio(cantidad) {
        this.precio = precioEntrada * cantidad;
    }
    
}