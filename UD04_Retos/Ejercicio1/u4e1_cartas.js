let aciertos = 0;
let intentos = 0;

// Array donde almacenaremos las cartas seleccionadas solo habra 2
let seleccionadas = [];

const tiposDeCartas = [
    'img/corazones.png', 'img/corazones.png',
    'img/diamantes.png', 'img/diamantes.png',
    'img/picas.png', 'img/picas.png',
    'img/treboles.png', 'img/treboles.png',
];

//Ordenar aleatoriamente los tipos de cartas
tiposDeCartas.sort(() => Math.random() - 0.5);

// Asignamos el tipo de carta y el evento de clic a cada imagen usando un bucle
for (let i = 0; i < 8; i++) {
    const carta = document.getElementById(i.toString()); // Obtener la carta por su id
    carta.dataset.tipo = tiposDeCartas[i]; // Asignar el tipo de carta
    carta.addEventListener('click', eleccionCarta); 
}


function eleccionCarta() {
    // Mostramos la imagen de la carta que se ha elegido
    this.src = this.dataset.tipo;
    
    seleccionadas.push(this);

    // Si se han seleccionado dos cartas, verificamos si son una pareja
    if (seleccionadas.length === 2) {
        intentos++; // Aumentamos el conteo de intentos
        document.getElementById('intentos').innerHTML = intentos; // Actualizamos los intentos en la página

        // Comparamos las dos cartas seleccionadas
        if (seleccionadas[0].dataset.tipo === seleccionadas[1].dataset.tipo) {
            aciertos++; // Aumentamos el conteo de aciertos
            document.getElementById('aciertos').innerHTML = aciertos; // Actualizamos los aciertos en la página

            seleccionadas[0].removeEventListener('click', eleccionCarta); // Eliminamos el evento de clic de las cartas
            seleccionadas[1].removeEventListener('click', eleccionCarta);
            seleccionadas = [];
            
        } else {
            // Si no son iguales, volvemos a mostrar las cartas en la cara posterior
            setTimeout(() => {
                seleccionadas[0].src = 'img/backCarta.png';
                seleccionadas[1].src = 'img/backCarta.png';

                seleccionadas[0].addEventListener('click', eleccionCarta); // Volvemos a anadir el evento de clic a las cartas
                seleccionadas[1].addEventListener('click', eleccionCarta);
            
                // Vaciamos el array de nuevo
                seleccionadas = [];
            }, 500);
        }
    }
    
    this.removeEventListener('click', eleccionCarta);

    if (aciertos === 4) {
        document.getElementById('resultado').innerText = '¡Ganaste en ' + intentos + ' intentos!';
    }
}

