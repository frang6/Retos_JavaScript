const api = "https://pokeapi.co/api/v2/pokemon/";
const contenedorDatos = document.getElementById("datosPokemon");

window.addEventListener("load", () =>{
    document.getElementById("formulario").addEventListener("submit", async (event) =>{
        event.preventDefault();
        let nombrePokemon = document.getElementById("nombre").value
        try{
            const datosPokemon = await getPokemon(nombrePokemon);
            contenedorDatos.innerHTML = "";

            contenedorDatos.innerHTML = `
            <div class="pokemon-card">
                <img src="${datosPokemon.sprites.front_default}" alt="${datosPokemon.name}">
                <h3>${datosPokemon.name}</h3>
                <p>Altura: ${datosPokemon.height / 10} m</p>
                <p>Peso: ${datosPokemon.weight / 10} kg</p>
                <p>Tipos: ${datosPokemon.types.map(type => type.type.name).join(", ")}</p>
            </div>
        `;
        }catch(err){
            console.log(err)
            return;
        }
    });

    // Limpiar resultados
    document.getElementById("limpiar").addEventListener("click", () => {
        contenedorDatos.innerHTML = "";
    });
    
});

const getPokemon = async(nombrePokemon) =>{
    const response = await fetch(api + nombrePokemon);
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const datosPokemon = await response.json();
    return datosPokemon
}