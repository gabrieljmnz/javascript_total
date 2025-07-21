let estudiantes = [];
let notas = [];

fetch('estudiantes.json')
    .then(res => res.json())
    .then(data => {
        estudiantes = data;
    })

function registrarNota(nombre) {
    let nota;
    do {
        nota = prompt("Indique la nota de " + nombre + " (0-100):")
        if (nota === null) return null;
        nota = parseInt(nota);
    } while (isNaN(nota) || nota < 0 || nota > 100)
    return nota;
}

function registrarNotas() {
    notas = [];
    for (let i = 0; i < estudiantes.length; i++) {
        let nombre = estudiantes[i].nombre;
        let nota = registrarNota(nombre);
        if (nota === null) {
            alert("Registro Cancelado");
            return;
        }
        let estado = nota >= 70 ? "Aprobado" : "Reprobado"
        notas.push({ nombre, nota, estado });
    }
    mostrarNotas();
}

function mostrarNotas() {
    let lista = document.getElementById('lista');
    lista.innerHTML = "";
    for (let i = 0; i < notas.length; i++) {
        let div = document.createElement('div');
        let estudiante = notas[i];
        div.textContent = estudiante.nombre + "- Nota: " + estudiante.nota + " - " + estudiante.estado;
        lista.appendChild(div);
    }
}

function generarResumen() {
    if (notas.length === 0) {
        alert("No hay datos registrados.");
        return;
    }
    let aprobados = 0, reprobados = 0, sumaNotas = 0;
    let maxNota = notas[0].nota;
    let minNota = notas[0].nota;
    for (let i = 0; i < notas.length; i++) {
        let n = notas[i].nota;
        sumaNotas += n;
        if (n > maxNota) maxNota = n;
        if (n < minNota) minNota = n;
        if (n >= 70) aprobados++;
        else reprobados++;
    }
    let promedio = sumaNotas / notas.length;
    let resumenDiv = document.getElementById('resumen');
    resumenDiv.innerHTML = "<br>Resumen:<br>" + "Aprobados: " + aprobados + "<br>Reprobados: " + reprobados + "<br>Promedio: " + promedio + "<br>Nota mas alta: " + maxNota + "<br>Nota mas baja: " + minNota;
}