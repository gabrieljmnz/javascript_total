function cargarResumen() {
    let datosJson; 
    fetch('resumen.json')
    .then(res => res.json())
    .then((salida) => {
        datosJson = salida;

        let elementoBanco = document.getElementById('bancoId');
        let elementoSucursal = document.getElementById('sucursalId');
        let elementoTitular = document.getElementById('titularId');
        let elementoNumeroCuenta = document.getElementById('numeroCuentaId');

        let elementoNumTarjeta = document.getElementById('numTarjetaId');
        let elementoAbierto = document.getElementById('abiertoId');

        elementoBanco.textContent = datosJson.banco;
        elementoSucursal.textContent = datosJson.sucursal;
        elementoTitular.textContent = datosJson.titular;
        elementoNumeroCuenta.textContent = datosJson.numero_cuenta;
        elementoNumTarjeta.textContent = datosJson.numero_de_tarjeta;
        elementoAbierto.textContent = datosJson.abierto;
    })
    .catch(function(error) {
        alert("Error al cargar los datos: " + error);
    });
}

