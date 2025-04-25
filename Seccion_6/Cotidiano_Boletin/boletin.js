let elementoResultadoPromedio = document.getElementById("resultadoPromedio")
let elementoResultadoAlta = document.getElementById("resultadoAlta")
let elementoResultadoAplazo = document.getElementById("resultadoAplazo")
let MiArray = [8, 2, 9, 9, 4];
function calcularPromedio() {
    let suma = 0;
    for (numero of MiArray) {
        suma += numero;
    }
    let promedio = suma / MiArray.length
    elementoResultadoPromedio.textContent = promedio;
}

function notaMasAlta() {
    let Maximo = Math.max(...MiArray)
    elementoResultadoAlta.textContent = Maximo;
}

function hayAplazados() {
    let aplazo = "No";
    for (let numero of MiArray) {
        if (numero < 4) {
            aplazo = "Sí";
            break;
        }
    }
    elementoResultadoAplazo.textContent = aplazo;
}