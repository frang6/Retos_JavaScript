document.getElementById('enviar').addEventListener('click', function (event) {
    event.preventDefault();
    if (validarFecha() && validarCocinero() && validarDestinatario() && validarGramos() && validarComposicion()) {
        document.getElementById('formulario').submit();
    }

});    

const validarFechaHora = () => {
    const fechaHora = document.getElementById('fechaHora');
    const mensaje = document.getElementById('error-fechaHora');

    if (fechaHora.validity.patternMismatch) {
        mensaje.textContent = fechaHora.title;
        fechaHora.style.border = '2px solid red';
    } else {
        mensaje.textContent = '';
        fechaHora.style.border = '';
    }

    return !fechaHora.validity.patternMismatch;
};

const validarCocinero = () => {
    const cocinero = document.getElementById('cocinero');
    const mensaje = document.getElementById('error-cocinero');

    if (cocinero.validity.patternMismatch) {
        mensaje.textContent = cocinero.title;
        cocinero.style.border = '2px solid red';    
    } else {
        mensaje.textContent = '';
        cocinero.style.border = '';
    }

    return !cocinero.validity.patternMismatch;
}

function validarDestinatario() {
    const destinatario = document.getElementById('destinatario');
    const errorMessage = document.getElementById('error-destinatario');

    if (destinatario.validity.patternMismatch) {
        errorMessage.textContent = destinatario.title;
        destinatario.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        destinatario.style.border = '';
    }

    return !destinatario.validity.patternMismatch;
}

function validarGramos() {
    const gramos = document.getElementById('gramos');
    const errorMessage = document.getElementById('error-gramos');
    
    if (gramos.value < 1000 || gramos.value > 5000) {
        errorMessage.textContent = 'El número de gramos debe estar entre 1000 y 5000';
        gramos.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        gramos.style.border = '';
    }

    return gramos.value >= 1000 && gramos.value <= 5000;
}

function validarComposicion() {
    const composicion = document.getElementById('composicion');
    const errorMessage = document.getElementById('error-composicion');

    if (composicion.validity.patternMismatch) {
        errorMessage.textContent = composicion.title;
        composicion.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        composicion.style.border = '';
    }

    return !composicion.validity.patternMismatch;
}











