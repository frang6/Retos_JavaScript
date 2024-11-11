document.getElementById('enviar').addEventListener('click', function (event) {
    //Con esto evitamos que el formulario se envie antes de realizar la validacion
    event.preventDefault();

    if (validarIdentificador() && validarNombre() && validarFechaNacimiento() && validarTelefono() && validarCorreo()) {
        this.submit();
    }
});

function validarIdentificador() {
    const identificador = document.getElementById('identificador');
    const errorMessage = document.getElementById('error-identificador');

    if (identificador.validity.patternMismatch) {
        errorMessage.textContent = identificador.title || 'Identificador no válido';
        identificador.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        identificador.style.border = '';
    }

    return !identificador.validity.patternMismatch;
}

// Función para validar Nombre y Apellidos
function validarNombre() {
    const nombre = document.getElementById('nombre');
    const errorMessage = nombre.getElementById('.error');

    if (nombre.validity.valueMissing) {
        errorMessage.textContent = 'El nombre y apellidos son obligatorios';
        nombre.style.border = '2px solid red';
    } else if (nombre.validity.tooLong) {
        errorMessage.textContent = 'El nombre y apellidos deben tener un máximo de 50 caracteres';
        nombre.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        nombre.style.border = '';
    }

    return !(nombre.validity.valueMissing || nombre.validity.tooLong);
}

// Función para validar Fecha de Nacimiento (dd/mm/yyyy)
function validarFechaNacimiento() {
    const fecha = document.getElementById('fecha');
    const errorMessage = fecha.getElementById('.error');

    if (fecha.validity.patternMismatch) {
        errorMessage.textContent = fecha.title || 'Formato de fecha no válido (dd/mm/yyyy)';
        fecha.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        fecha.style.border = '';
    }

    return !fecha.validity.patternMismatch;
}

// Función para validar Correo Electrónico
function validarCorreo() {
    const correo = document.getElementById('correo');
    const errorMessage = correo.getElementById('.error');


    if (correo.validity.patternMismatch) {
        errorMessage.textContent = correo.title || 'Correo electrónico no válido';
        correo.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        correo.style.border = '';
    }
    return !correo.validity.patternMismatch;
}

// Función para validar Teléfono
function validarTelefono() {
    const telefono = document.getElementById('telefono');
    const errorMessage = telefono.getElementById('.error');


    if (telefono.validity.patternMismatch) {
        errorMessage.textContent = telefono.title || 'Formato de teléfono no válido';
        telefono.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        telefono.style.border = '';
    }

    return !telefono.validity.patternMismatch;
}

// Función para validar Edad: debe seleccionar una opción
function validarEdad() {
    const edad = document.getElementById('opciones');
    const errorMessage = edad.getElementById('.error');

    if (edad.validity.valueMissing) {
        errorMessage.textContent = 'Debes seleccionar una opción de edad.';
        edad.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        edad.style.border = '';
    }

    return !edad.validity.valueMissing;
}
