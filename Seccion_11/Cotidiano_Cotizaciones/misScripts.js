function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cargarElementos() {
  document.getElementById("titulo").textContent = "Cotizaciones Online";
}

function cargarTextos() {
  document.getElementById("EurUsd").textContent = "Euro a Dólares: cargando...";
  document.getElementById("CrcUsd").textContent = "Colones a Dólares: cargando...";
  document.getElementById("BitcoinUsd").textContent = "Bitcoin a USD: cargando...";
}

function mostrarCotizacion(idElemento, valor) {
  const etiquetas = {
    "EurUsd": "Euro a Dólares: ",
    "CrcUsd": "Colones a Dólares: ",
    "BitcoinUsd": "Bitcoin a USD: "
  };
  document.getElementById(idElemento).textContent = etiquetas[idElemento] + valor;
}


function crearPedido(url, tipo, clave) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let valor;
      if (tipo === "BitcoinUsd") {
        valor = data.bitcoin.usd;
      } else {
        valor = data.rates[clave];
      }
      mostrarCotizacion(tipo, valor);
    })
    .catch(error => {
      console.error("Error con " + tipo + ": " + error.message);
      mostrarCotizacion(tipo, "Error");
    });
}

function crearPedidoXHR(url, tipo) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const usd_crc = data.rates["CRC"];
      const valorInvertido = (1 / usd_crc).toFixed(5);
      mostrarCotizacion(tipo, valorInvertido);
    } else {
      mostrarCotizacion(tipo, "Error");
    }
  };
  xhr.onerror = function () {
    mostrarCotizacion(tipo, "Error");
  };
  xhr.send();
}

async function cargarContenido() {
  await delay(2500);
  cargarElementos();
  cargarTextos();

  crearPedido("https://api.exchangerate-api.com/v4/latest/EUR", "EurUsd", "USD");
  crearPedido("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", "BitcoinUsd");

  crearPedidoXHR("https://api.exchangerate-api.com/v4/latest/USD", "CrcUsd");
}