// Declaramos un arreglo vacío para guardar los estudiantes cargados desde el JSON
let estudiantes = [];
// Declaramos un arreglo vacío para guardar las notas y estados de los estudiantes
let notas = [];

// Usamos fetch para cargar el archivo 'estudiantes.json'
fetch('estudiantes.json')
  .then(res => res.json()) // Convertimos la respuesta a formato JSON
  .then(data => {
    estudiantes = data; // Guardamos los datos (arreglo de estudiantes) en la variable estudiantes
  });

// Función para pedir y validar la nota de un estudiante
function registrarNota(nombre) {
  let nota;
  do {
    // Pedimos al usuario que ingrese la nota para el estudiante
    nota = prompt("Ingresa la nota de " + nombre + " (0-100):");
    if (nota === null) return null; // Si el usuario cancela, retornamos null para detener el proceso
    nota = parseInt(nota); // Convertimos la entrada a número entero
  } while (isNaN(nota) || nota < 0 || nota > 100); // Repetimos mientras la nota no sea válida (no número o fuera de rango)
  return nota; // Retornamos la nota válida
}

// Función para registrar las notas de todos los estudiantes
function registrarNotas() {
  notas = []; // Limpiamos el arreglo de notas para un nuevo registro
  for (let i = 0; i < estudiantes.length; i++) { // Recorremos cada estudiante
    let nombre = estudiantes[i].nombre; // Obtenemos el nombre del estudiante (accediendo a la propiedad 'nombre')
    let nota = registrarNota(nombre); // Llamamos a la función para pedir la nota
    if (nota === null) { // Si el usuario canceló el prompt
      alert("Registro cancelado"); // Avisamos que se canceló el registro
      return; // Salimos de la función sin continuar
    }
    let estado = ""; // Variable para guardar si el estudiante aprobó o reprobó
    if (nota >= 70) {
      estado = "Aprobado"; // Si la nota es 70 o más, está aprobado
    } else {
      estado = "Reprobado"; // Si es menos de 70, está reprobado
    }
    // Guardamos en el arreglo notas un objeto con el nombre, la nota y el estado
    notas.push({ nombre: nombre, nota: nota, estado: estado });
  }
  mostrarNotas(); // Llamamos a la función para mostrar la lista actualizada
}

// Función para mostrar la lista de estudiantes con sus notas y estados en el HTML
function mostrarNotas() {
  let lista = document.getElementById('listaEstudiantes'); // Obtenemos el contenedor donde mostraremos la lista
  lista.innerHTML = ""; // Limpiamos el contenido anterior para no repetir
  for (let i = 0; i < notas.length; i++) { // Recorremos cada nota registrada
    let div = document.createElement('div'); // Creamos un nuevo div para cada estudiante
    let estudiante = notas[i]; // Obtenemos el objeto con nombre, nota y estado
    // Ponemos el texto con la información del estudiante en el div
    div.textContent = estudiante.nombre + " - Nota: " + estudiante.nota + " - " + estudiante.estado;
    lista.appendChild(div); // Agregamos el div al contenedor en el HTML
  }
}

// Función para generar y mostrar un resumen general de las notas
function generarResumen() {
  if (notas.length === 0) { // Si no hay notas registradas
    alert("Primero debes registrar las notas"); // Avisamos que primero deben registrarse
    return; // Salimos de la función
  }
  let aprobados = 0; // Contador de estudiantes aprobados
  let reprobados = 0; // Contador de estudiantes reprobados
  let sumaNotas = 0; // Variable para sumar todas las notas y calcular promedio
  let maxNota = notas[0].nota; // Inicializamos la nota máxima con la primera nota
  let minNota = notas[0].nota; // Inicializamos la nota mínima con la primera nota

  for (let i = 0; i < notas.length; i++) { // Recorremos todas las notas
    let n = notas[i].nota; // Obtenemos la nota actual
    sumaNotas += n; // Sumamos la nota al total
    if (n > maxNota) maxNota = n; // Actualizamos la nota máxima si la actual es mayor
    if (n < minNota) minNota = n; // Actualizamos la nota mínima si la actual es menor
    if (n >= 70) aprobados++; // Si la nota es 70 o más, sumamos a aprobados
    else reprobados++; // Si es menor, sumamos a reprobados
  }

  let promedio = sumaNotas / notas.length; // Calculamos el promedio dividiendo la suma entre la cantidad de notas

  let resumenDiv = document.getElementById('resumen'); // Obtenemos el contenedor donde mostraremos el resumen
  // Insertamos el resumen con etiquetas HTML para mejor formato
  resumenDiv.innerHTML = "<b>Resumen:</b><br>" +
    "Aprobados: " + aprobados + "<br>" +
    "Reprobados: " + reprobados + "<br>" +
    "Promedio: " + promedio + "<br>" +
    "Nota más alta: " + maxNota + "<br>" +
    "Nota más baja: " + minNota;
}