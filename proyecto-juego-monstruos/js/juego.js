// la clase que representa un monstruo con vida, turnos y poderes
class Monstruo {
    constructor(nombre, vida = 100, turnos = 3, poderes = null) {
        this.nombre = nombre;
        this.vida = vida;
        this.turnos = turnos;
        this.poderes = poderes || this.generarPoderes();
    }

    // se crea la matriz con valores aleatorios entre 10 y 30
    generarPoderes() {
        let matriz = [];
        for (let i = 0; i < 4; i++) {
            let fila = [];
            for (let j = 0; j < 3; j++) {
                let valor = Math.floor(Math.random() * 21) + 10;
                fila.push(valor);
            }
            matriz.push(fila);
        }
        return matriz;
    }

    // aplica daño y pone la vida mínima en 0
    recibirDanio(danio) {
        this.vida -= danio;
        if (this.vida < 0) this.vida = 0;
    }

    // comprueba si sigue vivo
    estaVivo() {
        return this.vida > 0;
    }

    // comprueba si tiene turnos disponibles
    tieneTurnos() {
        return this.turnos > 0;
    }
}

// la clase que genera y muestra la tabla del tablero con los pokemon
class Tablero {
    constructor(monstruos) {
        this.monstruos = monstruos;
        this.ultimoAtacadoIndex = null; // Para resaltar en la tabla
    }

    // se crea la tabla con la info de ataques, vida y turnos
    mostrarTablero() {
        let tabla = document.createElement('table');
        let encabezado = document.createElement('thead');
        let filaEncabezado = document.createElement('tr');

        // la columna vacía para etiquetas laterales
        filaEncabezado.appendChild(document.createElement('th'));

        this.monstruos.forEach(monstruo => {
            let th = document.createElement('th');
            th.textContent = monstruo.nombre;
            filaEncabezado.appendChild(th);
        });
        encabezado.appendChild(filaEncabezado);
        tabla.appendChild(encabezado);

        // el cuerpo de la tabla
        let cuerpo = document.createElement('tbody');

        // filas de los ataques del 3 al 1
        for (let i = 2; i >= 0; i--) {
            let fila = document.createElement('tr');
            let celdaEtiqueta = document.createElement('td');
            celdaEtiqueta.textContent = `Ataque ${i + 1}`;
            fila.appendChild(celdaEtiqueta);

            this.monstruos.forEach(monstruo => {
                let celda = document.createElement('td');
                let indiceMonstruo = this.monstruos.indexOf(monstruo);
                celda.textContent = monstruo.poderes[indiceMonstruo][i];
                fila.appendChild(celda);
            });

            cuerpo.appendChild(fila);
        }

        // fila que muestra la vida de cada monstruo, resalta el último atacado
        let filaVida = document.createElement('tr');
        let celdaVidaLabel = document.createElement('td');
        celdaVidaLabel.textContent = 'Vida';
        filaVida.appendChild(celdaVidaLabel);

        this.monstruos.forEach((monstruo, i) => {
            let celda = document.createElement('td');
            celda.textContent = monstruo.vida;
            if (this.ultimoAtacadoIndex === i) {
                celda.classList.add('ultimo-atacado'); // la clase para el resaltado del CSS
            }
            filaVida.appendChild(celda);
        });
        cuerpo.appendChild(filaVida);

        // fila que muestra los turnos restantes
        let filaTurnos = document.createElement('tr');
        let celdaTurnosLabel = document.createElement('td');
        celdaTurnosLabel.textContent = 'Turnos';
        filaTurnos.appendChild(celdaTurnosLabel);

        this.monstruos.forEach(monstruo => {
            let celda = document.createElement('td');
            celda.textContent = monstruo.turnos;
            filaTurnos.appendChild(celda);
        });
        cuerpo.appendChild(filaTurnos);

        tabla.appendChild(cuerpo);
        return tabla;
    }
}

// la clase que controla el orden y estado del juego en general
class Juego {
    constructor() {
        // nombres de los pokemon
        this.nombresMonstruos = ['Charizard', 'Mewtwo', 'Rayquaza', 'Dragonite'];
        this.monstruos = [];
        this.turnoActual = 0;
        this.ultimoAtacadoIndex = null;
        this.tablero = null;
        this.historial = [];
    }

