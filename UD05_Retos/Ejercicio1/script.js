window.addEventListener('load', () => {
  setTimeout(() => {
    obtenerDatos();
    buscarPaises();
  }, 300)
});

import { api } from './api.js';
let paises = [];

const buscarPais = document.getElementById('buscarPais');
const tablaPaises = document.getElementById('paises');

const obtenerDatos = async () => {
  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error('Error ${response.status} de la BBDD: ${response.statusText}');
    }
    
    paises = await response.json();
    mostrarPaises(paises);

  } catch (error) {
    console.log("Error al obtener los datos:", error);
  }
};

const mostrarPaises = (paisesMostrados) => {
  tablaPaises.innerHTML = '';
  paisesMostrados.forEach(pais => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${pais.name.common}</td>
      <td>${pais.capital ? pais.capital[0] : 'N/A'}</td>
      <td>${pais.region}</td>
      <td>${pais.population.toLocaleString()}</td>
    `;
    tablaPaises.appendChild(fila);
  });
};

const buscarPaises = () => {
  buscarPais.addEventListener('input', () => {
    const paisBuscado = buscarPais.value;
    const paisesFiltrados = paises.filter(pais =>
      pais.name.common.toLowerCase().includes(paisBuscado.toLowerCase())
    );
    mostrarPaises(paisesFiltrados);
  });
};



