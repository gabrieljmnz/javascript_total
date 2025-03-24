function recomendar(genero) {
    let edad = parseInt(document.getElementById("edadInput").value);
    let recomendacionTexto = document.getElementById("recomendacion");

    if (!document.getElementById("edadInput").value) {
        alert("Por favor, ingresa tu edad antes de continuar.");
        return;
    }

    switch (genero) {
        case 'drama':
            if (edad < 13) {
                recomendacionTexto.textContent = "Tu película recomendada es Casablanca.";
            } else if (edad <= 15) {
                recomendacionTexto.textContent = "Tu película recomendada es The Shawshank Redemption.";
            } else {
                recomendacionTexto.textContent = "Tu película recomendada es Taxi Driver.";
            }

            break;
        case 'comedia':
            if (edad < 13) {
                recomendacionTexto.textContent = "Tu película recomendada es Back to the Future.";
            } else if (edad <= 15) {
                recomendacionTexto.textContent = "Tu película recomendada es The Truman Show.";
            } else {
                recomendacionTexto.textContent = "Tu película recomendada es The Wolf of Wall Street.";
            }

            break;
        case 'musical':
            if (edad < 13) {
                recomendacionTexto.textContent = "Tu película recomendada es La La Land .";
            } else if (edad <= 15) {
                recomendacionTexto.textContent = "Tu película recomendada es Les Misérables.";
            } else {
                recomendacionTexto.textContent = "Tu película recomendada es The Rocky Horror Picture Show.";
            }

            break;
        case 'crimen':
            if (edad < 13) {
                recomendacionTexto.textContent = "No hay opciones para tu edad.";
            } else if (edad <= 15) {
                recomendacionTexto.textContent = "Tu película recomendada es El Secreto de sus Ojos.";
            } else {
                recomendacionTexto.textContent = "Tu película recomendada es The Godfather.";
            }

            break;
    }
}