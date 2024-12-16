import { api } from './api.js';

window.addEventListener('load', () => {
    document.getElementById('personajeForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe y recargue la página
        obtenerDatos();
    });
});

const obtenerDatos = async () => {
    try {
        // Obtén el ID del personaje desde el input
        let personajeId = document.getElementById('personajeId').value;

        // Asegúrate de que el ID sea válido (según el patrón definido en el input)
        if (!personajeId.match(/^[1-9][0-9]?$/)) {
            document.getElementById('error-message').textContent = "Por favor, ingresa un ID válido entre 1 y 99.";
            return;
        }

        // Realiza la solicitud para obtener los datos del personaje
        const response = await fetch(`${api}${personajeId}/`);
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
        }

        const data = await response.json();

        // Verifica que la propiedad result esté presente
        if (data.result) {
            mostrarPersonaje(data.result);  
        } else {
            throw new Error("Personaje no encontrado.");
        }

    } catch (error) {
        console.log("Error al obtener los datos:", error);
        document.getElementById('error-message').textContent = error.message;
    }
};

const mostrarPersonaje = (personaje) => {
    // Muestra el nombre del personaje en el div con el ID 'personaje'
    document.getElementById('personaje').innerHTML = `<h1>${personaje.name}</h1>`;
};




