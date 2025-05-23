class Animal {
    constructor(nombre, peso, edad) {
        this.nombre = nombre;
        this.peso = peso;
        this.edad = edad;
    }
    informacion() {
        return `Nombre: ${this.nombre}, Peso: ${this.peso} kg, Edad: ${this.edad} años`;
    }
}

class Perro extends Animal {
    constructor(nombre, peso, edad, raza) {
        super(nombre, peso, edad);
        this.raza = raza;
    }

    informacion() {
        return `${super.informacion()}, Raza: ${this.raza}`;
    }
}

class Gato extends Animal {
    constructor(nombre, peso, edad, sexo) {
        super(nombre, peso, edad);
        this.sexo = sexo;
    }

    informacion() {
        return `${super.informacion()}, Sexo: ${this.sexo}`;
    }
}

class Conejo extends Animal {
    constructor(nombre, peso, edad, color) {
        super(nombre, peso, edad);
        this.color = color;
    }

    informacion() {
        return `${super.informacion()}, Color: ${this.color}`;
    }
}

let perro1 = new Perro("Titillo", 5, 12, "Puddle");
let gato1 = new Gato("KanKan", 6, 7, "Macho");
let conejo1 = new Conejo("Culon", 2, 4, "Blanco")

let arrayAnimales = [perro1, gato1, conejo1]

function mostrarAnimales() {
    let lista = document.getElementById("listaAnimales");
    lista.innerHTML = "";

    for (let i = 0; i < arrayAnimales.length; i++) {
        let item = document.createElement("li");
        item.textContent = arrayAnimales[i].informacion();
        lista.appendChild(item);
    }
}