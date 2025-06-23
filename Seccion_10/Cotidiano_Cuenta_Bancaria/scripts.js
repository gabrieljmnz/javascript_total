function cargarResumen() {
    let datosJson;
    fetch('resumen.json')
        .then(res => res.json())
        .then((salida) => {
            datosJson = salida;

            document.getElementById('bancoId').textContent = datosJson.banco;
            document.getElementById('sucursalId').textContent = datosJson.sucursal;
            document.getElementById('titularId').textContent = datosJson.titular;
            document.getElementById('numeroCuentaId').textContent = datosJson.numero_cuenta;

            document.getElementById('usdSaldoId').textContent = datosJson.saldo[0].monto;
            document.getElementById('eurSaldoId').textContent = datosJson.saldo[1].monto;

            document.getElementById('cbuId').textContent = datosJson.cbu;
            document.getElementById('abiertoId').textContent = datosJson.abierto;
        })
        .catch(function (error) {
            alert("Error al cargar los datos: " + error);
            console.error("Error en la carga:", error);
        });
}