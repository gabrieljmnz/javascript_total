// este código es para manejar la interfaz, botones y actualizar el tablero
const juego = new Juego();
const areaJuego = document.getElementById('area-juego');

const botonNuevoJuego = document.getElementById('nuevo-juego');
const botonSiguienteTurno = document.getElementById('siguiente-turno');

// función para actualizar tablero y mensajes
function actualizarTablero() {
    areaJuego.innerHTML = '';

    areaJuego.appendChild(juego.tablero.mostrarTablero());

    if (window.ultimoMensajeAtaque) {
        const divMensajeAtaque = document.createElement('div');
        divMensajeAtaque.id = 'mensaje-ataque';
        divMensajeAtaque.textContent = window.ultimoMensajeAtaque;
        areaJuego.appendChild(divMensajeAtaque);
        window.ultimoMensajeAtaque = null;
    }

    const mensaje = document.createElement('div');
    mensaje.id = 'mensaje';

    const estado = juego.verificarFinJuego();
    if (estado === 'finalizado') {
        const ganador = juego.decidirGanador();
        if (ganador) {
            mensaje.textContent = "¡El pokémon ganador es: " + ganador.nombre + " con vida " + ganador.vida + "!";
        } else {
            const maxVida = Math.max.apply(null, juego.monstruos.map(function(m) { return m.vida; }));
            const empatados = juego.monstruos.filter(function(m) { return m.vida === maxVida; });
            let textoEmpate = "¡Empate! Los pokémon con más vida tienen: ";
            textoEmpate += empatados.map(function(m) {
                return m.nombre + " (" + m.vida + ")";
            }).join(', ');
            mensaje.textContent = textoEmpate;
        }
        juego.registrarPartida();
        botonSiguienteTurno.disabled = true;
    } else {
        mensaje.textContent = 'Haga click en "Siguiente Turno" para avanzar en la batalla pokémon.';
        botonSiguienteTurno.disabled = false;
    }

    areaJuego.appendChild(mensaje);
}

// actualizar el boton nuevo juego
botonNuevoJuego.onclick = function() {
    juego.reiniciar();
    actualizarTablero();
    botonSiguienteTurno.disabled = false;
    botonNuevoJuego.textContent = 'Nuevo Juego';
};

// mensaje para el botón "Siguiente Turno"
botonSiguienteTurno.onclick = function() {
    const resultado = juego.ejecutarTurno();
    if (resultado) {
        window.ultimoMensajeAtaque = resultado.atacante.nombre + " atacó con el ataque " + (resultado.ataqueIndex + 1) + " y hizo " + resultado.danio + " de daño a " + resultado.oponente.nombre + ".";
    }
    actualizarTablero();
};

// iniciar juego y mostrar el estado inicial
juego.iniciar();
actualizarTablero();
botonSiguienteTurno.disabled = true; // se deshabilita al iniciar, hasta nuevo juego.

// funciones para exportar e importar usando los botones html

// se obtienen los elementos del DOM
const botonExportarXML = document.getElementById('exportar-xml')
const botonImportarXML = document.getElementById('importar-xml')
const inputImportarXML = document.getElementById('input-importar-xml')

// exportar el estado del juego a un archivo XML
botonExportarXML.onclick = function () {
  let xml = juego.exportarEstadoXML()  // obtiene el estado del juego en formato XML
  let blob = new Blob([xml], { type: 'text/xml' })  // crea un Blob con el XML
  let url = URL.createObjectURL(blob)  // genera una URL para el Blob
  let a = document.createElement('a')  // crea un enlace temporal para descargar
  a.href = url
  a.download = 'estado_juego.xml'  // nombre del archivo
  a.click()  // inicia la descarga
  URL.revokeObjectURL(url)  // libera la URL temporal para liberar recursos del navegador
}

// importar el estado del juego desde un archivo XML
botonImportarXML.onclick = function () {
  inputImportarXML.click()  // simula un clic en el input para abrir el selector de archivos
}

// leer y cargar el archivo XML seleccionado
inputImportarXML.onchange = function (e) {
  let archivo = e.target.files[0]  // obtiene el archivo
  if (!archivo) return  // si no hay archivo, se sale

  let lector = new FileReader()  // crea un lector para leer el archivo
  lector.onload = function () {
    let exito = juego.importarEstadoXML(lector.result)  // intenta importar el estado
    if (exito) {
      alert('La partida importada con éxito')
      actualizarTablero()  // actualiza el tablero
    } else {
      alert('Error: archivo xml inválido o corrupto')
    }
    inputImportarXML.value = ''  // limpia el input
  }
  lector.readAsText(archivo)  // lee el archivo como texto
}