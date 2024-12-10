const apiURL = "https://restcountries.com/v3.1/all";

// Elementos del DOM
const buscarPais = document.getElementById("buscarPais");
const tablaPaises = document.getElementById("paises");

// Función para obtener los datos de la API
async function fetchCountries() {
  try {
    const response = await fetch(apiURL);
    const countries = await response.json();
    displayCountries(countries);
    addSearchFilter(countries);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Función para mostrar los países en la tabla
function displayCountries(countries) {
  tablaPaises.innerHTML = ""; // Limpiar contenido anterior
  countries.forEach((country) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${country.name.common}</td>
      <td>${country.capital ? country.capital[0] : "N/A"}</td>
      <td>${country.region}</td>
      <td>${country.population.toLocaleString()}</td>
    `;
    tablaPaises.appendChild(fila);
  });
}

// Función para agregar el filtro de búsqueda
function addSearchFilter(countries) {
  buscarPais.addEventListener("input", () => {
    const searchTerm = buscarPais.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
  });
}

// Obtener y mostrar los países al cargar la página
fetchCountries();