    // inicia o carga estado guardado en el LocalStorage para continuar
    iniciar() {
        const estadoGuardado = this.cargarEstado();
        if (estadoGuardado) {
            this.monstruos = estadoGuardado.monstruos.map(m => new Monstruo(m.nombre, m.vida, m.turnos, m.poderes));
            this.ultimoAtacadoIndex = estadoGuardado.ultimoAtacadoIndex;
            this.turnoActual = estadoGuardado.turnoActual || 0;
            this.historial = this.cargarHistorial() || [];
        } else {
            // crea nuevos monstruos con valores por defecto por si no hay guardado
            this.monstruos = this.nombresMonstruos.map(nombre => new Monstruo(nombre));
            this.ultimoAtacadoIndex = null;
            this.turnoActual = 0;
            this.historial = [];
        }
        this.tablero = new Tablero(this.monstruos);
        this.guardarEstado();
    }

    // elige al atacante para turno
    obtenerAtacanteValido() {
        let valido = this.monstruos.filter(m => m.estaVivo() && m.tieneTurnos());
        if (valido.length === 0) return null;
        let indice = Math.floor(Math.random() * valido.length);
        return valido[indice];
    }

    // elige oponente diferente al atacante y vivo
    obtenerOponenteValido(atacante) {
        let oponentes = this.monstruos.filter(m => m !== atacante && m.estaVivo());
        if (oponentes.length === 0) return null;
        let indice = Math.floor(Math.random() * oponentes.length);
        return oponentes[indice];
    }

    // ejecuta el ataque del turno, elige atacante/oponente, calcula daño y actualiza estado
    ejecutarTurno() {
        let atacante = this.obtenerAtacanteValido();
        if (!atacante) return false;

        let oponente = this.obtenerOponenteValido(atacante);
        if (!oponente) return false;

        atacante.turnos--;

        let indiceAtacante = this.monstruos.indexOf(atacante);
        let ataqueIndex = 3 - atacante.turnos - 1;
        if (ataqueIndex < 0 || ataqueIndex > 2) ataqueIndex = 0;

        let danio = atacante.poderes[indiceAtacante][ataqueIndex];

        oponente.recibirDanio(danio);

        // guarda el índice para resaltar la tabla
        this.ultimoAtacadoIndex = this.monstruos.indexOf(oponente);
        this.tablero.ultimoAtacadoIndex = this.ultimoAtacadoIndex;

        this.guardarEstado();

        // retorna info para usar en mensajes
        return { atacante, oponente, danio, ataqueIndex };
    }

    // verifica condiciones para saber si el juego terminó
    verificarFinJuego() {
        let muertos = this.monstruos.filter(m => !m.estaVivo()).length;
        if (muertos >= 3) return 'finalizado';

        let quedanTurnos = this.monstruos.some(m => m.tieneTurnos());
        if (!quedanTurnos) return 'finalizado';

        return 'continuar';
    }

    // esto decide si hay ganador único o empate
    decidirGanador() {
        let vivos = this.monstruos.filter(m => m.estaVivo());
        if (vivos.length === 1) return vivos[0];

        let vidaMaxima = Math.max(...this.monstruos.map(m => m.vida));
        let candidatos = this.monstruos.filter(m => m.vida === vidaMaxima);

        if (candidatos.length === 1) return candidatos[0];
        return null; // en caso de empate
    }

    // reinicia la partida al estado inicial
    reiniciar() {
        this.monstruos.forEach(m => {
            m.vida = 100;
            m.turnos = 3;
            m.poderes = m.generarPoderes();
        });
        this.ultimoAtacadoIndex = null;
        this.turnoActual = 0;
        this.tablero.ultimoAtacadoIndex = null;
        this.guardarEstado();
    }

    // guarda el estado actual en LocalStorage
    guardarEstado() {
        const estado = {
            monstruos: this.monstruos.map(m => ({
                nombre: m.nombre,
                vida: m.vida,
                turnos: m.turnos,
                poderes: m.poderes
            })),
            ultimoAtacadoIndex: this.ultimoAtacadoIndex,
            turnoActual: this.turnoActual
        };
        localStorage.setItem('estadoJuego', JSON.stringify(estado));
    }

    // carga el estado guardado si existe para continuar la partida
    cargarEstado() {
        let estadoJSON = localStorage.getItem('estadoJuego');
        return estadoJSON ? JSON.parse(estadoJSON) : null;
    }

    // guarda historial de partidas para luego revisarlo
    guardarHistorial() {
        localStorage.setItem('historialPartidas', JSON.stringify(this.historial));
    }

    // carga el historial guardado si hay
    cargarHistorial() {
        let historialJSON = localStorage.getItem('historialPartidas');
        return historialJSON ? JSON.parse(historialJSON) : [];
    }

    // esto agrega la partida actual al historial con fecha y resultado
    registrarPartida() {
        const fecha = new Date().toLocaleString();
        const ganador = this.decidirGanador();
        const partida = {
            fecha: fecha,
            ganador: ganador ? ganador.nombre : 'Empate',
            vidasFinales: this.monstruos.map(m => ({ nombre: m.nombre, vida: m.vida }))
        };
        this.historial.push(partida);
        this.guardarHistorial();
    }
}

