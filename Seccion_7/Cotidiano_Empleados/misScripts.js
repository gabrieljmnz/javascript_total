let elementoExpediente = document.getElementById("txtExpediente");
let elementoNombre = document.getElementById("txtNombre");
let elementoApellido = document.getElementById("txtApellido");
let elementoFechaNacimiento = document.getElementById("txtNacimiento");
let elementoCargo = document.getElementById("txtCargo");

let empleados = [];

function Empleado(expediente, nombre, apellido, fechaNacimiento, cargo) {
    this.expediente = expediente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
    this.cargo = cargo;
    this.presentarse = function () {
        console.log(`Mi nombre es ${this.nombre} ${this.apellido}, soy ${this.cargo}, y tengo ${this.edad} años.`);
    };
}

function agregarEmpleado() {
    let expediente = elementoExpediente.value;
    let nombre = elementoNombre.value;
    let apellido = elementoApellido.value;
    let fechaNacimiento = elementoFechaNacimiento.value;
    let cargo = elementoCargo.value;

    let nuevoEmpleado = new Empleado(expediente, nombre, apellido, fechaNacimiento, cargo);
    empleados.push(nuevoEmpleado);
    limpiarCampos();
}

function mostrarEmpleados() {
    let mensaje = "";
    for (let i = 0; i < empleados.length; i++) {
        let empleado = empleados[i];
        mensaje += `Expediente: ${empleado.expediente}, Nombre: ${empleado.nombre}, Apellido: ${empleado.apellido}, Fecha de Nacimiento: ${empleado.fechaNacimiento}, Cargo: ${empleado.cargo}\n`;
    }
    alert(mensaje);
}

function limpiarCampos() {
    elementoExpediente.value = "";
    elementoNombre.value = "";
    elementoApellido.value = "";
    elementoFechaNacimiento.value = "";
    elementoCargo.value = "";
}