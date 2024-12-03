window.addEventListener("load", () => {
    const botonAnadir = document.getElementById("botonAnadir");
    botonAnadir.addEventListener("click", anadirJugador);

    const verJugadores = document.getElementById("verJugadores");
    verJugadores.addEventListener("click", mostrarFichasJugadores);
});

const jugadoresDefinidos = [
    {
        nombre: "Mbappe",
        posicion: "Delantero",
        numCamiseta: 9,
        imagen: "img/mbappe.webp"
    },
    {
        nombre: "Vinicius Jr.",
        posicion: "Delantero",
        numCamiseta: 7,
        imagen: "img/vinicius.webp"
    }
];

const anadirJugador = () => {
    const nombre = document.getElementById("nombre").value.trim();
    const posicion = document.getElementById("posicion").value.trim();
    const numCamiseta = document.getElementById("numCamiseta").value.trim();
    //Sentencias para la lectura de una imagen cargada como un fichero del pc
    const imagenInput = document.getElementById("imagen");
    const imagen = imagenInput.files[0] ? URL.createObjectURL(imagenInput.files[0]) : "img/default.jpg";

    // Validación de campos, que todos esten completos
    if (!nombre || !posicion || !numCamiseta || !imagen) {
        alert("Por favor, completa todos los campos antes de añadir un jugador.");
        return;
    }

    jugadoresDefinidos.push({ nombre, posicion, numCamiseta, imagen });
    alert("Jugador añadido a la plantilla correctamente");

    // Limpiamos formulario después de añadir
    document.getElementById("nombre").value = "";
    document.getElementById("posicion").value = "";
    document.getElementById("numCamiseta").value = "";
    imagenInput.value = "";
};


const mostrarFichasJugadores = () => {
    document.getElementById("formularioRegistro").style.display = "none";
    document.getElementById("verJugadores").style.display = "none";
    document.getElementById("plantilla").style.display = "block";

    plantilla.innerHTML = '<h2>Lista de Jugadores</h2>';

    jugadoresDefinidos.forEach((jugador) => {
        const fichaJugador = document.createElement("div");
        fichaJugador.classList.add("jugador");
        fichaJugador.innerHTML = `
            <h3>${jugador.nombre}</h3>
            <p>Posicion: ${jugador.posicion}</p>
            <p>Numero de Camiseta: ${jugador.numCamiseta}</p>
            <img src="${jugador.imagen}" alt="${jugador.nombre}">
        `;
        plantilla.appendChild(fichaJugador);
    });

    const botonSalir = document.createElement("button");
    botonSalir.textContent = "Seguir añadiendo jugadores";
    botonSalir.addEventListener("click", salir);
    plantilla.appendChild(botonSalir);
};

// Función para volver al formulario
const salir = () => {
    document.getElementById("formularioRegistro").style.display = "block";
    document.getElementById("verJugadores").style.display = "block";
    document.getElementById("plantilla").style.display = "none";
};