// función para generar un XML con el estado actual del juego
Juego.prototype.exportarEstadoXML = function () {
  let xml = '<juego>\n'  // apertura del nodo juego
  xml += '  <monstruos>\n'  // apertura del nodo monstruos
  
  // recorremos los monstruos y generamos un nodo XML por cada uno
  for (let i = 0; i < this.monstruos.length; i++) {
    let m = this.monstruos[i]
    xml += '    <monstruo indice="' + i + '">\n'  // apertura de cada monstruo
    xml += '      <nombre>' + m.nombre + '</nombre>\n'  // nombre del monstruo
    xml += '      <vida>' + m.vida + '</vida>\n'  // vida del monstruo
    xml += '      <turnos>' + m.turnos + '</turnos>\n'  // turnos restantes
    xml += '      <poderes>\n'  // apertura de la lista de poderes
    for (let f = 0; f < m.poderes.length; f++) {
      xml += '        <fila>' + m.poderes[f].join(',') + '</fila>\n'  // cada fila de poderes
    }
    xml += '      </poderes>\n'  // cierre de los poderes
    xml += '    </monstruo>\n'  // cierre del monstruo
  }

  xml += '  </monstruos>\n'  // cierre del nodo monstruos
  
  // añade el estado del último atacado y el turno actual
  xml += '  <ultimoAtacadoIndex>' + (this.ultimoAtacadoIndex !== null ? this.ultimoAtacadoIndex : -1) + '</ultimoAtacadoIndex>\n'
  xml += '  <turnoActual>' + this.turnoActual + '</turnoActual>\n'
  
  xml += '</juego>'  // cierre del nodo juego
  return xml  // devuelve el XML generado
}

// función para importar y cargar el estado desde un archivo XML
Juego.prototype.importarEstadoXML = function (textoXML) {
  let parser = new DOMParser()  // crea el parser para convertir el texto en XML
  let xmlDoc
  
  // intenta hacerle parser el texto XML
  try {
    xmlDoc = parser.parseFromString(textoXML, 'text/xml')
  } catch (e) {
    return false  // si no es un XML válido, devolvemos false
  }

  let juegoNodo = xmlDoc.getElementsByTagName('juego')[0]  // obtiene el nodo <juego>
  if (!juegoNodo) return false  // si no existe el nodo juego, devolvemos false

  // valida la cantidad de monstruos
  let monstruosNodos = juegoNodo.getElementsByTagName('monstruo')
  if (monstruosNodos.length !== this.monstruos.length) return false  // si no coincide, error

  // recorre cada monstruo y validamos sus datos
  for (let i = 0; i < monstruosNodos.length; i++) {
    let nodo = monstruosNodos[i]
    let nombre = nodo.getElementsByTagName('nombre')[0].textContent
    let vida = Number(nodo.getElementsByTagName('vida')[0].textContent)
    let turnos = Number(nodo.getElementsByTagName('turnos')[0].textContent)
    let poderesNodos = nodo.getElementsByTagName('poderes')[0].getElementsByTagName('fila')
    
    // valida los poderes
    if (!poderesNodos || poderesNodos.length !== 4) return false
    let poderes = []
    for (let f = 0; f < poderesNodos.length; f++) {
      let valores = poderesNodos[f].textContent.split(',').map(Number)
      if (valores.length !== 3) return false  // valida que cada fila tenga 3 valores
      poderes.push(valores)
    }
    
    // valida los valores de cada monstruo
    if (!nombre || isNaN(vida) || isNaN(turnos)) return false
    if (vida < 0 || vida > 100 || turnos < 0 || turnos > 3) return false

    // asigna los valores al monstruo en el juego
    this.monstruos[i].nombre = nombre
    this.monstruos[i].vida = vida
    this.monstruos[i].turnos = turnos
    this.monstruos[i].poderes = poderes
  }

  // valida el índice del último atacado y el turno actual
  let ultimoA = Number(juegoNodo.getElementsByTagName('ultimoAtacadoIndex')[0].textContent)
  let turno = Number(juegoNodo.getElementsByTagName('turnoActual')[0].textContent)
  if (ultimoA < -1 || ultimoA >= this.monstruos.length) return false
  if (turno < 0 || turno >= this.monstruos.length) return false
  
  // asigna el último atacado y el turno actual
  this.ultimoAtacadoIndex = ultimoA === -1 ? null : ultimoA
  this.turnoActual = turno
  
  // crea el tablero con los monstruos y guardamos el estado
  this.tablero = new Tablero(this.monstruos)
  this.guardarEstado()
  
  return true  // importación exitosa
}
