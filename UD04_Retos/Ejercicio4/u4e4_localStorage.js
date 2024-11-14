document.getElementById('enviar').addEventListener('click', function (event) {
    // Evitar que el formulario se envíe antes de realizar la validación
    event.preventDefault();

    // Llamar a todas las funciones de validación
    const identificadorValido = validarIdentificador();
    const nombreValido = validarNombre();
    const fechaNacimientoValida = validarFechaNacimiento();
    const telefonoValido = validarTelefono();
    const correoValido = validarCorreo();
    const edadValida = validarEdad();

    // Enviar el formulario solo si todas las validaciones son correctas
    if (identificadorValido && nombreValido && fechaNacimientoValida && telefonoValido && correoValido && edadValida) {
        document.getElementById('formulario').submit();
    }
});

function validarIdentificador() {
    const identificador = document.getElementById('identificador');
    const errorMessage = document.getElementById('error-identificador');
    
    if (identificador.validity.patternMismatch) {
        errorMessage.textContent = identificador.title;
        identificador.style.border = '2px solid red';
    }else {
        errorMessage.textContent = '';
        identificador.style.border = '';
    }

    return !identificador.validity.patternMismatch;
}


function validarNombre() {
    const nombre = document.getElementById('nombre');
    const errorMessage = document.getElementById('error-nombre');

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
    const errorMessage = document.getElementById('error-fecha');

    if (fecha.validity.patternMismatch) {
        errorMessage.textContent = fecha.title;
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
    const errorMessage = document.getElementById('error-correo');
    const correoPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!correoPattern.test(correo.value)) {
        errorMessage.textContent = correo.title;
        correo.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        correo.style.border = '';
    }

    return correoPattern.test(correo.value);
}

// Función para validar Teléfono
function validarTelefono() {
    const telefono = document.getElementById('telefono');
    const errorMessage = document.getElementById('error-telefono');

    if (telefono.validity.patternMismatch) {
        errorMessage.textContent = telefono.title;
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
    const errorMessage = document.getElementById('error-opciones');

    if (edad.validity.valueMissing) {
        errorMessage.textContent = 'Debes seleccionar una opción de edad.';
        edad.style.border = '2px solid red';
    } else {
        errorMessage.textContent = '';
        edad.style.border = '';
    }

    return !edad.validity.valueMissing;
}