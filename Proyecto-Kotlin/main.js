let datosJson;

fetch('estudiantes.json')
    .then(res => res.json())
    .then((salida) => {
        datosJson = salida;
    });

function registrarNota(nombre) {
    let nota;
    do {
        nota = prompt("Indique la nota de " + nombre + " (0 - 100):");
        nota = parseInt(nota);
    } while (isNaN(nota) || nota < 0 || nota > 100);
    return nota;
}

registrarNota();