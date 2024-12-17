import { api } from './api.js';

window.addEventListener('load', () => {
    document.getElementById('personajeForm').addEventListener('submit', (event) => {
        event.preventDefault();
        obtenerDatos();
    });
});

const obtenerDatos = async () => {
    try {
        const personajeId = document.getElementById('personajeId').value.trim();
        const response = await fetch(`${api}/${personajeId}/`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        //Si encuentra un personaje con ese id, lo muestra, si no salta la vcentanita de que no hay ninguno
        if (data.result) {
            mostrarPersonaje(data.result.properties);
        } else {
            throw new Error("Personaje no encontrado.");
        }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
        mostrarError(error.message);
    }
};


const mostrarPersonaje = (personaje) => {
    //Limpiamos previamente cualquier informacion
    document.getElementById('error').style.display = 'none';
    document.getElementById('personaje').innerHTML = "";

    document.getElementById('personaje').style.display = 'block';
    document.getElementById('personaje').innerHTML = `
        <h2>Detalles del Personaje</h2>
        <p><strong>Nombre:</strong> ${personaje.name}</p>
        <p><strong>Altura:</strong> ${personaje.height} cm</p>
        <p><strong>Peso:</strong> ${personaje.mass} kg</p>
        <p><strong>Género:</strong> ${personaje.gender}</p>
    `;
};

const mostrarError = () => {
    document.getElementById('personaje').textContent = "";

    document.getElementById('personaje').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = `
        <p>Personaje no Encontrado</p>
    `;
};




