const api = "https://www.swapi.tech/api/";
const resultado = document.getElementById("resultado");

window.addEventListener('load', () => {
    document.getElementById("formularioSW").addEventListener("submit", async (event) => {
        event.preventDefault();
        let tipoDato = document.getElementById("tipoDato").value; 
        let idDato = document.getElementById("idDato").value;
        if (!idDato) {
            await mostrarDatos(tipoDato);
        } else {
            await mostrarDatoEspecifico(tipoDato, idDato);
        } 
    });
});

const mostrarDatos = async (tipoDato) => {
    const todosElementos = [];
    try {
        let response = await fetch(`${api}${tipoDato}`);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`;
        }
        console.log(`Has fetcheado correctamente ${response}`);
        let data = await response.json();
        if (tipoDato !== "films") {
            data.results.forEach(e => todosElementos.push(e));

            const paginas = data.total_pages;
            for (let i = 2; i <= paginas; i++) {
                const paginaResponse = await fetch(`${api}${tipoDato}?page=${i}&limit=10`);
                const paginaData = await paginaResponse.json();
                paginaData.results.forEach(e => todosElementos.push(e));
            }
        } else {
            data.result.forEach(e => todosElementos.push(e));
        }

        resultado.innerHTML = todosElementos.map(elemento => `
            <div class="carta">
                <h3>${elemento.name || elemento.title || "Sin nombre disponible"}</h3>
            </div>`
        ).join("");
    } catch (error) {
        console.error(error);
        resultado.innerHTML = `<p class="error">Error al obtener los datos: ${error}</p>`;
    }
};

const mostrarDatoEspecifico = async (tipoDato, idDato) => {
    try {
        let response = await fetch(`${api}${tipoDato}/${idDato}`);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`;
        }
        console.log(`Has fetcheado correctamente ${response}`);
        let data = await response.json();
        resultado.innerHTML = `
            <div class="carta">
                <h3>${data.result.properties.name || data.result.properties.title || "Sin nombre disponible"}</h3>
            </div>`;
    } catch (error) {
        console.error(error);
        resultado.innerHTML = `<p class="error">Error al obtener los datos: ${error}</p>`;
    }
};
