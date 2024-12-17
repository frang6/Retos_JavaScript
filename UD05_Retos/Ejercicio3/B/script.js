import { api } from './api.js';

window.addEventListener('load', () => {
    document.getElementById("categorias").addEventListener("change", () => {
        obtenerInformacion();
        mostrarBusquedaPorId();
    });

    document.getElementById("btnBuscar").addEventListener("click", () => {
        buscarPorId();
    });
});

const obtenerInformacion = async () => {
    const opcion = document.getElementById("categorias").value;

    try {
        const response = await fetch(`${api}${opcion}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.results) {
            mostrarInformacion(data.results);
        } else {
            mostrarInformacion([data.result]); // Algunos endpoints usan `result`
        }
    } catch (error) {
        console.error(error);
        mostrarError("Hubo un problema al cargar los datos. Intenta de nuevo.");
    }
};

const mostrarInformacion = (data) => {
    const informacion = document.getElementById("informacion");
    informacion.innerHTML = ""; // Limpia el contenido anterior

    // Recorremos el array para mostrar cada elemento
    data.forEach((elemento) => {
        // Creamos un contenedor para cada elemento
        const contenedor = document.createElement("div");

        // Recorremos las propiedades del elemento, para mostrarlas con un mapa, clave valor
        for (const [key, value] of Object.entries(elemento)) {
            contenedor.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }

        informacion.appendChild(contenedor);
    });
};

const mostrarError = (mensaje) => {
    const informacion = document.getElementById("informacion");
    informacion.innerHTML = `<p class=\"error\">${mensaje}</p>`;
};

const mostrarBusquedaPorId = () => {
    const opcion = document.getElementById("categorias").value;
    const buscarPorIdDiv = document.getElementById("buscarPorId");

    // Mostrar el campo de búsqueda solo para ciertas categorías
    if (["people", "films", "planets", "vehicles", "starships", "species"].includes(opcion)) {
        buscarPorIdDiv.style.display = "block";
    } else {
        buscarPorIdDiv.style.display = "none";
    }
};

const buscarPorId = async () => {
    const opcion = document.getElementById("categorias").value;
    const id = document.getElementById("idInput").value;

    if (!id) {
        mostrarError("Por favor, introduce un identificador válido.");
        return;
    }

    try {
        const response = await fetch(`${api}${opcion}/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.result) {
            mostrarInformacion([data.result]); // Normalizamos como un array
        } else {
            mostrarError("No se encontró información para el ID proporcionado.");
        }
    } catch (error) {
        console.error(error);
        mostrarError("Hubo un problema al cargar los datos. Intenta de nuevo.");
    }
};
