const errorId = document.getElementById("errorId");
const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorEdad = document.getElementById("errorEdad");
const errorTelefono = document.getElementById("errorTelefono");

document.getElementById("formulario").addEventListener("submit", (event) => {
    event.preventDefault();

    const identificador = document.getElementById("identificador");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const edad = document.getElementById("edad");
    const telefono = document.getElementById("telefono");

    const idValido = validarCampo(identificador, errorId, "El formato del Id es incorrecto");
    const nombreValido = validarCampo(nombre, errorNombre, "El formato del nombre es incorrecto");
    const correoValido = validarCampo(correo, errorCorreo, "El formato del correo es incorrecto");
    const edadValida = validarCampo(edad, errorEdad, "La edad mínima es 18");
    const telefonoValido = validarCampo(telefono, errorTelefono, "El formato del teléfono es incorrecto");

    if (idValido && nombreValido && correoValido && edadValida && telefonoValido) {
        document.getElementById("advertencia").innerHTML = "<p>Formulario enviado con éxito</p>";
    } else {
        document.getElementById("advertencia").innerHTML = "<p>Por favor corrige los errores antes de enviar</p>";
    }
});



const validarCampo = (campo, contenedor, mensajePersonalizado) => {
    if (campo.validity.valueMissing) { 
        contenedor.innerHTML = "<p> El campo está vacío </p>";
        contenedor.style.color = "red";
        return false;
    } else if (campo.validity.patternMismatch) {
        contenedor.innerHTML = "<p>" + mensajePersonalizado + "</p>";ç
        contenedor.style.color = "red";
        return false;
    } else {
        contenedor.innerHTML = ""; 
        return true;
    }
};





