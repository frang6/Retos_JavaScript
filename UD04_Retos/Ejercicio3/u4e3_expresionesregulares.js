document.getElementById('enviar').addEventListener('click', function (event) {
    // Evitar que el formulario se envíe antes de realizar la validación
    event.preventDefault();

    // Llamar a todas las funciones de validación
    const fechaHoraValido = validarFechaHora(event);
    const cocineroValido = validarCocinero(event);
    const destinatarioValido = validarDestinatario(event);
    const gramosValido = validarGramos(event);
    const composicionValida = validarComposicion(event);
    const numCuentaValido = validarNumCuenta(event);

    // Enviar el formulario solo si todas las validaciones son correctas
    if (fechaHoraValido && cocineroValido && destinatarioValido && gramosValido && composicionValida && numCuentaValido) {
        document.getElementById('formulario').submit();
    }
});

const validarFechaHora = (event) => {
    event.preventDefault();
    const fechaHora = document.getElementById('fechaHora').value;
    const validacionFecha = document.getElementById('error-fechaHora');
    const patron = /^([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4} ([0-1]\d|2[0-3]):[0-5]\d$/;

    if (patron.test(fechaHora)) {
        validacionFecha.innerHTML = "✔️";
        return true;
    } else {
        validacionFecha.innerHTML = "❌";
        return false;
    }
};

const validarCocinero = (event) => {
    event.preventDefault();
    const cocinero = document.getElementById('cocinero').value;
    const validacionCocinero = document.getElementById('error-cocinero');
    const patron = /^[A-Z]{2}[$@#%&][0-9]{4}$/;

    if (patron.test(cocinero)) {
        validacionCocinero.innerHTML = "✔️";
        return true;
    } else {
        validacionCocinero.innerHTML = "❌";
        return false;
    }
};

const validarDestinatario = (event) => {
    event.preventDefault();
    const destinatario = document.getElementById('destinatario').value;
    const validacionDestinatario = document.getElementById('error-destinatario');
    const patron = /^[A-Z]{2,3}_[a-z]+:[0-9]{4}$/;

    if (patron.test(destinatario)) {
        validacionDestinatario.innerHTML = "✔️";
        return true;
    } else {
        validacionDestinatario.innerHTML = "❌";
        return false;
    }
};

const validarGramos = (event) => {
    event.preventDefault();
    const gramos = parseInt(document.getElementById('gramos').value, 10);
    const validacionGramos = document.getElementById('error-gramos');

    if (gramos >= 1000 && gramos <= 5000) {
        validacionGramos.innerHTML = "✔️";
        return true;
    } else {
        validacionGramos.innerHTML = "❌";
        return false;
    }
};

const validarComposicion = (event) => {
    event.preventDefault();
    const composicion = document.getElementById('composicion').value;
    const validacionComposicion = document.getElementById('error-composicion');
    const patron = /^\d+g([A-Z]{1,2}\d?){2}$/;

    if (patron.test(composicion)) {
        validacionComposicion.innerHTML = "✔️";
        return true;
    } else {
        validacionComposicion.innerHTML = "❌";
        return false;
    }
};

const validarNumCuenta = (event) => {
    event.preventDefault();
    const cuenta = document.getElementById('numCuenta').value;
    const resultado = document.getElementById('error-numCuenta');

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letras.split("");

    const patron = /^[A-Z]{2}[0-9]{2}-\d{12}-\d{4}$/;
    if (!patron.test(cuenta)) {
        console.log("Error: El formato general no coincide.");
        resultado.innerHTML = "❌";
        return false;
    }

    const letra1 = letras.indexOf(cuenta.charAt(0)) + 1;        //Se le suma 1 porque a seria 0, y no empezamos por 1
    const letra2 = letras.indexOf(cuenta.charAt(1)) + 1;
    const sumaLetras = letra1 + letra2;

    // Obtener los dos dígitos que deberían corresponder a la suma de las letras
    const digitosLetras = parseInt(cuenta.substring(2, 4), 10);
    
    // Comprobación de la suma de las letras y los dígitos coinciden y ha introducido bien el codigo
    if (sumaLetras !== digitosLetras) {
        console.log("Error: Los dígitos de letras no coinciden con la suma esperada.");
        resultado.innerHTML = "❌";
        return false;
    }
    // Extrae los dígitos de la cuenta y los dígitos de control
    const digitosCuenta = cuenta.substring(5, 17); // 12 dígitos de la cuenta
    const control = cuenta.substring(18, 22); // 4 dígitos de control
    
    // Calcula el primer y segundo dígito de control
    const calcularControl = (digitos) => 
        String(Math.floor(digitos.split('').reduce((acc, num) => acc + parseInt(num), 0) / 6)).padStart(2, '0');
    
    const control1Calculado = calcularControl(digitosCuenta.substring(0, 6));
    const control2Calculado = calcularControl(digitosCuenta.substring(6, 12));
    
    // Comprobación de los dígitos de control 
    if (control !== control1Calculado + control2Calculado) {
        console.log("Error: Los dígitos de control no coinciden.");
        resultado.innerHTML = "❌";
    } else {
        console.log("Validación de cuenta exitosa.");
        resultado.innerHTML = "✔️";
        
        // Muestra los dígitos de la cuenta sin guiones
        document.getElementById("numCuentaSinGuiones").value = cuenta.replace(/-/g, "");
    }
}








