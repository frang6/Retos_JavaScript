import { key } from './api.js';

let peliculas = [];
let totalPaginas = 0;

const generoFiltro = document.getElementById('generoFiltro');
const buscarTitulo = document.getElementById('buscarTitulo');
const peliculasContainer = document.getElementById('peliculas');

window.addEventListener('load', () => {
    obtenerPeliculas();
    buscarPeliculas();
});

generoFiltro.addEventListener('change', () => {
    buscarPeliculas();
});

buscarTitulo.addEventListener('input', () => {
    buscarPeliculas();
});


const obtenerPeliculas = async () => {
    try {
        //calculamos el número total de páginas mediante la primera pagina
        const response = await fetch(`https://www.omdbapi.com/?s=movie&y=2024&page=1&apikey=${key}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
        }
        const data = await response.json();
        totalPaginas = Math.ceil(data.totalResults / 10) // Se calcula el total de páginas, cada pagina tiene 10 peliculas
        peliculas = data.Search || []; // Guardamos las películas de la primera página

        // Mostramos las películas de la primera página
        mostrarPeliculas(peliculas);

        //Desde la segunda pagina recorremos el resto y a parte de acumular las películas, mostramos las películas de cada una de las paginas
        for (let page = 2; page <= totalPaginas; page++) {
            const pageResponse = await fetch(`https://www.omdbapi.com/?s=movie&y=2024&page=${page}&apikey=${key}`);
            if (!pageResponse.ok) {
                console.error(`Error en la página ${page}: ${pageResponse.statusText}`);
                continue;
            }
            const pageData = await pageResponse.json();
            const peliculasPagina = pageData.Search || [];      //Si no encuentra peliculas en la pagina se pasa a la siguiente guardando un array vacio

            //El array que se genera en cada pagina se concatena al array principal
            peliculas = peliculas.concat(peliculasPagina);
            mostrarPeliculas(peliculas); 
        }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

const buscarPeliculas = () => {
    const generoSeleccionado = generoFiltro.value.toLowerCase();
    const tituloBuscado = buscarTitulo.value.toLowerCase();

    // Filtramos las películas por género y título
    const peliculasFiltradas = peliculas.filter(pelicula => {
        const coincideGenero = generoSeleccionado === '' || pelicula.Genre?.toLowerCase().includes(generoSeleccionado);
        const coincideTitulo = pelicula.Title?.toLowerCase().includes(tituloBuscado);
        return coincideGenero && coincideTitulo;
    });

    mostrarPeliculas(peliculasFiltradas);
};

const mostrarPeliculas = (peliculas) => {
    peliculasContainer.innerHTML = '';

    if (peliculas.length === 0) {
        peliculasContainer.innerHTML = '<p>No se encontraron películas.</p>';
        return;
    }

    peliculas.forEach(pelicula => {
        const peliculaElement = document.createElement('div');
        peliculaElement.classList.add('pelicula');

        peliculaElement.innerHTML = `
            <h2>${pelicula.Title}</h2>
            <p>Género: ${pelicula.Genre || 'N/A'}</p>
            <p>Sinopsis: ${pelicula.Plot || 'N/A'}</p>
        `;

        peliculasContainer.appendChild(peliculaElement);
    });
};
