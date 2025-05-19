function Coche(marca, modelo, color, anio, titular) {
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.anio = anio;
    this.titular = titular;
}

Coche.prototype.verAutomovil = function () {
    return `Marca: ${this.marca}, Modelo: ${this.modelo}, Color: ${this.color}, Año: ${this.anio}, Titular: ${this.titular}`;
};

let coche1 = new Coche("Toyota", "Corolla", "Rojo", 2020, "Juan Pérez");
let coche2 = new Coche("Honda", "Civic", "Azul", 2018, "María López");
let coche3 = new Coche("Ford", "Mustang", "Negro", 2022, "Carlos Gómez");

let listaCoches = [coche1, coche2, coche3];

function mostrarAutomoviles() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    for (let i = 0; i < listaCoches.length; i++) {
        let coche = listaCoches[i];
        let elemento = document.createElement("li"); 
        elemento.textContent = coche.verAutomovil();
        lista.appendChild(elemento);
    }
}