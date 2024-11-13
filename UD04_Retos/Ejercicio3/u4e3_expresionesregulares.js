document.getElementById('enviar').addEventListener('click', function (event) {
    // Evitar que el formulario se envíe antes de realizar la validación
    event.preventDefault();

    // Llamar a todas las funciones de validación
    const fechaHoraValido = validarFechaHora();
    const cocineroValido = validarCocinero();
    const destinatarioValido = validarDestinatario();
    const gramosValido = validarGramos();
    const composicionValida = validarComposicion();
    const numCuentaValido = validarNumCuenta();

    // Enviar el formulario solo si todas las validaciones son correctas
    if (fechaHoraValido && cocineroValido && destinatarioValido && gramosValido && composicionValida && numCuentaValido) {
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

function validarNumCuenta() {
    const numCuenta = document.getElementById('numCuenta').value;
    const errorMessage = document.getElementById('error-numCuenta');
    const cuentaSinGuiones = document.getElementById('numCuentaSinGuiones');

    const cuentaRegex = /^[A-Z]{2}\d{2}-\d{12}-\d{2}$/;
    if (!cuentaRegex.test(numCuenta)) {
        errorMessage.textContent = 'Formato de cuenta inválido.';
        return false;
    }

    const letras = numCuenta.substring(0, 2);
    const sumaLetras = letras.charCodeAt(0) - 64 + letras.charCodeAt(1) - 64;
    const dosDigitos = parseInt(numCuenta.substring(2, 4), 10);

    if (dosDigitos !== sumaLetras) {
        errorMessage.textContent = 'Los primeros dígitos no coinciden con la suma de las letras.';
        return false;
    }

    const digitosCuenta = numCuenta.substring(5, 17);
    const primerControl = parseInt(numCuenta.substring(18, 20), 10);
    const segundoControl = parseInt(numCuenta.substring(20, 22), 10);

    const sumaPrimeros6 = Math.floor([...digitosCuenta.substring(0, 6)].reduce((acc, dig) => acc + parseInt(dig, 10), 0) / 6);
    const sumaSegundos6 = Math.floor([...digitosCuenta.substring(6, 12)].reduce((acc, dig) => acc + parseInt(dig, 10), 0) / 6);

    if (primerControl !== sumaPrimeros6 || segundoControl !== sumaSegundos6) {
        errorMessage.textContent = 'Los dígitos de control no coinciden.';
        return false;
    }

    cuentaSinGuiones.value = letras + dosDigitos.toString().padStart(2, '0') + digitosCuenta + primerControl.toString().padStart(2, '0') + segundoControl.toString().padStart(2, '0');
    errorMessage.textContent = '';
    return true;
}











