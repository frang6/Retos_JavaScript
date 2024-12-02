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

/*
* Aqui empieza el ejercicio, arriba estan las funciones validadoras del ejercicio anterior
*/

const contadorForFaits = document.getElementById('contadorForFaits');
const contadorSocios = document.getElementById('contadorSocios');
const botonBorrarForfaits = document.getElementById('borrarForfaits');
const botonBorrarSocios = document.getElementById('borrarSocios');

// Función para inicializar contadores en localStorage si no existen
const inicializarContadores = () => {
    const hoy = new Date().toLocaleDateString(); // Fecha como string
    const fechaGuardada = localStorage.getItem('fecha');

    //Si la fecha que esta guardada no es la de hoy, es decir hemos cambiado de dia se actualizaran tanto la fecha como los contadores de forfaits y socios
    if (fechaGuardada !== hoy) {
        localStorage.setItem('fecha', hoy);
        localStorage.setItem('forfaits', '0');
        localStorage.setItem('socios', '0');
    }
};

// Función para obtener el valor de un contador. Seria como un tipo de getter que llamaremos mas tarde 
const obtenerContador = (clave) => {
    return parseInt(localStorage.getItem(clave)) || 0;
};

// Función para actualizar el valor de un contador. Seria como un setter que llamaremos mas tarde
const actualizarContador = (clave, valor) => {
    localStorage.setItem(clave, valor.toString());
};

// Función para mostrar los contadores en el DOM
const mostrarContadores = () => {
    const forfaits = obtenerContador('forfaits');
    const socios = obtenerContador('socios');
    contadorForFaits.textContent = forfaits;
    contadorSocios.textContent = socios;
};

const incrementarForfaits = () => {
    const forfaits = obtenerContador('forfaits') + 1;
    actualizarContador('forfaits', forfaits);
    mostrarContadores();
};


const incrementarSocios = () => {
    const socios = obtenerContador('socios') + 1;
    actualizarContador('socios', socios);
    mostrarContadores();
};

const resetearForfaits = () => {
    actualizarContador('forfaits', 0);
    mostrarContadores();
};

const resetearSocios = () => {
    actualizarContador('socios', 0);
    mostrarContadores();
};

// Asociamos eventos a los botones, tanto de borrar socios como de forfaits
botonBorrarForfaits.addEventListener('click', resetearForfaits);
botonBorrarSocios.addEventListener('click', resetearSocios);

//Ejecucion cuando el formulario se encie, se aplicaran tanto las validaciones y en caso de pasarlas se actualizaran los contadores
document.getElementById('enviar').addEventListener('click', function (event) {
    event.preventDefault();

    const identificadorValido = validarIdentificador();
    const nombreValido = validarNombre();
    const fechaNacimientoValida = validarFechaNacimiento();
    const telefonoValido = validarTelefono();
    const correoValido = validarCorreo();
    const edadValida = validarEdad();

    if (identificadorValido && nombreValido && fechaNacimientoValida && telefonoValido && correoValido && edadValida) {
        incrementarForfaits();

        // Incrementamos el contador de socios si está seleccionada la suscripción, si no solo se incrementaran los forfaits
        const esSocio = document.getElementById('suscripcion').checked;
        if (esSocio) {
            incrementarSocios();
        }

        document.getElementById('formulario').submit();
    }
});

// Inicializa los contadores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarContadores();
    mostrarContadores();
});
